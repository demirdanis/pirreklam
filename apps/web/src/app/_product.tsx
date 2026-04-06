import ProductDetail from '@/components/product-detail/product-detail';
import { cookies } from 'next/headers';
import { getProductDetailData } from '@/app/(main-layout)/_helpers/service/getProductDetail/getProductDetail.service';
import { notFound } from 'next/navigation';

interface ProductDetailPageProps {
  slug: string;
  searchParams?: Record<string, string | string[] | undefined>;
}

export async function ProductDetailPage({
  slug,
  searchParams = {},
}: ProductDetailPageProps) {
  const [data, cookieStore] = await Promise.all([
    getProductDetailData(slug),
    cookies(),
  ]);

  if (!data) {
    notFound();
  }

  const isLoggedIn = !!cookieStore.get('auth_token')?.value;

  const str = (v: string | string[] | undefined) =>
    typeof v === 'string' ? v : undefined;

  const initialMain = str(searchParams.main);
  const initialSub = str(searchParams.sub);
  const initialColor = str(searchParams.color);
  const rawQty = str(searchParams.qty);
  const initialQty = rawQty ? parseInt(rawQty, 10) || undefined : undefined;
  const autoOpenOrder = searchParams.onOrder === 'true';

  return (
    <ProductDetail
      data={data}
      isLoggedIn={isLoggedIn}
      initialMain={initialMain}
      initialSub={initialSub}
      initialColor={initialColor}
      initialQty={initialQty}
      autoOpenOrder={autoOpenOrder}
    />
  );
}
