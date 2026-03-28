'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { SectoralProductsData } from './sectoral-products.types';
import { useState } from 'react';

// Background images per sector group id
const GROUP_IMAGES: Record<string, string> = {
  sigortaoto:
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80&auto=format&fit=crop',
  turizm:
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80&auto=format&fit=crop',
  fotograf:
    'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=1200&q=80&auto=format&fit=crop',
  doviz:
    'https://images.unsplash.com/photo-1610375461369-d613b564f4c4?w=1200&q=80&auto=format&fit=crop',
};

interface SectoralProductsProps {
  data: SectoralProductsData;
}

export default function SectoralProducts({ data }: SectoralProductsProps) {
  const [activeId, setActiveId] = useState(data.groups[0]?.id ?? '');

  const activeGroup =
    data.groups.find((g) => g.id === activeId) ?? data.groups[0];

  const activeImage =
    GROUP_IMAGES[activeId] ?? GROUP_IMAGES[data.groups[0]?.id ?? ''] ?? '';

  return (
    <section className="bg-[#f5f6f7] py-4 md:py-8 lg:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#091530] font-alt">
            {data.title}
          </h2>
          <div className="mx-auto lg:mx-0 mt-4 h-1 w-16 rounded-full bg-[#e32231]" />
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-0 rounded-xl overflow-hidden shadow-sm border border-[#e8eaec]">
          {/* Sector Selector */}
          <div className="w-64 shrink-0 bg-white border-r border-[#e8eaec] flex flex-col">
            {data.groups.map((group) => {
              const isActive = group.id === activeId;
              return (
                <button
                  key={group.id}
                  onClick={() => setActiveId(group.id)}
                  className={`group relative text-left py-5 px-6 transition-all duration-200 border-b border-[#f0f0f0] last:border-b-0 ${
                    isActive
                      ? 'bg-[#e32231] text-white'
                      : 'bg-white hover:bg-[#fafafa]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      {group.sectors.map((s, i) => (
                        <span
                          key={i}
                          className={`block text-sm leading-snug ${
                            isActive
                              ? i === 0
                                ? 'text-white font-semibold'
                                : 'text-white/70 text-xs mt-0.5'
                              : i === 0
                                ? 'text-[#091530] font-semibold'
                                : 'text-[#888] text-xs mt-0.5'
                          }`}
                        >
                          {s}
                        </span>
                      ))}
                      <span
                        className={`mt-2 block text-[10px] ${
                          isActive ? 'text-white/60' : 'text-[#bbb]'
                        }`}
                      >
                        {group.products.length} ürün
                      </span>
                    </div>
                    <ArrowRight
                      className={`h-4 w-4 shrink-0 transition-all ${
                        isActive
                          ? 'text-white/80 translate-x-0'
                          : 'text-[#ccc] -translate-x-1 group-hover:translate-x-0'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Products Panel with background image */}
          <div className="relative flex-1 bg-[#f9fafb] min-h-90">
            {/* Background image at 20% opacity */}
            {activeImage && (
              <div className="absolute inset-0 transition-opacity duration-500">
                <Image
                  src={activeImage}
                  alt={activeGroup?.sectors[0] ?? ''}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-white/0" />
              </div>
            )}

            <div className="relative z-10 p-10">
              {/* Sector heading */}
              <div className="mb-6 flex items-end justify-between bg-white/70 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/80 shadow-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#e32231] mb-1 font-bold">
                    Önerilen Ürünler
                  </p>
                  <h3 className="text-xl font-bold text-[#091530]">
                    {activeGroup?.sectors[0]}
                  </h3>
                  {activeGroup && activeGroup.sectors.length > 1 && (
                    <p className="text-xs text-[#555] mt-0.5">
                      {activeGroup.sectors.slice(1).join(' · ')}
                    </p>
                  )}
                </div>
                <Link
                  href={`/sektor/${activeId}`}
                  className="flex items-center gap-1 text-xs text-[#e32231] hover:text-[#c01f2b] font-semibold transition-colors whitespace-nowrap ml-4"
                >
                  Tümünü gör <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Product chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
                {activeGroup?.products.map((product, i) => (
                  <Link
                    key={product.href}
                    href={product.href}
                    style={{ animationDelay: `${i * 30}ms` }}
                    className="group flex items-center gap-2.5 rounded-lg border border-[#e2e5e8] bg-white/90 px-3.5 py-3 text-sm text-[#444] shadow-sm transition-all hover:bg-[#e32231] hover:border-[#e32231] hover:text-white hover:shadow-md animate-fade-in"
                  >
                    <span className="leading-tight">{product.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Sector tabs */}
          <div className="flex gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-5">
            {data.groups.map((group) => {
              const isActive = group.id === activeId;
              return (
                <button
                  key={group.id}
                  onClick={() => setActiveId(group.id)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-all ${
                    isActive
                      ? 'border-[#e32231] bg-[#e32231] text-white font-semibold'
                      : 'border-[#ddd] bg-white text-[#555] hover:border-[#e32231]/50'
                  }`}
                >
                  <span className="whitespace-nowrap">{group.sectors[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 gap-2">
            {activeGroup?.products.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="group flex items-center gap-2 rounded-lg border border-[#e2e5e8] bg-white px-3 py-3 text-sm text-[#444] shadow-sm transition-all hover:bg-[#e32231] hover:border-[#e32231] hover:text-white"
              >
                <span className="leading-tight">{product.label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-5 flex justify-center">
            <Link
              href={`/sektor/${activeId}`}
              className="flex items-center gap-1.5 text-sm font-semibold text-[#e32231] hover:text-[#c01f2b] transition-colors"
            >
              Tümünü Gör <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
