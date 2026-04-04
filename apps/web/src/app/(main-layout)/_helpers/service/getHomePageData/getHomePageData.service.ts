import type {
  GetHomePageDataQuery,
  GetHomePageDataQueryVariables,
} from '@/generated/graphql';

import { GetHomePageDataDocument } from '@/generated/graphql';
import { GetHomePageDataMapper } from './getHomePageData.mapper';
import type { HomePageData } from './getHomePageData.mapper';
import { directusGraphqlQuery } from '@/lib/graphql-client';
import { unstable_cache } from 'next/cache';

const EMPTY_HOME_PAGE: HomePageData = {
  banners: { slides: [] },
  sectoralProducts: { title: '', groups: [] },
  popularSubCategories: { title: '', subtitle: '', products: [] },
};

export async function getHomePageDataWithCache(): Promise<HomePageData | null> {
  console.log('[getHomePageData] DIRECTUS_URL:', process.env.DIRECTUS_URL);
  if (!process.env.DIRECTUS_URL) {
    console.warn(
      '[getHomePageData] DIRECTUS_URL is not set, returning empty home page'
    );
    return EMPTY_HOME_PAGE;
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
  console.log('[getHomePageData] Fetching...');
  try {
    const data = await directusGraphqlQuery<
      GetHomePageDataQuery,
      GetHomePageDataQueryVariables
    >(GetHomePageDataDocument, {});

    console.log('[getHomePageData] Raw data keys:', Object.keys(data ?? {}));

    const mappedData = GetHomePageDataMapper(data);

    console.log(
      '[getHomePageData] Mapped banners count:',
      mappedData?.banners?.slides?.length
    );
    console.log(
      '[getHomePageData] Mapped sectoralProducts groups:',
      mappedData?.sectoralProducts?.groups?.length
    );
    console.log(
      '[getHomePageData] Mapped popularSubCategories:',
      mappedData?.popularSubCategories?.products?.length
    );

    return mappedData;
  } catch (err) {
    console.error('[getHomePageData] FAILED:', err);
    return null;
  }
};
