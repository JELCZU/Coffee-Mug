// modules/products/dto/get-products-response.dto.ts
import type { ProductDTO } from "./product.dto.js";

export interface GetProductsResponseDTO {
  products: ProductDTO[];
}
