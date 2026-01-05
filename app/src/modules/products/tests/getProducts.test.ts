import request from "supertest";
import app from "../../../app.js";
import db from "../../../db/db.js";
import { getProductsHandler } from "../queries/getProducts.handler.js";
import { jest } from "@jest/globals";

describe("GET /api/products", () => {
  beforeAll(async () => {
    await db.read();
  });

  beforeEach(async () => {
    db.data = {
      orders: [],
      customers: [],
      products: [
        { id: "1", name: "Car 1", description: "Car 1", price: 25, stock: 10 },
        { id: "2", name: "Car 2", description: "Car 2", price: 35, stock: 20 },
      ],
    };
    await db.write();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return 200 and list of products", async () => {
    const { default: app } = await import("../../../app.js");
    const response = await request(app).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(2);
  });

  test("should return 200 and empty array when no products", async () => {
    db.data = {
      customers: [],
      products: [],
      orders: [],
    };
    await db.write();

    const { default: app } = await import("../../../app.js");

    const response = await request(app).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ products: [] });
  });
});
