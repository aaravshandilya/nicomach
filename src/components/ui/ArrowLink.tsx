import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const Arrow = () => (
  <svg className="arrow" width="16" height="8" viewBox="0 0 16 8" fill="none" aria-hidden="true">
    <path d="M0 4h14M10.5 0.5L14.5 4l-4 3.5" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export function ArrowLink({
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  return (
    <a {...props} className={`link-rule ${props.className ?? ""}`}>
      {children}
      <Arrow />
    </a>
  );
}

export function ArrowButton({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button {...props} className={`link-rule ${props.className ?? ""}`}>
      {children}
      <Arrow />
    </button>
  );
}
