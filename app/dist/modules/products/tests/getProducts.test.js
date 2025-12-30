import request from "supertest";
import app from "../../../app.js";
import { getProductsHandler } from "../queries/getProducts.handler.js";
jest.mock("../queries/getProducts.handler.js");
describe("GET /products", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should return list of products", async () => {
        const mockProducts = {
            products: [
                {
                    id: "1",
                    name: "Coffee Mug",
                    description: "Nice mug",
                    price: 25,
                    stock: 10,
                },
            ],
        };
        // 🔹 Rzutujemy na MockedFunction
        getProductsHandler.mockResolvedValue(mockProducts);
        const response = await request(app).get("/products");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockProducts);
        expect(getProductsHandler).toHaveBeenCalledTimes(1);
    });
    it("should return 500 on handler error", async () => {
        getProductsHandler.mockRejectedValue(new Error("fail"));
        const response = await request(app).get("/products");
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Server error" });
    });
});
//# sourceMappingURL=getProducts.test.js.map