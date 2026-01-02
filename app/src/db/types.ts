export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category?: string;
}
export interface OrderProduct {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  customerId: string;
  products: OrderProduct[];
  total: number;
  discountApplied?: string;
  createdAt: string;
}
export interface DatabaseSchema {
  products?: Product[];
  orders?: Order[];
}
