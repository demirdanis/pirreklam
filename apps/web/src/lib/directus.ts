const ASSETS_URL = process.env.ASSETS_URL;

export type ImageInput =
  | { filename_disk?: string | null }
  | string
  | null
  | undefined;

export const getImageUrl = (input: ImageInput, noImageUrl?: string): string => {
  const filename =
    input !== null && typeof input === 'object' ? input.filename_disk : input;
  if (!filename) return noImageUrl ?? '';
  return `${ASSETS_URL}/${filename}`;
};
