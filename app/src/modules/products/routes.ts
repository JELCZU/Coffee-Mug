import express from "express";
import { getProductsHandler } from "./queries/getProducts.handler.js";
import { createProductValidator } from "./validators/createProduct.validator.js";
import { postCreateProductHandler } from "./commands/postCreateProduct.handler.js";
import { postRestockProductHandler } from "./commands/postRestockProduct.handler.js";
import type { Request, Response, NextFunction } from "express";
import { postRestockValidator } from "./validators/postRestockProduct.validator.js";
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
  createProductValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await postCreateProductHandler(req);

      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  "/products/:id/restock",
  postRestockValidator,
  async (
    req: Request<{ id: string }, {}, { count: number }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const product = await postRestockProductHandler(req);
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
