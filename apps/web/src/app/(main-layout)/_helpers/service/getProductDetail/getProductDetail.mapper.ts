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
    options: Array.from(mainOptionsMap.values()),
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
          options: Array.from(subOptionsMap.values()),
        }
      : undefined;

  // ─── Colors ───────────────────────────────────────────────────────────────
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
  const colors = Array.from(colorsMap.values());

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
      mainOptionId,
      subOptionId,
      colorId,
      productCode: variat?.stock_code ?? '',
      images,
      videoUrl: variat?.video_url ?? undefined,
      singleUnitPriceExVat: variat?.piece_price ?? 0,
      tiers,
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
