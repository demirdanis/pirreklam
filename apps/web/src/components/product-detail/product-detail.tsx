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
import { useCallback, useMemo, useRef, useState } from 'react';

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
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div
        ref={containerRef}
        className="relative aspect-square overflow-hidden rounded-2xl bg-white cursor-zoom-in group"
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
            className="absolute top-2 left-2 flex items-center gap-2 rounded-full bg-[#730912] px-3 py-2 text-white shadow-lg shadow-[#730912]/40 transition-all hover:bg-[#8f0e17] hover:scale-105 active:scale-95"
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
        <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={cn(
                'shrink-0 h-16 w-16 rounded-lg overflow-hidden border-2 transition-all bg-white',
                activeIndex === i
                  ? 'border-[#730912] shadow-md shadow-[#730912]/20'
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
          ? 'border-[#730912] bg-[#730912] text-white shadow-md shadow-[#730912]/30'
          : compatible
            ? 'border-[#091530]/15 bg-[#091530]/5 text-[#091530]/75 hover:border-[#091530]/30 hover:text-[#091530]'
            : 'border-dashed border-[#091530]/10 bg-transparent text-[#091530]/25 hover:border-[#091530]/20 hover:text-[#091530]/40'
      )}
    >
      {option.label}
      {!compatible && !selected && (
        <span className="ml-1 text-[9px] font-normal text-[#091530]/20">
          uyumsuz
        </span>
      )}
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
        'relative h-9 w-9 rounded-full transition-all flex items-center justify-center',
        selected
          ? 'ring-2 ring-[#730912] ring-offset-2 ring-offset-[#f5f6f7] scale-110'
          : compatible
            ? 'ring-1 ring-[#091530]/10 hover:ring-[#091530]/30 hover:scale-105'
            : 'opacity-35 hover:opacity-55'
      )}
      style={{ backgroundColor: color.hex }}
    >
      {/* Incompatible X overlay */}
      {!compatible && (
        <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
          <X className="h-3.5 w-3.5 text-white/70" />
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
      className="group shrink-0 w-36 sm:w-44 flex flex-col overflow-hidden rounded-xl border border-[#091530]/8 bg-white transition-all hover:border-[#730912]/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#730912]/10"
    >
      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-white">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover p-2 transition-transform duration-500 group-hover:scale-108"
          unoptimized
        />
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#730912] transition-all duration-300 group-hover:w-full" />
      </div>
      <div className="flex items-center justify-between gap-1 px-3 py-2.5 bg-foreground">
        <p className="text-[11px] font-semibold text-[#091530]/70 group-hover:text-[#091530] transition-colors line-clamp-2 leading-snug">
          {product.title}
        </p>
        <ChevronRight className="h-3 w-3 shrink-0 text-[#091530]/30 group-hover:text-[#730912] transition-colors" />
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function ProductDetail({ data }: { data: ProductDetailData }) {
  const hasSub = Boolean(data.subOptionGroup);
  const firstVariant = data.variants[0];

  // ── Selection state ──
  const [selMain, setSelMain] = useState(firstVariant?.mainOptionId ?? '');
  const [selSub, setSelSub] = useState<string | null>(
    firstVariant?.subOptionId ?? null
  );
  const [selColor, setSelColor] = useState(firstVariant?.colorId ?? '');
  const [selQty, setSelQty] = useState<number>(200);
  const [activeImg, setActiveImg] = useState(0);

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

  // ── Pricing ──
  const currentTier = currentVariant?.tiers.find((t) => t.qty === selQty);
  const totalExVat = currentTier ? currentTier.perUnitExVat * selQty : 0;
  const totalIncVat = totalExVat * 1.2;

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

  return (
    <div className="bg-[#f5f6f7] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-1 text-xs text-[#091530]/35">
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
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* LEFT: Image gallery (sticky on desktop) */}
          <div className="mb-8 lg:mb-0 lg:sticky lg:top-28 lg:self-start">
            <ImageGallery
              images={images}
              activeIndex={activeImg}
              onSelect={setActiveImg}
              videoUrl={videoUrl}
            />
          </div>

          {/* RIGHT: Product info */}
          <div className="flex flex-col gap-6">
            {/* Title + code */}
            <div>
              <p className="text-xs font-bold  tracking-[0.15em] text-[#730912] mb-1">
                {data.subcategoryTitle}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#091530] font-alt leading-tight">
                {data.title}
              </h1>
              {currentVariant && (
                <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-[#091530]/5 border border-[#091530]/8 px-3 py-1.5">
                  <span className="text-[10px] text-[#091530]/40  tracking-wider">
                    Stok Kodu
                  </span>
                  <span className="text-xs font-bold text-[#730912] font-mono">
                    {currentVariant.productCode}
                  </span>
                </div>
              )}
            </div>

            {/* ── Main options ── */}
            <div>
              <div className="flex items-center gap-2 mb-3">
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
              <div>
                <div className="flex items-center gap-2 mb-3">
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
            <div>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-[11px] font-bold  tracking-[0.12em] text-[#091530]/50">
                  RENK SEÇENEKLERİ
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
              <div className="flex flex-wrap gap-3">
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

            {/* Divider */}
            <div className="h-px bg-white/8" />

            {/* ── Quantity tiers ── */}
            <div>
              <p className="text-[11px] font-bold  tracking-[0.12em] text-[#091530]/50 mb-3">
                TOPLAM ADET SEÇİNİZ
              </p>
              <div className="grid grid-cols-3 gap-2">
                {currentVariant?.tiers.map((tier) => (
                  <button
                    key={tier.qty}
                    onClick={() => setSelQty(tier.qty)}
                    className={cn(
                      'flex flex-col items-center rounded-xl border px-2 py-3.5 transition-all',
                      selQty === tier.qty
                        ? 'border-[#730912] bg-[#730912]/10 shadow-md shadow-[#730912]/20'
                        : 'border-[#091530]/20 bg-white hover:border-[#091530]/40'
                    )}
                  >
                    <span
                      className={cn(
                        'text-[11px] font-semibold',
                        selQty === tier.qty
                          ? 'text-[#730912]'
                          : 'text-[#091530]/45'
                      )}
                    >
                      {tier.qty.toLocaleString('tr-TR')} Adet
                    </span>
                    <span
                      className={cn(
                        'text-base font-bold mt-0.5',
                        selQty === tier.qty
                          ? 'text-[#091530]'
                          : 'text-[#091530]/60'
                      )}
                    >
                      {fmt(tier.perUnitExVat)} ₺
                    </span>
                    <span className="text-[9px] text-[#091530]/30 mt-0.5">
                      / Adet
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Pricing summary ── */}
            {currentVariant && (
              <div className="rounded-xl border border-[#091530]/8 bg-white p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#091530]/50">
                    Birim Fiyat ({selQty.toLocaleString('tr-TR')} Adet)
                  </span>
                  <span className="font-semibold text-[#091530]">
                    {fmt(currentTier?.perUnitExVat ?? 0)}{' '}
                    <span className="text-xs text-[#091530]/40">₺ / Adet</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#091530]/50">Toplam (KDV Hariç)</span>
                  <span className="font-semibold text-[#091530]">
                    {fmt(totalExVat)} ₺
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-[#091530]/8 pt-2 mt-2">
                  <span className="text-sm font-medium text-[#091530]/70">
                    Toplam (KDV Dahil %20)
                  </span>
                  <span className="text-lg font-bold text-[#730912]">
                    {fmt(totalIncVat)} ₺
                  </span>
                </div>
                <p className="text-[10px] text-[#091530]/25 mt-1">
                  * Fiyatlar KDV hariç gösterilmektedir. Gösterilen fiyatlar
                  yaklaşık fiyatlardır.
                </p>
              </div>
            )}

            {/* ── WhatsApp order button ── */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-xl bg-[#25d366] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#25d366]/20 transition-all hover:bg-[#22c25c] hover:shadow-[#25d366]/30 active:scale-98"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp ile Sipariş Ver
            </a>

            <p className="text-center text-[11px] text-[#091530]/30 -mt-3">
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
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#730912]/50" />
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
              <p className="text-xs font-bold  tracking-[0.15em] text-[#730912] mb-1">
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
    </div>
  );
}
