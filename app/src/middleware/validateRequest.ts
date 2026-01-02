import { validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: result.array(),
    });
  }

  next();
};
