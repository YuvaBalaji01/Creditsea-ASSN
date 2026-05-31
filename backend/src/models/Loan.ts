import mongoose, { Schema, Document } from "mongoose";

export enum LoanStatus {
  APPLIED = "APPLIED",
  SANCTIONED = "SANCTIONED",
  REJECTED = "REJECTED",
  DISBURSED = "DISBURSED",
  CLOSED = "CLOSED",
}

export interface ILoan extends Document {
  borrowerId: mongoose.Types.ObjectId;

  fullName: string;
  pan: string;
  dob: Date;

  salary: number;
  employmentType: string;

  salarySlip?: string;

  loanAmount: number;
  tenure: number;

  interest: number;
  totalRepayment: number;

  status: LoanStatus;

  rejectionReason?: string;
}

const loanSchema = new Schema<ILoan>(
  {
    borrowerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    pan: {
      type: String,
      required: true,
      uppercase: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    salary: {
      type: Number,
      required: true,
    },

    employmentType: {
      type: String,
      enum: ["SALARIED", "SELF_EMPLOYED", "UNEMPLOYED"],
      required: true,
    },

    salarySlip: {
      type: String,
      default: "",
    },

    loanAmount: {
      type: Number,
      default: 0,
    },

    tenure: {
      type: Number,
      default: 0,
    },

    interest: {
      type: Number,
      default: 12,
    },

    totalRepayment: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: Object.values(LoanStatus),
      default: LoanStatus.APPLIED,
    },

    rejectionReason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Loan = mongoose.model<ILoan>("Loan", loanSchema);

export default Loan;