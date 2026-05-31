"use client";

import { useEffect, useState } from "react";

export default function DisbursementPage() {
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

  const disburseLoan = async (
    loanId: string
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      await fetch(
        `http://localhost:5000/api/disbursement/${loanId}/disburse`,
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

  const sanctionedLoans = loans.filter(
    (loan) => loan.status === "SANCTIONED"
  );

  const disbursedLoans = loans.filter(
    (loan) => loan.status === "DISBURSED"
  );

  const renderTable = (
    data: any[],
    showAction = false
  ) => (
    <table className="border-collapse border w-full mb-10">
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

          {showAction && (
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
                showAction ? 4 : 3
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

              {showAction && (
                <td className="border p-2">
                  <button
                    onClick={() =>
                      disburseLoan(
                        loan._id
                      )
                    }
                    className="bg-green-600 px-3 py-1 rounded"
                  >
                    Disburse
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
        Disbursement Dashboard
      </h1>

      <h2 className="text-2xl font-bold mb-4">
        Sanctioned Loans
      </h2>

      {renderTable(
        sanctionedLoans,
        true
      )}

      <h2 className="text-2xl font-bold mb-4">
        Disbursed Loans
      </h2>

      {renderTable(disbursedLoans)}
    </main>
  );
}