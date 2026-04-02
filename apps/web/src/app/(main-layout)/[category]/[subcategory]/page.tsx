import ProductCategoryList from '@/components/product-category-list/product-category-list';
import { getProductCategoryData } from '@/app/(main-layout)/_helpers/service/getProductCategory/getProductCategory.service';
import { notFound } from 'next/navigation';

export interface ProductCategoryPageProps {
  params: Promise<{
    subcategory: string;
  }>;
}

export default async function ProductCategoryPage({
  params,
}: ProductCategoryPageProps) {
  const { subcategory } = await params;
  const data = await getProductCategoryData(subcategory);

  if (!data) {
    notFound();
  }

  return <ProductCategoryList {...data} />;
}
