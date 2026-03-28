import { createDirectus, graphql, staticToken } from '@directus/sdk';

import type { DocumentNode } from 'graphql';
import { print } from 'graphql';

type Variables = Record<string, unknown>;
type Response = Record<string, unknown>;

export async function directusGraphqlQuery<
  TResult extends Response = Response,
  TVariables extends Variables = Variables,
>(document: string | DocumentNode, variables?: TVariables): Promise<TResult> {
  const bearerToken = process.env.DIRECTUS_STATIC_TOKEN || '';

  const client = createDirectus(process.env.DIRECTUS_URL as string)
    .with(graphql())
    .with(staticToken(bearerToken));

  const query = typeof document === 'string' ? document : print(document);

  const data = await client.query<TResult>(query, variables);
  return data;
}
