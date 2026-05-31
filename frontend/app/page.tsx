export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">
        CreditSea Loan Management
      </h1>

      <a
        href="/login"
        className="px-4 py-2 bg-black text-white rounded"
      >
        Login
      </a>
    </main>
  );
}