import type { FeaturedProductsData } from './featured-products.types';
import Link from 'next/link';

interface FeaturedProductsProps {
  data: FeaturedProductsData;
}

export default function FeaturedProducts({ data }: FeaturedProductsProps) {
  return (
    <div className="bg-white border-b border-[#2a2d2d]">
      <div className="bg-header-menu-reversed mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none [scrollbar-width:none]">
          {data.products.map((product) => (
            <Link
              key={product.id}
              href={product.href}
              className="shrink-0 inline-flex items-center rounded-full border border-surface-secondary-light-b bg-surface-secondary-light-a px-4 py-1.5 text-xs font-medium text-[#090a0a] transition-all hover:border-[#e32231]/30 hover:bg-[#e32231] hover:text-white"
            >
              {product.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
