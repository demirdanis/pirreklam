'use client';

import {
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Play,
  X,
  ZoomIn,
} from 'lucide-react';
import type {
  ColorOption,
  OptionItem,
  ProductDetailData,
  VariantData,
} from '@/app/(main-layout)/_helpers/service/getProductDetail/getProductDetail.types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';

// ─────────────────────────────────────────────────────────────────────────────
// FORMAT HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    let videoId: string | null = null;
    if (u.hostname.includes('youtu.be')) {
      videoId = u.pathname.slice(1);
    } else if (u.hostname.includes('youtube.com')) {
      videoId = u.searchParams.get('v');
    }
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  } catch {
    return null;
  }
}

function VideoModal({ url, onClose }: { url: string; onClose: () => void }) {
  const embedUrl = getYouTubeEmbedUrl(url);
  if (!embedUrl) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 backdrop-blur-sm p-0 md:p-[10vh]"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full md:w-[80vw] md:h-auto md:max-h-[80vh] md:aspect-video rounded-none md:rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={embedUrl}
          className="w-full h-full absolute inset-0"
          style={{ aspectRatio: 'unset' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Ürün videosu"
        />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>,
    document.body
  );
}

function ImageGallery({
  images,
  activeIndex,
  onSelect,
  videoUrl,
}: {
  images: string[];
  activeIndex: number;
  onSelect: (i: number) => void;
  videoUrl?: string;
}) {
  const [videoOpen, setVideoOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState('50% 50%');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Main image */}
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden rounded-2xl bg-white cursor-zoom-in group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={(images[activeIndex] ?? images[0]) as string}
          alt="Ürün görseli"
          fill
          className="object-contain p-4"
          style={{
            transform: isZoomed ? 'scale(2.4)' : 'scale(1)',
            transformOrigin: zoomOrigin,
            transition: 'transform 0.25s ease',
          }}
          unoptimized
        />
        {/* Zoom hint */}
        <div className="absolute top-3 right-3 hidden md:flex h-7 w-7 items-center justify-center rounded-full bg-black/30 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <ZoomIn className="h-3.5 w-3.5" />
        </div>

        {/* Video button */}
        {videoUrl && (
          <button
            onClick={() => setVideoOpen(true)}
            className="absolute top-2 left-2 flex items-center gap-2 rounded-full bg-[#cc0636] px-3 py-2 text-white shadow-lg shadow-[#cc0636]/40 transition-all hover:bg-[#8f0e17] hover:scale-105 active:scale-95"
            style={{
              animation: 'videoPulse 2s ease-in-out infinite',
            }}
          >
            <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white/30 animate-ping" />
              <Play className="relative h-5 w-5 fill-white text-white" />
            </span>
            <span className="text-[11px] font-bold tracking-wide">
              Videoyu İzle
            </span>
          </button>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden pb-1 shrink-0">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={cn(
                'shrink-0 h-16 w-16 rounded-lg overflow-hidden border-2 transition-all bg-white',
                activeIndex === i
                  ? 'border-[#cc0636] shadow-md shadow-[#cc0636]/20'
                  : 'border-[#091530]/10 opacity-60 hover:opacity-100'
              )}
            >
              <Image
                src={src}
                alt={`Görsel ${i + 1}`}
                width={64}
                height={64}
                className="h-full w-full object-contain p-1"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
      {videoOpen && videoUrl && (
        <VideoModal url={videoUrl} onClose={() => setVideoOpen(false)} />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OPTION BUTTON (main / sub options)
// ─────────────────────────────────────────────────────────────────────────────

function OptionButton({
  option,
  selected,
  compatible,
  onClick,
}: {
  option: OptionItem;
  selected: boolean;
  compatible: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-lg border px-3 py-2 text-xs font-semibold transition-all text-left',
        selected
          ? 'border-[#cc0636] bg-[#cc0636] text-white shadow-md shadow-[#cc0636]/30'
          : compatible
            ? 'border-[#091530]/15 bg-[#091530]/5 text-[#091530]/75 hover:border-[#091530]/30 hover:text-[#091530]'
            : 'border-dashed border-[#091530]/15 bg-transparent text-[#091530]/40 hover:border-[#091530]/25 hover:text-[#091530]/55'
      )}
    >
      {option.label}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COLOR SWATCH
// ─────────────────────────────────────────────────────────────────────────────

function ColorSwatch({
  color,
  selected,
  compatible,
  onClick,
}: {
  color: ColorOption;
  selected: boolean;
  compatible: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={color.label}
      className={cn(
        'relative h-5 w-5 rounded-full transition-all flex items-center justify-center',
        selected
          ? 'ring-1 ring-[#cc0636] ring-offset-2  scale-110'
          : compatible
            ? 'ring-1 ring-[#091530]/10 hover:ring-[#091530]/30 hover:scale-105'
            : 'opacity-55 hover:opacity-70'
      )}
      style={{ backgroundColor: color.hex }}
    >
      {/* Incompatible X overlay */}
      {!compatible && (
        <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
          <X className="h-2.5 w-2.5 text-white/80" />
        </span>
      )}
      {/* Selected check */}
      {selected && (
        <span
          className="absolute inset-0 flex items-center justify-center rounded-full"
          style={{
            boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.5)',
          }}
        />
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACCORDION
// ─────────────────────────────────────────────────────────────────────────────

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-[#091530]/8">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-xs font-bold  tracking-[0.12em] text-[#091530]/70">
          {title}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-[#091530]/40 transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>
      {open && (
        <div className="pb-4 text-sm text-[#091530]/50 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RELATED PRODUCT CARD
// ─────────────────────────────────────────────────────────────────────────────

function RelatedCard({
  product,
}: {
  product: ProductDetailData['relatedProducts'][0];
}) {
  return (
    <Link
      href={product.href}
      className="group shrink-0 w-36 sm:w-44 flex flex-col overflow-hidden rounded-xl border border-[#091530]/8 bg-white transition-all hover:border-[#cc0636]/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#cc0636]/10"
    >
      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-white">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover p-2 transition-transform duration-500 group-hover:scale-108"
          unoptimized
        />
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#cc0636] transition-all duration-300 group-hover:w-full" />
      </div>
      <div className="flex items-center justify-between gap-1 px-3 py-2.5 bg-foreground">
        <p className="text-[11px] font-semibold text-[#091530]/70 group-hover:text-[#091530] transition-colors line-clamp-2 leading-snug">
          {product.title}
        </p>
        <ChevronRight className="h-3 w-3 shrink-0 text-[#091530]/30 group-hover:text-[#cc0636] transition-colors" />
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const VAT_RATE = Number(process.env.NEXT_PUBLIC_VAT_RATE ?? 20);

export default function ProductDetail({
  data,
  isLoggedIn = false,
  initialMain,
  initialSub,
  initialColor,
  initialQty,
  autoOpenOrder = false,
}: {
  data: ProductDetailData;
  isLoggedIn?: boolean;
  initialMain?: string;
  initialSub?: string;
  initialColor?: string;
  initialQty?: number;
  autoOpenOrder?: boolean;
}) {
  const hasSub = Boolean(data.subOptionGroup);
  const firstVariant = data.variants[0];

  // ── Selection state ──
  const [selMain, setSelMain] = useState(
    initialMain ?? firstVariant?.mainOptionId ?? ''
  );
  const [selSub, setSelSub] = useState<string | null>(
    initialSub ?? firstVariant?.subOptionId ?? null
  );
  const [selColor, setSelColor] = useState(
    initialColor ?? firstVariant?.colorId ?? ''
  );
  const [selQty, setSelQty] = useState<number>(
    initialQty ?? firstVariant?.tiers[0]?.qty ?? 200
  );
  const [activeImg, setActiveImg] = useState(0);

  // ── Order popup state ──
  const [orderPopupOpen, setOrderPopupOpen] = useState(autoOpenOrder);
  const [orderLoginTab, setOrderLoginTab] = useState<'register' | 'guest'>(
    'register'
  );
  const [orderLoginEmail, setOrderLoginEmail] = useState('');
  const [orderLoginStatus, setOrderLoginStatus] = useState<
    'idle' | 'sending' | 'sent' | 'error'
  >('idle');
  const [orderLoginError, setOrderLoginError] = useState('');
  const [orderCreating, setOrderCreating] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderError, setOrderError] = useState('');

  // ── Invoice state (logged-in: selector; guest: form) ──
  type InvoiceInfo = {
    id: string;
    full_name: string;
    tckn: string;
    is_default: boolean;
  };
  const [invoices, setInvoices] = useState<InvoiceInfo[]>([]);
  const [invoicesLoading, setInvoicesLoading] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(
    null
  );
  const [guestInvoice, setGuestInvoice] = useState({
    full_name: '',
    email: '',
    tckn: '',
    address: '',
    city: '',
    district: '',
    phone: '',
    tax_office: '',
  });
  const [guestOrderCreating, setGuestOrderCreating] = useState(false);
  const [guestOrderError, setGuestOrderError] = useState('');

  // ── Find exact variant ──
  const findVariant = useCallback(
    (main: string, sub: string | null, color: string): VariantData | null => {
      return (
        data.variants.find(
          (v) =>
            v.mainOptionId === main &&
            v.colorId === color &&
            (!hasSub || v.subOptionId === sub)
        ) ?? null
      );
    },
    [data.variants, hasSub]
  );

  const currentVariant = useMemo(
    () => findVariant(selMain, selSub, selColor),
    [findVariant, selMain, selSub, selColor]
  );

  // ── Compatibility sets ──
  // compatibleMains: mains that have a variant matching (selSub, selColor)
  const compatibleMains = useMemo(
    () =>
      new Set(
        data.variants
          .filter(
            (v) =>
              v.colorId === selColor &&
              (!hasSub || !selSub || v.subOptionId === selSub)
          )
          .map((v) => v.mainOptionId)
      ),
    [data.variants, selColor, selSub, hasSub]
  );

  // compatibleSubs: subs that have a variant matching (selMain, selColor)
  const compatibleSubs = useMemo(() => {
    if (!hasSub) return new Set<string>();
    return new Set(
      data.variants
        .filter((v) => v.mainOptionId === selMain && v.colorId === selColor)
        .map((v) => v.subOptionId!)
        .filter(Boolean)
    );
  }, [data.variants, selMain, selColor, hasSub]);

  // compatibleColors: colors that have a variant matching (selMain, selSub)
  const compatibleColors = useMemo(
    () =>
      new Set(
        data.variants
          .filter(
            (v) =>
              v.mainOptionId === selMain &&
              (!hasSub || !selSub || v.subOptionId === selSub)
          )
          .map((v) => v.colorId)
      ),
    [data.variants, selMain, selSub, hasSub]
  );

  // ── Selection handlers ──
  const handleMainSelect = useCallback(
    (newMain: string) => {
      setSelMain(newMain);
      setActiveImg(0);
      // validate current sub + color still work
      const exact = findVariant(newMain, selSub, selColor);
      if (exact) return;
      // keep color, find any sub
      const withColor = data.variants.find(
        (v) => v.mainOptionId === newMain && v.colorId === selColor
      );
      if (withColor) {
        setSelSub(withColor.subOptionId ?? null);
        return;
      }
      // keep sub, find any color
      if (hasSub && selSub) {
        const withSub = data.variants.find(
          (v) => v.mainOptionId === newMain && v.subOptionId === selSub
        );
        if (withSub) {
          setSelColor(withSub.colorId);
          return;
        }
      }
      // fallback: first variant with this main
      const first = data.variants.find((v) => v.mainOptionId === newMain);
      if (first) {
        setSelSub(first.subOptionId ?? null);
        setSelColor(first.colorId);
      }
    },
    [data.variants, selSub, selColor, hasSub, findVariant]
  );

  const handleSubSelect = useCallback(
    (newSub: string) => {
      setSelSub(newSub);
      setActiveImg(0);
      const exact = findVariant(selMain, newSub, selColor);
      if (exact) return;
      // keep main, find any color
      const withMain = data.variants.find(
        (v) => v.mainOptionId === selMain && v.subOptionId === newSub
      );
      if (withMain) {
        setSelColor(withMain.colorId);
        return;
      }
      // find any variant with this sub
      const any = data.variants.find((v) => v.subOptionId === newSub);
      if (any) {
        setSelMain(any.mainOptionId);
        setSelColor(any.colorId);
      }
    },
    [data.variants, selMain, selColor, findVariant]
  );

  const handleColorSelect = useCallback(
    (newColor: string) => {
      setSelColor(newColor);
      setActiveImg(0);
      const exact = findVariant(selMain, selSub, newColor);
      if (exact) return;
      // keep main, find any sub
      const withMain = data.variants.find(
        (v) => v.mainOptionId === selMain && v.colorId === newColor
      );
      if (withMain) {
        setSelSub(withMain.subOptionId ?? null);
        return;
      }
      // find any variant with this color
      const any = data.variants.find((v) => v.colorId === newColor);
      if (any) {
        setSelMain(any.mainOptionId);
        setSelSub(any.subOptionId ?? null);
      }
    },
    [data.variants, selMain, selSub, findVariant]
  );

  // ── Reset qty when variant changes and current qty is no longer available ──
  useEffect(() => {
    if (!currentVariant) return;
    const available = currentVariant.tiers.some((t) => t.qty === selQty);
    if (!available) {
      setSelQty(currentVariant.tiers[0]?.qty ?? selQty);
    }
  }, [currentVariant]);

  // ── Load invoice infos when logged-in user opens the popup ──
  useEffect(() => {
    if (!isLoggedIn || !orderPopupOpen) return;
    setInvoicesLoading(true);
    fetch('/api/invoice-infos')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(
        (
          list: {
            id: string;
            full_name: string;
            tckn: string;
            is_default: boolean;
          }[]
        ) => {
          setInvoices(list);
          const def = list.find((i) => i.is_default) ?? list[0];
          if (def) setSelectedInvoiceId(def.id);
        }
      )
      .catch(() => {})
      .finally(() => setInvoicesLoading(false));
  }, [isLoggedIn, orderPopupOpen]);

  // ── Pricing ──
  const currentTier = currentVariant?.tiers.find((t) => t.qty === selQty);
  const totalExVat = currentTier ? currentTier.perUnitExVat : 0;
  const totalIncVat = totalExVat * (1 + VAT_RATE / 100);

  // ── Current images ──
  const rawImages = currentVariant?.images ?? data.variants[0]?.images ?? [];
  const images: string[] = rawImages.filter(
    (s): s is string => typeof s === 'string'
  );
  const videoUrl = currentVariant?.videoUrl ?? data.variants[0]?.videoUrl;

  // ── Selected labels ──
  const selMainLabel =
    data.mainOptionGroup.options.find((o) => o.id === selMain)?.label ?? '';
  const selSubLabel =
    data.subOptionGroup?.options.find((o) => o.id === selSub)?.label ?? '';
  const selColorLabel = data.colors.find((c) => c.id === selColor)?.label ?? '';
  const selMainDesc = data.mainOptionGroup.options.find(
    (o) => o.id === selMain
  )?.description;
  const selSubDesc = data.subOptionGroup?.options.find(
    (o) => o.id === selSub
  )?.description;

  // ── Reset images when variant changes ──
  // (activeImg is already reset in handlers above)

  // ── WhatsApp message ──
  const waMsg = encodeURIComponent(
    `Merhaba, *${data.title}* ürünü için fiyat teklifi almak istiyorum.\n` +
      `📌 Baskı: ${selMainLabel}\n` +
      (hasSub ? `📌 Desen: ${selSubLabel}\n` : '') +
      `📌 Renk: ${selColorLabel}\n` +
      `📌 Ürün Kodu: ${currentVariant?.productCode ?? '-'}\n` +
      `📌 Adet: ${selQty}\n` +
      `📌 Tahmini Toplam: ${fmt(totalExVat)} ₺ (KDV Hariç)`
  );
  const waUrl = `https://wa.me/905442338003?text=${waMsg}`;

  // ── Order handlers ──
  const handleOpenOrder = useCallback(() => {
    setOrderPopupOpen(true);
    setOrderCreated(false);
    setOrderError('');
    setOrderLoginStatus('idle');
    setOrderLoginEmail('');
    setGuestOrderError('');
  }, []);

  const handleCloseOrder = useCallback(() => {
    setOrderPopupOpen(false);
  }, []);

  const handleCreateOrder = useCallback(async () => {
    const tier = currentVariant?.tiers.find((t) => t.qty === selQty);
    if (!tier || !currentVariant) return;
    const totalEx = tier.perUnitExVat;
    const totalInc = totalEx * (1 + VAT_RATE / 100);
    setOrderCreating(true);
    setOrderError('');
    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stock_number: currentVariant.productCode,
          variant_id: currentVariant.id,
          product_count: selQty,
          color_hex:
            data.colors.find((c) => c.id === selColor)?.hex ?? undefined,
          color_label: selColorLabel || undefined,
          main_option: selMainLabel || undefined,
          secondary_option: hasSub && selSubLabel ? selSubLabel : undefined,
          piece_price: currentVariant.singleUnitPriceExVat,
          total_price: totalEx,
          total_price_with_tax: totalInc,
          ...(selectedInvoiceId ? { invoice_info_id: selectedInvoiceId } : {}),
        }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error ?? 'Sipariş oluşturulamadı.');
      }
      setOrderCreated(true);
    } catch (e) {
      setOrderError(
        e instanceof Error ? e.message : 'Bir hata oluştu. Tekrar deneyin.'
      );
    } finally {
      setOrderCreating(false);
    }
  }, [
    currentVariant,
    selQty,
    selColor,
    selColorLabel,
    selMainLabel,
    selSubLabel,
    hasSub,
    data.colors,
  ]);

  const handleOrderLogin = useCallback(async () => {
    if (!orderLoginEmail) return;
    setOrderLoginStatus('sending');
    setOrderLoginError('');
    try {
      const currentPath =
        typeof window !== 'undefined' ? window.location.pathname : '';
      const params = new URLSearchParams({
        main: selMain,
        color: selColor,
        qty: String(selQty),
        onOrder: 'true',
      });
      if (selSub) params.set('sub', selSub);
      const redirectUrl = `${currentPath}?${params.toString()}`;

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: orderLoginEmail, redirectUrl }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error ?? 'Bağlantı gönderilemedi.');
      }
      setOrderLoginStatus('sent');
    } catch (e) {
      setOrderLoginStatus('error');
      setOrderLoginError(
        e instanceof Error ? e.message : 'Bir hata oluştu. Tekrar deneyin.'
      );
    }
  }, [orderLoginEmail, selMain, selSub, selColor, selQty]);

  const handleCreateGuestOrder = useCallback(async () => {
    const tier = currentVariant?.tiers.find((t) => t.qty === selQty);
    if (!tier || !currentVariant) return;
    const totalEx = tier.perUnitExVat;
    const totalInc = totalEx * (1 + VAT_RATE / 100);
    setGuestOrderCreating(true);
    setGuestOrderError('');
    try {
      const res = await fetch('/api/create-guest-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order: {
            stock_number: currentVariant.productCode,
            variant_id: currentVariant.id,
            product_count: selQty,
            color_hex:
              data.colors.find((c) => c.id === selColor)?.hex ?? undefined,
            color_label: selColorLabel || undefined,
            main_option: selMainLabel || undefined,
            secondary_option: hasSub && selSubLabel ? selSubLabel : undefined,
            piece_price: currentVariant.singleUnitPriceExVat,
            total_price: totalEx,
            total_price_with_tax: totalInc,
          },
          invoice: guestInvoice,
        }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error ?? 'Sipariş oluşturulamadı.');
      }
      setOrderCreated(true);
    } catch (e) {
      setGuestOrderError(
        e instanceof Error ? e.message : 'Bir hata oluştu. Tekrar deneyin.'
      );
    } finally {
      setGuestOrderCreating(false);
    }
  }, [
    currentVariant,
    selQty,
    selColor,
    selColorLabel,
    selMainLabel,
    selSubLabel,
    hasSub,
    data.colors,
    guestInvoice,
  ]);

  return (
    <div className="bg-[#f5f6f7] ">
      <div className="mx-auto max-w-7xl px-4   py-4">
        {/* Breadcrumb */}
        <nav className="hidden lg:flex mb-4 flex flex-wrap items-center gap-1 text-xs text-[#091530]/35">
          {data.breadcrumb.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3 w-3 text-[#091530]/15" />}
              {i === data.breadcrumb.length - 1 ? (
                <span className="text-[#091530]/60">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:text-[#091530] transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>

        {/* ── Two-column layout ── */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-4 xl:gap-8">
          {/* LEFT: Image gallery (sticky on desktop) */}
          <div className="mb-8 lg:mb-0 lg:sticky lg:top-22 lg:self-start min-h-[400px] h-[400px] lg:h-[calc(100vh-250px)] lg:min-h-[400px]">
            <ImageGallery
              images={images}
              activeIndex={activeImg}
              onSelect={setActiveImg}
              videoUrl={videoUrl}
            />
          </div>

          {/* RIGHT: Product info */}
          <div className="flex flex-col gap-2">
            {/* Title + code */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#091530] font-alt leading-tight">
                {data.title}
              </h1>
              {currentVariant && (
                <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-[#091530]/5 border border-[#091530]/8 px-3 py-1.5">
                  <span className="text-[10px] text-[#091530]/40  tracking-wider">
                    Stok Kodu
                  </span>
                  <span className="text-xs font-bold text-[#cc0636] font-mono">
                    {currentVariant.productCode}
                  </span>
                </div>
              )}
            </div>

            {/* ── Main options ── */}
            <div className="rounded-xl border border-[#091530]/8 bg-white p-2 space-y-2">
              <div className="flex items-center gap-1">
                <p className="text-[11px] font-bold  tracking-[0.12em] text-[#091530]/50">
                  {data.mainOptionGroup.title}
                </p>
                {selMainLabel && (
                  <>
                    <span className="text-[#091530]/15">·</span>
                    <span className="text-[11px] font-semibold text-[#091530]/80  tracking-wide">
                      {selMainLabel}
                    </span>
                  </>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {data.mainOptionGroup.options.map((opt) => (
                  <OptionButton
                    key={opt.id}
                    option={opt}
                    selected={selMain === opt.id}
                    compatible={compatibleMains.has(opt.id)}
                    onClick={() => handleMainSelect(opt.id)}
                  />
                ))}
              </div>
            </div>

            {/* ── Sub options (conditional) ── */}
            {data.subOptionGroup && (
              <div className="rounded-xl border border-[#091530]/8 bg-white p-2 space-y-2">
                <div className="flex items-center gap-1">
                  <p className="text-[11px] font-bold  tracking-[0.12em] text-[#091530]/50">
                    {data.subOptionGroup.title}
                  </p>
                  {selSubLabel && (
                    <>
                      <span className="text-[#091530]/15">·</span>
                      <span className="text-[11px] font-semibold text-[#091530]/80  tracking-wide">
                        {selSubLabel}
                      </span>
                    </>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.subOptionGroup.options.map((opt) => (
                    <OptionButton
                      key={opt.id}
                      option={opt}
                      selected={selSub === opt.id}
                      compatible={compatibleSubs.has(opt.id)}
                      onClick={() => handleSubSelect(opt.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── Colors ── */}
            <div className="rounded-xl border border-[#091530]/8 bg-white p-2 space-y-2">
              <div className="flex items-center gap-1">
                <p className="text-[11px] font-bold  tracking-[0.12em] text-[#091530]/50">
                  Renk Seçenekleri
                </p>
                {selColorLabel && (
                  <>
                    <span className="text-[#091530]/15">·</span>
                    <span className="text-[11px] font-semibold text-[#091530]/80  tracking-wide">
                      {selColorLabel}
                    </span>
                  </>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-3 pt-[2px] pl-1">
                {data.colors.map((color) => (
                  <ColorSwatch
                    key={color.id}
                    color={color}
                    selected={selColor === color.id}
                    compatible={compatibleColors.has(color.id)}
                    onClick={() => handleColorSelect(color.id)}
                  />
                ))}
              </div>
            </div>

            {/* ── Quantity tiers ── */}
            <div className="rounded-xl border border-[#091530]/8 bg-white p-2 space-y-2">
              <p className="text-[11px] font-bold  tracking-[0.12em] text-[#091530]/50 mt-1">
                Toplam Adet Seçiniz
              </p>
              <div className="grid grid-cols-4 gap-2">
                {currentVariant?.tiers.map((tier) => (
                  <button
                    key={tier.qty}
                    onClick={() => setSelQty(tier.qty)}
                    className={cn(
                      'flex flex-col items-center rounded-lg border px-1 py-1 transition-all',
                      selQty === tier.qty
                        ? 'border-[#cc0636] bg-[#cc0636]/10 '
                        : 'border-[#091530]/20 bg-white hover:border-[#091530]/40'
                    )}
                  >
                    <span
                      className={cn(
                        'text-sm font-bold',
                        selQty === tier.qty
                          ? 'text-[#cc0636]'
                          : 'text-[#091530]/70'
                      )}
                    >
                      {tier.qty.toLocaleString('tr-TR')} Adet
                    </span>
                    <span
                      className={cn(
                        'text-[10px] font-medium',
                        selQty === tier.qty
                          ? 'text-[#091530]'
                          : 'text-[#091530]/45'
                      )}
                    >
                      {fmt(tier.perUnitExVat * (1 + VAT_RATE / 100))} ₺
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Pricing summary ── */}
            {currentVariant && (
              <div className="rounded-xl border border-[#091530]/8 bg-white p-4 space-y-1.5">
                <div className="text-sm">
                  <span className="text-[#091530]/50">
                    Birim Fiyat (KDV Hariç):
                  </span>{' '}
                  <span className="font-semibold text-[#091530]">
                    {fmt(currentVariant.singleUnitPriceExVat)} ₺
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-[#091530]/50">
                    {selQty.toLocaleString('tr-TR')} Adet Fiyatı (KDV Hariç):
                  </span>{' '}
                  <span className="font-semibold text-[#091530]">
                    {fmt(totalExVat)} ₺
                  </span>
                </div>
                <div className="text-sm border-t border-[#091530]/8 pt-1.5 mt-1">
                  <span className="font-medium text-[#091530]/70">
                    Toplam (KDV Dahil %{VAT_RATE}):
                  </span>{' '}
                  <span className="text-base font-bold text-[#cc0636]">
                    {fmt(totalIncVat)} ₺
                  </span>
                </div>
              </div>
            )}

            {/* ── Order buttons ── */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleOpenOrder}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#cc0636] px-4 py-1.75 md:py-2.5 h-8.5 md:h-10 text-sm font-bold text-white shadow-lg shadow-[#cc0636]/20 transition-all hover:bg-[#a8042c] active:scale-98"
              >
                Anında Sipariş Ver
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 rounded-xl bg-[#25d366]  px-4 py-1.75 md:py-2.5 h-8.5 md:h-10 text-sm font-bold text-white shadow-lg shadow-[#25d366]/20 transition-all hover:bg-[#22c25c] hover:shadow-[#25d366]/30 active:scale-98"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp ile Sipariş Ver
              </a>
            </div>

            <p className="text-center text-[11px] text-[#091530]/30 mt-1">
              Sipariş detayı ve farklı talepler için{' '}
              <a
                href="tel:4441030"
                className="text-[#091530]/50 underline hover:text-[#091530]"
              >
                444 10 30
              </a>{' '}
              arayınız.
            </p>

            {/* Divider */}
            <div className="h-px bg-white/8" />

            {/* ── Accordion sections ── */}
            {selMainDesc && (
              <Accordion
                title={`${data.mainOptionGroup.title} AÇIKLAMASI`}
                defaultOpen
              >
                <p>{selMainDesc}</p>
              </Accordion>
            )}

            {hasSub && selSubDesc && (
              <Accordion
                title={`${data.subOptionGroup!.title} AÇIKLAMASI`}
                defaultOpen
              >
                <p>{selSubDesc}</p>
              </Accordion>
            )}

            {currentVariant?.details && (
              <Accordion title="BASKI SEÇENEKLERİ AÇIKLAMASI">
                <div
                  className="prose prose-sm max-w-none text-[#091530]/50 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:my-0.5 [&_strong]:text-[#091530]/70 [&_a]:text-[#cc0636] [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: currentVariant.details }}
                />
              </Accordion>
            )}

            <Accordion title="GENEL SİPARİŞ DETAYLARI">
              <ul className="space-y-1.5 list-none">
                {[
                  'Minimum sipariş adedi: 200 adet',
                  'Üretim süresi: Sipariş onayından itibaren 7-10 iş günü',
                  'Baskı için vektörel (.ai, .eps, .pdf) dosya gereklidir',
                  'Özel ambalaj ve kargo seçenekleri için lütfen iletişime geçiniz',
                  'Toplu alımlarda özel fiyat için teklif isteyiniz',
                ].map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#cc0636]/50" />
                    {line}
                  </li>
                ))}
              </ul>
            </Accordion>
          </div>
        </div>

        {/* ── Related products ── */}
        {data.relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-[#091530]/8 pt-12">
            <div className="mb-6">
              <p className="text-xs font-bold  tracking-[0.15em] text-[#cc0636] mb-1">
                Benzer Ürünler
              </p>
              <h2 className="text-xl font-bold text-[#091530] font-alt">
                Benzer Ürünleri Keşfedin
              </h2>
            </div>
            <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden pb-2">
              {data.relatedProducts.map((p) => (
                <RelatedCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Order confirmation popup ── */}
      {orderPopupOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-9999 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
            onClick={handleCloseOrder}
          >
            <div
              className="relative w-full sm:max-w-lg bg-white sm:rounded-2xl rounded-t-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#091530]/8">
                <h2 className="text-base font-bold text-[#091530]">
                  {orderCreated ? '✓ Siparişiniz Alındı' : 'Siparişi Onayla'}
                </h2>
                <button
                  onClick={handleCloseOrder}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#091530]/8 text-[#091530]/50 hover:bg-[#091530]/15 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {orderCreated ? (
                /* ── Success view ── */
                <div className="px-5 py-8 flex flex-col items-center gap-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#091530]">
                      Siparişiniz başarıyla oluşturuldu.
                    </p>
                    <p className="text-xs text-[#091530]/50 mt-1">
                      Siparişlerim sayfasından takip edebilirsiniz.
                    </p>
                  </div>
                  <div className="flex gap-3 w-full mt-2">
                    <Link
                      href="/siparislerim"
                      className="flex-1 rounded-xl border border-[#091530]/15 py-3 text-center text-sm font-semibold text-[#091530]/70 hover:border-[#091530]/30 transition-colors"
                      onClick={handleCloseOrder}
                    >
                      Siparişlerime Git
                    </Link>
                    <button
                      onClick={handleCloseOrder}
                      className="flex-1 rounded-xl bg-[#cc0636] py-3 text-sm font-bold text-white hover:bg-[#a8042c] transition-colors"
                    >
                      Tamam
                    </button>
                  </div>
                </div>
              ) : (
                <div className="overflow-y-auto max-h-[80vh]">
                  {/* ── Order summary ── */}
                  <div className="px-5 pt-4 pb-3 space-y-3">
                    {/* Product title + code */}
                    <div className="flex items-start gap-3">
                      {images[0] && (
                        <div className="relative h-14 w-14 shrink-0 rounded-lg overflow-hidden border border-[#091530]/8 bg-white">
                          <Image
                            src={images[0]}
                            alt={data.title}
                            fill
                            className="object-contain p-1"
                            unoptimized
                          />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[#091530] leading-tight line-clamp-2">
                          {data.title}
                        </p>
                        {currentVariant && (
                          <p className="text-[11px] text-[#cc0636] font-mono font-semibold mt-0.5">
                            {currentVariant.productCode}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Selection details */}
                    <div className="rounded-xl bg-[#091530]/4 p-3 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#091530]/50">
                          {data.mainOptionGroup.title}
                        </span>
                        <span className="font-semibold text-[#091530]">
                          {selMainLabel}
                        </span>
                      </div>
                      {hasSub && selSubLabel && (
                        <div className="flex justify-between">
                          <span className="text-[#091530]/50">
                            {data.subOptionGroup!.title}
                          </span>
                          <span className="font-semibold text-[#091530]">
                            {selSubLabel}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-[#091530]/50">Renk</span>
                        <span className="flex items-center gap-1.5 font-semibold text-[#091530]">
                          {data.colors.find((c) => c.id === selColor)?.hex && (
                            <span
                              className="h-3 w-3 rounded-full border border-black/10 shrink-0"
                              style={{
                                backgroundColor: data.colors.find(
                                  (c) => c.id === selColor
                                )!.hex,
                              }}
                            />
                          )}
                          {selColorLabel}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#091530]/50">Adet</span>
                        <span className="font-semibold text-[#091530]">
                          {selQty.toLocaleString('tr-TR')}
                        </span>
                      </div>
                    </div>

                    {/* Pricing */}
                    {currentTier && (
                      <div className="rounded-xl border border-[#091530]/8 p-3 space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-[#091530]/50">
                            Birim Fiyat (KDV Hariç)
                          </span>
                          <span className="font-semibold text-[#091530]">
                            {fmt(currentVariant?.singleUnitPriceExVat ?? 0)} ₺
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#091530]/50">
                            Toplam (KDV Hariç)
                          </span>
                          <span className="font-semibold text-[#091530]">
                            {fmt(totalExVat)} ₺
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-[#091530]/8 pt-1.5 mt-1">
                          <span className="font-medium text-[#091530]/70">
                            Toplam (KDV Dahil %{VAT_RATE})
                          </span>
                          <span className="font-bold text-[#cc0636] text-sm">
                            {fmt(totalIncVat)} ₺
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── Action area ── */}
                  <div className="px-5 pb-5">
                    {isLoggedIn ? (
                      /* Logged-in: invoice selector + confirm button */
                      <div className="space-y-3">
                        {/* Invoice selector */}
                        <div>
                          <p className="text-xs font-semibold text-[#091530]/60 mb-2">
                            Fatura Bilgisi
                          </p>
                          {invoicesLoading ? (
                            <p className="text-xs text-[#091530]/40">
                              Yükleniyor…
                            </p>
                          ) : invoices.length === 0 ? (
                            <p className="text-xs text-[#091530]/40">
                              Kayıtlı fatura bilginiz yok.{' '}
                              <Link
                                href="/fatura-bilgilerim"
                                target="_blank"
                                className="text-[#cc0636] underline"
                              >
                                Ekle
                              </Link>
                            </p>
                          ) : (
                            <div className="flex flex-col gap-1.5">
                              {invoices.map((inv) => (
                                <button
                                  key={inv.id}
                                  type="button"
                                  onClick={() => setSelectedInvoiceId(inv.id)}
                                  className={cn(
                                    'text-left rounded-xl border px-3 py-2 text-xs transition-colors',
                                    selectedInvoiceId === inv.id
                                      ? 'border-[#cc0636] bg-[#cc0636]/5'
                                      : 'border-[#091530]/15 hover:border-[#091530]/30'
                                  )}
                                >
                                  <span className="font-semibold text-[#091530]">
                                    {inv.full_name}
                                  </span>
                                  <span className="ml-2 text-[#091530]/40">
                                    TC: {inv.tckn}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        {orderError && (
                          <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">
                            {orderError}
                          </p>
                        )}
                        <div className="flex gap-3">
                          <button
                            onClick={handleCloseOrder}
                            className="flex-1 rounded-xl border border-[#091530]/15 py-3.5 text-sm font-semibold text-[#091530]/60 hover:border-[#091530]/30 transition-colors"
                          >
                            Vazgeç
                          </button>
                          <button
                            onClick={handleCreateOrder}
                            disabled={orderCreating}
                            className="flex-1 rounded-xl bg-[#cc0636] py-3.5 text-sm font-bold text-white hover:bg-[#a8042c] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                          >
                            {orderCreating
                              ? 'Oluşturuluyor…'
                              : 'Siparişi Oluştur'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Not logged in: tabs */
                      <div className="space-y-3">
                        {/* Tab buttons */}
                        <div className="flex rounded-xl overflow-hidden border border-[#091530]/12">
                          <button
                            onClick={() => {
                              setOrderLoginTab('register');
                              setOrderLoginStatus('idle');
                            }}
                            className={cn(
                              'flex-1 py-2.5 text-xs font-semibold transition-colors',
                              orderLoginTab === 'register'
                                ? 'bg-[#091530] text-white'
                                : 'bg-white text-[#091530]/50 hover:text-[#091530]'
                            )}
                          >
                            Üye Ol
                          </button>
                          <button
                            onClick={() => {
                              setOrderLoginTab('guest');
                              setOrderLoginStatus('idle');
                            }}
                            className={cn(
                              'flex-1 py-2.5 text-xs font-semibold transition-colors border-l border-[#091530]/12',
                              orderLoginTab === 'guest'
                                ? 'bg-[#091530] text-white'
                                : 'bg-white text-[#091530]/50 hover:text-[#091530]'
                            )}
                          >
                            Üye Olmadan Devam Et
                          </button>
                        </div>

                        {orderLoginTab === 'register' ? (
                          /* Register tab — magic link */
                          orderLoginStatus === 'sent' ? (
                            <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-4 text-center space-y-1">
                              <p className="text-sm font-semibold text-green-800">
                                E-postanızı kontrol edin
                              </p>
                              <p className="text-xs text-green-700">
                                Gönderilen bağlantıya tıklayınca siparişiniz
                                otomatik başlatılacak.
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <p className="text-xs text-[#091530]/50">
                                Üye olun, siparişlerinizi kolayca takip edin.
                              </p>
                              <input
                                type="email"
                                value={orderLoginEmail}
                                onChange={(e) =>
                                  setOrderLoginEmail(e.target.value)
                                }
                                onKeyDown={(e) =>
                                  e.key === 'Enter' && handleOrderLogin()
                                }
                                placeholder="E-posta adresiniz"
                                className="w-full rounded-xl border border-[#091530]/15 px-4 py-3 text-sm text-[#091530] placeholder:text-[#091530]/30 focus:outline-none focus:border-[#cc0636] transition-colors"
                              />
                              {orderLoginError && (
                                <p className="text-xs text-red-600">
                                  {orderLoginError}
                                </p>
                              )}
                              <button
                                onClick={handleOrderLogin}
                                disabled={
                                  orderLoginStatus === 'sending' ||
                                  !orderLoginEmail
                                }
                                className="w-full rounded-xl bg-[#cc0636] py-3.5 text-sm font-bold text-white hover:bg-[#a8042c] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                              >
                                {orderLoginStatus === 'sending'
                                  ? 'Gönderiliyor…'
                                  : 'Bağlantı Gönder'}
                              </button>
                            </div>
                          )
                        ) : (
                          /* Guest tab — invoice form */
                          <div className="space-y-2">
                            <p className="text-xs text-[#091530]/50">
                              Fatura bilgilerinizi girerek üye olmadan sipariş
                              verebilirsiniz.
                            </p>
                            {(
                              [
                                {
                                  key: 'full_name',
                                  placeholder: 'Ad Soyad *',
                                  type: 'text',
                                },
                                {
                                  key: 'email',
                                  placeholder: 'E-posta *',
                                  type: 'email',
                                },
                                {
                                  key: 'tckn',
                                  placeholder: 'TC Kimlik No * (11 hane)',
                                  type: 'text',
                                  maxLength: 11,
                                },
                                {
                                  key: 'address',
                                  placeholder: 'Adres *',
                                  type: 'text',
                                },
                                {
                                  key: 'city',
                                  placeholder: 'İl *',
                                  type: 'text',
                                },
                                {
                                  key: 'district',
                                  placeholder: 'İlçe',
                                  type: 'text',
                                },
                                {
                                  key: 'phone',
                                  placeholder: 'Telefon',
                                  type: 'tel',
                                },
                                {
                                  key: 'tax_office',
                                  placeholder: 'Vergi Dairesi',
                                  type: 'text',
                                },
                              ] as {
                                key: keyof typeof guestInvoice;
                                placeholder: string;
                                type: string;
                                maxLength?: number;
                              }[]
                            ).map(({ key, placeholder, type, maxLength }) => (
                              <input
                                key={key}
                                type={type}
                                maxLength={maxLength}
                                value={guestInvoice[key]}
                                onChange={(e) =>
                                  setGuestInvoice((prev) => ({
                                    ...prev,
                                    [key]: e.target.value,
                                  }))
                                }
                                placeholder={placeholder}
                                className="w-full rounded-xl border border-[#091530]/15 px-4 py-2.5 text-sm text-[#091530] placeholder:text-[#091530]/30 focus:outline-none focus:border-[#cc0636] transition-colors"
                              />
                            ))}
                            {guestOrderError && (
                              <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">
                                {guestOrderError}
                              </p>
                            )}
                            <div className="flex gap-3 pt-1">
                              <button
                                onClick={handleCloseOrder}
                                className="flex-1 rounded-xl border border-[#091530]/15 py-3.5 text-sm font-semibold text-[#091530]/60 hover:border-[#091530]/30 transition-colors"
                              >
                                Vazgeç
                              </button>
                              <button
                                onClick={handleCreateGuestOrder}
                                disabled={guestOrderCreating}
                                className="flex-1 rounded-xl bg-[#cc0636] py-3.5 text-sm font-bold text-white hover:bg-[#a8042c] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                              >
                                {guestOrderCreating
                                  ? 'Oluşturuluyor…'
                                  : 'Siparişi Oluştur'}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
