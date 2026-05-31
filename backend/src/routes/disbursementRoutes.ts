import express from "express";
import {
  getSanctionedLoans,
  disburseLoan,
} from "../controllers/disbursementController";

import { authMiddleware } from "../middleware/auth";
import { authorize } from "../middleware/role";

const router = express.Router();

router.get(
  "/loans",
  authMiddleware,
  authorize("DISBURSEMENT", "ADMIN"),
  getSanctionedLoans
);

router.patch(
  "/:loanId/disburse",
  authMiddleware,
  authorize("DISBURSEMENT", "ADMIN"),
  disburseLoan
);

export default router;