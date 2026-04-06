import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getUserFromToken } from '@/lib/auth';
import { z } from 'zod';

const schema = z.object({
  first_name: z.string().min(1).max(100),
  last_name: z.string().min(1).max(100),
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

  console.log('userToken', userToken);

  const { directusUrl } = getEnv();
  const res = await fetch(
    `${directusUrl}/users/me?fields=id,email,first_name,last_name`,
    {
      headers: { Authorization: `Bearer ${userToken}` },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const json = await res.json();

  console.log('json', json);
  return NextResponse.json(json?.data ?? {});
}

export async function PATCH(req: NextRequest) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get('auth_token')?.value;
  if (!userToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const me = await getUserFromToken(userToken);
  if (!me) {
    return NextResponse.json(
      { error: 'Oturum geçersiz. Lütfen tekrar giriş yapın.' },
      { status: 401 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Geçersiz veri.' }, { status: 400 });
  }

  const { directusUrl, adminToken } = getEnv();
  const res = await fetch(`${directusUrl}/users/${me.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify(parsed.data),
  });

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
