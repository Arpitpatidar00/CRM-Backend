import { Employee } from "../../models/Employee";
import { hashPassword, comparePassword } from "../../utils/bcrypt";
import { ApiError } from "../../utils/ApiError";
import { IRegisterEmployeeDTO, ILoginEmployeeDTO, IRegisterResponse } from "../../interfaces/employee.interface";

export const registerEmployee = async (data: IRegisterEmployeeDTO): Promise<IRegisterResponse> => {
  const { name, email, password } = data;

  const existingEmployee = await Employee.findOne({ email }).lean();
  if (existingEmployee) {
    throw new ApiError(409, "Email already in use");
  }

  const hashedPassword = await hashPassword(password);

  const employee = await Employee.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    _id: employee._id.toString(),
    name: employee.name,
    email: employee.email,
  };
};

export const loginEmployee = async (data: ILoginEmployeeDTO) => {
  const { email, password } = data;

  const employee = await Employee.findOne({ email })
    .select("+password")
    .lean();
  if (!employee) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await comparePassword(password, employee.password!);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  return employee;
};
