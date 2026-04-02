import type {
  ProductCategoryListData,
  SubCategoryVariation,
  SubCategoryVariationProductItem,
} from '@/components/product-category-list/product-category-list.types';

import type { GetProductListQuery } from '@/generated/graphql';
import { NO_CARD_IMAGE_URL } from '@/lib/image';
import { getImageUrl } from '@/lib/directus';

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function getProductCategoryMapper(
  data: GetProductListQuery,
  subcategorySlug: string
): ProductCategoryListData | null {
  const subcat = data?.sub_categories?.[0];
  if (!subcat) return null;

  const subcategoryTitle = subcat.name ?? '';

  const subcategories: SubCategoryVariation[] = (subcat.variations ?? [])
    .filter(Boolean)
    .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
    .map((variation) => {
      const variationName = variation?.name ?? '';
      const products: SubCategoryVariationProductItem[] = (
        variation?.products ?? []
      )
        .filter(Boolean)
        .map((p) => {
          const printOptions = (p?.variatins ?? [])
            .filter(Boolean)
            .map((v) => v?.main_option?.name)
            .filter((name): name is string => Boolean(name))
            .filter((name, idx, arr) => arr.indexOf(name) === idx);

          return {
            id: p?.slug ?? '',
            slug: p?.slug ?? '',
            title: p?.name ?? '',
            imageUrl: getImageUrl(
              p?.variatins?.[0]?.images?.[0]?.big_image ?? '',
              NO_CARD_IMAGE_URL
            ),
            imageAlt: p?.name ?? '',
            printOptions: printOptions.length > 0 ? printOptions : undefined,
          };
        });

      return {
        id: toSlug(variationName),
        slug: toSlug(variationName),
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
  return response;
}
