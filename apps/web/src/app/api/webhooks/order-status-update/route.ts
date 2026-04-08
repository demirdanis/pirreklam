import { FROM, createTransporter } from '@/lib/mailer';

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { directusGraphqlQuery } from '@/lib/graphql-client';

// ─── Status label map ────────────────────────────────────────────────────────
const STATUS_MAP: Record<string, { label: string; color: string }> = {
  created: { label: 'Oluşturuldu', color: '#6b7280' },
  seller_confirmed: { label: 'Satıcı Onayladı', color: '#1d4ed8' },
  partial_payment_received: { label: 'Kısmi Ödeme Alındı', color: '#b45309' },
  'partial_payment_received_product-is-being_prepared': {
    label: 'Kısmi Ödeme Alındı – Ürün Hazırlanıyor',
    color: '#b45309',
  },
  full_payment_received: { label: 'Tam Ödeme Alındı', color: '#065f46' },
  full_payment_received_product_is_being_prepared: {
    label: 'Tam Ödeme Alındı – Ürün Hazırlanıyor',
    color: '#065f46',
  },
  partial_payment_received_product_shipped: {
    label: 'Kısmi Ödeme Alındı – Ürün Kargolandı',
    color: '#3730a3',
  },
  full_payment_received_product_shipped: {
    label: 'Tam Ödeme Alındı – Ürün Kargolandı',
    color: '#3730a3',
  },
  completed: { label: 'Tamamlandı', color: '#15803d' },
  cancelled: { label: 'İptal Edildi', color: '#b91c1c' },
  returned: { label: 'İade', color: '#374151' },
};

function statusLabel(status: string | null): string {
  if (!status) return 'Bilinmiyor';
  return STATUS_MAP[status.toLowerCase()]?.label ?? status;
}
function statusColor(status: string | null): string {
  if (!status) return '#6b7280';
  return STATUS_MAP[status.toLowerCase()]?.color ?? '#374151';
}

