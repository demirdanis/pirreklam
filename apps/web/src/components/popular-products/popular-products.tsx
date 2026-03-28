import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { PopularProductsData } from './popular-products.types';

interface PopularProductCardProps {
  title: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
}

function PopularProductCard({
  title,
  href,
  imageUrl,
  imageAlt,
}: PopularProductCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-surface-dark border border-white/8 transition-all duration-300 hover:border-[#e32231]/50 hover:shadow-xl hover:shadow-[#e32231]/10 hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative p-0 pb-0">
        <div className="relative aspect-4/3 overflow-hidden rounded-t-lg bg-white">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover p-1 transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
          {/* Red accent line on hover */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#e32231] transition-all duration-300 group-hover:w-full" />
        </div>
      </div>
      {/* Title */}
      <div className="flex items-center justify-between px-4 py-3.5 bg-foreground">
        <p className="text-sm font-semibold text-white/80 uppercase tracking-wide leading-snug group-hover:text-white transition-colors">
          {title}
        </p>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/30 transition-all group-hover:bg-[#e32231] group-hover:text-white">
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

interface PopularProductsProps {
  data: PopularProductsData;
}

export default function PopularProducts({ data }: PopularProductsProps) {
  return (
    <section className="bg-[#090a0a] py-14">
      <div className=" mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#e32231] mb-1">
              En Çok Tercih Edilenler
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-alt">
              {data.title}
            </h2>
            <p className="mt-1.5 text-sm text-white/40">{data.subtitle}</p>
          </div>
          <Link
            href="/"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[#e32231] hover:text-[#f74e56] transition-colors"
          >
            Tümünü Gör
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data.products.map((product) => (
            <PopularProductCard
              key={product.id}
              title={product.title}
              href={product.href}
              imageUrl={product.imageUrl}
              imageAlt={product.imageAlt}
            />
          ))}
        </div>

        {/* Mobile: show all link */}
        <div className="mt-6 flex justify-center sm:hidden">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-lg border border-[#e32231]/30 px-5 py-2.5 text-sm font-semibold text-[#e32231] hover:bg-[#e32231] hover:text-white transition-colors"
          >
            Tüm Ürünleri Gör
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
