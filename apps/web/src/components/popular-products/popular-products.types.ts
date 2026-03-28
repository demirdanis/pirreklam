export interface PopularProduct {
  id: string;
  title: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
}

export interface PopularProductsData {
  title: string;
  subtitle: string;
  products: PopularProduct[];
}
