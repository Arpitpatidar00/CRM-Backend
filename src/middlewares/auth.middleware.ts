import { Request, Response, NextFunction } from "express";
import { Employee } from "../models/Employee";
import { ApiError } from "../utils/ApiError";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return next(new ApiError(401, "Not authorized, no session"));
    }

    const user = await Employee.findById(userId)
      .select("-password")
      .lean();

    if (!user) {
      return next(new ApiError(401, "User no longer exists"));
    }

    req.user = user as any;
    next();
  } catch (error) {
    next(error);
  }
};
