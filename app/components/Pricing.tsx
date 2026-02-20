import PricingCard from "@/app/components/PricingCard";

// TODO: priceId values will be replaced with real Stripe Price IDs from .env.local
const plans = [
  {
    name: "Basic",
    price: "$50",
    description: "Perfect for solo developers and personal projects.",
    features: ["1 seat", "5 projects", "Community support", "Basic analytics"],
    priceId: "price_basic_placeholder",
  },
  {
    name: "Pro",
    price: "$100",
    description: "Built for teams that need more power and flexibility.",
    features: [
      "Up to 10 seats",
      "Unlimited projects",
      "Priority support",
      "Advanced analytics",
      "Custom integrations",
    ],
    priceId: "price_pro_placeholder",
    highlighted: true,
  },
];

export default function Pricing() {
  return (
    <section className="w-full max-w-4xl px-4">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Simple, transparent pricing
        </h2>
        <p className="mt-3 text-gray-500">
          No hidden fees. No surprises. Cancel any time.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {plans.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </div>
    </section>
  );
}
