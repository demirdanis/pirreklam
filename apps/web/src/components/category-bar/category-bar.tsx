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
          className={`flex items-center px-4 py-2.5 text-sm text-[#585d5d] hover:bg-surface-secondary-light-a hover:text-[#e32231] transition-colors ${i === 0 ? '' : 'border-t border-[#f5f5f5]'}`}
        >
          <span className="h-1 w-1 rounded-full bg-[#e32231]/40 mr-2.5 shrink-0" />
          {sub.label}
        </Link>
      ))}
      <Link
        href={category.href}
        className="flex items-center justify-center gap-1 border-t border-surface-secondary-light-b bg-surface-secondary-light-a px-4 py-2 text-xs font-semibold text-[#e32231] hover:bg-[#e32231] hover:text-white transition-colors"
      >
        Tümünü Gör
      </Link>
    </div>
  );
}

function MobileBottomSheet({
  category,
  onClose,
}: {
  category: Category;
  onClose: () => void;
}) {
  return (
    <div className="lg:hidden">
      {/* Overlay */}
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 rounded-t-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-surface-secondary-light-b">
          <span className="text-sm font-semibold text-[#090a0a]">
            {category.label}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full text-text-mute hover:bg-surface-secondary-light-b hover:text-[#090a0a] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {category.subItems.map((sub, i) => (
            <Link
              key={sub.href}
              href={sub.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-5 py-3.5 text-sm text-[#585d5d] hover:bg-surface-secondary-light-a hover:text-[#e32231] transition-colors ${i === 0 ? '' : 'border-t border-[#f5f5f5]'}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#e32231]/40 shrink-0" />
              {sub.label}
            </Link>
          ))}
          <Link
            href={category.href}
            onClick={onClose}
            className="flex items-center justify-center gap-1 border-t border-surface-secondary-light-b bg-surface-secondary-light-a px-4 py-4 text-sm font-semibold text-[#e32231] hover:bg-[#e32231] hover:text-white transition-colors"
          >
            Tümünü Gör
          </Link>
        </div>
      </div>
    </div>
  );
}

interface CategoryBarProps {
  data: CategoryBarData;
}

export default function CategoryBar({ data }: CategoryBarProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileActiveId, setMobileActiveId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownLeft, setDropdownLeft] = useState(0);

  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const closeTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  const mobileActiveCategory =
    data.categories.find((c) => c.id === mobileActiveId) ?? null;

  const activeCategory = data.categories.find((c) => c.id === activeId) ?? null;

  const handleMouseEnter = (id: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setActiveId(id);
    const itemEl = itemRefs.current[id];
    const navEl = navRef.current;
    if (itemEl && navEl) {
      const itemRect = itemEl.getBoundingClientRect();
      const navRect = navEl.getBoundingClientRect();
      setDropdownLeft(itemRect.left - navRect.left);
    }
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setActiveId(null), 100);
  };

  return (
    <>
      <div className="bg-[#090a0a] border-b border-[#2a2d2d]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="hidden lg:flex items-center gap-2 pr-5 mr-1 border-r border-[#2a2d2d] py-3.5 shrink-0">
              <Grid2x2 className="h-3.5 w-3.5 text-[#e32231]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
                Kategoriler
              </span>
            </div>

            <div className="relative flex-1" ref={navRef}>
              <div className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                      onClick={() => setMobileActiveId(cat.id)}
                      className={`flex items-center gap-1.5 px-5 py-3.5 text-sm font-medium transition-colors whitespace-nowrap ${
                        activeId === cat.id
                          ? 'text-white bg-white/5'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {cat.label}
                      {cat.subItems.length > 0 && (
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${
                            activeId === cat.id
                              ? 'rotate-180 text-[#e32231]'
                              : ''
                          }`}
                        />
                      )}
                    </button>
                  </div>
                ))}
              </div>
              {activeId &&
                activeCategory &&
                activeCategory.subItems.length > 0 && (
                  <div
                    className="absolute top-full z-50"
                    style={{ left: dropdownLeft }}
                    onMouseEnter={() => {
                      if (closeTimeout.current)
                        clearTimeout(closeTimeout.current);
                      setActiveId(activeId);
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    <CategoryDropdown category={activeCategory} />
                  </div>
                )}
            </div>

            {/* Search button — right side */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Ara"
              className="ml-auto shrink-0 flex h-9 w-9 items-center justify-center text-white/60 hover:text-white transition-colors"
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
              <div className="flex items-center gap-2 rounded-md border border-[#2a2d2d] bg-[#090a0a] px-4 py-2 focus-within:border-[#e32231] transition-colors">
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

      {/* Mobile bottom sheet */}
      {mobileActiveCategory && (
        <MobileBottomSheet
          category={mobileActiveCategory}
          onClose={() => setMobileActiveId(null)}
        />
      )}
    </>
  );
}
