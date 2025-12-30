import express from "express";
import { getProductsHandler } from "../products/queries/getProducts.handler.js";

const router = express.Router();

router.get("/products", (req, res) => {
  getProductsHandler;
});
router.post("/products", (req, res) => {
  res.json([]);
});

export default router;
