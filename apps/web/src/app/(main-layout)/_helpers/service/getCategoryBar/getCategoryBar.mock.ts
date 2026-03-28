import type { CategoryBarData } from '@/components/category-bar/category-bar.types';

export async function getCategoryBarData(): Promise<CategoryBarData> {
  return {
    categories: [
      {
        id: 'plastik-urunler',
        label: 'Plastik Ürünler',
        href: 'plastik-urunler',
        subItems: [
          {
            label: 'Ruhsat Kabı',
            href: 'plastik-urunler/ruhsat-kabi',
          },
          {
            label: 'Plakalık',
            href: 'plastik-urunler/plakalik',
          },
          {
            label: 'Pasaport Kılıfı',
            href: 'plastik-urunler/pasaport-kilifi',
          },
          {
            label: 'Vesikalık Kabı',
            href: 'plastik-urunler/vesikalik-kabi',
          },
          {
            label: 'Kredi Kartlık',
            href: 'plastik-urunler/kredi-kartlik',
          },
          {
            label: 'Döviz Kabı',
            href: 'plastik-urunler/doviz-kabi',
          },
          {
            label: 'Evlilik Cüzdanı Kılıfı',
            href: 'plastik-urunler/evlilik-cuzdani-kilifi',
          },
          {
            label: 'Veteriner Aşı Karnesi Kabı',
            href: 'plastik-urunler/veteriner-asi-karnesi-kabi',
          },
          {
            label: 'Poliçe Kabı',
            href: 'plastik-urunler/police-kabi',
          },
          {
            label: 'Şeffaf PVC Kart Kılıfı',
            href: 'plastik-urunler/seffaf-pvc-kart-kilifi',
          },
          {
            label: 'Bagaj / Valiz Etiketliği',
            href: 'plastik-urunler/bagaj-valiz-etiketligi',
          },
          {
            label: 'Fotoğraf Kabı',
            href: 'plastik-urunler/fotograf-kabi',
          },
        ],
      },
      {
        id: 'promosyon-urunler',
        label: 'Promosyon Ürünler',
        href: 'promosyon-urunler',
        subItems: [
          {
            label: 'Anahtarlık',
            href: 'promosyon-urunler/anahtarlik',
          },
          { label: 'Çakmak', href: 'promosyon-urunler/cakmak' },
          {
            label: 'Oto Kokusu',
            href: 'promosyon-urunler/oto-kokusu',
          },
          { label: 'Kalem', href: 'promosyon-urunler/kalem' },
          {
            label: 'Bant / Kurdela',
            href: 'promosyon-urunler/bant-kurdela',
          },
          {
            label: 'Düğme / Rozet',
            href: 'promosyon-urunler/dugme-rozet',
          },
        ],
      },
      {
        id: 'canta',
        label: 'Çanta',
        href: 'canta',
        subItems: [
          { label: 'Bez Çanta', href: 'canta/bez-canta' },
          {
            label: 'Plastik Çanta',
            href: 'canta/plastik-canta',
          },
          { label: 'Naylon Çanta', href: 'canta/naylon-canta' },
          { label: 'Kağıt Çanta', href: 'canta/kagit-canta' },
        ],
      },
      {
        id: 'matbaa-urunleri',
        label: 'Matbaa Ürünleri',
        href: 'matbaa-urunleri',
        subItems: [
          {
            label: 'Kartvizit',
            href: 'matbaa-urunleri/kartvizit',
          },
          {
            label: 'Antetli Kağıt',
            href: 'matbaa-urunleri/antetli-kagit',
          },
          { label: 'Zarf', href: 'matbaa-urunleri/zarf' },
          { label: 'Broşür', href: 'matbaa-urunleri/brosur' },
          { label: 'Katalog', href: 'matbaa-urunleri/katalog' },
          { label: 'Takvim', href: 'matbaa-urunleri/takvim' },
        ],
      },
    ],
  };
}
