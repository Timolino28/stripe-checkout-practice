"use server";
// ↑ This directive marks every exported function in this file as a
// Server Action. Next.js compiles them into secure, server-only POST
// endpoints. The client receives only an opaque reference to the
// function — it never sees the function body or the secret key inside.

import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";

// We use an interface (not a type alias) to describe the input shape.
// Interfaces are easier to extend later — for example, you could add
// a userId or couponCode field without changing every call site.
interface CreateCheckoutSessionInput {
  priceId: string;
}

// The return type is Promise<void> because this function never returns
// a value to the caller. Instead it calls redirect(), which throws a
// special internal Next.js error that triggers an HTTP 302 response.
// This means any try/catch you write MUST NOT swallow that throw —
// otherwise the redirect silently disappears.
export async function createCheckoutSession({
  priceId,
}: CreateCheckoutSessionInput): Promise<void> {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
  });

  redirect(session.url!);
}
