import Pricing from "@/app/components/Pricing";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-50 px-4 py-24">
      {/* Hero */}
      <section className="mb-24 max-w-2xl text-center">
        <span className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200">
          Stripe Checkout Practice
        </span>
        <h1 className="mt-6 text-5xl font-bold tracking-tight text-gray-900">
          A product people{" "}
          <span className="text-indigo-600">actually love</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-500">
          Pick a plan below and experience a Stripe-powered checkout — built
          with Next.js Server Actions and secure webhook verification.
        </p>
      </section>

      {/* Pricing */}
      <Pricing />
    </main>
  );
}
