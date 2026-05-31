import express from "express";
import {
  getAppliedLoans,
  approveLoan,
  rejectLoan,
} from "../controllers/sanctionController";

import { authMiddleware } from "../middleware/auth";
import { authorize } from "../middleware/role";

const router = express.Router();

router.get(
  "/loans",
  authMiddleware,
  authorize("SANCTION", "ADMIN"),
  getAppliedLoans
);

router.patch(
  "/:loanId/approve",
  authMiddleware,
  authorize("SANCTION", "ADMIN"),
  approveLoan
);

router.patch(
  "/:loanId/reject",
  authMiddleware,
  authorize("SANCTION", "ADMIN"),
  rejectLoan
);

export default router;