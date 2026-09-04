import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names and resolves conflicting Tailwind utilities so that a
 * later class (e.g. one passed in via a `className` prop) reliably wins over
 * an earlier one on the same CSS property (e.g. `w-64` overriding a base
 * `w-full`), regardless of the order Tailwind happens to emit the utilities
 * in the compiled stylesheet. Plain string concatenation does NOT guarantee
 * this — two same-specificity utility classes are resolved by declaration
 * order in the final CSS, which can silently flip between builds.
 */
export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

export function formatCurrency(amount: number, currency: string = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function formatPercent(value: number, digits: number = 0) {
  return `${value.toFixed(digits)}%`;
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
