import mongoose from "mongoose";

export enum UserRole {
  BORROWER = "BORROWER",
  SALES = "SALES",
  SANCTION = "SANCTION",
  DISBURSEMENT = "DISBURSEMENT",
  COLLECTION = "COLLECTION",
  ADMIN = "ADMIN",
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.BORROWER,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);