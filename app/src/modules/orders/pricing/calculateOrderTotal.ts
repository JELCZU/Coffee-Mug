import type { Product } from "../../products/types.js";
import type { Customer } from "../../customers/types.js";
import { isHolidayPL } from "./isHolidayPl.js";

type OrderItem = {
  product: Product;
  count: number;
};

export function calculateOrderTotal(
  items: OrderItem[],
  customer: Customer,
  date: Date
): { total: number; discountApplied?: string } {
  let subtotal = items.reduce((sum, i) => sum + i.product.price * i.count, 0);

  const totalCount = items.reduce((sum, i) => sum + i.count, 0);

  let discount = 0;
  let discountName: string | undefined;

  //Volume discount
  if (totalCount >= 50) {
    discount = 0.3;
    discountName = "VOLUME_30";
  } else if (totalCount >= 10) {
    discount = 0.2;
    discountName = "VOLUME_20";
  } else if (totalCount >= 5) {
    discount = 0.1;
    discountName = "VOLUME_10";
  }

  //Black Friday (29 Nov)
  const isBlackFriday = date.getMonth() === 10 && date.getDate() === 29;
  if (isBlackFriday && discount < 0.25) {
    discount = 0.25;
    discountName = "BLACK_FRIDAY";
  }

  //Polish holidays (2026)
  if (isHolidayPL(date) && discount < 0.15) {
    discount = 0.15;
    discountName = "POLISH_HOLIDAY";
  }

  // Location pricing
  if (customer.location === "EU") subtotal *= 1.15;
  if (customer.location === "ASIA") subtotal *= 0.95;

  const total = subtotal * (1 - discount);

  return {
    total: Number(total.toFixed(2)),
    discountApplied: discountName,
  };
}
