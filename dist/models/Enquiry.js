"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enquiry = void 0;
const mongoose_1 = require("mongoose");
const enquirySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    courseInterest: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        enum: ["UNCLAIMED", "CLAIMED"],
        default: "UNCLAIMED",
    },
    claimedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Employee",
        default: null,
    },
}, {
    timestamps: true,
});
exports.Enquiry = (0, mongoose_1.model)("Enquiry", enquirySchema);
