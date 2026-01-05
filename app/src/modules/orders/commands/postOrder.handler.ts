import type { Request } from "express";
import db from "../../../db/db.js";
import { v4 as uuidv4 } from "uuid";
import type { PostOrderDTO } from "../dto/postOrder.dto.js";
import type { OrderDTO } from "../dto/order.dto.js";
import { calculateOrderTotal } from "../pricing/calculateOrderTotal.js";
import { AppError } from "../../../errors/AppError.js";
import type { Order } from "../types.js";

export const postOrderHandler = async (
  req: Request<{}, {}, PostOrderDTO>
): Promise<OrderDTO> => {
  const { customerId, products } = req.body;

  const customer = db.data!.customers.find((c) => c.id === customerId);
  if (!customer) {
    throw new AppError(404, "Customer not found");
  }

  const resolvedProducts = products.map((item) => {
    const product = db.data!.products.find((p) => p.id === item.productId);

    if (!product) {
      throw new AppError(404, "Product not found");
    }

    if (product.stock < item.count) {
      throw new AppError(409, "Insufficient stock");
    }

    return {
      product,
      quantity: item.count,
    };
  });

  //zmniejszamy stock
  resolvedProducts.forEach(({ product, quantity }) => {
    product.stock -= quantity;
  });
  const orderProducts = resolvedProducts.map(({ product, quantity }) => ({
    productId: product.id,
    count: quantity,
    unitPrice: product.price,
  }));
  const pricing = calculateOrderTotal(
    resolvedProducts.map((p) => ({
      product: p.product,
      count: p.quantity,
    })),
    customer,
    new Date()
  );

  const order: Order = {
    id: uuidv4(),
    customerId,
    products: orderProducts,
    total: pricing.total,
    discountApplied: pricing.discountApplied,
    createdAt: new Date().toISOString(),
  };

  db.data!.orders.push(order);
  await db.write();

  return order;
};
