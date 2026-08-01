"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jwt_1 = require("../utils/jwt");
const Employee_1 = require("../models/Employee");
const ApiError_1 = require("../utils/ApiError");
const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return next(new ApiError_1.ApiError(401, "Not authorized to access this route"));
        }
        try {
            const decoded = (0, jwt_1.verifyToken)(token);
            const user = await Employee_1.Employee.findById(decoded.id);
            if (!user) {
                return next(new ApiError_1.ApiError(401, "User no longer exists"));
            }
            req.user = user;
            next();
        }
        catch (error) {
            return next(new ApiError_1.ApiError(401, "Not authorized to access this route"));
        }
    }
    catch (error) {
        next(error);
    }
};
exports.protect = protect;
