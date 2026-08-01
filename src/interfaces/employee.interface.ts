import { Types } from "mongoose";

export interface IEmployee {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRegisterEmployeeDTO extends Pick<IEmployee, "name" | "email"> {
  password: string;
}

export interface ILoginEmployeeDTO extends Pick<IEmployee, "email"> {
  password: string;
}

export interface IRegisterResponse {
  _id: string;
  name: string;
  email: string;
}
