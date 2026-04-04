import ProductDetail from '@/components/product-detail/product-detail';
import { getProductDetailData } from '@/app/(main-layout)/_helpers/service/getProductDetail/getProductDetail.service';
import { notFound } from 'next/navigation';

interface ProductDetailPageProps {
  slug: string;
}

export async function ProductDetailPage({ slug }: ProductDetailPageProps) {
  const data = await getProductDetailData(slug);

  if (!data) {
    notFound();
  }

  return <ProductDetail data={data} />;
}
