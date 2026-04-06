import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getUserFromToken } from '@/lib/auth';
import { z } from 'zod';

const FIELDS =
  'id,full_name,email,tckn,address,city,district,phone,tax_office,is_default,user';

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
  is_default: z.boolean().default(false),
});

function getEnv() {
  return {
    directusUrl: (process.env.DIRECTUS_URL ?? '').replace(/\/$/, ''),
    adminToken: process.env.DIRECTUS_STATIC_TOKEN ?? '',
  };
}

export async function GET() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get('auth_token')?.value;
  if (!userToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const me = await getUserFromToken(userToken);
  if (!me) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { directusUrl, adminToken } = getEnv();
  const url =
    `${directusUrl}/items/invoice_info` +
    `?filter[user][_eq]=${me.id}` +
    `&sort=-is_default` +
    `&fields=${FIELDS}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${adminToken}` },
    cache: 'no-store',
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Veri alınamadı.' }, { status: 500 });
  }

  const json = await res.json();
  return NextResponse.json(json?.data ?? []);
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get('auth_token')?.value;
  if (!userToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const me = await getUserFromToken(userToken);
  if (!me) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = invoiceSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Geçersiz veri.';
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const { directusUrl, adminToken } = getEnv();

  // If is_default, clear existing defaults first
  if (parsed.data.is_default) {
    await clearDefaultsForUser(me.id, null, directusUrl, adminToken);
  }

  // Explicitly set the user M2O field so filter[user][_eq] works on GET
  const payload = { ...parsed.data, user: me.id };
  console.log('POST invoice_info payload:', JSON.stringify(payload));
  console.log('me.id:', me.id);
  const res = await fetch(
    `${directusUrl}/items/invoice_info?fields=${FIELDS}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify(payload),
    }
  );

  console.log('POST invoice_info status:', res.status);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return NextResponse.json(
      { error: err?.errors?.[0]?.message ?? 'Oluşturma başarısız.' },
      { status: 500 }
    );
  }

  // Directus may return 204 No Content on successful creation — handle gracefully
  const json = res.status !== 204 ? await res.json().catch(() => null) : null;
  console.log('POST invoice_info response:', json);
  return NextResponse.json(json?.data ?? { success: true }, { status: 201 });
}

/** Clears is_default for all invoices of a user, except optionally one ID */
export async function clearDefaultsForUser(
  userId: string,
  exceptId: string | null,
  directusUrl: string,
  adminToken: string
) {
  // Find IDs to unset
  let filterUrl =
    `${directusUrl}/items/invoice_info` +
    `?filter[user][_eq]=${userId}` +
    `&filter[is_default][_eq]=true` +
    `&fields[]=id`;
  if (exceptId) {
    filterUrl += `&filter[id][_neq]=${exceptId}`;
  }

  const listRes = await fetch(filterUrl, {
    headers: { Authorization: `Bearer ${adminToken}` },
    cache: 'no-store',
  });
  if (!listRes.ok) return;

  const listJson = await listRes.json();
  const ids: string[] = (listJson?.data ?? []).map(
    (item: { id: string }) => item.id
  );
  if (ids.length === 0) return;

  await fetch(`${directusUrl}/items/invoice_info`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({ keys: ids, data: { is_default: false } }),
  });
}
