import { Request, Response } from "express";
import * as authService from "./auth.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { IRegisterEmployeeDTO, ILoginEmployeeDTO, IRegisterResponse } from "../../interfaces/employee.interface";

export const register = asyncHandler(async (req: Request<{}, any, IRegisterEmployeeDTO>, res: Response) => {
  const result = await authService.registerEmployee(req.body);
  return new ApiResponse<IRegisterResponse>(201, "Employee Registered", result);
});

export const login = asyncHandler(async (req: Request<{}, any, ILoginEmployeeDTO>, res: Response) => {
  const employee = await authService.loginEmployee(req.body);
  
  // Attach session
  req.session.userId = employee._id.toString();

  return new ApiResponse(200, "Login successful", { employee: { _id: employee._id, name: employee.name, email: employee.email } });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  return new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) {
        return reject(err);
      }
      res.clearCookie("connect.sid");
      resolve(new ApiResponse(200, "Logout successful"));
    });
  });
});
