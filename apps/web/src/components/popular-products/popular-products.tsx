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
      className="group relative flex flex-col overflow-hidden rounded-xl bg-white border border-[#e2e5e8]  transition-all duration-300 hover:border-[#cc0636] hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative p-0 pb-0">
        <div className="relative aspect-4/3 overflow-hidden rounded-t-xl bg-white">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover p-1 transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
          {/* Red accent line on hover */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#cc0636] transition-all duration-300 group-hover:w-full" />
        </div>
      </div>
      {/* Title */}
      <div className="flex items-center justify-between px-2 md:px-4 py-1 md:py-3.5 bg-[#cc0636]">
        <p className="text-[12px] md:text-[14px] font-semibold text-white/85 tracking-wide leading-snug  transition-colors">
          {title}
        </p>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full  text-[#bbb] transition-all group-hover:bg-[#cc0636] group-hover:text-white">
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
    <section className="bg-[#f5f6f7] py-4 md:py-8 lg:py-14">
      <div className=" mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#091530] font-alt">
            {data.title}
          </h2>
          <div className="mx-auto lg:mx-0 mt-4 h-1 w-16 rounded-full bg-[#cc0636]" />
          <p className="mt-4 text-sm text-[#888]">{data.subtitle}</p>
        </div>

        {/* Mobile: show all link */}

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
      </div>
    </section>
  );
}
