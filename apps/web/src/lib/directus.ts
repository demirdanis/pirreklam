const ASSETS_URL = process.env.ASSETS_URL;

export const getImageUrl = (filename: string | null | undefined): string => {
  if (!filename) return '';
  const baseUrl = `${ASSETS_URL}/${filename}`;

  return baseUrl;
};
