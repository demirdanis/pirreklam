import { createDirectus, graphql, staticToken } from '@directus/sdk';

import type { DocumentNode } from 'graphql';
import { print } from 'graphql';

type Variables = Record<string, unknown>;
type Response = Record<string, unknown>;

export async function directusGraphqlQuery<
  TResult extends Response = Response,
  TVariables extends Variables = Variables,
>(document: string | DocumentNode, variables?: TVariables): Promise<TResult> {
  const directusUrl = process.env.DIRECTUS_URL;
  const graphqlUrl = process.env.DIRECTUS_GRAPHQL_URL;

  console.log('[graphql-client] DIRECTUS_URL:', directusUrl);
  console.log('[graphql-client] DIRECTUS_GRAPHQL_URL:', graphqlUrl);
  console.log(
    '[graphql-client] DIRECTUS_STATIC_TOKEN:',
    process.env.DIRECTUS_STATIC_TOKEN ? 'SET' : 'NOT SET'
  );

  if (!directusUrl) {
    throw new Error('DIRECTUS_URL environment variable is not set');
  }

  const bearerToken = process.env.DIRECTUS_STATIC_TOKEN || '';

  const client = createDirectus(directusUrl)
    .with(graphql())
    .with(staticToken(bearerToken));

  const query = typeof document === 'string' ? document : print(document);

  console.log('[graphql-client] Querying:', directusUrl);

  try {
    const data = await client.query<TResult>(query, variables);
    console.log('[graphql-client] Success, keys:', Object.keys(data ?? {}));
    return data;
  } catch (err) {
    console.error('[graphql-client] Query FAILED:', err);
    throw err;
  }
}
