import express from "express";
import productRoutes from "./modules/products/routes.js";
import orderRoutes from "./modules/orders/routes.js";
// import routes from "./routes";
const app = express();
app.use(express.json()); // body parser
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
// app.use("/api", routes);
export default app;
//# sourceMappingURL=app.js.map