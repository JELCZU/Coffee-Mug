import { body } from "express-validator";
import { validateRequest } from "../../../middleware/validateRequest.js";

export const postRestockValidator = [
  body("count").isInt({ gt: 0 }).withMessage("Stock must be positive"),
  validateRequest,
];
