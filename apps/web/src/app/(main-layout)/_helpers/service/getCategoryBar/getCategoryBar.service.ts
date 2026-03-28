import type {
  GetCategoryBarQuery,
  GetCategoryBarQueryVariables,
} from '@/generated/graphql';

import type { CategoryBarData } from '@/components/category-bar/category-bar.types';
import { GetCategoryBarDocument } from '@/generated/graphql';
import { GetCategoryBarMapper } from './getCategoryBar.mapper';
import { directusGraphqlQuery } from '@/lib/graphql-client';
import { unstable_cache } from 'next/cache';

export async function getCategoryBarDataWithCache(): Promise<CategoryBarData> {
  if (process.env.DISABLE_CACHE) {
    return getCategoryBarData();
  }
  return unstable_cache(
    async () => getCategoryBarData(),
    ['category-bar-data', 'get-category-bar'],
    {
      revalidate: 60 * 60 * 24,
    }
  )();
}

const getCategoryBarData = async (): Promise<CategoryBarData> => {
  const data = await directusGraphqlQuery<
    GetCategoryBarQuery,
    GetCategoryBarQueryVariables
  >(GetCategoryBarDocument, {});

  const mappedData = GetCategoryBarMapper(data);

  return mappedData;
};
