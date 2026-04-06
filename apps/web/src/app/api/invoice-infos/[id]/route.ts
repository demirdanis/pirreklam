import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { clearDefaultsForUser } from '../route';
import { cookies } from 'next/headers';
import { getUserFromToken } from '@/lib/auth';
import { z } from 'zod';

const FIELDS =
  'id,full_name,email,tckn,address,city,district,phone,tax_office,is_default';

const updateSchema = z.object({
  full_name: z.string().min(1, 'Ad Soyad zorunlu').optional(),
  email: z.string().email('Geçerli e-posta giriniz').optional(),
  tckn: z
    .string()
    .length(11, 'TC Kimlik No 11 hane olmalıdır')
    .regex(/^\d+$/, 'TC Kimlik No sadece rakam içerebilir')
    .optional(),
  address: z.string().min(1, 'Adres zorunlu').optional(),
  city: z.string().min(1, 'İl zorunlu').optional(),
  district: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  tax_office: z.string().optional().nullable(),
  is_default: z.boolean().optional(),
});

function getEnv() {
  return {
    directusUrl: (process.env.DIRECTUS_URL ?? '').replace(/\/$/, ''),
    adminToken: process.env.DIRECTUS_STATIC_TOKEN ?? '',
  };
}

/** Returns the invoice if it belongs to the user, otherwise null */
async function verifyOwnership(
  id: string,
  userId: string,
  directusUrl: string,
  adminToken: string
): Promise<boolean> {
  const res = await fetch(
    `${directusUrl}/items/invoice_info/${id}?fields[]=id&fields[]=user`,
    {
      headers: { Authorization: `Bearer ${adminToken}` },
      cache: 'no-store',
    }
  );
  if (!res.ok) return false;
  const json = await res.json();
  const userField = json?.data?.user;
  // user can be a string ID or an object { id }
  const ownerId = typeof userField === 'string' ? userField : userField?.id;
  return ownerId === userId;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

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
  const isOwner = await verifyOwnership(id, me.id, directusUrl, adminToken);
  if (!isOwner) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Geçersiz veri.';
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  // If setting as default, clear existing defaults first
  if (parsed.data.is_default === true) {
    await clearDefaultsForUser(me.id, id, directusUrl, adminToken);
  }

  const res = await fetch(
    `${directusUrl}/items/invoice_info/${id}?fields[]=${FIELDS}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify(parsed.data),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return NextResponse.json(
      { error: err?.errors?.[0]?.message ?? 'Güncelleme başarısız.' },
      { status: 500 }
    );
  }

  const json = await res.json();
  return NextResponse.json(json?.data ?? {});
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

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
  const isOwner = await verifyOwnership(id, me.id, directusUrl, adminToken);
  if (!isOwner) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const res = await fetch(`${directusUrl}/items/invoice_info/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${adminToken}` },
  });

  if (!res.ok && res.status !== 204) {
    return NextResponse.json({ error: 'Silme başarısız.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
