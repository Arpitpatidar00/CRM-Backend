"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginEmployee = exports.registerEmployee = void 0;
const Employee_1 = require("../../models/Employee");
const bcrypt_1 = require("../../utils/bcrypt");
const jwt_1 = require("../../utils/jwt");
const ApiError_1 = require("../../utils/ApiError");
const registerEmployee = async (data) => {
    const { name, email, password } = data;
    const existingEmployee = await Employee_1.Employee.findOne({ email });
    if (existingEmployee) {
        throw new ApiError_1.ApiError(409, "Email already in use");
    }
    const hashedPassword = await (0, bcrypt_1.hashPassword)(password);
    const employee = await Employee_1.Employee.create({
        name,
        email,
        password: hashedPassword,
    });
    return {
        success: true,
        message: "Employee Registered",
    };
};
exports.registerEmployee = registerEmployee;
const loginEmployee = async (data) => {
    const { email, password } = data;
    const employee = await Employee_1.Employee.findOne({ email });
    if (!employee) {
        throw new ApiError_1.ApiError(401, "Invalid email or password");
    }
    const isMatch = await (0, bcrypt_1.comparePassword)(password, employee.password);
    if (!isMatch) {
        throw new ApiError_1.ApiError(401, "Invalid email or password");
    }
    const token = (0, jwt_1.generateToken)(employee._id);
    return {
        token,
    };
};
exports.loginEmployee = loginEmployee;
