'use client';

import {
  ChevronDown,
  FileText,
  LogIn,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShoppingBag,
  User,
  UserCog,
  X,
} from 'lucide-react';

import type { Category } from '../category-bar/category-bar.types';
import type { HeaderData } from './header.types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface HeaderProps {
  data: HeaderData;
  categories?: Category[];
  isLoggedIn?: boolean;
}

export default function Header({
  data,
  categories = [],
  isLoggedIn = false,
}: HeaderProps) {
  const router = useRouter();

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const [mobileCatExpandedId, setMobileCatExpandedId] = useState<string | null>(
    null
  );

  // Login panel state
  const [loginPanelOpen, setLoginPanelOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginStatus, setLoginStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [loginError, setLoginError] = useState('');

  // User menu state
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  function openLoginPanel() {
    setLoginPanelOpen(true);
    setMobileSearchOpen(false);
    setMobileCatOpen(false);
    setLoginEmail('');
    setLoginStatus('idle');
    setLoginError('');
  }

  function closeLoginPanel() {
    setLoginPanelOpen(false);
    setLoginEmail('');
    setLoginStatus('idle');
    setLoginError('');
  }

  async function submitLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!loginEmail) return;
    setLoginStatus('loading');
    setLoginError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail }),
      });
      const resData = await res.json();
      if (!res.ok) {
        setLoginError(resData.error ?? 'Bir hata oluştu.');
        setLoginStatus('error');
        return;
      }
      setLoginStatus('success');
    } catch {
      setLoginError('Sunucuya bağlanılamadı.');
      setLoginStatus('error');
    }
  }

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' });
    setUserMenuOpen(false);
    router.refresh();
  }

  return (
    <header className="z-6000 w-full">
      {/* Mobile-only category trigger strip */}
      <div className="lg:hidden bg-[#25497f] border-b border-[#000000]">
        <Link href="/" className="absolute left-[4px] top-[4px] z-9999999 flex">
          <div className="flex rounded-full bg-white p-3 gradient-shadow-white-636b7f items-center justify-center">
            <Image
              src="https://pirreklam.com.tr/wp-content/uploads/2026/01/cropped-Adsiz-tasarim.png"
              alt="Pir Reklam"
              width={48}
              height={48}
              className="h-14 w-auto object-contain"
              priority
            />
          </div>
        </Link>
        <div className="flex items-center justify-between px-4 py-1">
          <div />
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                if (mobileSearchOpen) {
                  setMobileSearchOpen(false);
                } else {
                  setMobileSearchOpen(true);
                  closeLoginPanel();
                  setMobileCatOpen(false);
                }
              }}
              aria-label="Ara"
              className="flex h-7 w-7 items-center justify-center text-white/85 hover:text-white transition-colors"
            >
              {mobileSearchOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </button>

            {/* Login / User — mobile */}
            {isLoggedIn ? (
              <button
                type="button"
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  setMobileCatOpen(false);
                  setMobileSearchOpen(false);
                }}
                aria-label="Hesabım"
                className="flex h-7 w-7 items-center justify-center text-white/85 hover:text-white transition-colors"
              >
                <User className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (loginPanelOpen) {
                    closeLoginPanel();
                  } else {
                    openLoginPanel();
                  }
                }}
                aria-label="Giriş Yap"
                className="flex h-7 w-7 items-center justify-center text-white/85 hover:text-white transition-colors"
              >
                {loginPanelOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <LogIn className="h-4 w-4" />
                )}
              </button>
            )}

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
      <div className="hidden lg:block bg-[#25497f] border-b border-[#000000]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1 sm:px-6 lg:px-8">
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
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-[#cc0636] transition-all duration-200 group-hover:w-3/4" />
              </Link>
            ))}
          </div>

          {/* Right: Social icons + Login/User */}
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

            <div className="w-px h-4 bg-white/20 mx-1" />

            {/* Login / User — desktop */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium text-white/85 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Hesabım</span>
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-52 rounded-lg border border-white/10 bg-[#25497f] shadow-xl z-50 overflow-hidden">
                    <Link
                      href="/siparislerim"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Siparişlerim
                    </Link>
                    <Link
                      href="/profilim"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <UserCog className="h-4 w-4" />
                      Profilim
                    </Link>
                    <Link
                      href="/fatura-bilgilerim"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      Fatura Bilgilerim
                    </Link>
                    <div className="border-t border-white/10" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors"
                    >
                      <LogIn className="h-4 w-4 rotate-180" />
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    if (loginPanelOpen) {
                      closeLoginPanel();
                    } else {
                      openLoginPanel();
                    }
                  }}
                  className="flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium text-white/85 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Giriş Yap</span>
                </button>
                {loginPanelOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-white/10 bg-[#25497f] shadow-xl z-50 p-4">
                    {loginStatus === 'success' ? (
                      <div className="text-center py-2">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 mb-3">
                          <svg
                            className="h-5 w-5 text-green-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-white mb-1">
                          E-postanızı kontrol edin!
                        </p>
                        <p className="text-xs text-white/50">
                          Giriş linki{' '}
                          <strong className="text-white/70">
                            {loginEmail}
                          </strong>{' '}
                          adresine gönderildi.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={submitLogin} className="space-y-3">
                        <p className="text-xs text-white/60">
                          E-posta adresinizi girin, giriş linki gönderelim.
                        </p>
                        <input
                          type="email"
                          autoFocus
                          value={loginEmail}
                          onChange={(e) => {
                            setLoginEmail(e.target.value);
                            if (loginStatus === 'error') {
                              setLoginStatus('idle');
                              setLoginError('');
                            }
                          }}
                          placeholder="ornek@email.com"
                          className="w-full rounded-lg border border-white/15 bg-white/8 px-3 py-2 text-sm text-white placeholder-white/35 outline-none focus:border-[#cc0636]/60 transition-colors"
                        />
                        {loginError && (
                          <p className="text-xs text-red-400">{loginError}</p>
                        )}
                        <button
                          type="submit"
                          disabled={loginStatus === 'loading' || !loginEmail}
                          className="w-full rounded-lg bg-[#cc0636] hover:bg-[#a8052c] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-2 transition-colors"
                        >
                          {loginStatus === 'loading'
                            ? 'Gönderiliyor…'
                            : 'Giriş Linki Gönder'}
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="absolute bg-header-menu border-b border-[#000000] shadow-header-menu relative overflow-hidden lg:overflow-visible">
        {/* Background — desktop */}
        <div
          className="hidden lg:block absolute inset-0 bg-cover bg-center z-0 pointer-events-none"
          style={{ backgroundImage: "url('/assets/header_back_web.webp')" }}
        />
        {/* Background — mobile */}
        <div
          className="lg:hidden absolute inset-0 bg-cover bg-center z-0 pointer-events-none"
          style={{ backgroundImage: "url('/assets/header_back_mobile.webp')" }}
        />
        {/* Desktop layout */}
        <div className="hidden lg:flex mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 items-center justify-between gap-4 py-0 relative z-10">
          <div className="grid grid-cols-1  w-44 ml-[-8px]">
            <Link
              href="/plastik-urunler/ruhsat-kabi/"
              style={{ animationDelay: '0s' }}
              className="animate-text-glow rounded px-3 py-1.5 text-xs text-white hover:bg-white/10 transition-colors text-left font-semibold"
            >
              Ruhsat Kabı
            </Link>
            <Link
              href="/plastik-urunler/plakalik/"
              style={{ animationDelay: '0.75s' }}
              className="animate-text-glow rounded px-3 py-1.5 text-xs text-white hover:bg-white/10 transition-colors text-left font-semibold"
            >
              Plakalık
            </Link>
            <Link
              href="/plastik-urunler/pasaport-kilifi/"
              style={{ animationDelay: '1.5s' }}
              className="animate-text-glow rounded px-3 py-1.5 text-xs text-white hover:bg-white/10 transition-colors text-left font-semibold"
            >
              Pasaport Kılıfı
            </Link>
            <Link
              href="/plastik-urunler/vesikalik-kabi/"
              style={{ animationDelay: '2.25s' }}
              className="animate-text-glow rounded px-3 py-1.5 text-xs text-white hover:bg-white/10 transition-colors text-left font-semibold"
            >
              Vesikalık Kabı
            </Link>
          </div>

          {/* Center — Phone + Logo + WhatsApp */}
          <div className="flex flex-1 items-center justify-center gap-x-12">
            <a
              href="tel:4441030"
              className="flex flex-col items-center gap-1 group w-fit"
            >
              <span className="flex items-center justify-center gap-1.5 text-[12px] tracking-[0.2em] text-white/85 font-semibold">
                <Phone className="h-6 w-6 text-[#e32231]" />
                Türkiye&apos;nin her yerinden
              </span>
              <span className="text-3xl font-bold text-white tracking-tight transition-colors">
                444 10 30
              </span>
            </a>
            <Link href="/" className="flex justify-center shrink-0 -my-5">
              <div className="flex rounded-full bg-white p-2 gradient-shadow-white-636b7f h-[140px] w-[140px] items-center justify-center animate-brightness">
                <Image
                  src="https://pirreklam.com.tr/wp-content/uploads/2026/01/cropped-Adsiz-tasarim.png"
                  alt="Pir Reklam"
                  width={96}
                  height={96}
                  className="h-20 w-auto object-contain"
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
                <MessageCircle className="h-6 w-6 text-[#25d366]" />
              </span>
              <span className="text-3xl font-bold text-white tracking-tight group-hover:text-[#25d366] transition-colors">
                0544 233 80 03
              </span>
            </a>
          </div>

          <div className="grid grid-cols-1 w-44 mr-[-8px]">
            <Link
              href="/plastik-urunler/kredi-kartlik/"
              style={{ animationDelay: '0.375s' }}
              className="animate-text-glow rounded px-3 py-1.5 text-xs text-white hover:bg-white/10 transition-colors text-right font-semibold"
            >
              Kredi Kartlık
            </Link>
            <Link
              href="/plastik-urunler/doviz-kabi/"
              style={{ animationDelay: '1.125s' }}
              className="animate-text-glow rounded px-3 py-1.5 text-xs text-white hover:bg-white/10 transition-colors text-right font-semibold"
            >
              Döviz Kabı
            </Link>
            <Link
              href="/plastik-urunler/evlilik-cuzdani-kilifi/"
              style={{ animationDelay: '1.875s' }}
              className="animate-text-glow rounded px-3 py-1.5 text-xs text-white hover:bg-white/10 transition-colors text-right font-semibold"
            >
              Evlilik Cüzdanı Kılıfı
            </Link>
            <Link
              href="/plastik-urunler/veteriner-asi-karnesi-kabi/"
              style={{ animationDelay: '2.625s' }}
              className="animate-text-glow rounded px-3 py-1.5 text-xs text-white hover:bg-white/10 transition-colors text-right font-semibold"
            >
              Veteriner Aşı Karnesi Kabı
            </Link>
          </div>
        </div>

        {/* Mobile layout: logo centered, 8 buttons scattered around */}
        <div className=" t-0 lg:hidden h-20 w-full overflow-hidden z-11">
          <div className="relative h-full ml-[clamp(3%,10%,20%)] mx-auto">
            <Link
              href="/plastik-urunler/ruhsat-kabi/"
              style={{ animationDelay: '0s' }}
              className="animate-text-glow absolute top-[10%] left-[22%]  text-[11px] font-semibold text-white hover:drop-shadow-lg leading-tight text-left transition-all"
            >
              Ruhsat Kabı
            </Link>
            <Link
              href="/plastik-urunler/plakalik/"
              style={{ animationDelay: '0.75s' }}
              className="animate-text-glow absolute top-[38%] left-[24%]  text-[11px] font-semibold text-white hover:drop-shadow-lg leading-tight text-left transition-all"
            >
              Plakalık
            </Link>

            <Link
              href="/plastik-urunler/pasaport-kilifi/"
              style={{ animationDelay: '1.5s' }}
              className="animate-text-glow absolute top-[44%] left-[70%]  text-[11px] font-semibold text-white hover:drop-shadow-lg leading-tight text-left transition-all"
            >
              Pasaport Kılıfı
            </Link>
            <Link
              href="/plastik-urunler/vesikalik-kabi/"
              style={{ animationDelay: '2.25s' }}
              className="animate-text-glow absolute top-[81%] left-[2%]  text-[11px] font-semibold text-white hover:drop-shadow-lg leading-tight text-left transition-all"
            >
              Vesikalık Kabı
            </Link>

            <Link
              href="/plastik-urunler/kredi-kartlik/"
              style={{ animationDelay: '0.375s' }}
              className="animate-text-glow absolute  top-[59%] left-[8%] text-[11px] font-semibold text-white hover:drop-shadow-lg leading-tight text-right transition-all"
            >
              Kredi Kartlık
            </Link>
            <Link
              href="/plastik-urunler/doviz-kabi/"
              style={{ animationDelay: '1.125s' }}
              className="animate-text-glow absolute top-[45%] left-[45%]  text-[11px] font-semibold text-white hover:drop-shadow-lg leading-tight text-right transition-all"
            >
              Döviz Kabı
            </Link>

            <Link
              href="/plastik-urunler/evlilik-cuzdani-kilifi/"
              style={{ animationDelay: '1.875s' }}
              className="animate-text-glow absolute top-[12%] left-[60%]  text-[11px] font-semibold text-white hover:drop-shadow-lg leading-tight text-right transition-all"
            >
              Evlilik Cüzdanı Kılıfı
            </Link>
            <Link
              href="/plastik-urunler/veteriner-asi-karnesi-kabi/"
              style={{ animationDelay: '2.625s' }}
              className="animate-text-glow absolute top-[73%] left-[43%]  text-[11px] font-semibold text-white hover:drop-shadow-lg leading-tight text-right transition-all"
            >
              Veteriner Aşı Karnesi Kabı
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Phone Bar */}
      <div className="lg:hidden bg-[#cc0636] border-b border-[#000000]">
        <div className="flex items-center justify-around px-4 py-1 gap-2">
          <a href="tel:4441030" className="flex items-center gap-1.5 group">
            <Phone className="h-6 w-6 text-[#e32231] shrink-0" />
            <div className="flex flex-col">
              <span className="text-[11px] text-white/50 leading-none">
                Türkiye&apos;nin her yerinden
              </span>
              <span className="text-[16px] font-bold text-white group-hover:text-[#cc0636] transition-colors leading-tight">
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
        <div className="lg:hidden border-t border-[#2a2d2d] bg-[#25497f] px-4 py-2.5">
          <div className="flex items-center gap-2 rounded-md border border-[#2a2d2d] bg-[#25497f] px-3 py-1.5 focus-within:border-[#cc0636] transition-colors">
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

      {/* Mobile Login Panel */}
      {loginPanelOpen && !isLoggedIn && (
        <div className="lg:hidden border-t border-[#2a2d2d] bg-[#25497f] px-4 py-3">
          {loginStatus === 'success' ? (
            <div className="flex items-center gap-2 text-sm text-green-400 justify-center py-1">
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Giriş linki e-postanıza gönderildi!</span>
            </div>
          ) : (
            <form onSubmit={submitLogin} className="flex flex-col gap-2">
              <div className="flex items-center gap-2 rounded-md border border-[#2a2d2d] focus-within:border-[#cc0636] bg-[#1a3260] px-3 py-1.5 transition-colors">
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                    if (loginStatus === 'error') {
                      setLoginStatus('idle');
                      setLoginError('');
                    }
                  }}
                  placeholder="E-posta adresiniz..."
                  autoFocus
                  className="w-full bg-transparent text-sm text-white placeholder-white/30 outline-none"
                />
              </div>
              {loginError && (
                <p className="text-xs text-red-400">{loginError}</p>
              )}
              <button
                type="submit"
                disabled={loginStatus === 'loading' || !loginEmail}
                className="rounded-md bg-[#cc0636] hover:bg-[#a8052c] disabled:opacity-50 text-white text-sm font-medium py-1.5 transition-colors"
              >
                {loginStatus === 'loading'
                  ? 'Gönderiliyor…'
                  : 'Giriş Linki Gönder'}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Mobile User Menu */}
      {userMenuOpen && isLoggedIn && (
        <div className="lg:hidden bg-[#25497f] border-b border-[#000000]">
          <Link
            href="/siparislerim"
            onClick={() => setUserMenuOpen(false)}
            className="flex items-center gap-2.5 px-4 py-3.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors border-b border-[#1a2d4a]"
          >
            <ShoppingBag className="h-4 w-4" />
            Siparişlerim
          </Link>
          <Link
            href="/profilim"
            onClick={() => setUserMenuOpen(false)}
            className="flex items-center gap-2.5 px-4 py-3.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors border-b border-[#1a2d4a]"
          >
            <UserCog className="h-4 w-4" />
            Profilim
          </Link>
          <Link
            href="/fatura-bilgilerim"
            onClick={() => setUserMenuOpen(false)}
            className="flex items-center gap-2.5 px-4 py-3.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors border-b border-[#1a2d4a]"
          >
            <FileText className="h-4 w-4" />
            Fatura Bilgilerim
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 px-4 py-3.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors"
          >
            <LogIn className="h-4 w-4 rotate-180" />
            Çıkış Yap
          </button>
        </div>
      )}

      {/* Mobile Categories Accordion Drawer */}
      {mobileCatOpen && (
        <div className="lg:hidden bg-[#25497f] border-b border-[#000000] max-h-[70vh] overflow-y-auto">
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
                        ? 'rotate-180 text-[#cc0636]'
                        : ''
                    }`}
                  />
                )}
              </button>
              {mobileCatExpandedId === cat.id && cat.subItems.length > 0 && (
                <div className="bg-[#25497f] pb-1">
                  {cat.subItems.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setMobileCatOpen(false)}
                      className="flex items-center gap-2.5 px-6 py-2.5 text-sm text-white/85 hover:text-white hover:bg-white/5 transition-colors border-b border-white/10"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
