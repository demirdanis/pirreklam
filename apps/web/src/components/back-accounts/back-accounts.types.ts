export interface BankAccount {
  id: string;
  bankName: string;
  branchName: string;
  accountOwner: string;
  iban: string;
  accountNo: string;
  currency: 'TL' | 'USD' | 'EUR';
}

export interface BankAccountsData {
  accounts: BankAccount[];
}
