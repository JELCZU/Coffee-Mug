import type { Request } from "express";
import db from "../../../db/db.js";
import type { ProductDTO } from "../dto/product.dto.js";
import type { PostSellProductDTO } from "../dto/postSellProduct.dto.js";
import { AppError } from "../../../errors/AppError.js";

export const postSellProductHandler = async (
  req: Request<{ id: string }, {}, PostSellProductDTO>
): Promise<ProductDTO> => {
  const { id } = req.params;
  const { count } = req.body;

  const products = db.data?.products ?? [];
  const product = products.find((p) => p.id === id);

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  if (count <= 0) {
    throw new AppError(400, "Count must be a positive number");
  }

  if (count > product.stock) {
    throw new AppError(400, "Not enough stock");
  }

  product.stock -= count;
  await db.write();

  return product;
};
