/**
 * Kullanıcının static token'ı ile Directus /users/me endpoint'ini çağırır.
 * Kullanıcının id ve email bilgisini döner.
 */
export async function getUserFromToken(
  token: string
): Promise<{ id: string; email: string } | null> {
  const directusUrl = process.env.DIRECTUS_URL?.replace(/\/$/, '');
  if (!directusUrl || !token) return null;

  try {
    const res = await fetch(`${directusUrl}/users/me?fields=id,email`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}
