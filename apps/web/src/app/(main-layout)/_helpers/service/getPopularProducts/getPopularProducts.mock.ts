import type { PopularProductsData } from '@/components/popular-products/popular-products.types';

export async function getPopularProductsData(): Promise<PopularProductsData> {
  return {
    title: 'Popüler Ürünler',
    subtitle: 'En çok satan ürünlerimiz',
    products: [
      {
        id: 'ruhsat-kabi',
        title: 'Ruhsat Kabı',
        href: '/plastik-urunler/ruhsat-kabi',
        imageUrl:
          'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp',
        imageAlt: 'Ruhsat Kabı',
      },
      {
        id: 'plakalik',
        title: 'Plakalık',
        href: '/plastik-urunler/plakalik',
        imageUrl:
          'https://pirreklam.com.tr/wp-content/uploads/2026/03/5705400668084-689-plakalikurun.png',
        imageAlt: 'Plakalık',
      },
      {
        id: 'kredi-kartlik',
        title: 'Kredi Kartlık',
        href: '/plastik-urunler/kredi-kartlik',
        imageUrl:
          'https://pirreklam.com.tr/wp-content/uploads/2026/03/Mat-Biala-Tekli-Kredi-Kartlik-siyah-gumus-k.webp',
        imageAlt: 'Kredi Kartlık',
      },
      {
        id: 'doviz-kabi',
        title: 'Döviz Kabı',
        href: '/plastik-urunler/doviz-kabi',
        imageUrl:
          'https://pirreklam.com.tr/wp-content/uploads/2026/03/pir-reklam-doviz-kabi.webp',
        imageAlt: 'Döviz Kabı',
      },
      {
        id: 'pasaport-kilifi',
        title: 'Pasaport Kılıfı',
        href: '/plastik-urunler/pasaport-kilifi',
        imageUrl:
          'https://pirreklam.com.tr/wp-content/uploads/2026/03/Lux-Kalin-Seffaf-Pvc-Pasaport-Kilifi.webp',
        imageAlt: 'Pasaport Kılıfı',
      },
      {
        id: 'vesikalik-kabi',
        title: 'Vesikalık Kabı',
        href: '/plastik-urunler/vesikalik-kabi',
        imageUrl:
          'https://pirreklam.com.tr/wp-content/uploads/2026/03/Mat-Biala-Tekli-Vesikalik-Kabi-beyaz-2.webp',
        imageAlt: 'Vesikalık Kabı',
      },
      {
        id: 'evlilik-cuzdani-kilifi',
        title: 'Evlilik Cüzdanı Kılıfı',
        href: '/plastik-urunler/evlilik-cuzdani-kilifi',
        imageUrl:
          'https://pirreklam.com.tr/wp-content/uploads/2026/03/Dikisli-Lux-Desenli-Termo-Deri-Evlilik-Cuzdani-Kilifi-taba-a.webp',
        imageAlt: 'Evlilik Cüzdanı Kılıfı',
      },
      {
        id: 'veteriner-asi-karnesi-kabi',
        title: 'Veteriner Aşı Karnesi Kabı',
        href: '/plastik-urunler/veteriner-asi-karnesi-kabi',
        imageUrl:
          'https://pirreklam.com.tr/wp-content/uploads/2026/03/veteriner-asi-karnesi-offset-pembe.webp',
        imageAlt: 'Veteriner Aşı Karnesi Kabı',
      },
    ],
  };
}
