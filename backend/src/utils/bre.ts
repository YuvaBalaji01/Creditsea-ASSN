export const runBRE = (
  dob: string,
  salary: number,
  employmentType: string,
  pan: string
) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  const birthDate = new Date(dob);

  const age =
    new Date().getFullYear() -
    birthDate.getFullYear();

  if (age < 23 || age > 50) {
    return {
      passed: false,
      reason: "Age must be between 23 and 50",
    };
  }

  if (salary < 25000) {
    return {
      passed: false,
      reason: "Salary must be at least 25000",
    };
  }

  if (employmentType === "UNEMPLOYED") {
    return {
      passed: false,
      reason: "Applicant is unemployed",
    };
  }

  if (!panRegex.test(pan)) {
    return {
      passed: false,
      reason: "Invalid PAN format",
    };
  }

  return {
    passed: true,
  };
};