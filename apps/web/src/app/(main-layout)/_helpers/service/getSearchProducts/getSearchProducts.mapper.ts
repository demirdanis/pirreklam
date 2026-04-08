import type {
  SearchProductItem,
  SearchProductsResult,
} from './getSearchProducts.types';
import type {
  SearchProductsByNameQuery,
  SearchProductsByStockCodeQuery,
} from '@/generated/graphql';

import { NO_CARD_IMAGE_URL } from '@/lib/image';
import { getImageUrl } from '@/lib/directus';

type SearchQuery = SearchProductsByNameQuery | SearchProductsByStockCodeQuery;

export function getSearchProductsMapper(
  data: SearchQuery
): SearchProductsResult {
  return (data.products ?? []).filter(Boolean).map((p): SearchProductItem => {
    const bigImage = p.variatins?.[0]?.images?.[0]?.big_image ?? null;
    return {
      id: p.id,
      title: p.name ?? '',
      slug: p.slug ?? '',
      imageUrl: getImageUrl(bigImage, NO_CARD_IMAGE_URL),
    };
  });
}
