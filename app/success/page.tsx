import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-lg ring-1 ring-gray-200">
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
          Payment successful!
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-500">
          Thank you for your purchase. You will receive a confirmation email
          shortly.
        </p>

        {/*
          LEARNING NOTE — why this page alone is NOT proof of payment:
          Stripe redirects the user here as a convenience so you can show
          a nice "thank you" screen. But anyone can type /success into the
          browser and land here without paying a cent.

          The real confirmation happens via the webhook: Stripe sends a
          `checkout.session.completed` event directly to your server,
          signed with your webhook secret. That event — not this redirect —
          is when you should unlock access, send a receipt, or update a
          database record.
        */}
        <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800 ring-1 ring-inset ring-amber-200">
          <span className="font-semibold">Learning note:</span> This redirect is
          just UX. The authoritative confirmation of payment arrives via the
          Stripe webhook — never trust this URL alone.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
