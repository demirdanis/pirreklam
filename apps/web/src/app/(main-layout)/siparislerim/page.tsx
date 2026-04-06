import {
  ChevronLeft,
  ChevronRight,
  Package,
  ShoppingBag,
  Truck,
} from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { Order } from './_helpers/service/getOrders/getOrders.types';
import { cookies } from 'next/headers';
import { getOrders } from './_helpers/service/getOrders/getOrders.service';
import { getUserFromToken } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Siparişlerim | Pir Reklam',
  description: 'Pir Reklam siparişlerim sayfası.',
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ sayfa?: string }>;
}

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> =
  {
    created: {
      label: 'Oluşturuldu',
      color: 'text-gray-600',
      bg: 'bg-gray-50 border-gray-200',
    },
    seller_confirmed: {
      label: 'Satıcı Onayladı',
      color: 'text-blue-700',
      bg: 'bg-blue-50 border-blue-200',
    },
    partial_payment_received: {
      label: 'Kısmi Ödeme Alındı',
      color: 'text-yellow-700',
      bg: 'bg-yellow-50 border-yellow-200',
    },
    'partial_payment_received_product-is-being_prepared': {
      label: 'Kısmi Ödeme Alındı - Ürün Hazırlanıyor',
      color: 'text-yellow-700',
      bg: 'bg-yellow-50 border-yellow-200',
    },
    full_payment_received: {
      label: 'Tam Ödeme Alındı',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50 border-emerald-200',
    },
    full_payment_received_product_is_being_prepared: {
      label: 'Tam Ödeme Alındı - Ürün Hazırlanıyor',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50 border-emerald-200',
    },
    partial_payment_received_product_shipped: {
      label: 'Kısmi Ödeme Alındı - Ürün Kargolandı',
      color: 'text-indigo-700',
      bg: 'bg-indigo-50 border-indigo-200',
    },
    full_payment_received_product_shipped: {
      label: 'Tam Ödeme Alındı - Ürün Kargolandı',
      color: 'text-indigo-700',
      bg: 'bg-indigo-50 border-indigo-200',
    },
    completed: {
      label: 'Tamamlandı',
      color: 'text-green-700',
      bg: 'bg-green-50 border-green-200',
    },
    // legacy keys
    pending: {
      label: 'Beklemede',
      color: 'text-yellow-700',
      bg: 'bg-yellow-50 border-yellow-200',
    },
    processing: {
      label: 'Hazırlanıyor',
      color: 'text-blue-700',
      bg: 'bg-blue-50 border-blue-200',
    },
    shipped: {
      label: 'Kargoya Verildi',
      color: 'text-indigo-700',
      bg: 'bg-indigo-50 border-indigo-200',
    },
    delivered: {
      label: 'Teslim Edildi',
      color: 'text-green-700',
      bg: 'bg-green-50 border-green-200',
    },
    cancelled: {
      label: 'İptal Edildi',
      color: 'text-red-700',
      bg: 'bg-red-50 border-red-200',
    },
    returned: {
      label: 'İade',
      color: 'text-gray-700',
      bg: 'bg-gray-100 border-gray-200',
    },
  };

function getStatus(status: string | null) {
  if (!status)
    return {
      label: 'Bilinmiyor',
      color: 'text-gray-500',
      bg: 'bg-gray-50 border-gray-200',
    };
  return (
    STATUS_MAP[status.toLowerCase()] ?? {
      label: status,
      color: 'text-gray-700',
      bg: 'bg-gray-50 border-gray-200',
    }
  );
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '—';
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr));
}

function formatPrice(price: number | null) {
  if (price == null) return '—';
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2,
  }).format(price);
}

