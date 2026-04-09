import type { Metadata } from 'next';
import Sss from '@/components/sss/sss';
import { getSssDataWithCache } from '../_helpers/service/getSss/getSss.service';

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular | Pir Reklam',
  description: 'Pir Reklam hakkında sıkça sorulan sorular ve cevapları.',
};

export default async function SssPage() {
  const items = await getSssDataWithCache();

  return <Sss items={items} />;
}
