import {
  SearchProductsByNameDocument,
  SearchProductsByNameQueryVariables,
  SearchProductsByStockCodeDocument,
  SearchProductsByStockCodeQueryVariables,
  type SearchProductsByNameQuery,
  type SearchProductsByStockCodeQuery,
} from '@/generated/graphql';
import { directusGraphqlQuery } from '@/lib/graphql-client';
import { getSearchProductsMapper } from './getSearchProducts.mapper';
import type { SearchProductsResult } from './getSearchProducts.types';

export async function getSearchProducts(
  keyword: string
): Promise<SearchProductsResult> {
  if (!process.env.DIRECTUS_URL || !keyword.trim()) {
    return [];
  }

  const isStockCode = /[+\-]/.test(keyword);

  if (isStockCode) {
    const vars: SearchProductsByStockCodeQueryVariables = {
      stockCode: keyword.trim(),
    };
    const data = await directusGraphqlQuery<
      SearchProductsByStockCodeQuery,
      SearchProductsByStockCodeQueryVariables
    >(SearchProductsByStockCodeDocument, vars);
    return getSearchProductsMapper(data);
  }

  const vars: SearchProductsByNameQueryVariables = {
    keyword: keyword.trim(),
  };
  const data = await directusGraphqlQuery<
    SearchProductsByNameQuery,
    SearchProductsByNameQueryVariables
  >(SearchProductsByNameDocument, vars);
  return getSearchProductsMapper(data);
}
