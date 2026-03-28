export interface CategorySubItem {
  label: string;
  href: string;
}

export interface Category {
  id: string;
  label: string;
  href: string;
  subItems: CategorySubItem[];
}

export interface CategoryBarData {
  categories: Category[];
}
