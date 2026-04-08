import { FROM, createTransporter } from '@/lib/mailer';

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { directusGraphqlQuery } from '@/lib/graphql-client';

function fmt(n: number | null | undefined) {
  if (n == null) return '—';
  return n.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ─── GraphQL ─────────────────────────────────────────────────────────────────
const GET_ORDER_QUERY = `
  query GetOrderForAdminEmail($id: ID!) {
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
      cargo_company { name }
      user { email first_name last_name }
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
    cargo_company: { name: string } | null;
    user: {
      email: string;
      first_name: string | null;
      last_name: string | null;
    } | null;
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

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.error('[webhook/order-created] ADMIN_EMAIL env var not set');
    return NextResponse.json(
      { error: 'Admin email not configured' },
      { status: 500 }
    );
  }

  // Fetch order via admin token
  const result = await directusGraphqlQuery<OrderResult>(GET_ORDER_QUERY, {
    id: orderId,
  });

  const order = result?.orders_by_id;
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const cmsAdminUrl = (process.env.CMS_ADMIN_URL ?? '').replace(/\/$/, '');
  const adminOrderUrl = `${cmsAdminUrl}/admin/content/orders/${order.id}`;
  const productName =
    order.product?.products_id?.name ?? order.stock_number ?? '—';
  const userName =
    [order.user?.first_name, order.user?.last_name].filter(Boolean).join(' ') ||
    order.user?.email ||
    '—';
  const orderDate = order.created_at
    ? new Intl.DateTimeFormat('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
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
            <td style="background:#16223f;padding:28px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:bold;letter-spacing:1px;">PİR REKLAM – YENİ SİPARİŞ</h1>
            </td>
          </tr>

          <!-- Alert banner -->
          <tr>
            <td style="padding:32px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="background:#fef9c3;border:2px solid #ca8a04;border-radius:8px;padding:16px 24px;text-align:center;">
                    <p style="margin:0 0 4px;font-size:11px;color:#92400e;text-transform:;letter-spacing:0.08em;">Yeni Sipariş</p>
                    <p style="margin:0;font-size:18px;font-weight:bold;color:#92400e;">Sipariş #${order.id} – ${productName}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Customer & order details -->
          <tr>
            <td style="padding:0 40px 16px;">
              <p style="margin:0 0 12px;font-size:12px;font-weight:bold;color:#091530;letter-spacing:0.1em;text-transform:;">Sipariş Detayları</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;font-size:13px;">
                <tr><td style="padding:10px 16px;background:#f9fafb;color:#6b7280;width:40%;">Sipariş No</td><td style="padding:10px 16px;font-weight:700;color:#111827;">#${order.id}</td></tr>
                <tr><td style="padding:10px 16px;background:#f9fafb;color:#6b7280;border-top:1px solid #e5e7eb;">Tarih</td><td style="padding:10px 16px;color:#374151;border-top:1px solid #e5e7eb;">${orderDate}</td></tr>
                <tr><td style="padding:10px 16px;background:#f9fafb;color:#6b7280;border-top:1px solid #e5e7eb;">Müşteri</td><td style="padding:10px 16px;color:#374151;border-top:1px solid #e5e7eb;">${userName}</td></tr>
                ${order.user?.email ? `<tr><td style="padding:10px 16px;background:#f9fafb;color:#6b7280;border-top:1px solid #e5e7eb;">E-posta</td><td style="padding:10px 16px;color:#374151;border-top:1px solid #e5e7eb;">${order.user.email}</td></tr>` : ''}
                <tr><td style="padding:10px 16px;background:#f9fafb;color:#6b7280;border-top:1px solid #e5e7eb;">Ürün</td><td style="padding:10px 16px;font-weight:600;color:#111827;border-top:1px solid #e5e7eb;">${productName}</td></tr>
                ${order.stock_number ? `<tr><td style="padding:10px 16px;background:#f9fafb;color:#6b7280;border-top:1px solid #e5e7eb;">Stok Kodu</td><td style="padding:10px 16px;color:#374151;border-top:1px solid #e5e7eb;">${order.stock_number}</td></tr>` : ''}
                ${order.main_option ? `<tr><td style="padding:10px 16px;background:#f9fafb;color:#6b7280;border-top:1px solid #e5e7eb;">Baskı</td><td style="padding:10px 16px;color:#374151;border-top:1px solid #e5e7eb;">${order.main_option}</td></tr>` : ''}
                ${order.secondary_option ? `<tr><td style="padding:10px 16px;background:#f9fafb;color:#6b7280;border-top:1px solid #e5e7eb;">Seçenek</td><td style="padding:10px 16px;color:#374151;border-top:1px solid #e5e7eb;">${order.secondary_option}</td></tr>` : ''}
                ${order.color_label ? `<tr><td style="padding:10px 16px;background:#f9fafb;color:#6b7280;border-top:1px solid #e5e7eb;">Renk</td><td style="padding:10px 16px;color:#374151;border-top:1px solid #e5e7eb;">${order.color_label}</td></tr>` : ''}
                ${order.product_count ? `<tr><td style="padding:10px 16px;background:#f9fafb;color:#6b7280;border-top:1px solid #e5e7eb;">Adet</td><td style="padding:10px 16px;color:#374151;border-top:1px solid #e5e7eb;">${order.product_count.toLocaleString('tr-TR')}</td></tr>` : ''}
                <tr><td style="padding:10px 16px;background:#f9fafb;color:#6b7280;border-top:1px solid #e5e7eb;">Birim Fiyat</td><td style="padding:10px 16px;color:#374151;border-top:1px solid #e5e7eb;">${fmt(order.piece_price)} ₺</td></tr>
                <tr><td style="padding:10px 16px;background:#f9fafb;color:#6b7280;border-top:1px solid #e5e7eb;">Toplam (KDV Hariç)</td><td style="padding:10px 16px;color:#374151;border-top:1px solid #e5e7eb;">${fmt(order.total_price)} ₺</td></tr>
                <tr><td style="padding:10px 16px;background:#f9fafb;color:#6b7280;border-top:1px solid #e5e7eb;">Toplam (KDV Dahil)</td><td style="padding:10px 16px;font-weight:700;color:#cc0636;border-top:1px solid #e5e7eb;">${fmt(order.total_price_with_tax)} ₺</td></tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:24px 40px 40px;">
              <p style="margin:0 0 16px;font-size:13px;color:#555555;">Siparişi yönetmek için admin paneline gidin:</p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#16223f;border-radius:6px;padding:14px 32px;">
                    <a href="${adminOrderUrl}" style="color:#ffffff;text-decoration:none;font-size:15px;font-weight:bold;display:block;">
                      Admin Panelinde Görüntüle
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:12px 0 0;font-size:11px;color:#aaaaaa;word-break:break-all;">${adminOrderUrl}</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8f8f8;padding:20px 40px;text-align:center;border-top:1px solid #eeeeee;">
              <p style="margin:0;font-size:12px;color:#aaaaaa;">© ${new Date().getFullYear()} Pir Reklam – Admin Bildirimi</p>
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
    to: adminEmail,
    subject: `Yeni Sipariş #${order.id} – ${productName} (${userName})`,
    html,
    text: `Yeni sipariş alındı.\n\nSipariş No: #${order.id}\nÜrün: ${productName}\nMüşteri: ${userName}\nToplam: ${fmt(order.total_price_with_tax)} ₺\n\nAdmin paneli: ${adminOrderUrl}`,
  });

  return NextResponse.json({ ok: true });
}
