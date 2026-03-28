'use client';

import {
  ChevronDown,
  Menu,
  MessageCircle,
  Phone,
  Search,
  X,
} from 'lucide-react';
import type { HeaderData, HeaderSocialLink } from './header.types';

import type { Category } from '../category-bar/category-bar.types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

function SocialIcon({ platform }: { platform: HeaderSocialLink['platform'] }) {
  switch (platform) {
    case 'facebook':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case 'pinterest':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
        </svg>
      );
    default:
      return null;
  }
}

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
      <div className="lg:hidden bg-[#091530] border-b border-[#000000]">
        <div className="flex items-center justify-between px-4 py-2">
          <div />
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              aria-label="Ara"
              className="flex h-7 w-7 items-center justify-center text-white/60 hover:text-white transition-colors"
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
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              {mobileCatOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="text-xs font-bold uppercase tracking-[0.12em]">
                Kategoriler
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Bar — desktop only */}
      <div className="hidden lg:block bg-[#091530] border-b border-[#000000]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          {/* Nav Links */}
          <div className="flex items-center">
            {data.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-1 text-xs font-medium text-white/70 transition-colors hover:text-white group"
                {...(item.isExternal
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-[#e32231] transition-all duration-200 group-hover:w-3/4" />
              </Link>
            ))}
          </div>

          {/* Right: Social icons */}
          <div className="flex items-center gap-2">
            {data.socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-6 w-6 items-center justify-center rounded-full text-white/50 transition-colors hover:text-white hover:bg-white/10"
              >
                <SocialIcon platform={social.platform} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-header-menu border-b border-[#000000] shadow-header-menu relative overflow-hidden">
        {/* Stars background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
          style={{ backgroundImage: "url('/assets/stars-back.png')" }}
        />
        {/* Desktop layout */}
        <div className="hidden lg:flex mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 items-center justify-between gap-4 py-3">
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
              <span className="flex items-center justify-center gap-1.5 text-[12px] tracking-[0.2em] text-white/60 font-semibold">
                <Phone className="h-6 w-6 text-[#e32231]" />
                Türkiye&apos;nin her yerinden
              </span>
              <span className="text-4xl font-bold text-white tracking-tight transition-colors">
                444 10 30
              </span>
            </a>
            <Link href="/" className="flex justify-center shrink-0">
              <div className="flex rounded-full bg-white p-8 gradient-shadow-white-636b7f items-center justify-center">
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
              <span className="flex items-center justify-center gap-1.5 text-[12px] text-white/60 font-semibold">
                WhatsApp Sipariş
                <MessageCircle className="h-6 w-6 text-[#25d366]" />
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
            <Link
              href="/"
              className="fixed left-[16px] top-[16px] z-9999999 flex"
            >
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
      <div className="lg:hidden bg-[#091530] border-b border-[#000000]">
        <div className="flex items-center justify-around px-4 py-2 gap-2">
          <a href="tel:4441030" className="flex items-center gap-1.5 group">
            <Phone className="h-3.5 w-3.5 text-[#e32231] shrink-0" />
            <div className="flex flex-col">
              <span className="text-[11px] text-white/50 leading-none">
                Türkiye&apos;nin her yerinden
              </span>
              <span className="text-[16px] font-bold text-white group-hover:text-[#e32231] transition-colors leading-tight">
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
            <MessageCircle className="h-3.5 w-3.5 text-[#25d366] shrink-0" />
          </a>
        </div>
      </div>

      {/* Mobile Search Input — below Phone Bar */}
      {mobileSearchOpen && (
        <div className="lg:hidden border-t border-[#2a2d2d] bg-[#091530] px-4 py-2.5">
          <div className="flex items-center gap-2 rounded-md border border-[#2a2d2d] bg-[#091530] px-3 py-1.5 focus-within:border-[#e32231] transition-colors">
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
                        ? 'rotate-180 text-[#e32231]'
                        : ''
                    }`}
                  />
                )}
              </button>
              {mobileCatExpandedId === cat.id && cat.subItems.length > 0 && (
                <div className="bg-[#091530] pb-1">
                  {cat.subItems.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setMobileCatOpen(false)}
                      className="flex items-center gap-2.5 px-6 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <span className="h-1 w-1 rounded-full bg-[#e32231]/50 shrink-0" />
                      {sub.label}
                    </Link>
                  ))}
                  <Link
                    href={cat.href}
                    onClick={() => setMobileCatOpen(false)}
                    className="flex items-center justify-center gap-1.5 mx-4 mb-2 mt-1 rounded py-2 text-xs font-semibold text-[#e32231] border border-[#e32231]/30 hover:bg-[#e32231] hover:text-white transition-colors"
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
