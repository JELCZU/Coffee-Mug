export interface ProductDTO {
  productId: string;
  count: number;
  unitPrice: number;
}

export interface OrderDTO {
  id: string;
  customerId: string;
  products: ProductDTO[];
  total: number;
  discountApplied?: string;
  createdAt: string;
}
