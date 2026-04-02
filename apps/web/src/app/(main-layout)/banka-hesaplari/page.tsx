import BankAccounts from '@/components/back-accounts/back-accounts';
import type { Metadata } from 'next';
import { getBankAccountsWithCache } from '../_helpers/service/getBankAccounts/getBankAccounts.service';

export const metadata: Metadata = {
  title: 'Banka Hesapları | Pir Reklam',
  description:
    'Pir Reklam banka hesap bilgileri. IBAN ve hesap numaralarına ulaşın.',
};

export default async function BankaHesaplariPage() {
  const bankAccountsData = await getBankAccountsWithCache();

  return <BankAccounts data={bankAccountsData} />;
}
