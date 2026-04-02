import type {
  BankAccount,
  BankAccountsData,
} from '@/components/back-accounts/back-accounts.types';

import type { GetBankAccountsQuery } from '@/generated/graphql';

export function getBankAccountsMapper(
  data: GetBankAccountsQuery
): BankAccountsData {
  return {
    accounts:
      data?.bank_accounts?.map(
        (h): BankAccount => ({
          id: h?.id ?? '',
          bankName: h?.bank_name ?? '',
          branchName: h?.bank_branch ?? '',
          accountOwner: h?.account_owner ?? '',
          iban: h?.iban ?? '',
          accountNo: h?.account_no ?? '',
          currency: (h?.currency as BankAccount['currency']) ?? 'TL',
        })
      ) ?? [],
  };
}
