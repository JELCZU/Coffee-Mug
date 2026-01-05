import request from "supertest";
import app from "../../../app.js";
import db from "../../../db/db.js";

describe("POST /api/orders", () => {
  beforeEach(async () => {
    db.data = {
      customers: [
        {
          id: "c1",
          location: "EU",
        },
      ],
      products: [
        {
          id: "p1",
          name: "Mug",
          description: "Mug",
          price: 20,
          stock: 10,
          category: "kitchen",
        },
      ],
      orders: [],
    };

    await db.write();
  });

  it("should create order, reduce stock and return 201", async () => {
    const payload = {
      customerId: "c1",
      products: [
        {
          productId: "p1",
          count: 2,
        },
      ],
    };

    const response = await request(app).post("/api/orders").send(payload);
    console.log(response);
    expect(response.status).toBe(201);

    expect(response.body).toMatchObject({
      customerId: "c1",
      total: expect.any(Number),
    });

    expect(db.data!.orders).toHaveLength(1);
    expect(db.data!.products[0]!.stock).toBe(8);
  });

  it("should apply volume discount (10%)", async () => {
    const payload = {
      customerId: "c1",
      products: [
        {
          productId: "p1",
          count: 5,
        },
      ],
    };

    const response = await request(app).post("/api/orders").send(payload);

    expect(response.status).toBe(201);

    // 5 × 20 = 100 → 100*(100%-10%) = 90 → +15% VAT = 103.5
    expect(response.body.total).toBeCloseTo(103.5, 2);
    expect(response.body.discountApplied).toBe("VOLUME_10");
  });

  it("should return 409 when stock is insufficient", async () => {
    const payload = {
      customerId: "c1",
      products: [
        {
          productId: "p1",
          count: 50,
        },
      ],
    };

    const response = await request(app).post("/api/orders").send(payload);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error");

    expect(db.data!.orders).toHaveLength(0);
    expect(db.data!.products[0]!.stock).toBe(10);
  });

  it("should return 404 when product does not exist", async () => {
    const payload = {
      customerId: "c1",
      products: [
        {
          productId: "not-existing",
          count: 1,
        },
      ],
    };

    const response = await request(app).post("/api/orders").send(payload);

    expect(response.status).toBe(404);
  });

  it("should return 400 when validation fails", async () => {
    const response = await request(app).post("/api/orders").send({
      customerId: "",
      products: [],
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });
});
