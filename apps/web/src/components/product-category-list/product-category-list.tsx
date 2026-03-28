import { ArrowRight, ChevronRight, Tag } from 'lucide-react';
import type {
  ProductCategoryData,
  ProductItem,
  SubCategory,
} from '@/app/(main-layout)/_helpers/service/getProductCategory/getProductCategory.mock';

import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: ProductItem;
  categorySlug: string;
  subcategorySlug: string;
}

function ProductCard({
  product,
  categorySlug,
  subcategorySlug,
}: ProductCardProps) {
  const href = `/${categorySlug}/${subcategorySlug}/${product.slug}`;
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-surface-dark border border-white/8 transition-all duration-300 hover:border-[#e32231]/50 hover:shadow-xl hover:shadow-[#e32231]/10 hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative">
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-white">
          <Image
            src={product.imageUrl}
            alt={product.imageAlt}
            fill
            className="object-cover p-2 transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#e32231] transition-all duration-300 group-hover:w-full" />
        </div>
        {/* Product code badge */}
        {product.code && (
          <span className="absolute top-2 left-2 rounded bg-[#090a0a]/80 px-1.5 py-0.5 text-[10px] font-bold text-[#e32231] tracking-wide border border-[#e32231]/30">
            {product.code}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 px-3 py-3 bg-foreground flex-1">
        <p className="text-xs font-semibold text-white/80 uppercase tracking-wide leading-snug group-hover:text-white transition-colors line-clamp-2">
          {product.title}
        </p>

        {product.printOptions && product.printOptions.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.printOptions.slice(0, 2).map((opt) => (
              <span
                key={opt}
                className="inline-flex items-center gap-0.5 rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-white/40"
              >
                <Tag className="h-2 w-2" />
                {opt}
              </span>
            ))}
            {product.printOptions.length > 2 && (
              <span className="inline-flex items-center rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-white/40">
                +{product.printOptions.length - 2}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="text-[10px] text-[#e32231] font-semibold uppercase tracking-wider">
            Fiyat için tıklayın
          </span>
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/30 transition-all group-hover:bg-[#e32231] group-hover:text-white">
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

interface SubCategorySectionProps {
  subcategory: SubCategory;
  categorySlug: string;
  subcategorySlug: string;
}

function SubCategorySection({
  subcategory,
  categorySlug,
  subcategorySlug,
}: SubCategorySectionProps) {
  return (
    <section className="mb-12">
      {/* Subcategory heading */}
      <div className="mb-5 flex items-center gap-3">
        <div className="h-5 w-1 rounded-full bg-[#e32231]" />
        <h2 className="text-lg sm:text-xl font-bold text-white font-alt">
          {subcategory.title}
        </h2>
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-xs text-white/30">
          {subcategory.products.length} ürün
        </span>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {subcategory.products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            categorySlug={categorySlug}
            subcategorySlug={subcategorySlug}
          />
        ))}
      </div>
    </section>
  );
}

interface ProductCategoryListProps {
  data: ProductCategoryData;
}

export default function ProductCategoryList({
  data,
}: ProductCategoryListProps) {
  const totalProducts = data.subcategories.reduce(
    (acc, sc) => acc + sc.products.length,
    0
  );

  return (
    <section className="bg-[#090a0a] min-h-screen">
      {/* Sticky subcategory nav */}
      <div className="sticky top-25.5 z-40 bg-[#0d0e0e]/95 backdrop-blur-md border-b border-white/6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {data.subcategories.map((sc) => (
              <a
                key={sc.id}
                href={`#${sc.slug}`}
                className="shrink-0 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:border-[#e32231]/50 hover:text-white whitespace-nowrap"
              >
                {sc.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-1.5 text-xs text-white/40">
          {data.breadcrumb.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3 w-3 text-white/20" />}
              {i === data.breadcrumb.length - 1 ? (
                <span className="text-white/70">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:text-white transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>

        {/* Page Header */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#e32231] mb-1">
            {data.categoryTitle}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-alt">
            {data.subcategoryTitle}
          </h1>
          <p className="mt-1.5 text-sm text-white/40">
            {data.subcategories.length} alt kategori · {totalProducts} ürün
          </p>
        </div>

        {/* Subcategories with products */}
        {data.subcategories.map((subcategory) => (
          <div
            key={subcategory.id}
            id={subcategory.slug}
            className="scroll-mt-40"
          >
            <SubCategorySection
              subcategory={subcategory}
              categorySlug={data.categorySlug}
              subcategorySlug={data.subcategorySlug}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
