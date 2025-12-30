import express from "express";
import { getProductsHandler } from "./queries/getProducts.handler.js";
const router = express.Router();
router.get("/products", async (req, res) => {
    try {
        const products = await getProductsHandler();
        console.log(products);
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});
router.post("/products", async (req, res) => {
    // createProductValidator;
    // const product = await postCreateProductHandler(req);
    // if (product) {
    //   res.status(201);
    // } else {
    //   res.status(500).json({ error: "Server error" });
    // }
});
export default router;
//# sourceMappingURL=routes.js.map