function fmt(n: number | null | undefined) {
  if (n == null) return '—';
  return n.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ─── GraphQL ─────────────────────────────────────────────────────────────────
const GET_ORDER_QUERY = `
  query GetOrderForStatusEmail($id: ID!) {
    orders_by_id(id: $id) {
      id
      stock_number
      status
      created_at
      product_count
      color_hex
      color_label
      main_option
      secondary_option
      piece_price
      total_price
      total_price_with_tax
      cargo_tracking_number
      cargo_company { name cargo_tracking_url }
      user { email first_name }
      product { stock_code products_id { name slug } }
    }
  }
`;

type OrderResult = {
  orders_by_id: {
    id: string;
    stock_number: string | null;
    status: string | null;
    created_at: string | null;
    product_count: number | null;
    color_hex: string | null;
    color_label: string | null;
    main_option: string | null;
    secondary_option: string | null;
    piece_price: number | null;
    total_price: number | null;
    total_price_with_tax: number | null;
    cargo_tracking_number: string | null;
    cargo_company: { name: string; cargo_tracking_url: string } | null;
    user: { email: string; first_name: string | null } | null;
    product: {
      stock_code: string | null;
      products_id: { name: string | null; slug: string | null } | null;
    } | null;
  } | null;
};

// ─── Handler ─────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Token check
  const authHeader = req.headers.get('authorization') ?? '';
  const bearerToken = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null;
  const expected = process.env.WEBHOOK_SECRET;

  if (!expected || bearerToken !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as {
    order_id?: string | number;
  } | null;
  const orderId = body?.order_id ? String(body.order_id) : null;

  if (!orderId) {
    return NextResponse.json({ error: 'order_id required' }, { status: 400 });
  }

  // Fetch order via admin token
  const result = await directusGraphqlQuery<OrderResult>(GET_ORDER_QUERY, {
    id: orderId,
  });

  const order = result?.orders_by_id;
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const userEmail = order.user?.email;
  if (!userEmail) {
    // No email to send to — still 200 so Directus doesn't retry
    return NextResponse.json({ ok: true, skipped: 'no user email' });
  }

  const baseUrl = process.env.BASE_URL ?? '';
  const ordersUrl = `${baseUrl}/siparislerim`;
  const newStatus = statusLabel(order.status);
  const statusClr = statusColor(order.status);
  const isShipped = order.status?.toLowerCase().includes('shipped') ?? false;
  const cargoTrackingUrl =
    order.cargo_company?.cargo_tracking_url && order.cargo_tracking_number
      ? order.cargo_company.cargo_tracking_url.replace(
          '${cargo_tracking_number}',
          order.cargo_tracking_number
        )
      : null;
  const productName =
    order.product?.products_id?.name ?? order.stock_number ?? '—';
  const orderDate = order.created_at
    ? new Intl.DateTimeFormat('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(new Date(order.created_at))
    : '—';

  const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:#cc0636;padding:28px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:bold;letter-spacing:1px;">PİR REKLAM</h1>
            </td>
          </tr>

          <!-- New status banner -->
          <tr>
            <td style="padding:32px 40px 0;">
              <p style="margin:0 0 12px;font-size:13px;color:#555555;">Merhaba ${order.user?.first_name ? order.user.first_name : ''},</p>
              <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#333333;">
                <strong>${productName}</strong> ürününüze ait siparişinizin durumu güncellendi.
              </p>
              <!-- Status pill -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom:${isShipped ? '16px' : '28px'};">
                <tr>
                  <td style="background:#f8f8f8;border:2px solid ${statusClr};border-radius:8px;padding:16px 28px;text-align:center;">
                    <p style="margin:0 0 4px;font-size:11px;color:#999999;text-transform:;letter-spacing:0.08em;">Yeni Durum</p>
                    <p style="margin:0;font-size:20px;font-weight:bold;color:${statusClr};">${newStatus}</p>
                  </td>
                </tr>
              </table>
              ${
                isShipped
                  ? `<!-- Shipped banner -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#eff6ff;border:2px solid #3b82f6;border-radius:8px;padding:16px 24px;text-align:center;">
                    <p style="margin:0 0 4px;font-size:20px;">🚚</p>
                    <p style="margin:0 0 4px;font-size:15px;font-weight:bold;color:#1d4ed8;">Kargonuz Yola Çıktı!</p>
                    <p style="margin:0;font-size:13px;color:#3b82f6;">Siparişiniz kargoya verildi, en kısa sürede ulaşacak.</p>
                    ${order.cargo_company?.name ? `<p style="margin:6px 0 0;font-size:12px;color:#6b7280;">Kargo firması: <strong>${order.cargo_company.name}</strong>${order.cargo_tracking_number ? ` &ndash; Takip no: <strong>${order.cargo_tracking_number}</strong>` : ''}</p>` : ''}
                  </td>
                </tr>
              </table>`
                  : ''
              }
            </td>
          </tr>

          <!-- Order details -->
          <tr>
            <td style="padding:0 40px 16px;">
              <p style="margin:0 0 12px;font-size:12px;font-weight:bold;color:#091530;letter-spacing:0.1em;text-transform:;">Sipariş Bilgileri</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;font-size:13px;">
                ${order.stock_number ? `<tr><td style="padding:10px 16px;background:#f9fafb;color:#6b7280;width:45%;">Stok Kodu</td><td style="padding:10px 16px;font-weight:600;color:#111827;">${order.stock_number}</td></tr>` : ''}
                <tr><td style="padding:10px 16px;background:#f9fafb;color:#6b7280;border-top:1px solid #e5e7eb;">Ürün</td><td style="padding:10px 16px;font-weight:600;color:#111827;border-top:1px solid #e5e7eb;">${productName}</td></tr>
                ${order.main_option ? `<tr><td style="padding:10px 16px;background:#f9fafb;color:#6b7280;border-top:1px solid #e5e7eb;">Baskı</td><td style="padding:10px 16px;color:#374151;border-top:1px solid #e5e7eb;">${order.main_option}</td></tr>` : ''}
                ${order.secondary_option ? `<tr><td style="padding:10px 16px;background:#f9fafb;color:#6b7280;border-top:1px solid #e5e7eb;">Seçenek</td><td style="padding:10px 16px;color:#374151;border-top:1px solid #e5e7eb;">${order.secondary_option}</td></tr>` : ''}
                ${order.color_label ? `<tr><td style="padding:10px 16px;background:#f9fafb;color:#6b7280;border-top:1px solid #e5e7eb;">Renk</td><td style="padding:10px 16px;color:#374151;border-top:1px solid #e5e7eb;">${order.color_label}</td></tr>` : ''}
                ${order.product_count ? `<tr><td style="padding:10px 16px;background:#f9fafb;color:#6b7280;border-top:1px solid #e5e7eb;">Adet</td><td style="padding:10px 16px;color:#374151;border-top:1px solid #e5e7eb;">${order.product_count.toLocaleString('tr-TR')}</td></tr>` : ''}
                <tr><td style="padding:10px 16px;background:#f9fafb;color:#6b7280;border-top:1px solid #e5e7eb;">Toplam (KDV Dahil)</td><td style="padding:10px 16px;font-weight:700;color:#cc0636;border-top:1px solid #e5e7eb;">${fmt(order.total_price_with_tax)} ₺</td></tr>
                <tr><td style="padding:10px 16px;background:#f9fafb;color:#6b7280;border-top:1px solid #e5e7eb;">Sipariş Tarihi</td><td style="padding:10px 16px;color:#374151;border-top:1px solid #e5e7eb;">${orderDate}</td></tr>
                ${order.cargo_company && order.cargo_tracking_number ? `<tr><td style="padding:10px 16px;background:#f9fafb;color:#6b7280;border-top:1px solid #e5e7eb;">Kargo</td><td style="padding:10px 16px;color:#374151;border-top:1px solid #e5e7eb;">${order.cargo_company.name} – ${order.cargo_tracking_number}</td></tr>` : ''}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:24px 40px 40px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#cc0636;border-radius:6px;padding:14px 32px;">
                    <a href="${ordersUrl}" style="color:#ffffff;text-decoration:none;font-size:15px;font-weight:bold;display:block;">
                      Siparişimi Görüntüle
                    </a>
                  </td>
                  ${
                    cargoTrackingUrl
                      ? `<td style="padding-left:12px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background:#1d4ed8;border-radius:6px;padding:14px 32px;">
                          <a href="${cargoTrackingUrl}" style="color:#ffffff;text-decoration:none;font-size:15px;font-weight:bold;display:block;">
                            🚚 Kargoyu Takip Et
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>`
                      : ''
                  }
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8f8f8;padding:20px 40px;text-align:center;border-top:1px solid #eeeeee;">
              <p style="margin:0;font-size:12px;color:#aaaaaa;">
                © ${new Date().getFullYear()} Pir Reklam
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const transporter = createTransporter();
  await transporter.sendMail({
    from: FROM,
    to: userEmail,
    subject: `Siparişinizin Durumu Güncellendi – ${newStatus}`,
    html,
    text: `Merhaba,\n\nSiparişinizin durumu güncellendi: ${newStatus}\n\nSiparişinizi görüntülemek için: ${ordersUrl}`,
  });

  return NextResponse.json({ ok: true });
}
