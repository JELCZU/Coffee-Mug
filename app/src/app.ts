import express from "express";
import productRoutes from "./modules/products/routes.js";

import orderRoutes from "./modules/orders/routes.js";

const app = express();

app.use(express.json()); // body parser
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).json({ error: err || "Server error" });
});
export default app;
