import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Use — NicoMach" };

export default function TermsPage() {
  return (
    <div className="container-nico py-40">
      <h1 className="font-serif text-4xl text-cream">Terms of Use</h1>
      <div className="mt-8 max-w-2xl space-y-4 text-sm leading-relaxed text-muted">
        <p>
          NicoMach is an early-stage analytical platform. It does not
          currently provide banking, lending, investment, custody, or
          money-transmission services.
        </p>
        <p>
          The demonstration dashboard at <code>/demo</code> uses synthetic
          data only. NicoMach does not move funds. Any settlement
          recommendation shown on this site is illustrative and requires
          independent verification, eligibility review, and participant
          approval before it could inform a real payment.
        </p>
        <p>
          A complete terms of use will be published before any production
          launch.
        </p>
      </div>
    </div>
  );
}
