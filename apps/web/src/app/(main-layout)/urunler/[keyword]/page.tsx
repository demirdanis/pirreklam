import { ArrowRight, SearchX } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { getSearchProducts } from '@/app/(main-layout)/_helpers/service/getSearchProducts/getSearchProducts.service';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ keyword: string }>;
}) {
  const { keyword } = await params;
  const decoded = decodeURIComponent(keyword);
  return {
    title: `"${decoded}" için arama sonuçları | Pir Reklam`,
  };
}

export default async function SearchResultsPage({
  params,
}: {
  params: Promise<{ keyword: string }>;
}) {
  const { keyword } = await params;
  const decoded = decodeURIComponent(keyword);
  const results = await getSearchProducts(decoded);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-14">
      {/* Heading */}
      <div className="mb-6 md:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#091530] font-alt">
          &ldquo;{decoded}&rdquo; için arama sonuçları
        </h1>
        <div className="mt-3 h-1 w-16 rounded-full bg-[#cc0636]" />
        {results.length > 0 && (
          <p className="mt-3 text-sm text-[#888]">
            {results.length} ürün bulundu
          </p>
        )}
      </div>

      {/* No results */}
      {results.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <SearchX className="h-16 w-16 text-[#091530]/20 mb-4" />
          <p className="text-lg font-semibold text-[#091530]/50">
            Sonuç bulunamadı
          </p>
          <p className="mt-2 text-sm text-[#091530]/35">
            Farklı bir arama terimi deneyin.
          </p>
        </div>
      )}

      {/* Grid */}
      {results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/${product.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-xl bg-white   transition-all duration-300 hover:border-[#cc0636] hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-t-xl bg-white border-t border-x border-[#e2e5e8]">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover p-1 transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#cc0636] transition-all duration-300 group-hover:w-full" />
              </div>
              <div className="flex items-center justify-between h-14 px-3 bg-[#cc0636] rounded-b-xl border-b border-x border-[#cc0636]">
                <p className="text-[12px] md:text-[13px] font-semibold text-white tracking-wide leading-snug line-clamp-2">
                  {product.title}
                </p>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white/70 ml-2">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
