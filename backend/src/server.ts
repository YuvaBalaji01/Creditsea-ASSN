import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import { authMiddleware } from "./middleware/auth";
import { authorize } from "./middleware/role";
import loanRoutes from "./routes/loanRoutes";
import sanctionRoutes from "./routes/sanctionRoutes";
import disbursementRoutes from "./routes/disbursementRoutes";


dotenv.config();

connectDB();

const app = express();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get(
  "/api/test",
  authMiddleware,
  (req, res) => {
    res.json({
      message: "Authorized",
    });
  }
);

app.get(
  "/api/admin",
  authMiddleware,
  authorize("ADMIN"),
  (req, res) => {
    res.json({
      message: "Admin Access"
    });
  }
);

app.use("/api/loan", loanRoutes);

app.use("/api/sanction", sanctionRoutes);

app.use(
  "/api/disbursement",
  disbursementRoutes
);