import type { FeaturedProductsData } from '@/components/featured-products/featured-products.types';

export async function getFeaturedProductsData(): Promise<FeaturedProductsData> {
  return {
    products: [
      {
        id: 'ruhsat-kabi',
        label: 'Ruhsat Kabı',
        href: '/plastik-urunler/ruhsat-kabi',
      },
      {
        id: 'plakalik',
        label: 'Plakalık',
        href: '/plastik-urunler/plakalik',
      },
      {
        id: 'pasaport-kilifi',
        label: 'Pasaport Kılıfı',
        href: '/plastik-urunler/pasaport-kilifi',
      },
      {
        id: 'vesikalik-kabi',
        label: 'Vesikalık Kabı',
        href: '/plastik-urunler/vesikalik-kabi',
      },
      {
        id: 'kredi-kartlik',
        label: 'Kredi Kartlık',
        href: '/plastik-urunler/kredi-kartlik',
      },
      {
        id: 'doviz-kabi',
        label: 'Döviz Kabı',
        href: '/plastik-urunler/doviz-kabi',
      },
      {
        id: 'evlilik-cuzdani-kilifi',
        label: 'Evlilik Cüzdanı Kılıfı',
        href: '/plastik-urunler/evlilik-cuzdani-kilifi',
      },
      {
        id: 'veteriner-asi-karnesi-kabi',
        label: 'Veteriner Aşı Karnesi Kabı',
        href: '/plastik-urunler/veteriner-asi-karnesi-kabi',
      },
    ],
  };
}
