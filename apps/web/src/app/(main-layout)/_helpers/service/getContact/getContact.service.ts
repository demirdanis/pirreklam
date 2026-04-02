import type {
  GetContactQuery,
  GetContactQueryVariables,
} from '@/generated/graphql';

import type { ContactData } from '@/components/contact/contact.types';
import { GetContactDocument } from '@/generated/graphql';
import { directusGraphqlQuery } from '@/lib/graphql-client';
import { getContactMapper } from './getContact.mapper';
import { unstable_cache } from 'next/cache';

const EMPTY_CONTACT: ContactData = {
  phone: '',
  whatsapp: '',
  email: '',
  address: '',
  mapEmbedUrl: '',
  workingHours: [],
};

export async function getContactDataWithCache(): Promise<ContactData> {
  if (!process.env.DIRECTUS_URL) {
    return EMPTY_CONTACT;
  }
  if (process.env.DISABLE_CACHE) {
    return getContactData();
  }
  return unstable_cache(
    async () => getContactData(),
    ['contact-data', 'get-contact-data'],
    {
      revalidate: 60 * 60 * 24,
    }
  )();
}

const getContactData = async (): Promise<ContactData> => {
  const data = await directusGraphqlQuery<
    GetContactQuery,
    GetContactQueryVariables
  >(GetContactDocument, {});

  return getContactMapper(data);
};
