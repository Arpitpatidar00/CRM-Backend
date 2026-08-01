"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEnquirySchema = void 0;
const zod_1 = require("zod");
exports.createEnquirySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        email: zod_1.z.string().email("Invalid email address"),
        phone: zod_1.z.string().length(10, "Phone number must be exactly 10 digits"),
        courseInterest: zod_1.z.string().min(1, "Course interest is required"),
        message: zod_1.z.string().optional(),
    }),
});
