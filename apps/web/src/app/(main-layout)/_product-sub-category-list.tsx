import ProductCategoryList from '@/components/product-category-list/product-category-list';
import { getProductCategoryData } from '@/app/(main-layout)/_helpers/service/getProductCategory/getProductCategory.service';
import { notFound } from 'next/navigation';

interface SubCategoryVariationPageProps {
  subcategory: string;
  variation: string;
}

export async function SubCategoryVariationPage({
  subcategory,
  variation,
}: SubCategoryVariationPageProps) {
  const data = await getProductCategoryData(subcategory, variation);

  if (!data) {
    notFound();
  }

  return <ProductCategoryList {...data} />;
}
