export interface ProductCategoryListData {
  subcategorySlug: string;
  categoryTitle: string;
  subcategoryTitle: string;
  breadcrumb: { label: string; href: string }[];
  subcategories: SubCategoryVariation[];
}

export interface SubCategoryVariationProductItem {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  printOptions?: string[];
}

export interface SubCategoryVariation {
  id: string;
  title: string;
  products: SubCategoryVariationProductItem[];
}
