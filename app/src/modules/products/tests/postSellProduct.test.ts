// src/modules/products/tests/sellProduct.integration.test.ts
import request from "supertest";
import db from "../../../db/db.js";
import { jest } from "@jest/globals";

describe("POST /api/products/:id/sell", () => {
  beforeEach(async () => {
    db.data = {
      products: [
        {
          id: "1",
          name: "Car",
          description: "Toy car",
          price: 20,
          stock: 10,
          category: "toys",
        },
      ],
      orders: [],
    };
    await db.write();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return 200 and decrease product stock", async () => {
    const { default: app } = await import("../../../app.js");
    const response = await request(app)
      .post("/api/products/1/sell")
      .send({ count: 3 });

    expect(response.status).toBe(200);
    expect(response.body.stock).toBe(7);

    await db.read();
    expect(db.data!.products[0]!.stock).toBe(7);
  });

  test("should return 400 when count is invalid", async () => {
    const { default: app } = await import("../../../app.js");
    const response = await request(app)
      .post("/api/products/1/sell")
      .send({ count: -5 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");

    await db.read();
    expect(db.data!.products[0]!.stock).toBe(10); // brak zmian
  });

  test("should return 400 when count exceeds stock", async () => {
    const { default: app } = await import("../../../app.js");
    const response = await request(app)
      .post("/api/products/1/sell")
      .send({ count: 50 });

    expect(response.status).toBe(400);

    await db.read();
    expect(db.data!.products[0]!.stock).toBe(10);
  });

  test("should return 404 when product does not exist", async () => {
    const { default: app } = await import("../../../app.js");
    const response = await request(app)
      .post("/api/products/999/sell")
      .send({ count: 2 });

    expect(response.status).toBe(404);
  });
});
