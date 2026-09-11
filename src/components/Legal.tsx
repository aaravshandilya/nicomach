import { useEffect } from "react";

const TERMS: [string, string][] = [
  ["What this site is", "NicoMach's website is an informational site for an early-stage analytical platform. The demonstrations on it run on synthetic sample data. They are illustrations of how the analysis would work and are not a representation of results you would obtain."],
  ["What NicoMach does not do", "NicoMach does not provide banking, lending, investment, custody, money-transmission, accounting, tax or legal services. It does not hold client funds and does not initiate transfers. Nothing on this site is financial, investment, accounting, tax or legal advice, and nothing on it creates a client or advisory relationship."],
  ["Figures and estimates", "Figures described as illustrative are illustrative. The €1.84 trillion figure is attributed to PwC and is reproduced as a market estimate, not as a NicoMach claim or a projection of what any customer could release. Any result NicoMach produces depends entirely on the obligation data provided to it."],
  ["Your use of the site", "You may read, reference and share this site. You may not misrepresent its contents, present the demonstration data as real transactions, or use the site to imply a commercial relationship that does not exist."],
  ["Availability and changes", "The site is provided as-is and may change or be unavailable without notice. These terms may be updated; the version published here is the current one."],
  ["Contact", "Questions about these terms can be sent through the pilot form on this site."],
];

const PRIVACY: [string, string][] = [
  ["What we collect", "Only what you type into the pilot form: name, work email, company, role, approximate monthly invoice volume, primary cash-flow challenge and any message you write. Nothing else is requested."],
  ["What the demonstration collects", "Nothing. The ledger, settlement console and worked example on this site run entirely in your browser on synthetic data. No obligation data, no invoice data and no company data is sent anywhere by using them."],
  ["Why we collect it", "To respond to a pilot request or a discovery conversation, and to understand where settlement friction occurs. We do not sell this information, and we do not share it with third parties for their own marketing."],
  ["How long we keep it", "For as long as the conversation you started is active, and afterwards only where a record is needed. You can ask us to delete what you sent at any time, and we will."],
  ["Customer obligation data", "If a pilot proceeds, obligation data is handled under a separate written agreement covering scope, retention, deletion and security. NicoMach's analysis is read-only: it never receives the access required to move funds."],
  ["Cookies", "This site sets no advertising or tracking cookies. Your cookie preference, if you set one, is stored in your own browser and is never transmitted."],
  ["Your choices", "You can ask what we hold, ask for a correction, or ask for deletion, through the pilot form on this site."],
];

export function Legal({ doc, onClose }: { doc: "terms" | "privacy"; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);

  const isTerms = doc === "terms";
  const rows = isTerms ? TERMS : PRIVACY;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isTerms ? "Terms of use" : "Privacy policy"}
      data-ground="paper"
      className="fixed inset-0 z-[60] overflow-y-auto"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      <div className="shell py-8 md:py-12">
        <div className="flex items-baseline justify-between gap-6 border-b border-[color:var(--rule)] pb-6">
          <p className="t-tag" style={{ color: "var(--dim)" }}>NicoMach</p>
          <button onClick={onClose} className="plain" style={{ background: "none", border: 0, padding: 0, cursor: "pointer", font: "inherit", fontSize: 17, fontWeight: 500 }}>
            Close
          </button>
        </div>

        <h1 className="t-head mt-14 max-w-[18ch]">{isTerms ? "Terms of use" : "Privacy policy"}</h1>
        <p className="t-fine mt-5" style={{ color: "var(--dim)" }}>
          Last updated {new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}.
          Written in plain language and pending review by counsel before commercial launch.
        </p>

        <div className="mt-16 max-w-[880px] pb-24">
          {rows.map(([h, b]) => (
            <div key={h} className="border-t border-[color:var(--rule)] py-9 grid12 gap-y-4">
              <h2 className="t-sub col-span-12 md:col-span-4">{h}</h2>
              <p className="t-body col-span-12 max-w-[62ch] md:col-span-7 md:col-start-6" style={{ color: "var(--dim)" }}>{b}</p>
            </div>
          ))}
          <div className="border-t border-[color:var(--rule)]" />
        </div>
      </div>
    </div>
  );
}
