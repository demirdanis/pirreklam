import type {
  GetHeaderDataQuery,
  GetHeaderDataQueryVariables,
} from '@/generated/graphql';

import { GetHeaderDataDocument } from '@/generated/graphql';
import { GetHeaderDataMapper } from './getHeader.mapper';
import type { HeaderData } from '@/components/header/header.types';
import { directusGraphqlQuery } from '@/lib/graphql-client';
import { unstable_cache } from 'next/cache';

const EMPTY_HEADER: HeaderData = {
  contacts: [],
  navItems: [],
  socialLinks: [],
};

export async function getHeaderDataWithCache(): Promise<HeaderData> {
  if (!process.env.DIRECTUS_URL) {
    return EMPTY_HEADER;
  }
  if (process.env.DISABLE_CACHE) {
    return getHeaderData();
  }
  return unstable_cache(
    async () => getHeaderData(),
    ['header-data', 'get-header-data'],
    {
      revalidate: 60 * 60 * 24,
    }
  )();
}

const getHeaderData = async (): Promise<HeaderData> => {
  const data = await directusGraphqlQuery<
    GetHeaderDataQuery,
    GetHeaderDataQueryVariables
  >(GetHeaderDataDocument, {});

  const mappedData = GetHeaderDataMapper(data);

  return mappedData;
};
