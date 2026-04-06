import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { directusGraphqlQuery } from '@/lib/graphql-client';
import { z } from 'zod';

const orderSchema = z.object({
  stock_number: z.string().min(1),
  variant_id: z.string().min(1),
  product_count: z.number().int().positive(),
  color_hex: z.string().optional(),
  color_label: z.string().optional(),
  main_option: z.string().optional(),
  secondary_option: z.string().optional(),
  piece_price: z.number().positive(),
  total_price: z.number().positive(),
  total_price_with_tax: z.number().positive(),
});

const invoiceSchema = z.object({
  full_name: z.string().min(1, 'Ad Soyad zorunlu'),
  email: z.string().email('Geçerli e-posta giriniz'),
  tckn: z
    .string()
    .length(11, 'TC Kimlik No 11 hane olmalıdır')
    .regex(/^\d+$/, 'TC Kimlik No sadece rakam içerebilir'),
  address: z.string().min(1, 'Adres zorunlu'),
  city: z.string().min(1, 'İl zorunlu'),
  district: z.string().optional(),
  phone: z.string().optional(),
  tax_office: z.string().optional(),
});

const CREATE_GUEST_ORDER_MUTATION = `
  mutation CreateGuestOrder($data: create_orders_input!) {
    create_orders_item(data: $data) {
      id
      stock_number
    }
  }
`;

type CreateOrderResult = {
  create_orders_item: { id: string; stock_number: string } | null;
};

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  const orderParsed = orderSchema.safeParse(body?.order);
  if (!orderParsed.success) {
    return NextResponse.json(
      { error: 'Geçersiz sipariş verisi.' },
      { status: 400 }
    );
  }

  const invoiceParsed = invoiceSchema.safeParse(body?.invoice);
  if (!invoiceParsed.success) {
    const firstError =
      invoiceParsed.error.issues[0]?.message ?? 'Geçersiz fatura bilgisi.';
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const directusUrl = (process.env.DIRECTUS_URL ?? '').replace(/\/$/, '');
  const adminToken = process.env.DIRECTUS_STATIC_TOKEN ?? '';

  // Create invoice_info without user relation using admin token
  const invoiceRes = await fetch(
    `${directusUrl}/items/invoice_info?fields=id`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ ...invoiceParsed.data, is_default: false }),
    }
  );

  if (!invoiceRes.ok) {
    const err = await invoiceRes.json().catch(() => ({}));
    console.error('[create-guest-order] invoice_info POST error:', err);
    return NextResponse.json(
      { error: 'Fatura bilgisi kaydedilemedi.' },
      { status: 500 }
    );
  }

  let invoiceInfoId: string | null = null;
  if (invoiceRes.status !== 204) {
    const invoiceJson = await invoiceRes.json().catch(() => null);
    invoiceInfoId = invoiceJson?.data?.id ?? null;
  }

  // Build order data — no user, invoice_info linked if we got the ID
  const { variant_id, ...orderFields } = orderParsed.data;
  const orderData: Record<string, unknown> = {
    ...orderFields,
    status: 'created',
    created_at: new Date().toISOString(),
    product: { id: variant_id },
    ...(invoiceInfoId ? { invoice_info: { id: invoiceInfoId } } : {}),
  };

  try {
    const data = await directusGraphqlQuery<CreateOrderResult>(
      CREATE_GUEST_ORDER_MUTATION,
      { data: orderData }
    );

    if (!data.create_orders_item) {
      throw new Error('Sipariş oluşturulamadı.');
    }

    return NextResponse.json({ order: data.create_orders_item });
  } catch (err) {
    console.error('[api/create-guest-order]', err);
    return NextResponse.json(
      { error: 'Sipariş oluşturulurken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
