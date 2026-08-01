"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyLeads = exports.claimLead = exports.getPublicLeads = exports.createEnquiry = void 0;
const Enquiry_1 = require("../../models/Enquiry");
const ApiError_1 = require("../../utils/ApiError");
const createEnquiry = async (data) => {
    const enquiry = await Enquiry_1.Enquiry.create(data);
    return enquiry;
};
exports.createEnquiry = createEnquiry;
const getPublicLeads = async () => {
    const leads = await Enquiry_1.Enquiry.find({ status: "UNCLAIMED" }).select("id name");
    return leads;
};
exports.getPublicLeads = getPublicLeads;
const claimLead = async (leadId, employeeId) => {
    const updatedLead = await Enquiry_1.Enquiry.findOneAndUpdate({ _id: leadId, status: "UNCLAIMED" }, { status: "CLAIMED", claimedBy: employeeId }, { new: true });
    if (!updatedLead) {
        throw new ApiError_1.ApiError(409, "Lead has already been claimed or does not exist");
    }
    return { message: "Lead Claimed Successfully" };
};
exports.claimLead = claimLead;
const getMyLeads = async (employeeId) => {
    const leads = await Enquiry_1.Enquiry.find({
        status: "CLAIMED",
        claimedBy: employeeId,
    });
    return leads;
};
exports.getMyLeads = getMyLeads;
