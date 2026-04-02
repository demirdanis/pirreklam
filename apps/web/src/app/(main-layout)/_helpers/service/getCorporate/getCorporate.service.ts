import type {
  GetCorporateQuery,
  GetCorporateQueryVariables,
} from '@/generated/graphql';

import type { CorporateData } from '@/components/corporate/corporate.types';
import { GetCorporateDocument } from '@/generated/graphql';
import { directusGraphqlQuery } from '@/lib/graphql-client';
import { getCorporateMapper } from './getCorporate.mapper';
import { unstable_cache } from 'next/cache';

export async function getCorporateDataWithCache(): Promise<CorporateData> {
  if (!process.env.DIRECTUS_URL) {
    return {} as CorporateData;
  }
  if (process.env.DISABLE_CACHE) {
    return getCorporateData();
  }
  return unstable_cache(
    async () => getCorporateData(),
    ['corporate-data', 'get-corporate-data'],
    {
      revalidate: 60 * 60 * 24,
    }
  )();
}

const getCorporateData = async (): Promise<CorporateData> => {
  const data = await directusGraphqlQuery<
    GetCorporateQuery,
    GetCorporateQueryVariables
  >(GetCorporateDocument, {});

  return getCorporateMapper(data);
};
