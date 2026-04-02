'use client';

import {
  ChevronDown,
  Menu,
  MessageCircle,
  Phone,
  Search,
  X,
} from 'lucide-react';
import type { HeaderData } from './header.types';

import type { Category } from '../category-bar/category-bar.types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  data: HeaderData;
  categories?: Category[];
}

export default function Header({ data, categories = [] }: HeaderProps) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const [mobileCatExpandedId, setMobileCatExpandedId] = useState<string | null>(
    null
  );

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Mobile-only category trigger strip */}
      <div className="lg:hidden bg-[#030e26] border-b border-[#000000]">
        <div className="flex items-center justify-between px-4 py-2">
          <div />
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              aria-label="Ara"
              className="flex h-7 w-7 items-center justify-center text-white/85 hover:text-white transition-colors"
            >
              {mobileSearchOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileCatOpen(!mobileCatOpen);
                setMobileCatExpandedId(null);
              }}
              className="flex items-center gap-2 text-white/85 hover:text-white transition-colors"
            >
              {mobileCatOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="text-xs font-bold  tracking-[0.12em]">
                Kategoriler
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Bar — desktop only */}
      <div className="hidden lg:block bg-[#030e26] border-b border-[#000000]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          {/* Nav Links */}
          <div className="flex items-center">
            {data.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-1 text-xs font-medium text-white/85 transition-colors hover:text-white group"
                {...(item.isExternal
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-[#730912] transition-all duration-200 group-hover:w-3/4" />
              </Link>
            ))}
          </div>

          {/* Right: Social icons */}
          <div className="flex items-center gap-2">
            {data.socialLinks.map((social) => (
              <a
                key={`social-${social.href}`}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-6 w-6 items-center justify-center rounded-full text-white/50 transition-colors hover:text-white hover:bg-white/10"
              >
                <img src={social.logoUrl} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-header-menu border-b border-[#000000] shadow-header-menu relative overflow-hidden">
        {/* Stars background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 z-0 pointer-events-none"
          style={{ backgroundImage: "url('/assets/stars-back.png')" }}
        />
        {/* Desktop layout */}
        <div className="hidden lg:flex mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 items-center justify-between gap-4 py-3 relative z-10">
          <div className="grid grid-cols-1 gap-2 w-44">
            <button className="rounded px-3 py-1.5 text-xs text-white hover:bg-white/10 transition-colors text-left font-semibold">
              Ruhsat Kabı
            </button>
            <button className="rounded px-3 py-1.5 text-xs text-white hover:bg-white/10 transition-colors text-left font-semibold">
              Plakalık
            </button>
            <button className="rounded px-3 py-1.5 text-xs text-white hover:bg-white/10 transition-colors text-left font-semibold">
              Pasaport Kılıfı
            </button>
            <button className="rounded px-3 py-1.5 text-xs text-white hover:bg-white/10 transition-colors text-left font-semibold">
              Vesikalık Kabı
            </button>
          </div>

          {/* Center — Phone + Logo + WhatsApp */}
          <div className="flex flex-1 items-center justify-center gap-x-24">
            <a
              href="tel:4441030"
              className="flex flex-col items-center gap-1 group w-fit"
            >
              <span className="flex items-center justify-center gap-1.5 text-[12px] tracking-[0.2em] text-white/85 font-semibold">
                <Phone className="h-12 w-12 text-[#e32231]" />
                Türkiye&apos;nin her yerinden
              </span>
              <span className="text-4xl font-bold text-white tracking-tight transition-colors">
                444 10 30
              </span>
            </a>
            <Link href="/" className="flex justify-center shrink-0">
              <div className="flex rounded-full bg-white p-8 gradient-shadow-white-636b7f items-center justify-center animate-brightness">
                <Image
                  src="https://pirreklam.com.tr/wp-content/uploads/2026/01/cropped-Adsiz-tasarim.png"
                  alt="Pir Reklam"
                  width={108}
                  height={108}
                  className="h-24 w-auto object-contain -mt-3"
                  priority
                />
              </div>
            </Link>
            <a
              href="https://wa.me/905442338003"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 group w-fit"
            >
              <span className="flex items-center justify-center gap-1.5 text-[12px] text-white/85 font-semibold">
                WhatsApp Sipariş
                <MessageCircle className="h-8 w-8 text-[#25d366]" />
              </span>
              <span className="text-4xl font-bold text-white tracking-tight group-hover:text-[#25d366] transition-colors">
                0544 233 80 03
              </span>
            </a>
          </div>

          <div className="grid grid-cols-1 gap-2 w-44">
            <button className="rounded px-3 py-1.5 text-xs text-white hover:bg-white/10 transition-colors text-right font-semibold">
              Kredi Kartlık
            </button>
            <button className="rounded px-3 py-1.5 text-xs text-white hover:bg-white/10 transition-colors text-right font-semibold">
              Döviz Kabı
            </button>
            <button className="rounded px-3 py-1.5 text-xs text-white hover:bg-white/10 transition-colors text-right font-semibold">
              Evlilik Cüzdanı Kılıfı
            </button>
            <button className="rounded px-3 py-1.5 text-xs text-white hover:bg-white/10 transition-colors text-right font-semibold">
              Veteriner Aşı Karnesi Kabı
            </button>
          </div>
        </div>

        {/* Mobile layout: logo centered, 8 buttons scattered around */}
        <div className="lg:hidden h-24 w-full overflow-hidden">
          <div className="relative h-full ml-[clamp(3%,10%,20%)] mx-auto">
            <Link href="/" className="fixed left-4 top-4 z-9999999 flex">
              <div className="flex rounded-full bg-white p-3 gradient-shadow-white-636b7f items-center justify-center">
                <Image
                  src="https://pirreklam.com.tr/wp-content/uploads/2026/01/cropped-Adsiz-tasarim.png"
                  alt="Pir Reklam"
                  width={48}
                  height={48}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            <button className="absolute top-[10%] left-[22%]  text-[11px] font-semibold text-white hover:drop-shadow-lg leading-tight text-left transition-all">
              Ruhsat Kabı
            </button>
            <button className="absolute top-[38%] left-[24%]  text-[11px] font-semibold text-white hover:drop-shadow-lg leading-tight text-left transition-all">
              Plakalık
            </button>

            <button className="absolute top-[44%] left-[70%]  text-[11px] font-semibold text-white hover:drop-shadow-lg leading-tight text-left transition-all">
              Pasaport Kılıfı
            </button>
            <button className="absolute top-[81%] left-[2%]  text-[11px] font-semibold text-white hover:drop-shadow-lg leading-tight text-left transition-all">
              Vesikalık Kabı
            </button>

            <button className="absolute  top-[59%] left-[8%] text-[11px] font-semibold text-white hover:drop-shadow-lg leading-tight text-right transition-all">
              Kredi Kartlık
            </button>
            <button className="absolute top-[45%] left-[45%]  text-[11px] font-semibold text-white hover:drop-shadow-lg leading-tight text-right transition-all">
              Döviz Kabı
            </button>

            <button className="absolute top-[12%] left-[60%]  text-[11px] font-semibold text-white hover:drop-shadow-lg leading-tight text-right transition-all">
              Evlilik Cüzdanı Kılıfı
            </button>
            <button className="absolute top-[73%] left-[43%]  text-[11px] font-semibold text-white hover:drop-shadow-lg leading-tight text-right transition-all">
              Veteriner Aşı Karnesi Kabı
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Phone Bar */}
      <div className="lg:hidden bg-[#730912] border-b border-[#000000]">
        <div className="flex items-center justify-around px-4 py-2 gap-2">
          <a href="tel:4441030" className="flex items-center gap-1.5 group">
            <Phone className="h-6 w-6 text-[#e32231] shrink-0" />
            <div className="flex flex-col">
              <span className="text-[11px] text-white/50 leading-none">
                Türkiye&apos;nin her yerinden
              </span>
              <span className="text-[16px] font-bold text-white group-hover:text-[#730912] transition-colors leading-tight">
                444 10 30
              </span>
            </div>
          </a>
          <div className="w-px h-8 bg-white/10" />
          <a
            href="https://wa.me/905442338003"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 group"
          >
            <div className="flex flex-col items-end">
              <span className="text-[11px] text-white/50 leading-none">
                WhatsApp Sipariş
              </span>
              <span className="text-[16px]  font-bold text-white transition-colors leading-tight">
                0544 233 80 03
              </span>
            </div>
            <MessageCircle className="h-6 w-6 text-[#25d366] shrink-0" />
          </a>
        </div>
      </div>

      {/* Mobile Search Input — below Phone Bar */}
      {mobileSearchOpen && (
        <div className="lg:hidden border-t border-[#2a2d2d] bg-[#030e26] px-4 py-2.5">
          <div className="flex items-center gap-2 rounded-md border border-[#2a2d2d] bg-[#030e26] px-3 py-1.5 focus-within:border-[#730912] transition-colors">
            <Search className="h-3.5 w-3.5 text-white/40 shrink-0" />
            <input
              type="search"
              placeholder="Ürün ara..."
              autoFocus
              className="w-full bg-transparent text-sm text-white placeholder-white/30 outline-none"
            />
          </div>
        </div>
      )}

      {/* Mobile Categories Accordion Drawer */}
      {mobileCatOpen && (
        <div className="lg:hidden bg-[#0d1e3a] border-b border-[#000000] max-h-[70vh] overflow-y-auto">
          {categories.map((cat) => (
            <div key={cat.id} className="border-b border-[#1a2d4a]">
              <button
                type="button"
                onClick={() =>
                  setMobileCatExpandedId(
                    mobileCatExpandedId === cat.id ? null : cat.id
                  )
                }
                className="flex w-full items-center justify-between px-4 py-3.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors"
              >
                <span>{cat.label}</span>
                {cat.subItems.length > 0 && (
                  <ChevronDown
                    className={`h-4 w-4 text-white/40 transition-transform duration-200 ${
                      mobileCatExpandedId === cat.id
                        ? 'rotate-180 text-[#730912]'
                        : ''
                    }`}
                  />
                )}
              </button>
              {mobileCatExpandedId === cat.id && cat.subItems.length > 0 && (
                <div className="bg-[#030e26] pb-1">
                  {cat.subItems.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setMobileCatOpen(false)}
                      className="flex items-center gap-2.5 px-6 py-2.5 text-sm text-white/85 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <span className="h-1 w-1 rounded-full bg-[#730912]/50 shrink-0" />
                      {sub.label}
                    </Link>
                  ))}
                  <Link
                    href={cat.href}
                    onClick={() => setMobileCatOpen(false)}
                    className="flex items-center justify-center gap-1.5 mx-4 mb-2 mt-1 rounded py-2 text-xs font-semibold text-[#730912] border border-[#730912]/30 hover:bg-[#730912] hover:text-white transition-colors"
                  >
                    Tümünü Gör
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
