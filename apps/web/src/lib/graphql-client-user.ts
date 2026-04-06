import { createDirectus, graphql, staticToken } from '@directus/sdk';

import type { DocumentNode } from 'graphql';
import { print } from 'graphql';

type Variables = Record<string, unknown>;
type Response = Record<string, unknown>;

/**
 * Verilen token ile (kullanıcının kendi static token'ı) Directus GraphQL sorgusu atar.
 */
export async function directusGraphqlQueryWithToken<
  TResult extends Response = Response,
  TVariables extends Variables = Variables,
>(
  document: string | DocumentNode,
  userToken: string,
  variables?: TVariables
): Promise<TResult> {
  const directusUrl = process.env.DIRECTUS_URL;

  if (!directusUrl) {
    throw new Error('DIRECTUS_URL environment variable is not set');
  }

  const client = createDirectus(directusUrl)
    .with(graphql())
    .with(staticToken(userToken));

  const query = typeof document === 'string' ? document : print(document);

  const data = await client.query<TResult>(query, variables);
  return data;
}
