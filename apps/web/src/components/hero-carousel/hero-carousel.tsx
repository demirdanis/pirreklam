'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import type { HeroCarouselData } from './hero-carousel.types';
import Image from 'next/image';
import Link from 'next/link';

interface HeroCarouselProps {
  data: HeroCarouselData;
}

export default function HeroCarousel({ data }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const { slides } = data;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#091530]"
      style={{ height: 'clamp(240px, 50vw, 420px)' }}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden={i !== current}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={slide.imageUrl}
            alt={slide.imageAlt}
            fill
            className="object-cover"
            priority={i === 0}
            unoptimized
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="max-w-xl">
                <span className="inline-block rounded-full border border-[#e32231]/40 bg-[#e32231]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#f74e56] mb-4">
                  {slide.badge ?? "Pir Reklam'da"}
                </span>
                <h2 className="text-1xl sm:text-3xl lg:text-5xl font-bold text-white leading-tight font-alt">
                  {slide.title}
                </h2>
                <p className="mt-4 text-xs sm:text-base text-white/70 max-w-sm leading-relaxed">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.ctaHref}
                  className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#e32231] px-3 py-1 sm:px-7 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-[#f74e56] transition-colors"
                >
                  {slide.ctaLabel}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Prev/Next buttons */}
      <button
        onClick={prev}
        aria-label="Önceki slayt"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-[#e32231]/80 transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        aria-label="Sonraki slayt"
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-[#e32231]/80 transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slayt ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-7 h-2 bg-[#e32231]'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/10">
        <div
          key={current}
          className="h-full bg-[#e32231] origin-left"
          style={{ animation: 'growWidth 5.5s linear forwards' }}
        />
      </div>
    </section>
  );
}
