import type {
  ProductCategoryListData,
  SubCategoryVariation,
  SubCategoryVariationProductItem,
} from '@/components/product-category-list/product-category-list.types';

import type { GetProductListQuery } from '@/generated/graphql';
import { NO_CARD_IMAGE_URL } from '@/lib/image';
import { getImageUrl } from '@/lib/directus';

export function getProductCategoryMapper(
  data: GetProductListQuery,
  subcategorySlug: string
): ProductCategoryListData | null {
  console.log('data', data);
  const subcat = data?.sub_categories?.[0];
  if (!subcat) return null;

  const subcategoryTitle = subcat.name ?? '';

  const subcategories: SubCategoryVariation[] = (subcat.variations ?? [])
    .filter(Boolean)
    .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
    .map((variation) => {
      const variationName = variation?.name ?? '';
      const variationSlug = variation?.slug ?? '';
      const products: SubCategoryVariationProductItem[] = (
        variation?.products ?? []
      )
        .filter(Boolean)
        .map((p) => {
          const firstVariation = p?.variatins?.[0];
          const printOptions = (p?.variatins ?? [])
            .filter(Boolean)
            .map((v) => v?.main_option?.name)
            .filter((name): name is string => Boolean(name))
            .filter((name, idx, arr) => arr.indexOf(name) === idx);

          const allVariations = (p?.variatins ?? []).filter(Boolean);

          const mainOptionsMap = new Map<string, string>();
          const secondaryOptionsMap = new Map<string, string>();
          const colorsMap = new Map<string, { label: string; hex?: string }>();

          allVariations.forEach((v) => {
            if (v?.main_option?.id)
              mainOptionsMap.set(
                v.main_option.id,
                v.main_option.name ?? v.main_option.id
              );
            if (v?.secondary_option?.id)
              secondaryOptionsMap.set(
                v.secondary_option.id,
                v.secondary_option.name ?? v.secondary_option.id
              );
            if (v?.color?.id)
              colorsMap.set(v.color.id, {
                label: v.color.name ?? v.color.id,
                hex: v.color.color ?? undefined,
              });
          });

          return {
            id: p?.slug ?? '',
            slug: p?.slug ?? '',
            title: p?.name ?? '',
            imageUrl: getImageUrl(
              firstVariation?.images?.[0]?.big_image ?? '',
              NO_CARD_IMAGE_URL
            ),
            imageAlt: p?.name ?? '',
            printOptions: printOptions.length > 0 ? printOptions : undefined,
            mainOptions:
              mainOptionsMap.size > 0
                ? Array.from(mainOptionsMap.entries()).map(([id, label]) => ({
                    id,
                    label,
                  }))
                : undefined,
            secondaryOptions:
              secondaryOptionsMap.size > 0
                ? Array.from(secondaryOptionsMap.entries()).map(
                    ([id, label]) => ({ id, label })
                  )
                : undefined,
            colors:
              colorsMap.size > 0
                ? Array.from(colorsMap.entries()).map(
                    ([id, { label, hex }]) => ({ id, label, hex })
                  )
                : undefined,
          };
        });

      return {
        id: variationSlug,
        slug: variationSlug,
        title: variationName,
        products,
      };
    });

  const response: ProductCategoryListData = {
    subcategorySlug,
    categoryTitle: '',
    subcategoryTitle,
    breadcrumb: [
      { label: 'Anasayfa', href: '/' },
      { label: subcategoryTitle, href: `/${subcategorySlug}` },
    ],
    subcategories,
  };
  console.log('response', response);
  return response;
}
