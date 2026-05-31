"use client";

import { useEffect, useState } from "react";

export default function BorrowerPage() {
  const [fullName, setFullName] = useState("");
  const [pan, setPan] = useState("");
  const [dob, setDob] = useState("");
  const [salary, setSalary] = useState("");
  const [employmentType, setEmploymentType] =
    useState("SALARIED");
  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState("");

  const [loans, setLoans] = useState<any[]>([]);

  useEffect(() => {
    fetchMyLoans();
  }, []);

  const fetchMyLoans = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/loan/my-loans",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      setLoans(data);
    } catch (error) {
      console.log(error);
    }
  };

  const applyLoan = async () => {
    try {
      const token =
        localStorage.getItem("token");

      // STEP 1
      const personalResponse = await fetch(
        "http://localhost:5000/api/loan/personal",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body: JSON.stringify({
            fullName,
            pan,
            dob,
            salary: Number(salary),
            employmentType,
          }),
        }
      );

      const personalData =
        await personalResponse.json();

      if (!personalResponse.ok) {
        alert(
          personalData.reason ||
            personalData.message
        );
        return;
      }

      const loanId =
        personalData.loan._id;

      // STEP 2
      const applyResponse = await fetch(
        "http://localhost:5000/api/loan/apply",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body: JSON.stringify({
            loanId,
            loanAmount:
              Number(loanAmount),
            tenure: Number(tenure),
          }),
        }
      );

      const applyData =
        await applyResponse.json();

      if (!applyResponse.ok) {
        alert(applyData.message);
        return;
      }

      alert(
        "Loan Applied Successfully"
      );

      setFullName("");
      setPan("");
      setDob("");
      setSalary("");
      setEmploymentType(
        "SALARIED"
      );
      setLoanAmount("");
      setTenure("");

      fetchMyLoans();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-8">
        Borrower Dashboard
      </h1>

      <div className="max-w-xl space-y-3 mb-12">
        <input
          className="border p-2 w-full"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) =>
            setFullName(
              e.target.value
            )
          }
        />

        <input
          className="border p-2 w-full"
          placeholder="PAN"
          value={pan}
          onChange={(e) =>
            setPan(e.target.value)
          }
        />

        <input
          type="date"
          className="border p-2 w-full"
          value={dob}
          onChange={(e) =>
            setDob(e.target.value)
          }
        />

        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Salary"
          value={salary}
          onChange={(e) =>
            setSalary(
              e.target.value
            )
          }
        />

        <select
          className="border p-2 w-full"
          value={employmentType}
          onChange={(e) =>
            setEmploymentType(
              e.target.value
            )
          }
        >
          <option value="SALARIED">
            SALARIED
          </option>

          <option value="SELF_EMPLOYED">
            SELF EMPLOYED
          </option>
        </select>

        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Loan Amount"
          value={loanAmount}
          onChange={(e) =>
            setLoanAmount(
              e.target.value
            )
          }
        />

        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Tenure"
          value={tenure}
          onChange={(e) =>
            setTenure(
              e.target.value
            )
          }
        />

        <button
          onClick={applyLoan}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Apply Loan
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-4">
        My Loans
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

            <th className="border p-2">
              Repayment
            </th>
          </tr>
        </thead>

        <tbody>
          {loans.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="border p-4 text-center"
              >
                No loans found
              </td>
            </tr>
          ) : (
            loans.map((loan) => (
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

                <td className="border p-2">
                  ₹
                  {loan.totalRepayment?.toFixed(
                    2
                  ) || 0}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
}