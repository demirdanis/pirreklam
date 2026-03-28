'use client';

import type { BankaHesabi, BankaHesaplariData } from './banka-hesaplari.types';
import { Check, Copy, CreditCard } from 'lucide-react';

import { useState } from 'react';

interface BankaHesaplariProps {
  data: BankaHesaplariData;
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
      className="ml-2 inline-flex items-center gap-1 rounded-md border border-[#e6e6e6] px-2 py-1 text-xs text-[#585d5d] transition-colors hover:border-[#e32231] hover:text-[#e32231]"
      aria-label="Kopyala"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? 'Kopyalandı' : 'Kopyala'}
    </button>
  );
}

const BANK_COLORS: Record<string, string> = {
  'Ziraat Bankası': '#009739',
  'Türkiye İş Bankası': '#003087',
  'Garanti BBVA': '#00a651',
  Akbank: '#d4003c',
  'Yapı Kredi': '#003087',
};

function BankaKarti({ hesap }: { hesap: BankaHesabi }) {
  const accentColor = BANK_COLORS[hesap.bankAdi] ?? '#e32231';

  return (
    <div className="rounded-2xl border border-[#f0f0f0] bg-white shadow-sm overflow-hidden">
      {/* Colored top bar */}
      <div className="h-1.5 w-full" style={{ backgroundColor: accentColor }} />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            <CreditCard className="h-5 w-5" style={{ color: accentColor }} />
          </div>
          <div>
            <p className="font-bold text-[#16223f] text-sm">{hesap.bankAdi}</p>
            <p className="text-xs text-text-mute">{hesap.subeAdi}</p>
          </div>
          <span
            className="ml-auto shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white"
            style={{ backgroundColor: accentColor }}
          >
            {hesap.para}
          </span>
        </div>

        <p className="mb-4 text-xs font-semibold text-text-mute uppercase tracking-wider">
          {hesap.hesapAdi}
        </p>

        <div className="space-y-3">
          <div className="rounded-lg bg-[#f8f8f8] px-4 py-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-text-mute">
              IBAN
            </p>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-mono text-sm font-semibold text-[#16223f] tracking-wider">
                {hesap.iban}
              </span>
              <CopyButton text={hesap.iban} />
            </div>
          </div>

          <div className="rounded-lg bg-[#f8f8f8] px-4 py-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-text-mute">
              Hesap No
            </p>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-mono text-sm font-semibold text-[#16223f]">
                {hesap.hesapNo}
              </span>
              <CopyButton text={hesap.hesapNo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BankaHesaplari({ data }: BankaHesaplariProps) {
  return (
    <section id="banka-hesaplari" className="bg-white py-4 md:py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 md:mb-8 text-center lg:text-left">
          <h2 className="text-3xl font-bold text-[#16223f] sm:text-4xl">
            Banka Hesaplarımız
          </h2>
          <div className="mx-auto lg:mx-0 mt-4 h-1 w-16 rounded-full bg-[#e32231]" />
          <p className="mt-6 text-[#585d5d] max-w-xl text-sm">
            Aşağıdaki banka hesaplarımıza havale veya EFT yapabilirsiniz. IBAN
            numarasını kopyalamak için &ldquo;Kopyala&rdquo; butonuna tıklayın.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.hesaplar.map((hesap) => (
            <BankaKarti key={hesap.id} hesap={hesap} />
          ))}
        </div>
      </div>
    </section>
  );
}
