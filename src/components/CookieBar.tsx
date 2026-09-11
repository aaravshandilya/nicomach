import { useState } from "react";

/**
 * everyday.io carries a consent bar with an explicit Decline. Same here —
 * and since this site sets nothing to consent to, declining is the default
 * shape of the answer rather than the buried one.
 */
export function CookieBar({ onPrivacy }: { onPrivacy: () => void }) {
  const [shown, setShown] = useState(true);
  if (!shown) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[55] border-t border-[color:var(--rule)]"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
      role="region"
      aria-label="Cookie notice"
    >
      <div className="shell flex flex-wrap items-center justify-between gap-x-10 gap-y-4 py-5">
        <p className="t-small max-w-[62ch]" style={{ color: "var(--dim)" }}>
          This site sets no advertising or tracking cookies. Any preference you set here
          is stored in your browser only.{" "}
          <button onClick={onPrivacy} className="plain" style={{ background: "none", border: 0, padding: 0, cursor: "pointer", font: "inherit", color: "var(--ink)", textDecoration: "underline", textUnderlineOffset: 4 }}>
            Privacy policy
          </button>
          .
        </p>
        <div className="flex gap-3">
          <button className="btn btn--line" onClick={() => setShown(false)}>Decline</button>
          <button className="btn" onClick={() => setShown(false)}>Accept</button>
        </div>
      </div>
    </div>
  );
}
