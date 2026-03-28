import { notFound } from 'next/navigation';
import ProductDetail from '@/components/product-detail/product-detail';
import { getProductDetailData } from '@/app/(main-layout)/_helpers/service/getProductDetail/getProductDetail.mock';

interface ProductDetailPageProps {
  params: Promise<{
    category: string;
    subcategory: string;
    product: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { category, subcategory, product } = await params;
  const data = await getProductDetailData(category, subcategory, product);

  if (!data) {
    notFound();
  }

  return <ProductDetail data={data} />;
}

