import { DM_Mono, Noto_Serif, Open_Sans, Sora } from 'next/font/google';

export const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const sora = Sora({
  subsets: ['latin'],
  variable: '--font-alt',
  display: 'swap',
});

export const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const fontVariables = `${openSans.variable} ${notoSerif.variable} ${sora.variable} ${dmMono.variable}`;
