"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enquiry_controller_1 = require("./enquiry.controller");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
const enquiry_validation_1 = require("./enquiry.validation");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Public route
router.post("/", (0, validate_middleware_1.validate)(enquiry_validation_1.createEnquirySchema), enquiry_controller_1.createPublicEnquiry);
// Protected routes
router.use(auth_middleware_1.protect);
router.get("/public", enquiry_controller_1.getPublicLeads);
router.get("/my-leads", enquiry_controller_1.getMyLeads);
router.patch("/:id/claim", enquiry_controller_1.claimLead);
exports.default = router;
