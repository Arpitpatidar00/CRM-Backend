import { z } from "zod";

export const createEnquirySchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().length(10, "Phone number must be exactly 10 digits"),
    courseInterest: z.string().min(1, "Course interest is required"),
    message: z.string().optional(),
  }).strict(),
});
