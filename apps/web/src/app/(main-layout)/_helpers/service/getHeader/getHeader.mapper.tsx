import type { GetHeaderDataQuery } from '@/generated/graphql';
import type { HeaderData } from '@/components/header/header.types';
import { getImageUrl } from '@/lib/directus';

export function GetHeaderDataMapper(data: GetHeaderDataQuery): HeaderData {
  console.log('data', data);

  return {
    contacts: [
      {
        icon: 'phone',
        label: data.header?.phone_text ?? '',
        value: data.header?.phone ?? '',
        href: `tel:${data.header?.phone ?? ''}`,
      },
      {
        icon: 'whatsapp',
        label: data.header?.whatsapp_text ?? '',
        value: data.header?.whatsapp ?? '',
        href: `https://wa.me/${data.header?.whatsapp ?? ''}`,
      },
    ],
    navItems: [
      {
        label: 'Anasayfa',
        href: '/',
      },
      {
        label: 'Kurumsal',
        href: '/kurumsal',
      },
      {
        label: 'İletişim',
        href: '/iletisim',
      },
      {
        label: 'Banka Hesapları',
        href: '/banka-hesaplari',
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
