import { Request, Response } from "express";
import Loan, { LoanStatus } from "../models/Loan";

export const getSanctionedLoans = async (
  req: Request,
  res: Response
) => {
  try {
    const loans = await Loan.find({
        status: LoanStatus.SANCTIONED ,
    });

    res.json(loans);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const disburseLoan = async (
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

    loan.status = LoanStatus.DISBURSED;

    await loan.save();

    res.json({
      message: "Loan Disbursed",
      loan,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};