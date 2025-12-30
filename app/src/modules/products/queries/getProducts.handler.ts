import db from "../../../db/db.js";
import type { GetProductsResponseDTO } from "../dto/getProductsResponse.dto.js";

export const getProductsHandler = async (): Promise<GetProductsResponseDTO> => {
  const products = db.data?.products ?? [];
  return {
    products: products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
    })),
  };
};
