"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    success;
    message;
    data;
    constructor(statusCode, message, data) {
        this.success = statusCode < 400;
        this.message = message;
        if (data) {
            this.data = data;
        }
    }
}
exports.ApiResponse = ApiResponse;
