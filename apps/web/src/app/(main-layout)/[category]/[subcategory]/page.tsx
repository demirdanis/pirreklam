import ProductCategoryList from '@/components/product-category-list/product-category-list';
import { getProductCategoryData } from '@/app/(main-layout)/_helpers/service/getProductCategory/getProductCategory.mock';
import { notFound } from 'next/navigation';

interface ProductCategoryPageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

export default async function ProductCategoryPage({
  params,
}: ProductCategoryPageProps) {
  const { category, subcategory } = await params;
  const data = await getProductCategoryData(category, subcategory);

  if (!data) {
    notFound();
  }

  return <ProductCategoryList data={data} />;
}
