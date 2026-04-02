const ASSETS_URL = process.env.ASSETS_URL;

export const getImageUrl = (
  filename: string | null | undefined,
  noImageUrl?: string
): string => {
  if (!filename) return noImageUrl ?? '';
  const baseUrl = `${ASSETS_URL}/${filename}`;

  return baseUrl;
};
