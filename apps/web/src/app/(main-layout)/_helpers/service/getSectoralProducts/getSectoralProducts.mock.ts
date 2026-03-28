import type { SectoralProductsData } from '@/components/sectoral-products/sectoral-products.types';

export async function getSectoralProductsData(): Promise<SectoralProductsData> {
  return {
    title: 'Sektörel Ürünler',
    groups: [
      {
        id: 'sigortaoto',
        sectors: [
          'Sigorta Acenteleri',
          'Oto Galeri ve Servisler',
          'Rent a Car Firmaları',
        ],
        products: [
          {
            label: 'Ruhsat Kabı',
            href: 'plastik-urunler/ruhsat-kabi',
          },
          {
            label: 'Plakalık',
            href: 'plastik-urunler/plakalik',
          },
          {
            label: 'Poliçe Kabı',
            href: 'plastik-urunler/police-kabi',
          },
          {
            label: 'Oto Kokusu',
            href: 'promosyon-urunler/oto-kokusu',
          },
          {
            label: 'Kartvizit',
            href: 'matbaa-urunleri/kartvizit',
          },
          {
            label: 'Anahtarlık',
            href: 'promosyon-urunler/anahtarlik',
          },
          { label: 'Çakmak', href: 'promosyon-urunler/cakmak' },
          {
            label: 'Antetli Kağıt',
            href: 'matbaa-urunleri/antetli-kagit',
          },
        ],
      },
      {
        id: 'turizm',
        sectors: [
          'Turizm ve Seyahat Acenteleri',
          'Hac ve Umre Turizm Acenteleri',
        ],
        products: [
          {
            label: 'Pasaport Kılıfı',
            href: 'plastik-urunler/pasaport-kilifi',
          },
          {
            label: 'Bagaj / Valiz Etiketliği',
            href: 'plastik-urunler/bagaj-valiz-etiketligi',
          },
          {
            label: 'Şeffaf PVC Kart Kılıfı',
            href: 'plastik-urunler/seffaf-pvc-kart-kilifi',
          },
          {
            label: 'Şeffaf PVC İpli Yaka Kartı',
            href: 'plastik-urunler/seffaf-pvc-ipli-yaka-karti-kilifi',
          },
          {
            label: 'Kredi Kartlık',
            href: 'plastik-urunler/kredi-kartlik',
          },
          {
            label: 'Kartvizit',
            href: 'matbaa-urunleri/kartvizit',
          },
        ],
      },
      {
        id: 'fotograf',
        sectors: ['Fotoğraf Stüdyoları'],
        products: [
          {
            label: 'Vesikalık Kabı',
            href: 'plastik-urunler/vesikalik-kabi',
          },
          {
            label: '6×9 Fotoğraf Kabı',
            href: 'plastik-urunler/fotograf-kabi/6-x-9-fotograf-kabi',
          },
          {
            label: '10x15 Fotoğraf Kabı',
            href: 'plastik-urunler/fotograf-kabi/10-x-15-fotograf-kabi',
          },
          {
            label: '13x18 Fotoğraf Kabı',
            href: 'plastik-urunler/fotograf-kabi/13-x-18-fotograf-kabi',
          },
          {
            label: '15x21 Fotoğraf Kabı',
            href: 'plastik-urunler/fotograf-kabi/15-x-21-fotograf-kabi',
          },
          {
            label: '18x24 Fotoğraf Kabı',
            href: 'plastik-urunler/fotograf-kabi/18-x-24-fotograf-kabi',
          },
        ],
      },
      {
        id: 'doviz',
        sectors: ['Döviz Büroları', 'Para Transferi Büroları', 'Kuyumcular'],
        products: [
          {
            label: 'Döviz Kabı',
            href: 'plastik-urunler/doviz-kabi',
          },
          {
            label: 'Kartvizit',
            href: 'matbaa-urunleri/kartvizit',
          },
          {
            label: 'Anahtarlık',
            href: 'promosyon-urunler/anahtarlik',
          },
          {
            label: 'Antetli Kağıt',
            href: 'matbaa-urunleri/antetli-kagit',
          },
          { label: 'Zarf', href: 'matbaa-urunleri/zarf' },
        ],
      },
    ],
  };
}
