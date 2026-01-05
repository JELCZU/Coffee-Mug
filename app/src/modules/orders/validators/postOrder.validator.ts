import { body } from "express-validator";
import { validateRequest } from "../../../middleware/validateRequest.js";

export const postOrderValidator = [
  body("customerId")
    .isString()
    .notEmpty()
    .withMessage("customerId is required"),

  body("products")
    .isArray({ min: 1 })
    .withMessage("products must be a non-empty array"),

  body("products.*.productId")
    .isString()
    .notEmpty()
    .withMessage("productId is required"),

  body("products.*.count")
    .isInt({ gt: 0 })
    .withMessage("count must be greater than 0"),

  validateRequest,
];
