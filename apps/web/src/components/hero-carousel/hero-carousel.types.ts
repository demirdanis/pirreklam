export interface HeroSlide {
  id: string;
  badge?: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
  imageAlt: string;
}

export interface HeroCarouselData {
  slides: HeroSlide[];
}
