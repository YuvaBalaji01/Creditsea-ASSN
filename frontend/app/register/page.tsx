"use client";

import { useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Registration Successful");

      window.location.href = "/login";
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="w-[400px] border p-6 rounded">
        <h1 className="text-2xl font-bold mb-4">
          Register
        </h1>

        <input
          className="border w-full p-2 mb-3"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

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
          onClick={handleRegister}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          Register
        </button>
      </div>
    </main>
  );
}