import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { directusGraphqlQuery } from '@/lib/graphql-client';
import { getUserFromToken } from '@/lib/auth';
import { z } from 'zod';

const schema = z.object({
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
  invoice_info_id: z.string().optional(),
});

const CREATE_ORDER_MUTATION = `
  mutation CreateOrder($data: create_orders_input!) {
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
  const cookieStore = await cookies();
  const userToken = cookieStore.get('auth_token')?.value;

  if (!userToken) {
    return NextResponse.json(
      { error: 'Giriş yapmanız gerekmektedir.' },
      { status: 401 }
    );
  }

  // Verify identity via Directus /users/me — the user ID comes from Directus,
  // never from the client request, so it cannot be spoofed.
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
    return NextResponse.json(
      { error: 'Geçersiz sipariş verisi.' },
      { status: 400 }
    );
  }

  try {
    const { variant_id, invoice_info_id, ...orderFields } = parsed.data;

    // Use admin token for the mutation, but embed the verified user ID so the
    // order is always tied to the authenticated user.
    const data = await directusGraphqlQuery<CreateOrderResult>(
      CREATE_ORDER_MUTATION,
      {
        data: {
          ...orderFields,
          status: 'created',
          created_at: new Date().toISOString(),
          user: { id: me.id },
          product: { id: variant_id },
          ...(invoice_info_id ? { invoice_info: { id: invoice_info_id } } : {}),
        },
      }
    );

    if (!data.create_orders_item) {
      throw new Error('Sipariş oluşturulamadı.');
    }

    return NextResponse.json({ order: data.create_orders_item });
  } catch (err) {
    console.error('[api/create-order]', err);
    return NextResponse.json(
      { error: 'Sipariş oluşturulurken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
