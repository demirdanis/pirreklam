export interface OptionItem {
  id: string;
  label: string;
  /** Shown in the accordion below selector when this option is selected */
  description?: string;
}

export interface OptionGroup {
  title: string;
  options: OptionItem[];
}

export interface ColorOption {
  id: string;
  label: string;
  hex: string;
}

export interface TierPrice {
  qty: number;
  /** Per-unit price, VAT excluded */
  perUnitExVat: number;
}

export interface VariantData {
  /**
   * Key format:
   *  - with sub option : "{mainId}__{subId}__{colorId}"
   *  - without sub     : "{mainId}__{colorId}"
   */
  key: string;
  mainOptionId: string;
  subOptionId?: string;
  colorId: string;
  productCode: string;
  images: string[];
  videoUrl?: string;
  /** Single-piece price, VAT excluded */
  singleUnitPriceExVat: number;
  tiers: TierPrice[];
}

export interface RelatedProduct {
  id: string;
  title: string;
  imageUrl: string;
  href: string;
}

export interface ProductDetailData {
  slug: string;
  title: string;
  categorySlug: string;
  categoryTitle: string;
  subcategorySlug: string;
  subcategoryTitle: string;
  breadcrumb: { label: string; href: string }[];
  mainOptionGroup: OptionGroup;
  /** Nullable – not all products have sub-options */
  subOptionGroup?: OptionGroup;
  colors: ColorOption[];
  variants: VariantData[];
  relatedProducts: RelatedProduct[];
}
