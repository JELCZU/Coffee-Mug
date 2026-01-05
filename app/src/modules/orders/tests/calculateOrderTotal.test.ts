// calculateOrderTotal.test.ts
import { calculateOrderTotal } from "../pricing/calculateOrderTotal.js";
import type { Product } from "../../products/types.js";
import type { Customer } from "../../customers/types.js";

const product: Product = {
  id: "p1",
  name: "Mug",
  price: 20,
  stock: 100,
  category: "toys",
  description: "",
};

const euCustomer: Customer = {
  id: "c1",
  location: "EU",
};

describe("calculateOrderTotal", () => {
  it("applies 10% volume discount for 5 items", () => {
    const result = calculateOrderTotal(
      [{ product, count: 5 }],
      euCustomer,
      new Date("2026-01-10")
    );

    //5 * 20 = 100
    //-10% = 90
    //+15% VAT = 103.5
    expect(result.total).toBeCloseTo(103.5);
    expect(result.discountApplied).toBe("VOLUME_10");
  });

  it("applies Black Friday discount over volume", () => {
    const result = calculateOrderTotal(
      [{ product, count: 10 }],
      euCustomer,
      new Date("2026-11-29")
    );

    //Volume = 20%, BF = 25% → BF wins
    expect(result.discountApplied).toBe("BLACK_FRIDAY");
  });

  it("applies Polish holiday discount", () => {
    const result = calculateOrderTotal(
      [{ product, count: 1 }],
      euCustomer,
      new Date("2026-05-01")
    );

    expect(result.discountApplied).toBe("POLISH_HOLIDAY");
  });

  it("applies ASIA pricing reduction", () => {
    const asiaCustomer: Customer = {
      id: "c2",
      location: "ASIA",
    };

    const result = calculateOrderTotal(
      [{ product, count: 1 }],
      asiaCustomer,
      new Date("2026-01-10")
    );

    //20 -5% = 19
    expect(result.total).toBeCloseTo(19);
  });
});
