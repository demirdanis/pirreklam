import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { clearDefaultsForUser } from '../../route';
import { cookies } from 'next/headers';
import { getUserFromToken } from '@/lib/auth';

function getEnv() {
  return {
    directusUrl: (process.env.DIRECTUS_URL ?? '').replace(/\/$/, ''),
    adminToken: process.env.DIRECTUS_STATIC_TOKEN ?? '',
  };
}

export async function POST(
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

  // Verify ownership
  const checkRes = await fetch(
    `${directusUrl}/items/invoice_info/${id}?fields[]=id&fields[]=user`,
    {
      headers: { Authorization: `Bearer ${adminToken}` },
      cache: 'no-store',
    }
  );
  if (!checkRes.ok) {
    return NextResponse.json(
      { error: 'Fatura bilgisi bulunamadı.' },
      { status: 404 }
    );
  }
  const checkJson = await checkRes.json();
  const userField = checkJson?.data?.user;
  const ownerId = typeof userField === 'string' ? userField : userField?.id;
  if (ownerId !== me.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Clear all other defaults for this user
  await clearDefaultsForUser(me.id, id, directusUrl, adminToken);

  // Set this one as default
  const res = await fetch(`${directusUrl}/items/invoice_info/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({ is_default: true }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Varsayılan olarak ayarlanamadı.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
