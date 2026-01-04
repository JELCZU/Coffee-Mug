import request from "supertest";
import db from "../../../db/db.js";

describe("POST /api/products", () => {
  beforeEach(async () => {
    db.data = {
      products: [],
      orders: [],
    };

    await db.write();
  });

  test("should return 201 and create product when data is valid", async () => {
    const { default: app } = await import("../../../app.js");
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

    expect(db.data!.products).toHaveLength(1);
    expect(db.data!.products[0]).toMatchObject({
      name: "Car 3",
    });
  });

  test("should return 400 when validation fails", async () => {
    const { default: app } = await import("../../../app.js");
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
    expect(Array.isArray(response.body.errors)).toBe(true);

    await db.read();
    expect(db.data!.products).toHaveLength(0);
  });
});
