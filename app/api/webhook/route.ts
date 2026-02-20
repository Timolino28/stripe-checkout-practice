// WHY a Route Handler and not a Server Action?
// Server Actions are designed to be called by YOUR browser-based code.
// A webhook is an HTTP POST sent directly from Stripe's servers to yours
// — there is no browser involved. Route Handlers are plain HTTP endpoints,
// which is exactly what Stripe expects to reach.

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest): Promise<NextResponse> {
  // ── Step 1: Read the raw body ──────────────────────────────────────────
  // CRITICAL: We must capture the raw bytes BEFORE any parsing happens.
  //
  // Stripe computes a signature over the exact bytes it sent.
  // If anything (a middleware, JSON.parse, etc.) transforms those bytes
  // first, the signature we recompute will not match and verification
  // will fail every single time — a very confusing bug to debug.
  //
  // request.text() gives us the raw body as a plain string, untouched.
  const body = await request.text();

  // ── Step 2: Read the Stripe-Signature header ───────────────────────────
  // Stripe attaches this header to every webhook it sends.
  // It contains a timestamp and an HMAC-SHA256 hash of:
  //   (timestamp + "." + raw body) signed with your webhook secret.
  // We will use it in the next step to prove the request came from Stripe.
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    // A missing header means this POST definitely did not come from Stripe.
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  // ── Step 3: Verify the signature ──────────────────────────────────────
  // constructEvent() does two things at once:
  //   a) Re-computes the HMAC-SHA256 hash using the raw body and your
  //      STRIPE_WEBHOOK_SECRET, then compares it to the header value.
  //   b) If the signatures match, it parses the JSON into a typed
  //      Stripe.Event object.
  //
  // This protects you against:
  //   - Attackers posting fake "payment succeeded" events to your endpoint
  //   - Replay attacks (the timestamp in the header is also validated,
  //     so an old captured request cannot be resent)
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    // Log server-side so you can debug a misconfigured webhook secret.
    console.error("Webhook signature verification failed:", error);
    // Return 400 so Stripe knows the delivery failed and will retry later.
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // ── Step 4: Handle specific event types ───────────────────────────────
  // Stripe sends many different event types (30+). You act only on the
  // ones that matter to your app, and silently ignore the rest.
  //
  // "SOURCE OF TRUTH" — the core lesson:
  // Your /success page only proves the browser was redirected.
  // Anyone can type localhost:3000/success in the URL bar without paying.
  // THIS event is sent server-to-server, signed with a shared secret.
  // It is the only reliable proof that money actually changed hands.
  // In a real app, this is where you would unlock access, write to your
  // database, or send a receipt email — never in the success redirect.
  switch (event.type) {
    case "checkout.session.completed": {
      // Tell TypeScript the exact shape of this specific event's data.
      const session = event.data.object as Stripe.Checkout.Session;

      // In a real app you would now:
      //   - Find the user via session.client_reference_id or customer email
      //   - Grant them access to whatever they purchased
      //   - Send a receipt or trigger a fulfillment workflow
      //
      // We have no database in this project, so we just log the details.
      // Open your Next.js terminal while testing to see this output.
      console.log("✅ Payment confirmed by Stripe webhook!");
      console.log("   Session ID  :", session.id);
      console.log("   Customer    :", session.customer_details?.email);
      console.log("   Amount paid :", session.amount_total, session.currency);
      break;
    }

    // Useful during development — shows you what other events Stripe
    // sends so you know what's available when you need them later.
    default: {
      console.log(`Unhandled event type: ${event.type}`);
    }
  }

  // ── Step 5: Respond with 200 immediately ──────────────────────────────
  // Stripe requires a 2xx response within 30 seconds, otherwise it marks
  // the delivery as failed and retries (up to 3 days, ~15 attempts).
  // Never do slow or blocking work synchronously inside this handler.
  return NextResponse.json({ received: true }, { status: 200 });
}
