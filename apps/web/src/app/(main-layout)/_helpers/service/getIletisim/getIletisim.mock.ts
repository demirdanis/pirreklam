import type { IletisimData } from '@/components/iletisim/iletisim.types';

export const getIletisimMock = (): IletisimData => ({
  address: 'Aşık Veysel, 5733/8. Sk. No: 5 D:101, 35110 Karabağlar/İzmir',
  phone: '444 10 30',
  whatsapp: '0544 233 80 03',
  email: 'info@pirreklam.com.tr',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3124.6!2d27.1428!3d38.3899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDIzJzIzLjYiTiAyN8KwMDgnMzQuMSJF!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str',
  workingHours: [
    { days: 'Pazartesi – Cuma', hours: '08:30 – 18:30' },
    { days: 'Cumartesi', hours: '09:00 – 14:00' },
    { days: 'Pazar', hours: 'Kapalı' },
  ],
});
