import { IEmployee } from "../interfaces/employee.interface";

declare global {
  namespace Express {
    interface Request {
      user?: IEmployee;
    }
  }
}
