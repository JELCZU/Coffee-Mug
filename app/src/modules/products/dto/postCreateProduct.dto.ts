export interface PostCreateProductDTO {
  name: string;
  description: string;
  price: number;
  stock: number;
  category?: string;
}
