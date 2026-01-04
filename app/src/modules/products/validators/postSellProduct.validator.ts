import { body } from "express-validator";
import { validateRequest } from "../../../middleware/validateRequest.js";

export const postSellValidator = [
  body("count").isInt({ gt: 0 }).withMessage("Count must be positive"),
  validateRequest,
];
