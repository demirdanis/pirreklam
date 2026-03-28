export interface BankaHesabi {
  id: string;
  bankAdi: string;
  subeAdi: string;
  hesapAdi: string;
  iban: string;
  hesapNo: string;
  para: 'TL' | 'USD' | 'EUR';
}

export interface BankaHesaplariData {
  hesaplar: BankaHesabi[];
}
