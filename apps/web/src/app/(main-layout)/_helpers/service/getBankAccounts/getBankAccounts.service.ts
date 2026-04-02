import type {
  GetBankAccountsQuery,
  GetBankAccountsQueryVariables,
} from '@/generated/graphql';

import type { BankAccountsData } from '@/components/back-accounts/back-accounts.types';
import { GetBankAccountsDocument } from '@/generated/graphql';
import { directusGraphqlQuery } from '@/lib/graphql-client';
import { getBankAccountsMapper } from './getBankAccounts.mapper';
import { unstable_cache } from 'next/cache';

export async function getBankAccountsWithCache(): Promise<BankAccountsData> {
  if (!process.env.DIRECTUS_URL) {
    return { accounts: [] };
  }
  if (process.env.DISABLE_CACHE) {
    return getBankAccounts();
  }
  return unstable_cache(
    async () => getBankAccounts(),
    ['bank-accounts', 'get-bank-accounts'],
    {
      revalidate: 60 * 60 * 24,
    }
  )();
}

const getBankAccounts = async (): Promise<BankAccountsData> => {
  const data = await directusGraphqlQuery<
    GetBankAccountsQuery,
    GetBankAccountsQueryVariables
  >(GetBankAccountsDocument, {});

  return getBankAccountsMapper(data);
};
