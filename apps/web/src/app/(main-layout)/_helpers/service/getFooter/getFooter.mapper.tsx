import type { FooterData } from '@/components/footer/footer.types';
import type { GetFooterDataQuery } from '@/generated/graphql';
import { getImageUrl } from '@/lib/directus';

export function GetFooterDataMapper(data: GetFooterDataQuery): FooterData {
  console.log('data', data);

  return {
    contact: {
      address: data.footer?.address ?? '',
      email: data.footer?.email ?? '',
      phone: data.footer?.phone ?? '',
      phoneHref: `tel:${data.footer?.phone ?? ''}`,
      whatsapp: data.footer?.whatsapp ?? '',
      whatsappHref: `https://wa.me/${data.footer?.whatsapp ?? ''}`,
    },
    copyright: data.footer?.copyright ?? '',
    logo: {
      description: data.footer?.long_description ?? '',
      tagline: data.footer?.description ?? '',
      href: '/',
      text: data.footer?.title ?? '',
    },
    etbisHref: data.footer?.etbis_url ?? '',
    googleReviewHref: data.footer?.review_url ?? '',
    sections: [
      {
        title: 'Popüler Ürünler',
        links:
          data.footer?.popular_sub_categories?.map((p) => ({
            label: p?.name ?? '',
            href: `/urun/${p?.slug ?? ''}`,
          })) ?? [],
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

    socialLinks: data.social_medias.map((m) => {
      return {
        href: m?.url ?? '',
        logoUrl: getImageUrl(m?.icon),
      };
    }),
  };
}
