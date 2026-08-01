import { Request, Response } from "express";
import * as enquiryService from "./enquiry.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { ICreateEnquiryDTO, IEnquiry } from "../../interfaces/enquiry.interface";

export const createPublicEnquiry = asyncHandler(async (req: Request<{}, any, ICreateEnquiryDTO>, res: Response) => {
  const result = await enquiryService.createEnquiry(req.body);
  return new ApiResponse<IEnquiry>(201, "Enquiry created successfully", result);
});

export const getPublicLeads = asyncHandler(async (req: Request, res: Response) => {
  const leads = await enquiryService.getPublicLeads();
  return new ApiResponse<Pick<IEnquiry, "_id" | "name">[]>(200, "Public leads fetched successfully", leads);
});

export const claimLead = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  const employeeId = req.user!._id.toString();
  const leadId = req.params.id;
  const result = await enquiryService.claimLead(leadId, employeeId);
  return new ApiResponse<{ message: string }>(200, "Lead Claimed Successfully", result);
});

export const getMyLeads = asyncHandler(async (req: Request, res: Response) => {
  const employeeId = req.user!._id.toString();
  const leads = await enquiryService.getMyLeads(employeeId);
  return new ApiResponse<IEnquiry[]>(200, "My leads fetched successfully", leads);
});
