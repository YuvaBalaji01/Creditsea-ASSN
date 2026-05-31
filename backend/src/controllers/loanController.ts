import { Response } from "express";
import Loan, { LoanStatus } from "../models/Loan";
import { runBRE } from "../utils/bre";
import { AuthRequest } from "../middleware/auth";
import mongoose from "mongoose";

export const createPersonalDetails = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      fullName,
      pan,
      dob,
      salary,
      employmentType,
    } = req.body;

    const breResult = runBRE(
      dob,
      salary,
      employmentType,
      pan
    );

    if (!breResult.passed) {
      return res.status(400).json({
        message: "BRE Failed",
        reason: breResult.reason,
      });
    }

    const loan = await Loan.create({
      borrowerId: req.user.id,
      fullName,
      pan,
      dob,
      salary,
      employmentType,
    });

    res.status(201).json({
      message: "Personal details submitted",
      loan,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const applyLoan = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      loanId,
      loanAmount,
      tenure,
    } = req.body;

    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({
        message: "Loan not found",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(loanId)) {
      return res.status(400).json({
       message: "Invalid loan id",
      });
    }

    const interest = 12;

    const simpleInterest =
      (loanAmount * interest * tenure) /
      (365 * 100);

    const totalRepayment =
      loanAmount + simpleInterest;

    loan.loanAmount = loanAmount;
    loan.tenure = tenure;
    loan.interest = interest;
    loan.totalRepayment = totalRepayment;
    loan.status = LoanStatus.APPLIED;

    await loan.save();

    res.status(200).json({
      message: "Loan Applied Successfully",
      loan,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getMyLoans = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const loans = await Loan.find({
      borrowerId: req.user.id,
    });

    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getAllLoans = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const loans = await Loan.find();

    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};