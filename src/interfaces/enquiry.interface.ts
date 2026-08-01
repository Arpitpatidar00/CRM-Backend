import { Types } from "mongoose";
import { EnquiryStatus } from "../constants/enquiry.constants";

export interface IEnquiry {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  courseInterest: string;
  message: string;
  status: EnquiryStatus;
  claimedBy: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

export type ICreateEnquiryDTO = Pick<IEnquiry, "name" | "email" | "phone" | "courseInterest" | "message">;
