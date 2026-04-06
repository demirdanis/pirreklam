// Tipler artık generated/graphql.ts'den geliyor.
// Bu dosya geriye dönük uyumluluk için korunuyor.

export interface OrderImage {
  small_image: string | null;
}

export interface OrderProduct {
  images: OrderImage[] | null;
}

export interface CargoCompany {
  name: string | null;
  cargo_tracking_url: string | null;
}

export interface OrderInvoiceInfo {
  full_name: string | null;
  tckn: string | null;
}

export interface Order {
  id: string;
  stock_number: string | null;
  product_count: number | null;
  color_hex: string | null;
  color_label: string | null;
  main_option: string | null;
  secondary_option: string | null;
  total_price: number | null;
  piece_price: number | null;
  total_price_with_tax: number | null;
  partial_payment_value: number | null;
  status: string | null;
  created_at: string | null;
  product: OrderProduct | null;
  cargo_tracking_number: string | null;
  cargo_company: CargoCompany | null;
  invoice_info: OrderInvoiceInfo | null;
}

export interface GetOrdersResult {
  orders: Order[];
  orders_aggregated: { count: { id: number } }[];
}

export interface GetOrdersVariables {
  limit: number;
  offset: number;
  userId?: string;
}
