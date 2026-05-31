"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    console.log("STATUS:", response.status);
    console.log("DATA:", data);

    if (!response.ok) {
      alert(data.message || "Login Failed");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    switch (data.role) {
      case "BORROWER":
        window.location.href = "/borrower";
        break;

      case "SANCTION":
        window.location.href = "/sanction";
        break;

      case "DISBURSEMENT":
        window.location.href = "/disbursement";
        break;

      case "ADMIN":
        window.location.href = "/admin";
        break;

      default:
        console.log("Unknown role:", data.role);
    }
  } catch (error) {
    console.error(error);
  }
};

  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="w-[400px] border p-6 rounded">
        <h1 className="text-2xl font-bold mb-4">
          Login
        </h1>

        <input
          className="border w-full p-2 mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="border w-full p-2 mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>

          <div className="mt-4 text-center">
            <a
              href="/register"
              className="text-blue-600 underline"
            >
              New User? Register Here
            </a>
          </div>

      </div>
    </main>
  );
}