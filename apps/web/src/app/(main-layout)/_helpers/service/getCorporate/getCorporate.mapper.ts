import type { CorporateData } from '@/components/corporate/corporate.types';
import type { GetCorporateQuery } from '@/generated/graphql';

export function getCorporateMapper(data: GetCorporateQuery): CorporateData {
  return {
    title: data.about_us?.title ?? '',
    content: data.about_us?.content ?? '',
    stats:
      data.about_us?.features?.map((s) => ({
        value: s?.title ?? '',
        label: s?.description ?? '',
      })) ?? [],
    features:
      data.about_us?.specs?.map((f) => ({
        title: f?.title ?? '',
        desc: f?.description ?? '',
      })) ?? [],
  };
}
