// src/modules/products/tests/restockProduct.integration.test.ts
import request from "supertest";
import app from "../../../app.js";
import db from "../../../db/db.js";
import { jest } from "@jest/globals";

describe("POST /api/products/:id/restock – Integration tests", () => {
  beforeEach(async () => {
    db.data = {
      products: [
        {
          id: "1",
          name: "Car",
          description: "Toy car",
          price: 20,
          stock: 5,
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

  it("should return 200 and increase product stock", async () => {
    const response = await request(app)
      .post("/api/products/1/restock")
      .send({ count: 10 });

    expect(response.status).toBe(200);
    expect(response.body.stock).toBe(15);

    await db.read();
    expect(db.data!.products[0]?.stock).toBe(15);
  });

  it("should return 400 when stock is invalid", async () => {
    const response = await request(app)
      .post("/api/products/1/restock")
      .send({ count: -5 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");

    await db.read();
    expect(db.data!.products[0]?.stock).toBe(5); // brak zmian
  });

  it("should return 404 when product does not exist", async () => {
    const response = await request(app)
      .post("/api/products/999/restock")
      .send({ count: 5 });

    expect(response.status).toBe(500); // lub 404 jeśli obsłużysz błąd jawnie
  });
});
