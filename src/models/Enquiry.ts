import { Schema, model } from "mongoose";
import { IEnquiry } from "../interfaces/enquiry.interface";
import { EnquiryStatus } from "../constants/enquiry.constants";

const enquirySchema = new Schema<IEnquiry>(
  {
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
      enum: Object.values(EnquiryStatus),
      default: EnquiryStatus.UNCLAIMED,
    },
    claimedBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Enquiry = model<IEnquiry>("Enquiry", enquirySchema);
