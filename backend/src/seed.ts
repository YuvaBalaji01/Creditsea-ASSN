import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "./config/db";
import User from "./models/User";

dotenv.config();

const seedUsers = async () => {
  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash("123456", 10);

    const users = [
      {
        name: "Admin",
        email: "admin@test.com",
        password: hashedPassword,
        role: "ADMIN",
      },
      {
        name: "Sanction Officer",
        email: "sanction@test.com",
        password: hashedPassword,
        role: "SANCTION",
      },
      {
        name: "Disbursement Officer",
        email: "disbursement@test.com",
        password: hashedPassword,
        role: "DISBURSEMENT",
      },
      {
        name: "Collection Officer",
        email: "collection@test.com",
        password: hashedPassword,
        role: "COLLECTION",
      },
    ];

    // Remove existing users
    await User.deleteMany({});

    // Insert fresh users
    await User.insertMany(users);

    console.log("Users Seeded Successfully");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();