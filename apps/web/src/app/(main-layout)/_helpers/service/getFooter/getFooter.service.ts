import type {
  GetFooterDataQuery,
  GetFooterDataQueryVariables,
} from '@/generated/graphql';

import type { FooterData } from '@/components/footer/footer.types';
import { GetFooterDataDocument } from '@/generated/graphql';
import { GetFooterDataMapper } from './getFooter.mapper';
import { directusGraphqlQuery } from '@/lib/graphql-client';
import { unstable_cache } from 'next/cache';

const EMPTY_FOOTER: FooterData = {
  logo: { text: '', tagline: '', description: '', href: '/' },
  contact: {
    address: '',
    email: '',
    phone: '',
    phoneHref: '',
    whatsapp: '',
    whatsappHref: '',
  },
  copyright: '',
  etbisHref: '',
  googleReviewHref: '',
  sections: [],
  socialLinks: [],
};

export async function getFooterDataWithCache(): Promise<FooterData> {
  if (!process.env.DIRECTUS_URL) {
    return EMPTY_FOOTER;
  }
  if (process.env.DISABLE_CACHE) {
    return getFooterData();
  }
  return unstable_cache(
    async () => getFooterData(),
    ['footer-data', 'get-footer-data'],
    {
      revalidate: 60 * 60 * 24,
    }
  )();
}

const getFooterData = async (): Promise<FooterData> => {
  const data = await directusGraphqlQuery<
    GetFooterDataQuery,
    GetFooterDataQueryVariables
  >(GetFooterDataDocument, {});

  const mappedData = GetFooterDataMapper(data);

  return mappedData;
};
