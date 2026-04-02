import Contact from '@/components/contact/contact';
import type { Metadata } from 'next';
import { getContactDataWithCache } from '../_helpers/service/getContact/getContact.service';

export const metadata: Metadata = {
  title: 'İletişim | Pir Reklam',
  description:
    'Pir Reklam iletişim bilgileri, adres, telefon, e-posta ve çalışma saatleri.',
};

export default async function IletisimPage() {
  const contactData = await getContactDataWithCache();

  return <Contact data={contactData} />;
}
