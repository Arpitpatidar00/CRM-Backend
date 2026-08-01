import { Schema, model } from "mongoose";
import { IEmployee } from "../interfaces/employee.interface";

const employeeSchema = new Schema<IEmployee>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Employee = model<IEmployee>("Employee", employeeSchema);
