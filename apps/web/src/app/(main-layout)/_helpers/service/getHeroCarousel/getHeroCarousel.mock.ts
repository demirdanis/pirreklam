import type { HeroCarouselData } from '@/components/hero-carousel/hero-carousel.types';

export async function getHeroCarouselData(): Promise<HeroCarouselData> {
  return {
    slides: [
      {
        id: 'slide-1',
        badge: 'Otomotiv Sektörüne Özel',
        title: 'Ruhsat Kabı &\nPlakalık Çözümleri',
        subtitle:
          'Sigorta acenteleri, oto galerileri ve servisler için özel üretim plastik ürünlerde 60 yıllık tecrübe.',
        ctaLabel: 'Ürünleri İncele',
        ctaHref: '/plastik-urunler/ruhsat-kabi',
        imageUrl:
          'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&h=700&fit=crop&q=80',
        imageAlt: 'Otomotiv Ürünleri',
      },
      {
        id: 'slide-2',
        badge: 'Turizm & Seyahat',
        title: 'Pasaport Kılıfı &\nSeyahat Aksesuarları',
        subtitle:
          'Turizm acentelerine, hac ve umre firmalarına yönelik yüksek kaliteli pasaport kılıfı ve PVC ürünler.',
        ctaLabel: 'Keşfet',
        ctaHref: '/plastik-urunler/pasaport-kilifi',
        imageUrl:
          'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&h=700&fit=crop&q=80',
        imageAlt: 'Turizm Ürünleri',
      },
      {
        id: 'slide-3',
        badge: 'Promosyon & Matbaa',
        title: 'Özel Baskılı\nPromosyon Ürünleri',
        subtitle:
          'Logolu anahtarlık, çakmak, kalem ve matbaa ürünleriyle markanızı öne çıkarın. Toplu sipariş avantajları.',
        ctaLabel: 'Teklif Al',
        ctaHref: '/promosyon-urunler',
        imageUrl:
          'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1600&h=700&fit=crop&q=80',
        imageAlt: 'Promosyon Ürünleri',
      },
    ],
  };
}
