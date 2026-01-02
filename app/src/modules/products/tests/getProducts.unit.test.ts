import { getProductsHandler } from "../queries/getProducts.handler.js";
import db from "../../../db/db.js";
import type { GetProductsResponseDTO } from "../dto/getProductsResponse.dto.js";
import { jest } from "@jest/globals";

describe("getProductsHandler - UNIT TESTS", () => {
  const originalData = db.data;

  afterEach(() => {
    db.data = originalData;
  });

  it("should return mapped products from db", async () => {
    db.data = {
      orders: [],
      products: [
        {
          id: "1",
          name: "Coffee Mug",
          description: "Ceramic mug",
          price: 25,
          stock: 10,
        },
      ],
    };

    const result = await getProductsHandler();

    expect(result).toEqual({
      products: [
        {
          id: "1",
          name: "Coffee Mug",
          description: "Ceramic mug",
          price: 25,
          stock: 10,
        },
      ],
    });
  });

  it("should return empty array when there are no products", async () => {
    db.data = { orders: [], products: [] };

    const result = await getProductsHandler();
    expect(result.products).toEqual([]);
  });
});
