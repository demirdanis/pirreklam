import Corporate from '@/components/corporate/corporate';
import type { Metadata } from 'next';
import { getCorporateDataWithCache } from '../_helpers/service/getCorporate/getCorporate.service';

export const metadata: Metadata = {
  title: 'Kurumsal | Pir Reklam',
  description:
    'Pir Reklam hakkında kurumsal bilgiler, misyon, vizyon ve şirket tarihçesi.',
};

export default async function KurumsalPage() {
  const corporateData = await getCorporateDataWithCache();

  return <Corporate data={corporateData} />;
}
