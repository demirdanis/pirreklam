import { ProductCategoryPage } from '../_product-list';
import { ProductDetailPage } from '@/app/_product';
import { SubCategoryVariationPage } from '../_product-sub-category-list';
import { notFound } from 'next/navigation';

export default async function DynamicPage({
  params,
}: {
  params: { slugs: string[] };
}) {
  const { slugs } = await params;

  if (slugs.length === 1) return <ProductDetailPage slug={slugs?.[0] ?? ''} />;
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
