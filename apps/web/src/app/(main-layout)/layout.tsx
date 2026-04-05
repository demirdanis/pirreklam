import CategoryBar from '@/components/category-bar/category-bar';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import type { Metadata } from 'next';
import ScrollToTop from '@/components/scroll-to-top';
import { fontVariables } from '@/lib/fonts';
import { getCategoryBarDataWithCache } from './_helpers/service/getCategoryBar/getCategoryBar.service';
import { getFooterDataWithCache } from './_helpers/service/getFooter/getFooter.service';
import { getHeaderDataWithCache } from './_helpers/service/getHeader/getHeader.service';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.BASE_URL || 'https://pirreklam.com.tr';
  return {
    title: 'Pir Reklam',
    description: 'Pir Reklam',

    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },

    openGraph: {
      type: 'website',
      siteName: 'Pir Reklam',
      locale: 'tr_TR',
      url: baseUrl,
      images: [
        {
          url: `${baseUrl}/assets/og-default.jpg`,
          width: 1200,
          height: 628,
          alt: 'Pir Reklam',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [headerData, footerData, categoryBarData] = await Promise.all([
    getHeaderDataWithCache(),
    getFooterDataWithCache(),
    getCategoryBarDataWithCache(),
  ]);

  return (
    <html className={fontVariables}>
      <head></head>
      <body className="font-sans">
        <ScrollToTop />
        <div className="relative flex min-h-screen flex-col">
          <Header data={headerData} categories={categoryBarData.categories} />
          <CategoryBar data={categoryBarData} />
          <main className="flex-1">{children}</main>
          <Footer data={footerData} />
        </div>
      </body>
    </html>
  );
}
