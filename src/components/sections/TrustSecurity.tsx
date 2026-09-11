import { SectionHead } from "@/components/ui/SectionHead";
import { VeinIcon } from "@/components/marks/VeinIcon";

const principles = [
  {
    title: "Read-only first",
    body: "NicoMach reads obligation data to model a settlement. It never initiates a transfer and never gains the access required to move funds.",
  },
  {
    title: "Minimum necessary data",
    body: "Only the invoice-level fields needed to determine eligibility and calculate a settlement. No banking credentials, no account access.",
  },
  {
    title: "Customer-controlled approval",
    body: "Every participant approves a recommended plan before any payment is made, through their own banking relationships.",
  },
  {
    title: "Explainable and auditable",
    body: "Each recommendation carries the verified obligations that produced it, so the whole plan can be reviewed line by line.",
  },
];

export function TrustSecurity() {
  return (
    <section id="security" data-ground="ink" className="band">
      <SectionHead n="05" label="Trust & Security" note="No custody of funds" />

      <div className="frame cols gap-y-8 pt-14 md:pt-20">
        <h2 className="t-statement col-span-12 lg:col-span-7">
          Designed to minimize the trust{" "}
          <em className="t-italic" style={{ color: "var(--accent)" }}>required.</em>
        </h2>
      </div>

      <div className="frame pb-16 pt-14 md:pb-24">
        {principles.map((p, i) => (
          <div key={p.title} className="ledger-row">
            <VeinIcon seed={i} className="mt-1 h-7 w-7" />
            <h3 className="t-statement-sm">{p.title}</h3>
            <p className="ledger-body t-body max-w-xl" style={{ color: "var(--dim)" }}>
              {p.body}
            </p>
          </div>
        ))}
        <div className="border-t border-[color:var(--rule)] pt-5">
          <p className="t-micro max-w-2xl" style={{ color: "var(--dim)" }}>
            Production deployments will require independent security review, appropriate
            compliance controls, and trusted financial partners.
          </p>
        </div>
      </div>
    </section>
  );
}
