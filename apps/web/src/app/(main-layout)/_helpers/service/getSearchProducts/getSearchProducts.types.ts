export interface SearchProductItem {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
}

export type SearchProductsResult = SearchProductItem[];
