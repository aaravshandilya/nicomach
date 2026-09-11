import type { ReactNode } from "react";
import { Ground } from "./Ground";

/**
 * One frame, one idea. The reference page is a sequence of full-bleed
 * panels, so that is what this is: viewport height, its own ground, an
 * eyebrow pinned to the top, and about thirty words inside.
 */
export function Panel({
  id,
  ground,
  art,
  tag,
  note,
  children,
  className = "",
}: {
  id?: string;
  ground: "paper" | "tone" | "sand" | "dark";
  art?: "hero" | "flat";
  tag?: string;
  note?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} data-ground={ground} className={`panel ${className}`}>
      {art && <Ground flat={art === "flat"} />}
      {tag && (
        <p className="panel-tag t-tag" style={{ color: "var(--dim)" }}>
          <span>{tag}</span>
          {note && <span>{note}</span>}
        </p>
      )}
      <div className="panel-in">{children}</div>
    </section>
  );
}
