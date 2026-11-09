"use client";

import { useTransition } from "react";
import { createCheckoutSession } from "@/app/actions/createCheckoutSessions";

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  priceId: string;
  highlighted?: boolean;
}

export default function PricingCard({
  name,
  price,
  description,
  features,
  priceId,
  highlighted = false,
}: PricingCardProps) {
  const [isPending, startTransition] = useTransition();

  const handleCheckout = () => {
    startTransition(async () => {
      await createCheckoutSession({ priceId });
    });
  };

  return (
    <div
      className={`relative flex flex-col rounded-2xl p-8 ${
        highlighted
          ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 ring-2 ring-indigo-600"
          : "bg-white text-gray-900 shadow-lg ring-1 ring-gray-200"
      }`}
    >
      {highlighted && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-4 py-1 text-sm font-semibold text-amber-900 whitespace-nowrap">
          Most Popular
        </span>
      )}

      <div className="mb-6">
        <h3
          className={`text-sm font-semibold uppercase tracking-widest ${
            highlighted ? "text-indigo-200" : "text-gray-500"
          }`}
        >
          {name}
        </h3>
        <p className="mt-3 flex items-baseline gap-1">
          <span className="text-5xl font-bold tracking-tight">{price}</span>
          <span
            className={`text-sm ${
              highlighted ? "text-indigo-200" : "text-gray-500"
            }`}
          >
            / month
          </span>
        </p>
        <p
          className={`mt-3 text-sm leading-relaxed ${
            highlighted ? "text-indigo-100" : "text-gray-500"
          }`}
        >
          {description}
        </p>
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm">
            <svg
              className={`h-5 w-5 shrink-0 ${
                highlighted ? "text-indigo-200" : "text-indigo-500"
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        disabled={isPending}
        aria-busy={isPending}
        className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 ${
          highlighted ? "bg-white text-indigo-600" : "bg-indigo-600 text-white"
        }`}
        onClick={handleCheckout}
      >
        {isPending && (
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
        {isPending ? "Redirecting to checkout…" : `Get started with ${name}`}
      </button>
    </div>
  );
}
