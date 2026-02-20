import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-lg ring-1 ring-gray-200">
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <svg
            className="h-8 w-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
          Payment cancelled
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-500">
          No worries — you have not been charged. You can go back and choose a
          plan whenever you are ready.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Back to pricing
        </Link>
      </div>
    </main>
  );
}
