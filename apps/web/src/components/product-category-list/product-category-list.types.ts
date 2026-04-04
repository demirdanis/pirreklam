export interface ProductCategoryListData {
  subcategorySlug: string;
  categoryTitle: string;
  subcategoryTitle: string;
  breadcrumb: { label: string; href: string }[];
  subcategories: SubCategoryVariation[];
}

export interface FilterOption {
  id: string;
  label: string;
  hex?: string; // only for colors
}

export interface SubCategoryVariationProductItem {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  printOptions?: string[];
  // filter metadata – all distinct values across all variants
  mainOptions?: FilterOption[];
  secondaryOptions?: FilterOption[];
  colors?: FilterOption[];
}

export interface SubCategoryVariation {
  id: string;
  title: string;
  slug: string;
  products: SubCategoryVariationProductItem[];
}
