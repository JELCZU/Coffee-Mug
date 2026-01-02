import express from "express";
import { getProductsHandler } from "./queries/getProducts.handler.js";
import { createProductValidator } from "./validators/createProduct.validator.js";
import { postCreateProductHandler } from "./commands/postCreateProduct.handler.js";
import type { Request, Response, NextFunction } from "express";
const router = express.Router();

router.get(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await getProductsHandler();
      res.json(products);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  "/products",
  createProductValidator, // ✅ middleware
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await postCreateProductHandler(req);

      res.status(201).json(product); // ✅ kończy request
    } catch (err) {
      next(err);
    }
  }
);

export default router;
