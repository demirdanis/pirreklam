'use client';

import {
  ChevronDown,
  FileText,
  LayoutList,
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
import { useEffect, useRef, useState } from 'react';

import type { Category } from '../category-bar/category-bar.types';
import type { HeaderData } from './header.types';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

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
  const [mobileSearchVal, setMobileSearchVal] = useState('');
  const mobileSearchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const [mobileCatExpandedId, setMobileCatExpandedId] = useState<string | null>(
    null
  );
  const [mobilePagesOpen, setMobilePagesOpen] = useState(false);

  // Refs for category buttons
  const catButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Lock body scroll when any mobile drawer is open
  useEffect(() => {
    const open = mobileCatOpen || mobilePagesOpen;
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileCatOpen, mobilePagesOpen]);

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
    setMobilePagesOpen(false);
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

  function handleMobileSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setMobileSearchVal(val);
    if (mobileSearchDebounceRef.current)
      clearTimeout(mobileSearchDebounceRef.current);
    if (!val.trim()) return;
    mobileSearchDebounceRef.current = setTimeout(() => {
      router.push(`/urunler/${encodeURIComponent(val.trim())}`);
      setMobileSearchOpen(false);
      setMobileSearchVal('');
    }, 1000);
  }

  function handleMobileSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && mobileSearchVal.trim()) {
      if (mobileSearchDebounceRef.current)
        clearTimeout(mobileSearchDebounceRef.current);
      router.push(`/urunler/${encodeURIComponent(mobileSearchVal.trim())}`);
      setMobileSearchOpen(false);
      setMobileSearchVal('');
    }
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

  // Scroll button to top when category is expanded
  useEffect(() => {
    if (mobileCatExpandedId && catButtonRefs.current[mobileCatExpandedId]) {
      const timer = setTimeout(() => {
        catButtonRefs.current[mobileCatExpandedId]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [mobileCatExpandedId]);

  return (
    <header className="z-6000 w-full relative">
      <Link
        href="/"
        className="lg:hidden flex justify-center shrink-0 top-[12px] w-[96px] left-[calc(50%-48px)] z-50 absolute"
      >
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex rounded-full bg-white p-1.5 gradient-shadow-white-636b7f h-[96px] w-[96px] items-center justify-center animate-brightness">
            <Image
              src="https://pirreklam.com.tr/wp-content/uploads/2026/01/cropped-Adsiz-tasarim.png"
              alt="Pir Reklam"
              width={90}
              height={90}
              className="h-16 w-auto object-contain"
              priority
            />
          </div>
          <span className="text-[10px] px-2 py-1 mt-[-2px] rounded font-semibold text-white tracking-[0.12em] whitespace-nowrap drop-shadow-sm">
            1961&apos;den Beri Sektörün Pir&apos;i
          </span>
        </div>
      </Link>

      <Link
        href="/"
        className="hidden lg:flex justify-center shrink-0 top-[8px]  w-[170px] left-[calc(50%-85px)] z-50 absolute"
      >
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex rounded-full bg-white p-1.5 gradient-shadow-white-636b7f h-[170px] w-[170px] items-center justify-center animate-brightness">
            <Image
              src="https://pirreklam.com.tr/wp-content/uploads/2026/01/cropped-Adsiz-tasarim.png"
              alt="Pir Reklam"
              width={90}
              height={90}
              className="h-[113px] w-auto object-contain mt-[-16px]"
              priority
            />
          </div>
        </div>
      </Link>

      {/* Mobile-only category trigger strip */}
      <div className="lg:hidden bg-[#25497f] border-b border-[#000000]">
        <div className="flex h-8 items-center justify-between px-4">
          {/* Pages drawer button — left */}
          <button
            type="button"
            onClick={() => {
              setMobilePagesOpen(true);
              setMobileCatOpen(false);
              setMobileSearchOpen(false);
              closeLoginPanel();
            }}
            aria-label="Sayfalar"
            className="flex h-7 w-7 items-center justify-center text-white/85 hover:text-white transition-colors"
          >
            <LayoutList className="h-4 w-4" />
          </button>
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
                  setMobilePagesOpen(false);
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
                setMobilePagesOpen(false);
              }}
              className="flex items-center gap-2 text-white/85 hover:text-white transition-colors"
            >
              {mobileCatOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Top Bar — desktop only */}
      <div className="hidden lg:block bg-[#25497f] border-b border-[#000000]">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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
          <div className="grid grid-cols-1  w-44 ml-[-8px] min-w-[146px] flex-0">
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
            <div className=" h-[144px] w-[144px]  "></div>

            <a
              href="https://wa.me/905442338003"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 group w-fit ml-5"
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

        {/* Mobile layout: logo centered, 4+4 links */}
        <div className="lg:hidden flex items-center justify-between h-24 w-full px-2 relative z-10">
          {/* Left links */}
          <div className="relative w-[calc(50vw)] h-22">
            <Link
              href="/plastik-urunler/ruhsat-kabi/"
              style={{ animationDelay: '0s' }}
              className="animate-text-glow absolute text-[11px] font-semibold text-white hover:drop-shadow-lg leading-tight transition-all top-[6px] left-[18%]"
            >
              Ruhsat Kabı
            </Link>
            <Link
              href="/plastik-urunler/plakalik/"
              style={{ animationDelay: '0.75s' }}
              className="animate-text-glow absolute text-[11px] font-semibold text-white hover:drop-shadow-lg leading-tight transition-all top-[30px] right-[52%]"
            >
              Plakalık
            </Link>
            <Link
              href="/plastik-urunler/pasaport-kilifi/"
              style={{ animationDelay: '1.5s' }}
              className="animate-text-glow absolute text-[11px] font-semibold text-white hover:drop-shadow-lg leading-tight transition-all top-[54px] left-[18%]"
            >
              Pasaport Kılıfı
            </Link>
          </div>

          {/* Center logo + slogan */}

          {/* Right links */}

          <div className="relative w-[calc(50vw)] h-22">
            <Link
              href="/plastik-urunler/doviz-kabi/"
              style={{ animationDelay: '1.125s' }}
              className="animate-text-glow absolute text-[11px] font-semibold text-white hover:drop-shadow-lg leading-tight transition-all top-[6px] right-[24%]"
            >
              Döviz Kabı
            </Link>

            <Link
              href="/plastik-urunler/vesikalik-kabi/"
              style={{ animationDelay: '2.25s' }}
              className="animate-text-glow absolute text-[11px] font-semibold text-white hover:drop-shadow-lg leading-tight transition-all top-[30px] left-[45%]"
            >
              Vesikalık Kabı
            </Link>
            <Link
              href="/plastik-urunler/evlilik-cuzdani-kilifi/"
              style={{ animationDelay: '1.875s' }}
              className="animate-text-glow absolute text-[11px] text-right font-semibold text-white hover:drop-shadow-lg leading-tight transition-all top-[54px] right-[7%]"
            >
              Evlilik Cüzdanı Kılıfı
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Phone Bar */}
      <div className="lg:hidden bg-[#cc0636] border-b border-[#000000]">
        <div className="flex h-8 items-center justify-around px-4 gap-2">
          <a href="tel:4441030" className="flex items-center gap-1.5 group">
            <Phone className="h-4 w-4 text-white/90 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] text-white/90 leading-none">
                Türkiye&apos;nin her yerinden
              </span>
              <span className="text-[13px] font-bold text-white group-hover:text-white/80 transition-colors leading-tight">
                444 10 30
              </span>
            </div>
          </a>
          <div className="w-px h-6 bg-white/20" />
          <a
            href="https://wa.me/905442338003"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 group"
          >
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-white/90 leading-none">
                WhatsApp Sipariş
              </span>
              <span className="text-[13px] font-bold text-white transition-colors leading-tight">
                0544 233 80 03
              </span>
            </div>
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0 text-white/90"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Mobile Search Input — below Phone Bar */}
      {mobileSearchOpen && (
        <div
          className="fixed top-0 h-[100vh]  z-999999 w-full lg:hidden b bg-black/80 "
          onClick={() => {
            setMobileSearchOpen(false);
            setMobileSearchVal('');
          }}
        >
          <div
            className="fixed top-4  z-999999 w-full lg:hidden px-4 "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 rounded-md border border-[#414545]  bg-white py-2.5 px-3 py-1.5 focus-within:border-[#25497f] transition-colors">
              <Search className="h-3.5 w-3.5 text-[#414545] shrink-0" />
              <input
                type="search"
                placeholder="Ürün ara..."
                autoFocus
                value={mobileSearchVal}
                onChange={handleMobileSearchChange}
                onKeyDown={handleMobileSearchKeyDown}
                className="w-full bg-transparent text-sm text-[#1f2222] placeholder-[#414545]/80 outline-none"
              />
            </div>
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

      {/* ── Mobile Categories Drawer (right side) ── */}
      <div
        className={cn(
          'fixed inset-0 z-[7000] bg-black/60 transition-opacity duration-300 lg:hidden',
          mobileCatOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setMobileCatOpen(false)}
      />
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-[7001] flex flex-col bg-[#25497f] transition-transform duration-300 ease-in-out lg:hidden',
          'w-[85%]',
          mobileCatOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Drawer header */}
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/10 px-4">
          <span className="text-sm font-bold tracking-wide text-white">
            Kategoriler
          </span>
          <button
            type="button"
            onClick={() => setMobileCatOpen(false)}
            className="flex h-8 w-8 items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto">
          {categories.map((cat) => (
            <div key={cat.id} className="border-b border-[#1a2d4a]">
              <button
                type="button"
                ref={(el) => {
                  if (el) catButtonRefs.current[cat.id] = el;
                }}
                onClick={() =>
                  setMobileCatExpandedId(
                    mobileCatExpandedId === cat.id ? null : cat.id
                  )
                }
                className={cn(
                  'flex w-full items-center justify-between px-4 py-3.5 text-sm font-medium transition-all duration-200',
                  mobileCatExpandedId === cat.id
                    ? 'bg-white/10 text-white'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                )}
              >
                <span>{cat.label}</span>
                {cat.subItems.length > 0 && (
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-white/40 transition-transform duration-200',
                      mobileCatExpandedId === cat.id &&
                        'rotate-180 text-[#cc0636]'
                    )}
                  />
                )}
              </button>
              {mobileCatExpandedId === cat.id && cat.subItems.length > 0 && (
                <div className="bg-[#1e3e6e] pb-1">
                  {cat.subItems.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setMobileCatOpen(false)}
                      className="flex items-center gap-2.5 border-b border-white/10 px-6 py-2.5 text-sm text-white/85 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile Pages Drawer (left side) ── */}
      <div
        className={cn(
          'fixed inset-0 z-[7000] bg-black/60 transition-opacity duration-300 lg:hidden',
          mobilePagesOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setMobilePagesOpen(false)}
      />
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-[7001] flex w-[90%] flex-col bg-[#25497f] transition-transform duration-300 ease-in-out lg:hidden',
          mobilePagesOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Drawer header */}
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/10 px-4">
          <span className="text-sm font-bold tracking-wide text-white">
            Menü
          </span>
          <button
            type="button"
            onClick={() => setMobilePagesOpen(false)}
            className="flex h-8 w-8 items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-2">
          {data.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobilePagesOpen(false)}
              className="flex items-center border-b border-white/8 px-5 py-4 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white transition-colors"
              {...(item.isExternal
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {/* Social links at bottom */}
        {data.socialLinks.length > 0 && (
          <div className="shrink-0 border-t border-white/10 px-5 py-4 flex items-center gap-3">
            {data.socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/60 hover:border-white/50 hover:text-white transition-colors"
              >
                <img
                  src={social.logoUrl}
                  alt=""
                  className="h-4 w-4 object-contain"
                />
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
