"use client";

import { useEffect, useState } from "react";

export default function SanctionPage() {
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

  const approveLoan = async (
    loanId: string
  ) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(
        `http://localhost:5000/api/sanction/${loanId}/approve`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchLoans();
    } catch (error) {
      console.log(error);
    }
  };

  const rejectLoan = async (
    loanId: string
  ) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(
        `http://localhost:5000/api/sanction/${loanId}/reject`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            reason: "Rejected by Sanction Officer",
          }),
        }
      );

      fetchLoans();
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

  const renderTable = (
    data: any[],
    showActions = false
  ) => (
    <table className="w-full border mb-10">
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

          {showActions && (
            <th className="border p-2">
              Action
            </th>
          )}
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={
                showActions ? 4 : 3
              }
              className="border p-4 text-center"
            >
              No loans found
            </td>
          </tr>
        ) : (
          data.map((loan) => (
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

              {showActions && (
                <td className="border p-2">
                  <button
                    onClick={() =>
                      approveLoan(
                        loan._id
                      )
                    }
                    className="bg-green-600 px-3 py-1 rounded mr-2"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      rejectLoan(
                        loan._id
                      )
                    }
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Sanction Dashboard
      </h1>

      <h2 className="text-2xl font-bold mb-4">
        Applied Loans
      </h2>
      {renderTable(appliedLoans, true)}

      <h2 className="text-2xl font-bold mb-4">
        Sanctioned Loans
      </h2>
      {renderTable(sanctionedLoans)}

      <h2 className="text-2xl font-bold mb-4">
        Rejected Loans
      </h2>
      {renderTable(rejectedLoans)}
    </main>
  );
}