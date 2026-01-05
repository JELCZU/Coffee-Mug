import express from "express";
import productRoutes from "./modules/products/routes.js";
import orderRoutes from "./modules/orders/routes.js";

import { errorHandler } from "./middleware/errorHandler.js";
const app = express();

app.use(express.json()); // body parser
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

app.use(errorHandler);

export default app;
