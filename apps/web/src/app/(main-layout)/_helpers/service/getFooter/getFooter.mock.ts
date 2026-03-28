import type { FooterData } from '@/components/footer/footer.types';

export async function getFooterData(): Promise<FooterData> {
  return {
    logo: {
      text: 'Pir Reklam',
      tagline: "1961'den Beri Sektörün Pir'i",
      description:
        "1961'den bu yana plastik ürünler, promosyon malzemeleri ve matbaa ürünlerinde Türkiye'nin güvenilir tedarikçisi.",
      href: '/',
    },
    contact: {
      phone: '444 10 30',
      phoneHref: 'tel:4441030',
      whatsapp: '0544 233 80 03',
      whatsappHref: 'https://wa.me/905442338003',
      email: 'info@pirreklam.com.tr',
      address: 'İzmir, Türkiye',
    },
    sections: [
      {
        title: 'Popüler Ürünler',
        links: [
          {
            label: 'Ruhsat Kabı',
            href: '/plastik-urunler/ruhsat-kabi',
          },
          {
            label: 'Plakalık',
            href: '/plastik-urunler/plakalik',
          },
          {
            label: 'Pasaport Kılıfı',
            href: '/plastik-urunler/pasaport-kilifi',
          },
          {
            label: 'Vesikalık Kabı',
            href: '/plastik-urunler/vesikalik-kabi',
          },
          {
            label: 'Kredi Kartlık',
            href: '/plastik-urunler/kredi-kartlik',
          },
          {
            label: 'Döviz Kabı',
            href: '/plastik-urunler/doviz-kabi',
          },
          {
            label: 'Evlilik Cüzdanı Kılıfı',
            href: '/plastik-urunler/evlilik-cuzdani-kilifi',
          },
          {
            label: 'Anahtarlık',
            href: '/promosyon-urunler/anahtarlik',
          },
        ],
      },
      {
        title: 'Kurumsal',
        links: [
          { label: 'Anasayfa', href: '/' },
          { label: 'Kurumsal', href: '/kurumsal' },
          { label: 'İletişim', href: '/iletisim' },
          { label: 'Banka Hesapları', href: '/banka-hesaplari' },
        ],
      },
      {
        title: 'Müşteri Hizmetleri',
        links: [
          { label: 'Üyelik Sözleşmesi', href: '/uyelik-sozlesmesi' },
          { label: 'Gizlilik Sözleşmesi', href: '/gizlilik-sozlesmesi' },
          { label: 'Kullanım Koşulları', href: '/kullanim-kosullari' },
          {
            label: 'Mesafeli Satış Sözleşmesi',
            href: '/mesafeli-satis-sozlesmesi',
          },
          { label: 'KVKK Aydınlatma Metni', href: '/kvkk-aydinlatma-metni' },
        ],
      },
    ],
    socialLinks: [
      {
        platform: 'facebook',
        href: 'https://www.facebook.com/pirreklamizmir',
        label: 'Facebook',
      },
      {
        platform: 'instagram',
        href: 'https://www.instagram.com/pirreklamizmir/',
        label: 'Instagram',
      },
      {
        platform: 'youtube',
        href: 'https://www.youtube.com/@pirreklamizmir',
        label: 'YouTube',
      },
      {
        platform: 'pinterest',
        href: 'https://tr.pinterest.com/pirreklamizmir/',
        label: 'Pinterest',
      },
      {
        platform: 'linkedin',
        href: 'https://tr.linkedin.com/in/pirreklamizmir',
        label: 'LinkedIn',
      },
    ],
    socialHandle: '@pirreklamizmir',
    googleReviewHref:
      'https://search.google.com/local/writereview?placeid=ChIJFyzBiP7fuxQRQMOL7OE4N6w',
    etbisHref:
      'https://etbis.ticaret.gov.tr/tr/Anasayfa/SiteAraSonuc?siteId=40dba9af-ceac-4459-9719-77d10b54ffdb',
    copyright: '1961 & 2026 Pir Reklam Ltd. Şti. Tüm Hakları Saklıdır.',
  };
}