function OrderCard({ order }: { order: Order }) {
  const status = getStatus(order.status);
  const imageUrl = order.product?.images?.[0]?.small_image
    ? `${process.env.ASSETS_URL}/${order.product.images[0].small_image}`
    : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      <div className="p-4 sm:p-5 space-y-3">
        {/* Üst satır: görsel + özet bilgiler */}
        <div className="flex gap-4">
          {/* Ürün Görseli */}
          <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={order.stock_number ?? 'Ürün'}
                width={96}
                height={96}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-8 h-8 text-gray-300" />
              </div>
            )}
          </div>

          {/* Stok no + statü */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Stok No</p>
                <p className="text-sm font-bold text-[#16223f] truncate">
                  {order.stock_number ?? '—'}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span
                  className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.bg} ${status.color}`}
                >
                  {status.label}
                </span>
                {order.partial_payment_value != null &&
                  order.status?.toLowerCase().includes('partial_payment') && (
                    <p className="text-xs font-semibold text-yellow-700">
                      {formatPrice(order.partial_payment_value)}
                    </p>
                  )}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {order.created_at && (
                <div className="shrink-0">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                    Tarih
                  </p>
                  <p className="text-xs font-medium text-gray-700">
                    {formatDate(order.created_at)}
                  </p>
                </div>
              )}
              {order.product_count != null && (
                <div className="shrink-0">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                    Adet
                  </p>
                  <p className="text-xs font-medium text-gray-700">
                    {order.product_count}
                  </p>
                </div>
              )}
              {(order.color_hex || order.color_label) && (
                <div className="shrink-0">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                    Renk
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {order.color_hex && (
                      <span
                        className="inline-block w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: order.color_hex }}
                      />
                    )}
                    <p className="text-xs font-medium text-gray-700">
                      {order.color_label ?? order.color_hex}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Seçenek satırları — tam genişlik, resmin altından başlar */}
        {(order.main_option || order.secondary_option) && (
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {order.main_option && (
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                  Seçenek
                </p>
                <p className="text-xs font-medium text-gray-700">
                  {order.main_option}
                </p>
              </div>
            )}
            {order.secondary_option && (
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                  Alt Seçenek
                </p>
                <p className="text-xs font-medium text-gray-700">
                  {order.secondary_option}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Fatura bilgisi */}
        {order.invoice_info?.full_name && (
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1 border-t border-gray-50">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                Fatura Adı
              </p>
              <p className="text-xs font-medium text-gray-700">
                {order.invoice_info.full_name}
              </p>
            </div>
            {order.invoice_info.tckn && (
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                  TC Kimlik
                </p>
                <p className="text-xs font-medium text-gray-700 font-mono">
                  {order.invoice_info.tckn.slice(0, 3) +
                    '*'.repeat(order.invoice_info.tckn.length - 6) +
                    order.invoice_info.tckn.slice(-3)}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Kargo takip şeridi */}
      {order.cargo_company?.cargo_tracking_url && (
        <div className="border-t border-gray-50 bg-indigo-50/50 px-4 sm:px-5 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-indigo-500 shrink-0" />
            <span className="text-xs font-medium text-indigo-700">
              {order.cargo_company.name ?? 'Kargo'}
              {order.cargo_tracking_number && (
                <span className="ml-1.5 text-indigo-500 font-normal">
                  #{order.cargo_tracking_number}
                </span>
              )}
            </span>
          </div>
          <a
            href={(() => {
              const url = order.cargo_company.cargo_tracking_url!;
              const num = order.cargo_tracking_number;
              return num ? url.replace('${cargo_tracking_number}', num) : url;
            })()}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-3 py-1.5 transition-colors"
          >
            <Truck className="w-3.5 h-3.5" />
            Kargo Takip
          </a>
        </div>
      )}

      {/* Spacer to push price to bottom */}
      <div className="flex-1" />

      {/* Alt fiyat şeridi */}
      <div className="border-t border-gray-50 bg-gray-50/60 px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          {order.piece_price != null && (
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                Birim Fiyat
              </p>
              <p className="text-sm font-semibold text-gray-700">
                {formatPrice(order.piece_price)}
              </p>
            </div>
          )}
          {order.total_price != null && (
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                Ara Toplam
              </p>
              <p className="text-sm font-semibold text-gray-700">
                {formatPrice(order.total_price)}
              </p>
            </div>
          )}
        </div>
        {order.total_price_with_tax != null && (
          <div className="text-right">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">
              Toplam (KDV dahil)
            </p>
            <p className="text-base font-bold text-[#cc0636]">
              {formatPrice(order.total_price_with_tax)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <Link
        href={`/siparislerim?sayfa=${Math.max(1, currentPage - 1)}`}
        className={`flex items-center justify-center w-9 h-9 rounded-xl border text-sm font-medium transition-colors ${
          currentPage === 1
            ? 'border-gray-100 text-gray-300 pointer-events-none'
            : 'border-gray-200 text-gray-600 hover:border-[#cc0636] hover:text-[#cc0636]'
        }`}
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </Link>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`/siparislerim?sayfa=${page}`}
          className={`flex items-center justify-center w-9 h-9 rounded-xl border text-sm font-medium transition-colors ${
            page === currentPage
              ? 'bg-[#cc0636] border-[#cc0636] text-white'
              : 'border-gray-200 text-gray-600 hover:border-[#cc0636] hover:text-[#cc0636]'
          }`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={`/siparislerim?sayfa=${Math.min(totalPages, currentPage + 1)}`}
        className={`flex items-center justify-center w-9 h-9 rounded-xl border text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? 'border-gray-100 text-gray-300 pointer-events-none'
            : 'border-gray-200 text-gray-600 hover:border-[#cc0636] hover:text-[#cc0636]'
        }`}
        aria-disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default async function SiparislerimPage({ searchParams }: PageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = await getUserFromToken(token);

  if (!user) {
    redirect('/login');
  }

  const { sayfa } = await searchParams;
  const page = Math.max(1, parseInt(sayfa ?? '1', 10) || 1);

  let pageData;
  try {
    pageData = await getOrders(token, page);
  } catch {
    pageData = {
      orders: [],
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      totalPages: 1,
    };
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#cc0636]/10">
              <ShoppingBag className="w-5 h-5 text-[#cc0636]" />
            </div>
            <h1 className="text-2xl font-bold text-[#16223f]">Siparişlerim</h1>
          </div>
          {pageData.totalCount > 0 && (
            <p className="text-sm text-gray-500 ml-13">
              Toplam {pageData.totalCount} sipariş
            </p>
          )}
        </div>

        {/* Sipariş listesi */}
        {pageData.orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <ShoppingBag className="w-8 h-8 text-gray-300" />
            </div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">
              Henüz sipariş yok
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Ürünleri keşfetmeye başlayın ve ilk siparişinizi verin.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-[#cc0636] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#a8052c] transition-colors"
            >
              Ürünleri Keşfet
            </Link>
          </div>
        ) : (
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            }}
          >
            {pageData.orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        <Pagination
          currentPage={pageData.currentPage}
          totalPages={pageData.totalPages}
        />
      </div>
    </div>
  );
}
