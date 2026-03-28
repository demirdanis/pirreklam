import type { BankaHesaplariData } from '@/components/banka-hesaplari/banka-hesaplari.types';

export const getBankaHesaplariMock = (): BankaHesaplariData => ({
  hesaplar: [
    {
      id: '1',
      bankAdi: 'Ziraat Bankası',
      subeAdi: 'Karabağlar Şubesi',
      hesapAdi: 'Pir Reklam Tanıtım Ltd. Şti.',
      iban: 'TR12 0001 0012 3456 7890 1234 56',
      hesapNo: '12345678-5001',
      para: 'TL',
    },
    {
      id: '2',
      bankAdi: 'Türkiye İş Bankası',
      subeAdi: 'İzmir Şubesi',
      hesapAdi: 'Pir Reklam Tanıtım Ltd. Şti.',
      iban: 'TR34 0006 4000 0011 2233 4455 66',
      hesapNo: '11223344-5678',
      para: 'TL',
    },
    {
      id: '3',
      bankAdi: 'Garanti BBVA',
      subeAdi: 'Karabağlar Şubesi',
      hesapAdi: 'Pir Reklam Tanıtım Ltd. Şti.',
      iban: 'TR56 0006 2000 0890 0062 2991 26',
      hesapNo: '6299126-6',
      para: 'TL',
    },
    {
      id: '4',
      bankAdi: 'Akbank',
      subeAdi: 'İzmir Şubesi',
      hesapAdi: 'Pir Reklam Tanıtım Ltd. Şti.',
      iban: 'TR78 0004 6006 1388 8000 1234 56',
      hesapNo: '013888-0012345',
      para: 'TL',
    },
    {
      id: '5',
      bankAdi: 'Yapı Kredi',
      subeAdi: 'Karabağlar Şubesi',
      hesapAdi: 'Pir Reklam Tanıtım Ltd. Şti.',
      iban: 'TR90 0006 7010 0000 0098 7654 32',
      hesapNo: '98765432-1',
      para: 'TL',
    },
  ],
});
