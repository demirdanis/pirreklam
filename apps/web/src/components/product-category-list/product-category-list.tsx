import { ArrowRight, ChevronRight, Tag } from 'lucide-react';
import type {
  ProductCategoryListData,
  SubCategoryVariation,
  SubCategoryVariationProductItem,
} from './product-category-list.types';

import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: SubCategoryVariationProductItem;
  subcategorySlug: string;
}

function ProductCard({ product, subcategorySlug }: ProductCardProps) {
  const href = `/${subcategorySlug}/${product.slug}`;
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-white border border-[#e2e5e8] shadow-sm transition-all duration-300 hover:border-[#730912] hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative">
        <div className="relative aspect-square overflow-hidden rounded-t-xl bg-white">
          <Image
            src={product.imageUrl}
            alt={product.imageAlt}
            fill
            className="object-cover p-2 transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#730912] transition-all duration-300 group-hover:w-full" />
        </div>
      </div>

      {/* Info */}
      <div className="flex bg-[#730912] flex-col gap-2 px-3 py-3 flex-1">
        <p className="text-xs font-semibold text-[#ffffffd3] tracking-wide leading-snug  transition-colors line-clamp-2">
          {product.title}
        </p>

        {product.printOptions && product.printOptions.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.printOptions.slice(0, 2).map((opt) => (
              <span
                key={opt}
                className="inline-flex items-center gap-0.5 rounded  px-1 py-0.5 text-[11px] text-[#ffffffd3]"
              >
                <Tag className="h-4 w-4" />
                {opt}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

interface SubCategorySectionProps {
  subcategoryVariation: SubCategoryVariation;
  subcategorySlug: string;
}

function SubCategorySection({
  subcategoryVariation,
  subcategorySlug,
}: SubCategorySectionProps) {
  return (
    <section className="mb-12">
      {/* Subcategory heading */}
      <div className="mb-5 flex items-center gap-3">
        <div className="h-5 w-1 rounded-full bg-[#730912]" />
        <h2 className="text-lg sm:text-xl font-bold text-[#091530] font-alt">
          {subcategoryVariation.title}
        </h2>
        <div className="flex-1 h-px bg-[#e8eaec]" />
        <span className="text-xs text-[#bbb]">
          {subcategoryVariation.products.length} ürün
        </span>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {subcategoryVariation.products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            subcategorySlug={subcategorySlug}
          />
        ))}
      </div>
    </section>
  );
}

export default function ProductCategoryList({
  subcategorySlug,
  categoryTitle,
  subcategoryTitle,
  subcategories,
}: ProductCategoryListData) {
  const totalProducts = subcategories.reduce(
    (acc, sc) => acc + sc.products.length,
    0
  );

  return (
    <section className="bg-[#f5f6f7] min-h-screen">
      <div className="sticky top-[191px] lg:top-[307px] z-40 bg-[#030e26] backdrop-blur-md border-b border-black">
        <div className="sticky left-0 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {subcategories.map((sc) => (
              <a
                key={sc.id}
                href={`#${sc.id}`}
                className="shrink-0 rounded-lg border border-bg-white/10 px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:border-white/90 hover:text-white/90 whitespace-nowrap"
              >
                {sc.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#730912] mb-1">
            {categoryTitle}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#091530] font-alt">
            {subcategoryTitle}
          </h1>
          <div className="mt-3 h-1 w-16 rounded-full bg-[#730912]" />
          <p className="mt-3 text-sm text-[#888]">
            {subcategories.length} alt kategori · {totalProducts} ürün
          </p>
        </div>

        {/* Subcategories with products */}
        {subcategories.map((subcategoryVariation) => (
          <div
            key={subcategoryVariation.id}
            id={subcategoryVariation.id}
            className="scroll-mt-[260px] lg:scroll-mt-[380px]"
          >
            <SubCategorySection
              subcategoryVariation={subcategoryVariation}
              subcategorySlug={subcategorySlug}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
