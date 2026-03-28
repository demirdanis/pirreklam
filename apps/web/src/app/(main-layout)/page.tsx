import BankaHesaplari from '@/components/banka-hesaplari/banka-hesaplari';
import HeroCarousel from '@/components/hero-carousel/hero-carousel';
import Iletisim from '@/components/iletisim/iletisim';
import Kurumsal from '@/components/kurumsal/kurumsal';
import PopularProducts from '@/components/popular-products/popular-products';
import SectoralProducts from '@/components/sectoral-products/sectoral-products';
import { getBankaHesaplariMock } from './_helpers/service/getBankaHesaplari/getBankaHesaplari.mock';
import { getHeroCarouselData } from './_helpers/service/getHeroCarousel/getHeroCarousel.mock';
import { getIletisimMock } from './_helpers/service/getIletisim/getIletisim.mock';
import { getKurumsalData } from './_helpers/service/getKurumsal/getKurumsal.mock';
import { getPopularProductsData } from './_helpers/service/getPopularProducts/getPopularProducts.mock';
import { getSectoralProductsData } from './_helpers/service/getSectoralProducts/getSectoralProducts.mock';

export default async function HomePage() {
  const [heroData, sectoralData, popularData, kurumsalData] = await Promise.all(
    [
      getHeroCarouselData(),
      getSectoralProductsData(),
      getPopularProductsData(),
      getKurumsalData(),
    ]
  );

  const iletisimData = getIletisimMock();
  const bankaData = getBankaHesaplariMock();

  return (
    <>
      <HeroCarousel data={heroData} />
      <SectoralProducts data={sectoralData} />
      <PopularProducts data={popularData} />
      <Kurumsal data={kurumsalData} />
      <Iletisim data={iletisimData} />
      <BankaHesaplari data={bankaData} />
    </>
  );
}
