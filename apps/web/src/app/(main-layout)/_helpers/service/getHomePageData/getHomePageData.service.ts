import type {
  GetHomePageDataQuery,
  GetHomePageDataQueryVariables,
} from '@/generated/graphql';

import { GetHomePageDataDocument } from '@/generated/graphql';
import { GetHomePageDataMapper } from './getHomePageData.mapper';
import type { HomePageData } from './getHomePageData.mapper';
import { directusGraphqlQuery } from '@/lib/graphql-client';
import { unstable_cache } from 'next/cache';

export async function getHomePageDataWithCache(): Promise<HomePageData | null> {
  if (!process.env.DIRECTUS_URL) {
    return null;
  }
  if (process.env.DISABLE_CACHE) {
    return getHomePageData();
  }
  return unstable_cache(
    async () => getHomePageData(),
    ['home-page-data', 'get-home-page'],
    {
      revalidate: 60 * 60 * 24,
    }
  )();
}

const getHomePageData = async (): Promise<HomePageData | null> => {
  const data = await directusGraphqlQuery<
    GetHomePageDataQuery,
    GetHomePageDataQueryVariables
  >(GetHomePageDataDocument, {});

  const mappedData = GetHomePageDataMapper(data);

  return mappedData;
};
