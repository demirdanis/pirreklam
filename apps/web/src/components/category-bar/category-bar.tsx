'use client';

import type { Category, CategoryBarData } from './category-bar.types';
import { ChevronDown, Grid2x2, Search, X } from 'lucide-react';
import { useRef, useState } from 'react';

import Link from 'next/link';

function CategoryDropdown({ category }: { category: Category }) {
  return (
    <div className="w-56 rounded-b-lg bg-white shadow-xl border border-surface-secondary-light-b overflow-hidden">
      {category.subItems.map((sub, i) => (
        <Link
          key={sub.href}
          href={sub.href}
          className={`flex items-center px-4 py-2.5 text-sm text-[#585d5d] hover:bg-surface-secondary-light-a hover:text-[#730912] transition-colors ${i === 0 ? '' : 'border-t border-[#f5f5f5]'}`}
        >
          <span className="h-1 w-1 rounded-full bg-[#730912]/40 mr-2.5 shrink-0" />
          {sub.label}
        </Link>
      ))}
      <Link
        href={category.href}
        className="flex items-center justify-center gap-1 border-t border-surface-secondary-light-b bg-surface-secondary-light-a px-4 py-2 text-xs font-semibold text-[#730912] hover:bg-[#730912] hover:text-white transition-colors"
      >
        Tümünü Gör
      </Link>
    </div>
  );
}

interface CategoryBarProps {
  data: CategoryBarData;
}

export default function CategoryBar({ data }: CategoryBarProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
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

  return (
    <div className="hidden lg:block sticky top-[258px] z-5551 bg-[#730912] border-b border-[#000000]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center" ref={containerRef}>
          <div className="flex items-center gap-2 pr-5 mr-1 border-r border-white/10 py-3.5 shrink-0">
            <Grid2x2 className="h-3.5 w-3.5 text-white/85" />
            <span className="text-[10px] font-bold  tracking-[0.15em] text-white/85">
              Kategoriler
            </span>
          </div>

          <div
            className="relative flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            ref={navRef}
          >
            <div className="flex">
              {data.categories.map((cat) => (
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
                    className={`flex items-center gap-1.5 px-5 py-3.5 text-sm font-medium transition-colors whitespace-nowrap ${
                      activeId === cat.id
                        ? 'text-white bg-white/5'
                        : 'text-white/85 hover:text-white'
                    }`}
                  >
                    {cat.label}
                    {cat.subItems.length > 0 && (
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          activeId === cat.id ? 'rotate-180 text-[#730912]' : ''
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
            className="ml-4 shrink-0 flex h-9 w-9 items-center justify-center text-white/85 hover:text-white transition-colors"
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
        <div className="border-t border-[#2a2d2d] px-4 py-3 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-2 rounded-md border border-[#2a2d2d] bg-[#030e26] px-4 py-2 focus-within:border-[#730912] transition-colors">
              <Search className="h-4 w-4 text-white/40 shrink-0" />
              <input
                type="search"
                placeholder="Ürün ara..."
                autoFocus
                className="w-full bg-transparent text-sm text-white placeholder-white/30 outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
