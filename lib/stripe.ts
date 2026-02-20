import Stripe from "stripe";

// We create ONE Stripe instance and reuse it everywhere in the app.
// This is called the "singleton" pattern. Creating a new Stripe() on
// every incoming request would be wasteful and could exhaust connection
// limits in production.
//
// The "!" after process.env.STRIPE_SECRET_KEY tells TypeScript:
// "trust me, this value exists at runtime." In a real production app
// you would validate all required env vars at startup and throw early
// if any are missing.
//
// IMPORTANT: This key must NEVER be prefixed with NEXT_PUBLIC_.
// Any variable with that prefix gets embedded into the browser bundle
// and becomes visible to anyone who opens DevTools. The secret key
// stays on the server only.

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
  typescript: true,
});
