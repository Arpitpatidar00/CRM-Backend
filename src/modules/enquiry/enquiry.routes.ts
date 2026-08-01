import { Router } from "express";
import {
  createPublicEnquiry,
  getPublicLeads,
  claimLead,
  getMyLeads,
} from "./enquiry.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createEnquirySchema } from "./enquiry.validation";
import { protect } from "../../middlewares/auth.middleware";

const router = Router();

// Public route
router.post("/", validate(createEnquirySchema), createPublicEnquiry);

// Protected routes
router.use(protect);

router.get("/public", getPublicLeads);
router.get("/my-leads", getMyLeads);
router.patch("/:id/claim", claimLead);

export default router;
