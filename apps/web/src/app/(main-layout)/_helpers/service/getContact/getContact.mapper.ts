import type { ContactData } from '@/components/contact/contact.types';
import type { GetContactQuery } from '@/generated/graphql';

export function getContactMapper(data: GetContactQuery): ContactData {
  const lat = data.contact?.latitude ?? '';
  const lng = data.contact?.longitude ?? '';

  return {
    phone: data.contact?.phone ?? '',
    whatsapp: data.contact?.whatsapp ?? '',
    email: data.contact?.email ?? '',
    address: data.contact?.address ?? '',
    mapEmbedUrl:
      lat && lng
        ? `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`
        : '',
    workingHours: [
      {
        days: 'Pazartesi – Cuma',
        hours: data.contact?.work_hours_mid_week ?? '',
      },
      {
        days: 'Cumartesi',
        hours: data.contact?.work_hours_saturday ?? '',
      },
      {
        days: 'Pazar',
        hours: data.contact?.work_hours_sunday ?? '',
      },
    ],
  };
}
