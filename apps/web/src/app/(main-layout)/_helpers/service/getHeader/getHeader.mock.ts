import type { HeaderData } from '@/components/header/header.types';

export async function getHeaderData(): Promise<HeaderData> {
  return {
    logo: {
      text: 'Pir Reklam',
      tagline: "1961'den Beri Sektörün Pir'i",
      href: '/',
    },
    contacts: [
      {
        icon: 'phone',
        label: "Türkiye'nin her yerinden",
        value: '444 10 30',
        href: 'tel:4441030',
      },
      {
        icon: 'whatsapp',
        label: 'WhatsApp Sipariş',
        value: '0544 233 80 03',
        href: 'https://wa.me/905442338003',
      },
    ],
    loginHref: '/giris-yap-kayit-ol',
    cartHref: '/sepet',
    navItems: [
      { label: 'Anasayfa', href: '/' },
      { label: 'Kurumsal', href: '/#kurumsal' },
      { label: 'İletişim', href: '/#iletisim' },
      { label: 'Banka Hesapları', href: '/#banka-hesaplari' },
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
  };
}
