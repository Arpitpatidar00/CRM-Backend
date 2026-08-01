"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyLeads = exports.claimLead = exports.getPublicLeads = exports.createPublicEnquiry = void 0;
const enquiryService = __importStar(require("./enquiry.service"));
const createPublicEnquiry = async (req, res, next) => {
    try {
        const result = await enquiryService.createEnquiry(req.body);
        res.status(201).json({
            success: true,
            message: "Enquiry created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createPublicEnquiry = createPublicEnquiry;
const getPublicLeads = async (req, res, next) => {
    try {
        const leads = await enquiryService.getPublicLeads();
        res.status(200).json(leads);
    }
    catch (error) {
        next(error);
    }
};
exports.getPublicLeads = getPublicLeads;
const claimLead = async (req, res, next) => {
    try {
        const employeeId = req.user._id.toString();
        const leadId = req.params.id;
        const result = await enquiryService.claimLead(leadId, employeeId);
        res.status(200).json(result);
    }
    catch (error) {
        // Return 404 if not found or 409 if conflict
        if (error.message === "Lead has already been claimed or does not exist" &&
            error.statusCode === 409) {
            // The requirement says 404/409. I will keep it as 409 (Conflict) based on the service layer, but either is fine.
        }
        next(error);
    }
};
exports.claimLead = claimLead;
const getMyLeads = async (req, res, next) => {
    try {
        const employeeId = req.user._id.toString();
        const leads = await enquiryService.getMyLeads(employeeId);
        res.status(200).json(leads);
    }
    catch (error) {
        next(error);
    }
};
exports.getMyLeads = getMyLeads;
