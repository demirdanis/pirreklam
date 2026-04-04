import ProductCategoryList from '@/components/product-category-list/product-category-list';
import { getProductCategoryData } from '@/app/(main-layout)/_helpers/service/getProductCategory/getProductCategory.service';
import { notFound } from 'next/navigation';

export interface ProductCategoryPageProps {
  slug: string;
}

export async function ProductCategoryPage({ slug }: ProductCategoryPageProps) {
  const data = await getProductCategoryData(slug);

  if (!data) {
    notFound();
  }

  return <ProductCategoryList {...data} />;
}
