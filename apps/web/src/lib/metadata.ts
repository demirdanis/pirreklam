// import type { Metadata } from 'next';
// import { getImageUrl } from './directus';

// export async function generateMetadataUtil<TMeta extends Seo>(
//   meta: TMeta
// ): Promise<Metadata> {
//   return {
//     title: meta?.translations?.[0]?.title,
//     description: meta?.translations?.[0]?.description,
//     openGraph: {
//       type: 'website',
//       siteName: 'Pir Reklam',
//       locale: 'tr_TR',
//       url: `${process.env.BASE_URL}`,
//       title: meta?.translations?.[0]?.title,
//       description: meta?.translations?.[0]?.description,
//       images: [
//         {
//           url: meta?.translations?.[0]?.og_image
//             ? getImageUrl(meta.translations?.[0].og_image.filename_disk)
//             : `${process.env.BASE_URL}/assets/og-default.jpg`,
//           width: 1200,
//           height: 628,
//           alt: 'Pir Reklam',
//         },
//       ],
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: meta?.translations?.[0]?.title,
//       description: meta?.translations?.[0]?.description,
//       images: meta?.translations?.[0]?.og_image
//         ? [getImageUrl(meta.translations?.[0].og_image.filename_disk)]
//         : [],
//     },
//   };
// }
