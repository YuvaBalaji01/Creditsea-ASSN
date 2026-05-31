"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [loans, setLoans] = useState<any[]>([]);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/loan/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setLoans(data);
    } catch (error) {
      console.log(error);
    }
  };

  const appliedLoans = loans.filter(
    (loan) => loan.status === "APPLIED"
  );

  const sanctionedLoans = loans.filter(
    (loan) => loan.status === "SANCTIONED"
  );

  const rejectedLoans = loans.filter(
    (loan) => loan.status === "REJECTED"
  );

  const disbursedLoans = loans.filter(
    (loan) => loan.status === "DISBURSED"
  );

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="space-y-10">
        <LoanTable
          title="Applied Loans"
          loans={appliedLoans}
        />

        <LoanTable
          title="Sanctioned Loans"
          loans={sanctionedLoans}
        />

        <LoanTable
          title="Rejected Loans"
          loans={rejectedLoans}
        />

        <LoanTable
          title="Disbursed Loans"
          loans={disbursedLoans}
        />
      </div>
    </main>
  );
}

function LoanTable({
  title,
  loans,
}: {
  title: string;
  loans: any[];
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {title}
      </h2>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">
              Name
            </th>

            <th className="border p-2">
              Amount
            </th>

            <th className="border p-2">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {loans.map((loan) => (
            <tr key={loan._id}>
              <td className="border p-2">
                {loan.fullName}
              </td>

              <td className="border p-2">
                ₹{loan.loanAmount}
              </td>

              <td className="border p-2">
                {loan.status}
              </td>
            </tr>
          ))}

          {loans.length === 0 && (
            <tr>
              <td
                colSpan={3}
                className="border p-2 text-center"
              >
                No loans found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}