export interface FeaturedProduct {
  id: string;
  label: string;
  href: string;
}

export interface FeaturedProductsData {
  products: FeaturedProduct[];
}
