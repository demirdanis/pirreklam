'use client';

import { ChevronDown, Search, SlidersHorizontal, Tag, X } from 'lucide-react';
import type {
  FilterOption,
  ProductCategoryListData,
  SubCategoryVariation,
  SubCategoryVariationProductItem,
} from './product-category-list.types';
import { useEffect, useMemo, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

// ─────────────────────────────────────────────────────────────────────────────
// SEARCHABLE SELECT
// ─────────────────────────────────────────────────────────────────────────────

interface SearchableSelectProps {
  placeholder: string;
  options: FilterOption[];
  value: string | null;
  onChange: (id: string | null) => void;
  disabled?: boolean;
}

function SearchableSelect({
  placeholder,
  options,
  value,
  onChange,
  disabled,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((o) => o.id === value) ?? null;

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  return (
    <div ref={containerRef} className="relative w-full min-w-0">
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          setOpen((p) => !p);
          setQuery('');
        }}
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-3 py-2 text-xs transition-all',
          disabled
            ? 'cursor-not-allowed opacity-40 border-[#e2e5e8]'
            : open
              ? 'border-[#730912] ring-2 ring-[#730912]/15'
              : 'border-[#e2e5e8] hover:border-[#730912]/50',
          value ? 'text-[#091530]' : 'text-[#091530]/40'
        )}
      >
        <span className="truncate font-medium">
          {selectedOption ? (
            <span className="flex items-center gap-1.5">
              {selectedOption.hex && (
                <span
                  className="inline-block h-3 w-3 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: selectedOption.hex }}
                />
              )}
              {selectedOption.label}
            </span>
          ) : (
            placeholder
          )}
        </span>
        <span className="flex items-center gap-0.5 shrink-0">
          {value && (
            <span
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
                setOpen(false);
              }}
              className="flex h-4 w-4 items-center justify-center rounded-full hover:bg-[#730912]/10 text-[#730912] transition-colors"
            >
              <X className="h-2.5 w-2.5" />
            </span>
          )}
          <ChevronDown
            className={cn(
              'h-3.5 w-3.5 text-[#091530]/40 transition-transform',
              open && 'rotate-180'
            )}
          />
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full min-w-45 rounded-lg border border-[#e2e5e8] bg-white shadow-xl shadow-black/8 overflow-hidden">
          <div className="flex items-center gap-2 border-b border-[#e2e5e8] px-3 py-2">
            <Search className="h-3.5 w-3.5 text-[#091530]/30 shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ara..."
              className="w-full bg-transparent text-xs text-[#091530] placeholder-[#091530]/30 outline-none"
            />
          </div>
          <div className="max-h-52 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="px-3 py-4 text-center text-xs text-[#091530]/35">
                Sonuç bulunamadı
              </p>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    onChange(opt.id);
                    setOpen(false);
                    setQuery('');
                  }}
                  className={cn(
                    'flex w-full items-center gap-2 px-3 py-2.5 text-left text-xs transition-colors hover:bg-[#f5f6f7]',
                    value === opt.id
                      ? 'bg-[#730912]/5 font-semibold text-[#730912]'
                      : 'text-[#091530]'
                  )}
                >
                  {opt.hex && (
                    <span
                      className="inline-block h-3.5 w-3.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: opt.hex }}
                    />
                  )}
                  {opt.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FILTER BAR
// ─────────────────────────────────────────────────────────────────────────────

interface ActiveFilters {
  mainOptionId: string | null;
  secondaryOptionId: string | null;
  colorId: string | null;
}

function FilterBar({
  allProducts,
  filters,
  onChange,
}: {
  allProducts: SubCategoryVariationProductItem[];
  filters: ActiveFilters;
  onChange: (f: ActiveFilters) => void;
}) {
  const { mainOptions, secondaryOptions, colorOptions } = useMemo(() => {
    function compatibleWith(exceptKey: keyof ActiveFilters) {
      return allProducts.filter((p) => {
        if (
          exceptKey !== 'mainOptionId' &&
          filters.mainOptionId &&
          !p.mainOptions?.some((o) => o.id === filters.mainOptionId)
        )
          return false;
        if (
          exceptKey !== 'secondaryOptionId' &&
          filters.secondaryOptionId &&
          !p.secondaryOptions?.some((o) => o.id === filters.secondaryOptionId)
        )
          return false;
        if (
          exceptKey !== 'colorId' &&
          filters.colorId &&
          !p.colors?.some((c) => c.id === filters.colorId)
        )
          return false;
        return true;
      });
    }

    const mainMap = new Map<string, FilterOption>();
    compatibleWith('mainOptionId').forEach((p) => {
      p.mainOptions?.forEach((o) => {
        if (!mainMap.has(o.id)) mainMap.set(o.id, o);
      });
    });

    const secMap = new Map<string, FilterOption>();
    compatibleWith('secondaryOptionId').forEach((p) => {
      p.secondaryOptions?.forEach((o) => {
        if (!secMap.has(o.id)) secMap.set(o.id, o);
      });
    });

    const colorMap = new Map<string, FilterOption>();
    compatibleWith('colorId').forEach((p) => {
      p.colors?.forEach((c) => {
        if (!colorMap.has(c.id)) colorMap.set(c.id, c);
      });
    });

    return {
      mainOptions: Array.from(mainMap.values()),
      secondaryOptions: Array.from(secMap.values()),
      colorOptions: Array.from(colorMap.values()),
    };
  }, [allProducts, filters]);

  const hasAny =
    filters.mainOptionId || filters.secondaryOptionId || filters.colorId;
  const hasMain = mainOptions.length > 0;
  const hasSecondary = secondaryOptions.length > 0;
  const hasColor = colorOptions.length > 0;

  if (!hasMain && !hasSecondary && !hasColor) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {hasMain && (
        <div className="">
          <SearchableSelect
            placeholder="Baskı Seçeneği"
            options={mainOptions}
            value={filters.mainOptionId}
            onChange={(v) => onChange({ ...filters, mainOptionId: v })}
          />
        </div>
      )}

      {hasSecondary && (
        <div className="">
          <SearchableSelect
            placeholder="Alt Seçenek"
            options={secondaryOptions}
            value={filters.secondaryOptionId}
            onChange={(v) => onChange({ ...filters, secondaryOptionId: v })}
          />
        </div>
      )}

      {hasColor && (
        <div className="">
          <SearchableSelect
            placeholder="Renk"
            options={colorOptions}
            value={filters.colorId}
            onChange={(v) => onChange({ ...filters, colorId: v })}
          />
        </div>
      )}

      {hasAny && (
        <button
          type="button"
          onClick={() =>
            onChange({
              mainOptionId: null,
              secondaryOptionId: null,
              colorId: null,
            })
          }
          className="flex items-center gap-1 rounded-lg border border-[#730912]/30 px-3 py-2 text-xs font-semibold text-[#730912] hover:bg-[#730912]/5 transition-colors shrink-0"
        >
          <X className="h-3 w-3" />
          Temizle
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────────────────────────────────────

function ProductCard({
  product,
}: {
  product: SubCategoryVariationProductItem;
}) {
  return (
    <Link
      href={`/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-white border border-[#e2e5e8]  transition-all duration-300 hover:border-[#730912] hover:shadow-md hover:-translate-y-0.5"
    >
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
      <div className="flex bg-[#730912] flex-col gap-2 px-3 py-3 flex-1">
        <p className="text-xs font-semibold text-[#ffffffd3] tracking-wide leading-snug transition-colors line-clamp-2">
          {product.title}
        </p>
        {product.printOptions && product.printOptions.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.printOptions.slice(0, 2).map((opt) => (
              <span
                key={opt}
                className="inline-flex items-center gap-0.5 rounded px-1 py-0.5 text-[11px] text-[#ffffffd3]"
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

// ─────────────────────────────────────────────────────────────────────────────
// SUBCATEGORY SECTION
// ─────────────────────────────────────────────────────────────────────────────

function SubCategorySection({
  subcategoryVariation,
  filteredProductIds,
}: {
  subcategoryVariation: SubCategoryVariation;
  filteredProductIds: Set<string> | null;
}) {
  const pathname = usePathname();
  const products = filteredProductIds
    ? subcategoryVariation.products.filter((p) => filteredProductIds.has(p.id))
    : subcategoryVariation.products;

  if (products.length === 0) return null;

  return (
    <section className="mb-12">
      {!pathname.endsWith(subcategoryVariation.slug) ? (
        <div className="mb-5 flex items-center gap-3">
          <div className="h-5 w-1 rounded-full bg-[#730912]" />
          <a
            href={`${pathname}/${subcategoryVariation.slug}`}
            className="text-xs font-bold tracking-[0.15em] text-[#730912]"
          >
            <h2 className="text-lg sm:text-xl font-bold text-[#091530] font-alt">
              {subcategoryVariation.title}
            </h2>
          </a>
          <div className="flex-1 h-px bg-[#e8eaec]" />
          <span className="text-xs text-[#bbb]">{products.length} ürün</span>
        </div>
      ) : null}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function ProductCategoryList({
  categoryTitle,
  subcategoryTitle,
  subcategories,
}: ProductCategoryListData) {
  const pathname = usePathname();

  const [filters, setFilters] = useState<ActiveFilters>({
    mainOptionId: null,
    secondaryOptionId: null,
    colorId: null,
  });

  const allProducts = useMemo<SubCategoryVariationProductItem[]>(
    () => subcategories.flatMap((sc) => sc.products),
    [subcategories]
  );

  const totalProducts = allProducts.length;

  const filteredIds = useMemo<Set<string> | null>(() => {
    const hasFilter =
      filters.mainOptionId || filters.secondaryOptionId || filters.colorId;
    if (!hasFilter) return null;
    const ids = new Set<string>();
    allProducts.forEach((p) => {
      if (
        filters.mainOptionId &&
        !p.mainOptions?.some((o) => o.id === filters.mainOptionId)
      )
        return;
      if (
        filters.secondaryOptionId &&
        !p.secondaryOptions?.some((o) => o.id === filters.secondaryOptionId)
      )
        return;
      if (filters.colorId && !p.colors?.some((c) => c.id === filters.colorId))
        return;
      ids.add(p.id);
    });
    return ids;
  }, [allProducts, filters]);

  const filteredCount = filteredIds ? filteredIds.size : totalProducts;

  return (
    <section className="bg-[#f5f6f7] min-h-screen">
      {!pathname.endsWith(subcategories?.[0]?.slug ?? '') ? (
        <div className="sticky top-47.75 lg:top-76.75 z-40 bg-[#030e26] backdrop-blur-md border-b border-black">
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
      ) : null}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {!pathname.endsWith(subcategories?.[0]?.slug ?? '') ? (
          <div className="mb-6">
            <p className="text-xs font-bold  tracking-[0.15em] text-[#730912] mb-1">
              {categoryTitle}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#091530] font-alt">
              {subcategoryTitle}
            </h1>
            <div className="mt-3 h-1 w-16 rounded-full bg-[#730912]" />
            <p className="mt-3 text-sm text-[#888]">
              {subcategories.length} alt kategori &middot;{' '}
              {filteredCount !== totalProducts ? `${filteredCount} / ` : ''}
              {totalProducts} ürün
            </p>
          </div>
        ) : (
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#091530] font-alt">
              {subcategories?.[0]?.title}
            </h1>
            <div className="mt-3 h-1 w-16 rounded-full bg-[#730912]" />
            <p className="mt-3 text-sm text-[#888]">
              {filteredCount !== totalProducts ? `${filteredCount} / ` : ''}
              {totalProducts} ürün
            </p>
          </div>
        )}

        <FilterBar
          allProducts={allProducts}
          filters={filters}
          onChange={setFilters}
        />

        {subcategories.map((subcategoryVariation) => (
          <div
            key={subcategoryVariation.id}
            id={subcategoryVariation.id}
            className="scroll-mt-65 lg:scroll-mt-95"
          >
            <SubCategorySection
              subcategoryVariation={subcategoryVariation}
              filteredProductIds={filteredIds}
            />
          </div>
        ))}

        {filteredIds && filteredIds.size === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[#091530]/40 text-sm">
              Seçilen filtrelere uygun ürün bulunamadı.
            </p>
            <button
              type="button"
              onClick={() =>
                setFilters({
                  mainOptionId: null,
                  secondaryOptionId: null,
                  colorId: null,
                })
              }
              className="mt-4 text-xs font-semibold text-[#730912] underline hover:no-underline"
            >
              Filtreleri temizle
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
