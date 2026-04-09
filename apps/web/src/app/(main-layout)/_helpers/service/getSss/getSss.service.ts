import type { GetSssQuery, GetSssQueryVariables } from '@/generated/graphql';

import { GetSssDocument } from '@/generated/graphql';
import type { SssItem } from './getSss.types';
import { directusGraphqlQuery } from '@/lib/graphql-client';
import { unstable_cache } from 'next/cache';

export async function getSssDataWithCache(): Promise<SssItem[]> {
  if (!process.env.DIRECTUS_URL) {
    return [];
  }
  if (process.env.DISABLE_CACHE) {
    return fetchSssData();
  }
  return unstable_cache(async () => fetchSssData(), ['sss-data'], {
    revalidate: 60 * 60 * 24,
  })();
}

async function fetchSssData(): Promise<SssItem[]> {
  const data = await directusGraphqlQuery<GetSssQuery, GetSssQueryVariables>(
    GetSssDocument,
    {}
  );

  return (data?.sss ?? [])
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map((item) => ({
      id: String(item.id),
      question: item.question ?? '',
      answer: item.answer ?? '',
    }));
}
