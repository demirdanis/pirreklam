import type {
  GetProductListQuery,
  GetProductListQueryVariables,
} from '@/generated/graphql';

import { GetProductListDocument } from '@/generated/graphql';
import type { ProductCategoryListData } from '@/components/product-category-list/product-category-list.types';
import { directusGraphqlQuery } from '@/lib/graphql-client';
import { getProductCategoryMapper } from './getProductCategory.mapper';
import { unstable_cache } from 'next/cache';

export async function getProductCategoryData(
  subcategory: string,
  variation?: string
): Promise<ProductCategoryListData | null> {
  if (!process.env.DIRECTUS_URL) {
    return null;
  }
  if (process.env.DISABLE_CACHE) {
    return fetchProductCategory(subcategory, variation);
  }
  return unstable_cache(
    async () => fetchProductCategory(subcategory, variation),
    ['product-category', subcategory, variation ?? 'default'],
    {
      revalidate: 60 * 60 * 24,
    }
  )();
}

const fetchProductCategory = async (
  subcategory: string,
  variation?: string
): Promise<ProductCategoryListData | null> => {
  const vars: GetProductListQueryVariables = {
    subcategorySlug: subcategory,
  };

  if (variation) {
    vars.variation = variation;
  }

  console.log('variation', variation);
  const data = await directusGraphqlQuery<
    GetProductListQuery,
    GetProductListQueryVariables
  >(GetProductListDocument, vars);

  return getProductCategoryMapper(data, subcategory);
};
