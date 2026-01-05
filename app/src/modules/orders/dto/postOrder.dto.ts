export interface PostOrderDTO {
  customerId: string;
  products: {
    productId: string;
    count: number;
  }[];
}
