import type {
  GetOrdersQuery,
  GetOrdersQueryVariables,
} from '@/generated/graphql';

import { GetOrdersDocument } from '@/generated/graphql';
import type { Order } from './getOrders.types';
import { directusGraphqlQueryWithToken } from '@/lib/graphql-client-user';

const PAGE_SIZE = 10;

export interface OrdersPageData {
  orders: Order[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

export async function getOrders(
  userToken: string,
  page: number = 1
): Promise<OrdersPageData> {
  const offset = (page - 1) * PAGE_SIZE;

  const data = await directusGraphqlQueryWithToken<
    GetOrdersQuery,
    GetOrdersQueryVariables
  >(GetOrdersDocument, userToken, { limit: PAGE_SIZE, offset });

  const totalCount = data.orders_aggregated?.[0]?.count?.id ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return {
    orders: (data.orders ?? []) as Order[],
    totalCount,
    pageSize: PAGE_SIZE,
    currentPage: page,
    totalPages,
  };
}
