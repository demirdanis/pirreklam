import { ProductCategoryPage } from '../_product-list';
import { ProductDetailPage } from '@/app/_product';
import { SubCategoryVariationPage } from '../_product-sub-category-list';
import { notFound } from 'next/navigation';

export default async function DynamicPage({
  params,
  searchParams,
}: {
  params: { slugs: string[] };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { slugs } = await params;

  if (slugs.length === 1)
    return (
      <ProductDetailPage
        slug={slugs?.[0] ?? ''}
        searchParams={await searchParams}
      />
    );
  else if (slugs.length === 2)
    return <ProductCategoryPage slug={slugs?.[1] ?? ''} />;
  else if (slugs.length === 3)
    return (
      <SubCategoryVariationPage
        subcategory={slugs?.[1] ?? ''}
        variation={slugs?.[2] ?? ''}
      />
    );
  else return notFound();
}
