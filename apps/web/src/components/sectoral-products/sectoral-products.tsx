'use client';

import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import type { SectoralProductsData } from './sectoral-products.types';

interface SectoralProductsProps {
  data: SectoralProductsData;
}

export default function SectoralProducts({ data }: SectoralProductsProps) {
  console.log('data', data);
  const [activeId, setActiveId] = useState(data.groups[0]?.id ?? '');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const tabScrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);

  const activeGroup =
    data.groups.find((g) => g.id === activeId) ?? data.groups[0];

  const activeImage =
    data.groups.find((g) => g.id === activeId)?.imageUrl ??
    data.groups[0]?.imageUrl ??
    '';

  const checkScroll = () => {
    if (tabScrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        tabScrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useLayoutEffect(() => {
    checkScroll();
    const container = tabScrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = tabScrollContainerRef.current;
    if (container) {
      const scrollAmount = 150;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartScrollLeftRef.current =
      tabScrollContainerRef.current?.scrollLeft ?? 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !tabScrollContainerRef.current) return;
    const diff = e.clientX - dragStartXRef.current;
    tabScrollContainerRef.current.scrollLeft =
      dragStartScrollLeftRef.current - diff;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section className="bg-white py-4 md:py-8 lg:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-3 lg:mb-10 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#091530] font-alt">
            {data.title}
          </h2>
          <div className="mx-auto lg:mx-0 mt-4 h-1 w-16 rounded-full bg-[#730912]" />
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-0 rounded-xl overflow-hidden  border border-[#e8eaec]">
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
                      ? 'bg-[#730912] text-white'
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
                                : 'text-white/85 text-xs mt-0.5'
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
                          isActive ? 'text-white/85' : 'text-[#bbb]'
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
              <div className="mb-6 flex items-end justify-between bg-white/70 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/80 ">
                <div>
                  <p className="text-[10px]  tracking-[0.18em] text-[#730912] mb-1 font-bold">
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
              </div>

              {/* Product chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
                {activeGroup?.products.map((product, i) => (
                  <Link
                    key={product.href}
                    href={product.href}
                    style={{ animationDelay: `${i * 30}ms` }}
                    className="group flex items-center gap-2.5 rounded-lg border border-[#e2e5e8] bg-white/90 px-3.5 py-3 text-sm text-[#444]  transition-all hover:bg-[#730912] hover:border-[#730912] hover:text-white hover:shadow-md animate-fade-in"
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
          {/* Sector tabs with chevrons */}
          <div className="relative mb-5 border-b border-[#e8eaec]">
            {canScrollLeft && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-[-24px] top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 hover:bg-[#f0f0f0] transition-colors rounded"
              >
                <ChevronLeft className="h-5 w-5 text-[#555]" />
              </button>
            )}

            {canScrollRight && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-[-24px] top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 hover:bg-[#f0f0f0] transition-colors rounded"
              >
                <ChevronRight className="h-5 w-5 text-[#555]" />
              </button>
            )}

            <div
              ref={tabScrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="flex gap-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
            >
              {data.groups.map((group) => {
                const isActive = group.id === activeId;
                return (
                  <button
                    key={group.id}
                    onClick={() => setActiveId(group.id)}
                    className={`relative shrink-0 px-4 py-3 text-sm whitespace-nowrap transition-all font-medium ${
                      isActive ? 'text-[#730912]' : 'text-[#888]'
                    }`}
                  >
                    {group.sectors[0]}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#730912]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 gap-2">
            {activeGroup?.products.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="group flex items-center gap-2 rounded-lg border border-[#e2e5e8] bg-white px-3 py-3 text-sm text-[#444]  transition-all hover:bg-[#730912] hover:border-[#730912] hover:text-white"
              >
                <span className="leading-tight">{product.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
