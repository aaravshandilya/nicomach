import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy — NicoMach" };

export default function PrivacyPage() {
  return (
    <div className="container-nico py-40">
      <h1 className="font-serif text-4xl text-cream">Privacy Policy</h1>
      <div className="mt-8 max-w-2xl space-y-4 text-sm leading-relaxed text-muted">
        <p>
          NicoMach is an early-stage analytical platform. This placeholder page
          will be replaced with a complete privacy policy before any production
          launch or collection of customer data.
        </p>
        <p>
          NicoMach does not currently provide banking, lending, investment,
          custody, or money-transmission services. Any data shared during
          pilot discovery is used solely to evaluate settlement-efficiency
          opportunities and is not sold to third parties.
        </p>
        <p>
          Questions about data handling can be directed to the team via the
          contact form on the homepage.
        </p>
      </div>
    </div>
  );
}
