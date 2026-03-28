'use client';

import {
  ChevronDown,
  ChevronRight,
  MessageCircle,
  X,
  ZoomIn,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useMemo, useRef, useState } from 'react';
import type {
  ColorOption,
  OptionItem,
  ProductDetailData,
  VariantData,
} from '@/app/(main-layout)/_helpers/service/getProductDetail/getProductDetail.mock';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────────────────────────────────────────
// FORMAT HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE GALLERY
// ─────────────────────────────────────────────────────────────────────────────

function ImageGallery({
  images,
  activeIndex,
  onSelect,
}: {
  images: string[];
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
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
                  ? 'border-[#e32231] shadow-md shadow-[#e32231]/20'
                  : 'border-white/10 opacity-60 hover:opacity-100'
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
          ? 'border-[#e32231] bg-[#e32231] text-white shadow-md shadow-[#e32231]/30'
          : compatible
            ? 'border-white/15 bg-white/5 text-white/75 hover:border-white/30 hover:text-white'
            : 'border-dashed border-white/10 bg-transparent text-white/25 hover:border-white/20 hover:text-white/40'
      )}
    >
      {option.label}
      {!compatible && !selected && (
        <span className="ml-1 text-[9px] font-normal text-white/20">
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
          ? 'ring-2 ring-[#e32231] ring-offset-2 ring-offset-[#090a0a] scale-110'
          : compatible
            ? 'ring-1 ring-white/10 hover:ring-white/30 hover:scale-105'
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
    <div className="border-t border-white/8">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/70">
          {title}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-white/40 transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>
      {open && (
        <div className="pb-4 text-sm text-white/50 leading-relaxed">
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
      className="group shrink-0 w-36 sm:w-44 flex flex-col overflow-hidden rounded-xl border border-white/8 bg-surface-dark transition-all hover:border-[#e32231]/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#e32231]/10"
    >
      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-white">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover p-2 transition-transform duration-500 group-hover:scale-108"
          unoptimized
        />
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#e32231] transition-all duration-300 group-hover:w-full" />
      </div>
      <div className="flex items-center justify-between gap-1 px-3 py-2.5 bg-foreground">
        <p className="text-[11px] font-semibold text-white/70 group-hover:text-white transition-colors line-clamp-2 leading-snug">
          {product.title}
        </p>
        <ChevronRight className="h-3 w-3 shrink-0 text-white/30 group-hover:text-[#e32231] transition-colors" />
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
  const [selQty, setSelQty] = useState<200 | 500 | 1000>(200);
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
    <div className="bg-[#090a0a] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-1 text-xs text-white/35">
          {data.breadcrumb.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3 w-3 text-white/15" />}
              {i === data.breadcrumb.length - 1 ? (
                <span className="text-white/60">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:text-white transition-colors"
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
            />
          </div>

          {/* RIGHT: Product info */}
          <div className="flex flex-col gap-6">
            {/* Title + code */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#e32231] mb-1">
                {data.subcategoryTitle}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white font-alt leading-tight">
                {data.title}
              </h1>
              {currentVariant && (
                <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-white/5 border border-white/8 px-3 py-1.5">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">
                    Stok Kodu
                  </span>
                  <span className="text-xs font-bold text-[#e32231] font-mono">
                    {currentVariant.productCode}
                  </span>
                </div>
              )}
            </div>

            {/* ── Main options ── */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/50">
                  {data.mainOptionGroup.title}
                </p>
                {selMainLabel && (
                  <>
                    <span className="text-white/15">·</span>
                    <span className="text-[11px] font-semibold text-white/80 uppercase tracking-wide">
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
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/50">
                    {data.subOptionGroup.title}
                  </p>
                  {selSubLabel && (
                    <>
                      <span className="text-white/15">·</span>
                      <span className="text-[11px] font-semibold text-white/80 uppercase tracking-wide">
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
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/50">
                  RENK SEÇENEKLERİ
                </p>
                {selColorLabel && (
                  <>
                    <span className="text-white/15">·</span>
                    <span className="text-[11px] font-semibold text-white/80 uppercase tracking-wide">
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
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/50 mb-3">
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
                        ? 'border-[#e32231] bg-[#e32231]/10 shadow-md shadow-[#e32231]/20'
                        : 'border-white/10 bg-white/3 hover:border-white/25'
                    )}
                  >
                    <span
                      className={cn(
                        'text-[11px] font-semibold',
                        selQty === tier.qty ? 'text-[#e32231]' : 'text-white/45'
                      )}
                    >
                      {tier.qty.toLocaleString('tr-TR')} Adet
                    </span>
                    <span
                      className={cn(
                        'text-base font-bold mt-0.5',
                        selQty === tier.qty ? 'text-white' : 'text-white/60'
                      )}
                    >
                      {fmt(tier.perUnitExVat)} ₺
                    </span>
                    <span className="text-[9px] text-white/30 mt-0.5">
                      / Adet
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Pricing summary ── */}
            {currentVariant && (
              <div className="rounded-xl border border-white/8 bg-white/3 p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">
                    Birim Fiyat ({selQty.toLocaleString('tr-TR')} Adet)
                  </span>
                  <span className="font-semibold text-white">
                    {fmt(currentTier?.perUnitExVat ?? 0)}{' '}
                    <span className="text-xs text-white/40">₺ / Adet</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Toplam (KDV Hariç)</span>
                  <span className="font-semibold text-white">
                    {fmt(totalExVat)} ₺
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-white/8 pt-2 mt-2">
                  <span className="text-sm font-medium text-white/70">
                    Toplam (KDV Dahil %20)
                  </span>
                  <span className="text-lg font-bold text-[#e32231]">
                    {fmt(totalIncVat)} ₺
                  </span>
                </div>
                <p className="text-[10px] text-white/25 mt-1">
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

            <p className="text-center text-[11px] text-white/30 -mt-3">
              Sipariş detayı ve farklı talepler için{' '}
              <a
                href="tel:4441030"
                className="text-white/50 underline hover:text-white"
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
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#e32231]/50" />
                    {line}
                  </li>
                ))}
              </ul>
            </Accordion>
          </div>
        </div>

        {/* ── Related products ── */}
        {data.relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-white/8 pt-12">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#e32231] mb-1">
                Benzer Ürünler
              </p>
              <h2 className="text-xl font-bold text-white font-alt">
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
