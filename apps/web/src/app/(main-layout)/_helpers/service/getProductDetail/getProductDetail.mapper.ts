import type {
  ColorOption,
  OptionGroup,
  OptionItem,
  ProductDetailData,
  TierPrice,
  VariantData,
} from './getProductDetail.types';

import type { GetProductDataQuery } from '@/generated/graphql';
import { NO_CARD_IMAGE_URL } from '@/lib/image';
import { getImageUrl } from '@/lib/directus';

export function getProductDetailMapper(
  data: GetProductDataQuery
): ProductDetailData | null {
  const product = data?.products?.[0];
  if (!product) return null;

  const slug = product.slug ?? '';
  const title = product.name ?? '';
  const subcategorySlug = product.sub_category_variation?.slug ?? '';
  const subcategoryTitle = product.sub_category_variation?.name ?? '';

  const variatins = (product.variatins ?? []).filter(Boolean);

  // ─── Build ordered option index from product_options ───────────────────
  const optionOrderMap = new Map<string, number>();
  (data.product_options ?? []).forEach((opt, idx) => {
    if (opt?.id) optionOrderMap.set(opt.id, idx);
  });

  // ─── Main option group ────────────────────────────────────────────────────
  const mainOptionGroupTitle =
    variatins[0]?.main_option?.category?.name ?? 'BASKI SEÇENEKLERİ';

  const mainOptionsMap = new Map<string, OptionItem>();
  for (const variat of variatins) {
    const opt = variat?.main_option;
    if (opt?.id && opt.name && !mainOptionsMap.has(opt.id)) {
      mainOptionsMap.set(opt.id, { id: opt.id, label: opt.name });
    }
  }

  const mainOptionGroup: OptionGroup = {
    title: mainOptionGroupTitle,
    options: Array.from(mainOptionsMap.values()).sort(
      (a, b) =>
        (optionOrderMap.get(a.id) ?? Infinity) -
        (optionOrderMap.get(b.id) ?? Infinity)
    ),
  };

  // ─── Sub option group ─────────────────────────────────────────────────────
  const subOptionsMap = new Map<string, OptionItem>();
  let subOptionGroupTitle = '';

  for (const variat of variatins) {
    const opt = variat?.secondary_option;
    if (opt?.id && opt.name) {
      if (!subOptionGroupTitle) {
        subOptionGroupTitle = opt.category?.name ?? '';
      }
      if (!subOptionsMap.has(opt.id)) {
        subOptionsMap.set(opt.id, { id: opt.id, label: opt.name });
      }
    }
  }

  const subOptionGroup: OptionGroup | undefined =
    subOptionsMap.size > 0
      ? {
          title: subOptionGroupTitle,
          options: Array.from(subOptionsMap.values()).sort(
            (a, b) =>
              (optionOrderMap.get(a.id) ?? Infinity) -
              (optionOrderMap.get(b.id) ?? Infinity)
          ),
        }
      : undefined;

  // ─── Colors ───────────────────────────────────────────────────────────────
  // Collect the hex values used in this product's variants
  const variantColorHexes = new Set<string>();
  for (const variat of variatins) {
    const hex = variat?.color?.color;
    if (hex) variantColorHexes.add(hex);
  }

  // Use the ordered product_colors list from GraphQL, filtered to this product
  const colors: ColorOption[] = (data.product_colors ?? [])
    .filter((c) => c?.color && variantColorHexes.has(c.color))
    .map((c) => ({
      id: c.color!,
      label: c.name ?? c.color!,
      hex: c.color!,
    }));

  // Fallback: if product_colors is empty, derive from variants (preserves old behavior)
  if (colors.length === 0) {
    const colorsMap = new Map<string, ColorOption>();
    for (const variat of variatins) {
      const c = variat?.color;
      if (c?.color && !colorsMap.has(c.color)) {
        colorsMap.set(c.color, {
          id: c.color,
          label: c.name ?? c.color,
          hex: c.color,
        });
      }
    }
    colors.push(...colorsMap.values());
  }

  // ─── Variants ─────────────────────────────────────────────────────────────
  const variants: VariantData[] = variatins.map((variat) => {
    const mainOptionId = variat?.main_option?.id ?? '';
    const subOptionId = variat?.secondary_option?.id ?? undefined;
    const colorId = variat?.color?.color ?? '';

    const key = subOptionId
      ? `${mainOptionId}__${subOptionId}__${colorId}`
      : `${mainOptionId}__${colorId}`;

    const tiers: TierPrice[] = (variat?.purchase_count_prices ?? [])
      .filter(Boolean)
      .map((t) => ({
        qty: t?.count ?? 0,
        perUnitExVat: t?.price ?? 0,
      }));

    const images = (variat?.images ?? [])
      .filter(Boolean)
      .map((img) => getImageUrl(img?.big_image, NO_CARD_IMAGE_URL));

    return {
      key,
      id: variat?.id ?? '',
      mainOptionId,
      subOptionId,
      colorId,
      productCode: variat?.stock_code ?? '',
      images,
      videoUrl: variat?.video_url ?? undefined,
      singleUnitPriceExVat: variat?.piece_price ?? 0,
      tiers,
      details: variat?.details ?? null,
    };
  });

  // ─── Breadcrumb ───────────────────────────────────────────────────────────
  const breadcrumb: { label: string; href: string }[] = [
    { label: 'Anasayfa', href: '/' },
    ...(subcategorySlug
      ? [{ label: subcategoryTitle, href: `/${subcategorySlug}` }]
      : []),
    { label: title, href: `/${slug}` },
  ];

  return {
    slug,
    title,
    categorySlug: '',
    categoryTitle: '',
    subcategorySlug,
    subcategoryTitle,
    breadcrumb,
    mainOptionGroup,
    subOptionGroup,
    colors,
    variants,
    relatedProducts: [],
  };
}
