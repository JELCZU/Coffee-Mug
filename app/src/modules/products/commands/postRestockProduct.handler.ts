import type { Request } from "express";
import db from "../../../db/db.js";
import type { ProductDTO } from "../dto/product.dto.js";
import type { PostRestockProductDTO } from "../dto/postRestockProduct.dto.js";
import { AppError } from "../../../errors/AppError.js";

export const postRestockProductHandler = async (
  req: Request<{ id: string }, {}, PostRestockProductDTO>
): Promise<ProductDTO> => {
  const productId = req.params.id;
  const { count } = req.body;

  if (!productId) {
    throw new AppError(400, "Product ID is required");
  }

  if (typeof count !== "number" || count <= 0) {
    throw new AppError(400, "Count must be a positive number");
  }

  const products = db.data?.products || [];
  const product = products.find((p) => p.id === productId);

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  product.stock += count;

  await db.write();

  return product;
};
