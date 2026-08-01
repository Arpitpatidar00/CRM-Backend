import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import enquiryRoutes from "../modules/enquiry/enquiry.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/enquiries", enquiryRoutes);

export default router;
