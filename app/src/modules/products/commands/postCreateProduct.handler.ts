import db from "../../../db/db.js";
import { v4 as uuidv4 } from "uuid"; // do generowania unikalnego ID
import type { ProductDTO } from "../dto/product.dto.js";
import type { CreateProductDTO } from "../dto/postCreateProduct.dto.js";

// Handler tworzenia produktu
export const postCreateProductHandler = async (
  input: CreateProductDTO
): Promise<ProductDTO> => {
  // Walidacja (prosta)
  if (input.name.length > 50) {
    throw new Error("Name too long (max 50 chars)");
  }
  if (input.price <= 0) {
    throw new Error("Price must be positive");
  }

  const newProduct: ProductDTO = {
    id: uuidv4(),
    name: input.name,
    description: input.description,
    price: input.price,
    stock: input.stock,
    category: input.category,
  };

  // Dodanie do bazy
  db.data!.products.push(newProduct);
  await db.write();

  return newProduct;
};
