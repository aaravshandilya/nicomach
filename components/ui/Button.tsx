"use client";

import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg" | "sm";

const base =
  "relative inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide transition-all duration-300 ease-out disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-gold-light to-gold text-bg-primary shadow-gold-sm hover:shadow-gold hover:brightness-110 active:brightness-95 border border-gold-light/40",
  secondary:
    "bg-transparent text-cream border border-border-gold hover:border-gold hover:bg-gold/5",
  ghost: "bg-transparent text-cream/80 hover:text-cream underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  sm: "text-xs px-4 py-2 rounded-full",
  md: "text-sm px-6 py-3 rounded-full",
  lg: "text-[0.95rem] px-8 py-4 rounded-full",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps | LinkProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    const classes = cn(base, variants[variant], sizes[size], className);

    if ("href" in props && props.href) {
      const { href, ...rest } = props as LinkProps;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
