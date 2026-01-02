import request from "supertest";
import app from "../../../app.js";
import db from "../../../db/db.js";
import { jest } from "@jest/globals";

describe("POST /api/products – Integration tests", () => {
  beforeAll(async () => {
    await db.read();
  });

  beforeEach(async () => {
    await db.read();
    db.data = {
      products: [],
      orders: [],
    };
    await db.write();
    await new Promise((r) => setTimeout(r, 50)); // hack
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return 201 and create product when data is valid", async () => {
    const payload = {
      name: "Car 3",
      description: "Car 3",
      price: 25,
      stock: 10,
      category: "toys",
    };

    const response = await request(app).post("/api/products").send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      name: payload.name,
      description: payload.description,
      price: payload.price,
      stock: payload.stock,
      category: payload.category,
    });

    await db.read();
    expect(db.data!.products.length).toBe(1);
    expect(db.data!.products[0]?.name).toBe("Car 3");
  });

  it("should return 400 when validation fails", async () => {
    const invalidPayload = {
      name: "",
      price: -10,
      stock: -5,
    };

    const response = await request(app)
      .post("/api/products")
      .send(invalidPayload);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    console.log(response.body);
    expect(Array.isArray(response.body.errors)).toBe(true);

    await db.read();
    expect(db.data!.products.length).toBe(0);
  });
});
