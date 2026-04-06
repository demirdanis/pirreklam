import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi giriniz.'),
  redirectUrl: z.string().optional(),
});

function getEnv() {
  return {
    DIRECTUS_URL: (process.env.DIRECTUS_URL ?? '').replace(/\/$/, ''),
    ADMIN_TOKEN: process.env.DIRECTUS_STATIC_TOKEN ?? '',
    CUSTOMER_ROLE_ID: process.env.DIRECTUS_CUSTOMER_ROLE_ID ?? '',
    BASE_URL: process.env.BASE_URL ?? '',
  };
}

async function directusFetch(path: string, options: RequestInit = {}) {
  const { DIRECTUS_URL, ADMIN_TOKEN } = getEnv();
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ADMIN_TOKEN}`,
      ...(options.headers as Record<string, string>),
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Directus ${path} → ${res.status}: ${body}`);
  }

  return res.json();
}

async function findOrCreateUser(email: string): Promise<string> {
  // Kullanıcıyı ara
  const searchRes = await directusFetch(
    `/users?filter[email][_eq]=${encodeURIComponent(email)}&fields=id`
  );

  if (searchRes.data && searchRes.data.length > 0) {
    return searchRes.data[0].id as string;
  }

  // Rol ID'si yoksa name'e göre ara
  let roleId = getEnv().CUSTOMER_ROLE_ID;
  if (!roleId) {
    const rolesRes = await directusFetch(
      `/roles?filter[name][_eq]=customer&fields=id`
    );
    if (!rolesRes.data || rolesRes.data.length === 0) {
      throw new Error(
        '"customer" rolü Directus\'ta bulunamadı. Lütfen önce bu rolü oluşturun.'
      );
    }
    roleId = rolesRes.data[0].id as string;
  }

  // Yeni kullanıcı oluştur
  const createRes = await directusFetch('/users', {
    method: 'POST',
    body: JSON.stringify({
      email,
      role: roleId,
      status: 'active',
    }),
  });

  return createRes.data.id as string;
}

async function generateAndSaveToken(userId: string): Promise<string> {
  const token = randomBytes(32).toString('hex');

  await directusFetch(`/users/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify({ token }),
  });

  return token;
}

async function sendMagicLinkEmail(
  email: string,
  token: string,
  redirectUrl?: string
) {
  const callbackUrl = new URL(`${getEnv().BASE_URL}/auth/callback`);
  callbackUrl.searchParams.set('token', token);
  if (redirectUrl) callbackUrl.searchParams.set('redirectUrl', redirectUrl);
  const magicLink = callbackUrl.toString();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? '"Pir Reklam" <no-reply@pirreklam.com.tr>',
    to: email,
    subject: 'Pir Reklam – Giriş Linkiniz',
    html: `
      <!DOCTYPE html>
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
                  <td style="background:#cc0636;padding:32px 40px;text-align:center;">
                    <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:bold;letter-spacing:1px;">
                      PİR REKLAM
                    </h1>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding:40px;color:#333333;">
                    <h2 style="margin:0 0 16px;font-size:20px;color:#16223f;">Giriş Linkiniz Hazır</h2>
                    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#555555;">
                      Merhaba,<br/><br/>
                      Pir Reklam hesabınıza giriş yapmak için aşağıdaki butona tıklayın.
                      Bu link <strong>15 dakika</strong> geçerlidir ve yalnızca bir kez kullanılabilir.
                    </p>
                    <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
                      <tr>
                        <td style="background:#cc0636;border-radius:6px;padding:14px 32px;">
                          <a href="${magicLink}"
                             style="color:#ffffff;text-decoration:none;font-size:16px;font-weight:bold;display:block;">
                            Giriş Yap
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:0 0 8px;font-size:13px;color:#888888;">
                      Butona tıklayamıyor musunuz? Aşağıdaki linki tarayıcınıza kopyalayın:
                    </p>
                    <p style="margin:0;font-size:12px;color:#aaaaaa;word-break:break-all;">
                      ${magicLink}
                    </p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background:#f8f8f8;padding:20px 40px;text-align:center;border-top:1px solid #eeeeee;">
                    <p style="margin:0;font-size:12px;color:#aaaaaa;">
                      Bu e-postayı siz talep etmediyseniz güvenle görmezden gelebilirsiniz.<br/>
                      © ${new Date().getFullYear()} Pir Reklam
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    text: `Pir Reklam giriş linkiniz:\n\n${magicLink}\n\nBu e-postayı siz talep etmediyseniz görmezden gelebilirsiniz.`,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Geçersiz istek.' },
        { status: 400 }
      );
    }

    const { email, redirectUrl } = parsed.data;

    const userId = await findOrCreateUser(email);
    const token = await generateAndSaveToken(userId);
    await sendMagicLinkEmail(email, token, redirectUrl);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[api/login]', err);
    return NextResponse.json(
      { error: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
