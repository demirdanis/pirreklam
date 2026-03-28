import HeroCarousel from '@/components/hero-carousel/hero-carousel';
import PopularProducts from '@/components/popular-products/popular-products';
import SectoralProducts from '@/components/sectoral-products/sectoral-products';
import { getHeroCarouselData } from './_helpers/service/getHeroCarousel/getHeroCarousel.mock';
import { getPopularProductsData } from './_helpers/service/getPopularProducts/getPopularProducts.mock';
import { getSectoralProductsData } from './_helpers/service/getSectoralProducts/getSectoralProducts.mock';

export default async function HomePage() {
  const [heroData, sectoralData, popularData] = await Promise.all([
    getHeroCarouselData(),
    getSectoralProductsData(),
    getPopularProductsData(),
  ]);

  return (
    <>
      <HeroCarousel data={heroData} />
      <SectoralProducts data={sectoralData} />
      <PopularProducts data={popularData} />
    </>
  );
}
