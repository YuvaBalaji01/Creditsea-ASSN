import { Request, Response } from "express";
import Loan, { LoanStatus } from "../models/Loan";

export const getAppliedLoans = async (
  req: Request,
  res: Response
) => {
  try {
    const loans = await Loan.find({
      status: LoanStatus.APPLIED,
    });

    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const rejectLoan = async (
  req: Request,
  res: Response
) => {
  try {
    const { loanId } = req.params;

    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({
        message: "Loan not found",
      });
    }

    loan.status = LoanStatus.REJECTED;

    await loan.save();

    res.status(200).json({
      message: "Loan Rejected",
      loan,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};



export const approveLoan = async (
  req: Request,
  res: Response
) => {
  try {
    const { loanId } = req.params;

    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({
        message: "Loan not found",
      });
    }

    if (loan.status !== LoanStatus.APPLIED) {
      return res.status(400).json({
        message: "Loan is not in APPLIED state",
      });
    }

    loan.status = LoanStatus.SANCTIONED;

    await loan.save();

    res.status(200).json({
      message: "Loan Approved",
      loan,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

