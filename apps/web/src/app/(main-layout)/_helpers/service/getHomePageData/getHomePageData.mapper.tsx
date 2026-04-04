import type { GetHomePageDataQuery } from '@/generated/graphql';
import type { HeroCarouselData } from '@/components/hero-carousel/hero-carousel.types';
import type { PopularProductsData } from '@/components/popular-products/popular-products.types';
import type { SectoralProductsData } from '@/components/sectoral-products/sectoral-products.types';
import { getImageUrl } from '@/lib/directus';

export interface HomePageData {
  banners: HeroCarouselData;
  sectoralProducts: SectoralProductsData;
  popularSubCategories: PopularProductsData;
}

export function GetHomePageDataMapper(
  data: GetHomePageDataQuery
): HomePageData {
  const banners: HeroCarouselData = {
    slides: (data.page__home?.banners ?? []).map((banner) => ({
      id: banner?.id ?? '',
      badge: banner?.category ?? undefined,
      title: banner?.title ?? '',
      subtitle: banner?.description ?? '',
      ctaLabel: banner?.button_text ?? '',
      ctaHref: banner?.button_url ?? '',
      imageUrl: getImageUrl(banner?.web_image),
      imageAlt: banner?.title ?? '',
    })),
  };

  const sectoralProducts: SectoralProductsData = {
    title: 'Sektörel Ürünler',
    groups: (data.sectors ?? []).map((sector) => ({
      id: sector.id,
      sectors: [sector.name ?? ''],
      imageUrl: getImageUrl(sector.web_image),
      products: (data.page__home?.sectoral_sub_categories ?? [])
        .filter((subCat) =>
          (subCat?.sector ?? []).some((s) => s?.sectors_id?.id === sector.id)
        )
        .map((subCat) => ({
          label: subCat?.name ?? '',
          href: `/${subCat?.slug ?? ''}`,
        })),
    })),
  };

  const popuparSubCategories: PopularProductsData = {
    title: 'Popüler Ürünler',
    subtitle: 'En çok satan ürünlerimiz',
    products: (data.page__home?.popular_sub_categories ?? []).map((subCat) => ({
      id: subCat?.id ?? '',
      title: subCat?.name ?? '',
      href: `/${subCat?.slug ?? ''}`,
      imageUrl: getImageUrl(subCat?.card_image),
      imageAlt: subCat?.name ?? '',
    })),
  };
  return {
    banners,
    sectoralProducts,
    popularSubCategories: popuparSubCategories,
  };
}
