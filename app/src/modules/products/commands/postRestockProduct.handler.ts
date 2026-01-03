import type { Request } from "express";
import db from "../../../db/db.js";
import type { ProductDTO } from "../dto/product.dto.js";
import type { RestockProductDTO } from "../dto/postRestockProduct.dto.js";

export const postRestockProductHandler = async (
  req: Request<{ id: string }, {}, RestockProductDTO>
): Promise<ProductDTO> => {
  const productId = req.params.id;

  const { count } = req.body;
  console.log(productId);
  console.log(count);
  if (!productId) {
    throw new Error("Product ID is required");
  }

  if (!count || count <= 0) {
    throw new Error("Quantity must be a positive number");
  }

  // Znajdujemy produkt w bazie
  const products = db.data?.products || [];
  const productIndex = products.findIndex((p) => p.id === productId);
  console.log(products[productIndex]);
  if (productIndex === -1 || !products[productIndex]) {
    throw new Error("Product not found");
  }

  // Zwiększa stock
  products[productIndex].stock += count;

  // Zapisuje zmiany do pliku
  await db.write();

  // Zaktualizowany produkt
  return products[productIndex];
};
