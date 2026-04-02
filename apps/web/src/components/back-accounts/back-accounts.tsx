'use client';

import type { BankAccount, BankAccountsData } from './back-accounts.types';
import { Check, Copy, CreditCard } from 'lucide-react';

import { useState } from 'react';

interface BankAccountsProps {
  data: BankAccountsData;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 inline-flex items-center gap-1 rounded-md border border-[#e6e6e6] px-2 py-1 text-xs text-[#585d5d] transition-colors hover:border-[#730912] hover:text-[#730912]"
      aria-label="Kopyala"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? 'Kopyalandı' : 'Kopyala'}
    </button>
  );
}

function BankCard({ account }: { account: BankAccount }) {
  return (
    <div className="rounded-2xl border border-[#f0f0f0] bg-white shadow-sm overflow-hidden">
      {/* Colored top bar */}
      <div className="h-1.5 w-full" style={{ backgroundColor: '#730912' }} />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: '#730912' }}
          >
            <CreditCard className="h-5 w-5" style={{ color: '#fff' }} />
          </div>
          <div>
            <p className="font-bold text-[#16223f] text-sm">
              {account.bankName}
            </p>
            <p className="text-xs text-text-mute">{account.branchName}</p>
          </div>
          <span
            className="ml-auto shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white"
            style={{ backgroundColor: '#730912' }}
          >
            {account.currency}
          </span>
        </div>

        <p className="mb-4 text-xs font-semibold text-text-mute  tracking-wider">
          {account.accountOwner}
        </p>

        <div className="space-y-3">
          <div className="rounded-lg bg-[#f8f8f8] px-4 py-3">
            <p className="mb-1 text-[10px] font-semibold  tracking-wider text-text-mute">
              IBAN
            </p>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-mono text-sm font-semibold text-[#16223f] tracking-wider">
                {account.iban}
              </span>
              <CopyButton text={account.iban} />
            </div>
          </div>

          <div className="rounded-lg bg-[#f8f8f8] px-4 py-3">
            <p className="mb-1 text-[10px] font-semibold  tracking-wider text-text-mute">
              Hesap No
            </p>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-mono text-sm font-semibold text-[#16223f]">
                {account.accountNo}
              </span>
              <CopyButton text={account.accountNo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BankAccounts({ data }: BankAccountsProps) {
  return (
    <section id="back-accounts" className="bg-white py-4 md:py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 md:mb-8 text-center lg:text-left">
          <h2 className="text-3xl font-bold text-[#16223f] sm:text-4xl">
            Banka Hesaplarımız
          </h2>
          <div className="mx-auto lg:mx-0 mt-4 h-1 w-16 rounded-full bg-[#730912]" />
          <p className="mt-6 text-[#585d5d] max-w-xl text-sm">
            Aşağıdaki banka hesaplarımıza havale veya EFT yapabilirsiniz. IBAN
            numarasını kopyalamak için &ldquo;Kopyala&rdquo; butonuna tıklayın.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.accounts.map((account) => (
            <BankCard key={account.id} account={account} />
          ))}
        </div>
      </div>
    </section>
  );
}
