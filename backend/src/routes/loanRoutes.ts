import express from "express";
import {
  createPersonalDetails,
  applyLoan,
  getAllLoans,
  getMyLoans,
} from "../controllers/loanController";

import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.post(
  "/personal",
  authMiddleware,
  createPersonalDetails
);

router.post(
  "/apply",
  authMiddleware,
  applyLoan
);

router.get(
  "/all",
  authMiddleware,
  getAllLoans
);

router.get(
  "/my-loans",
  authMiddleware,
  getMyLoans
);

export default router;