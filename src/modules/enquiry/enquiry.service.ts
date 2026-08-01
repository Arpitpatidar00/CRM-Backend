import { Enquiry } from "../../models/Enquiry";
import { ApiError } from "../../utils/ApiError";
import { EnquiryStatus } from "../../constants/enquiry.constants";
import { ICreateEnquiryDTO, IEnquiry } from "../../interfaces/enquiry.interface";

export const createEnquiry = async (data: ICreateEnquiryDTO): Promise<IEnquiry> => {
  const enquiry = await Enquiry.create(data);
  return enquiry;
};

export const getPublicLeads = async (): Promise<Pick<IEnquiry, "_id" | "name">[]> => {
  const leads = await Enquiry.find({ status: EnquiryStatus.UNCLAIMED })
    .select("_id name")
    .lean();
  return leads as Pick<IEnquiry, "_id" | "name">[];
};

export const claimLead = async (leadId: string, employeeId: string): Promise<{ message: string }> => {
  const updatedLead = await Enquiry.findOneAndUpdate(
    { _id: leadId, status: EnquiryStatus.UNCLAIMED },
    { status: EnquiryStatus.CLAIMED, claimedBy: employeeId },
    { new: true }
  );

  if (!updatedLead) {
    throw new ApiError(409, "Lead has already been claimed or does not exist");
  }

  return { message: "Lead Claimed Successfully" };
};

export const getMyLeads = async (employeeId: string): Promise<IEnquiry[]> => {
  const leads = await Enquiry.find({
    status: EnquiryStatus.CLAIMED,
    claimedBy: employeeId,
  }).lean();
  return leads as IEnquiry[];
};
