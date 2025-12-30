import { body } from "express-validator";
import { validateRequest } from "../../../middleware/validateRequest.js";

export const createProductValidator = [
  body("name")
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage("Name is required and must be max 50 characters"),

  body("description")
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage("Description is required and must be max 50 characters"),

  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  body("stock").isInt({ min: 0 }).withMessage("Stock must be 0 or greater"),

  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string"),

  validateRequest,
];
