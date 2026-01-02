import type { Request } from "express";
import type { CreateProductDTO } from "../dto/postCreateProduct.dto.js";
import db from "../../../db/db.js";
import { v4 as uuidv4 } from "uuid"; // do generowania unikalnego ID
import type { ProductDTO } from "../dto/product.dto.js";

export const postCreateProductHandler = async (
  req: Request<{}, {}, CreateProductDTO>
): Promise<ProductDTO> => {
  const { name, description, price, stock, category } = req.body;

  const newProduct: ProductDTO = {
    id: uuidv4(),
    name: name,
    description: description,
    price: price,
    stock: stock,
    category: category,
  };

  // Dodanie do bazy
  if (db.data!.products) {
    db.data!.products.push(newProduct);
  } else {
    db.data!.products = [newProduct];
  }
  await db.write();

  return newProduct;
};
