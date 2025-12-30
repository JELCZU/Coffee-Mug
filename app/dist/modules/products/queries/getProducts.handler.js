import db from "../../../db/db.js";
export const getProductsHandler = async () => {
    const products = db.data?.products ?? [];
    return {
        products: products.map((p) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            price: p.price,
            stock: p.stock,
        })),
    };
};
//# sourceMappingURL=getProducts.handler.js.map