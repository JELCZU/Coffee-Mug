export interface OrderProduct {
  productId: string;
  count: number;
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
