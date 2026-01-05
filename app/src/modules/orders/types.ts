export interface Order {
  id: string;
  customerId: string;
  products: {
    productId: string;
    count: number;
    unitPrice: number;
  }[];
  total: number;
  discountApplied?: string;
  createdAt: string;
}
