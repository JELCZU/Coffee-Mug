import express from "express";
import { postOrderValidator } from "./validators/postOrder.validator.js";
import { postOrderHandler } from "./commands/postOrder.handler.js";

import type { Request, Response, NextFunction } from "express";
const router = express.Router();

router.post(
  "/orders",
  postOrderValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await postOrderHandler(req);

      res.status(201).json(order);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
