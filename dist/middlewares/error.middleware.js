"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    // Log to console for dev
    console.error(err);
    // Mongoose bad ObjectId
    if (err.name === "CastError") {
        const message = `Resource not found with id of ${err.value}`;
        error = new ApiError_1.ApiError(404, message);
    }
    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = "Duplicate field value entered";
        error = new ApiError_1.ApiError(409, message); // 409 Conflict is better for duplicates than 400
    }
    // Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
            .map((val) => val.message)
            .join(", ");
        error = new ApiError_1.ApiError(400, message);
    }
    const statusCode = error.statusCode || 500;
    const message = error.message || "Server Error";
    res.status(statusCode).json(new ApiResponse_1.ApiResponse(statusCode, message));
};
exports.errorHandler = errorHandler;
