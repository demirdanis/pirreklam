export interface SectoralProductLink {
  label: string;
  href: string;
}

export interface SectoralGroup {
  id: string;
  sectors: string[];
  products: SectoralProductLink[];
}

export interface SectoralProductsData {
  title: string;
  groups: SectoralGroup[];
}
