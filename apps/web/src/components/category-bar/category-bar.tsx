'use client';

import type { Category, CategoryBarData } from './category-bar.types';
import { ChevronDown, Grid2x2, Search, X } from 'lucide-react';
import { useRef, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

function CategoryDropdown({ category }: { category: Category }) {
  const COLS = Math.ceil(category.subItems.length / 16);
  const chunks = Array.from({ length: COLS }, (_, i) =>
    category.subItems.slice(i * 16, i * 16 + 16)
  );
  return (
    <div className="rounded-b-lg bg-white shadow-xl border border-surface-secondary-light-b overflow-hidden flex flex-row">
      {chunks.map((chunk, colIdx) => (
        <div
          key={colIdx}
          className="flex flex-col"
          style={{ borderLeft: colIdx > 0 ? '1px solid #f0f0f0' : 'none' }}
        >
          {chunk.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href.startsWith('/') ? sub.href : `/${sub.href}`}
              className="flex items-center h-8 px-4 text-sm text-[#585d5d] hover:bg-surface-secondary-light-a hover:text-[#cc0636] transition-colors border-b border-[#f5f5f5] whitespace-nowrap"
            >
              {sub.label}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

interface CategoryBarProps {
  data: CategoryBarData;
}

export default function CategoryBar({ data }: CategoryBarProps) {
  const router = useRouter();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [dropdownLeft, setDropdownLeft] = useState(0);

  const navRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const closeTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  const activeCategory = data.categories.find((c) => c.id === activeId) ?? null;

  const handleMouseEnter = (id: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setActiveId(id);
    const itemEl = itemRefs.current[id];
    const containerEl = containerRef.current;
    if (itemEl && containerEl) {
      const itemRect = itemEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();
      setDropdownLeft(itemRect.left - containerRect.left);
    }
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setActiveId(null), 100);
  };

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setSearchVal(val);
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    if (!val.trim()) return;
    searchDebounceRef.current = setTimeout(() => {
      router.push(`/urunler/${encodeURIComponent(val.trim())}`);
      setSearchOpen(false);
      setSearchVal('');
    }, 1000);
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && searchVal.trim()) {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
      router.push(`/urunler/${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setSearchVal('');
    }
  }

  return (
    <div className="hidden lg:block sticky lg:top-[0px] z-5551 h-8 bg-[#cc0636] border-b border-[#000000]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
        <div className="relative flex items-center h-full " ref={containerRef}>
          <div className="relative flex-1 flex items-center " ref={navRef}>
            <div className="flex flex-1 justify-end pr-12">
              {data.categories.slice(0, 2).map((cat) => (
                <div
                  key={cat.id}
                  ref={(el) => {
                    itemRefs.current[cat.id] = el;
                  }}
                  className="shrink-0"
                  onMouseEnter={() => handleMouseEnter(cat.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1.5 px-3 py-1 text-sm font-medium transition-colors whitespace-nowrap ${
                      activeId === cat.id
                        ? 'text-white bg-white/5'
                        : 'text-white/85 hover:text-white'
                    }`}
                  >
                    {cat.label}
                    {cat.subItems.length > 0 && (
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          activeId === cat.id ? 'rotate-180 text-[#cc0636]' : ''
                        }`}
                      />
                    )}
                  </button>
                </div>
              ))}
            </div>
            <span className="text-[12px] px-2 py-1 rounded font-semibold text-white tracking-[0.12em] whitespace-nowrap drop-shadow-sm ">
              1961&apos;den Beri Sektörün Pir&apos;i
            </span>
            <div className="flex flex-1 justify-start pl-12">
              {data.categories.slice(2, 4).map((cat) => (
                <div
                  key={cat.id}
                  ref={(el) => {
                    itemRefs.current[cat.id] = el;
                  }}
                  className="shrink-0"
                  onMouseEnter={() => handleMouseEnter(cat.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1.5 px-3 py-1 text-sm font-medium transition-colors whitespace-nowrap ${
                      activeId === cat.id
                        ? 'text-white bg-white/5'
                        : 'text-white/85 hover:text-white'
                    }`}
                  >
                    {cat.label}
                    {cat.subItems.length > 0 && (
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          activeId === cat.id ? 'rotate-180 text-[#cc0636]' : ''
                        }`}
                      />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {activeId && activeCategory && activeCategory.subItems.length > 0 && (
            <div
              className="absolute top-full z-50"
              style={{ left: dropdownLeft }}
              onMouseEnter={() => {
                if (closeTimeout.current) clearTimeout(closeTimeout.current);
                setActiveId(activeId);
              }}
              onMouseLeave={handleMouseLeave}
            >
              <CategoryDropdown category={activeCategory} />
            </div>
          )}

          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Ara"
            className="absolute right-0 ml-4 shrink-0 flex h-9 w-9 items-center justify-center text-white/85 hover:text-white transition-colors"
          >
            {searchOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      {/* Search bar */}
      {searchOpen && (
        <div className="px-4 py-3 sm:px-6 lg:px-8 mt-[-11px]">
          <div className="flex mx-auto max-w-7xl px-8 justify-end">
            <div className="flex w-64  items-center gap-2 rounded-b-md border-x border-b  border-[#cc0636] bg-white px-4 py-2 focus-within:border-[#cc0636] transition-colors">
              <Search className="h-4 w-4 text-black/40 shrink-0" />
              <input
                type="search"
                placeholder="Ürün ara..."
                autoFocus
                value={searchVal}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                className="w-full bg-transparent text-sm text-black/80 placeholder-black/30 outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
