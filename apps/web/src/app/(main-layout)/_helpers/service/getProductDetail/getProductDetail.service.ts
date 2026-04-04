import type {
  GetProductDataQuery,
  GetProductDataQueryVariables,
} from '@/generated/graphql';

import { GetProductDataDocument } from '@/generated/graphql';
import type { ProductDetailData } from './getProductDetail.types';
import { directusGraphqlQuery } from '@/lib/graphql-client';
import { getProductDetailMapper } from './getProductDetail.mapper';
import { unstable_cache } from 'next/cache';

export async function getProductDetailData(
  slug: string
): Promise<ProductDetailData | null> {
  if (!process.env.DIRECTUS_URL) {
    return null;
  }
  if (process.env.DISABLE_CACHE) {
    return fetchProductDetail(slug);
  }
  return unstable_cache(
    async () => fetchProductDetail(slug),
    ['product-detail', slug],
    {
      revalidate: 60 * 60 * 24,
    }
  )();
}

const fetchProductDetail = async (
  slug: string
): Promise<ProductDetailData | null> => {
  const data = await directusGraphqlQuery<
    GetProductDataQuery,
    GetProductDataQueryVariables
  >(GetProductDataDocument, { slug });

  return getProductDetailMapper(data);
};
