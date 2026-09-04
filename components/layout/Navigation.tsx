"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Wordmark from "@/components/logo/Wordmark";
import WreathMark from "@/components/logo/WreathMark";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Product", href: "/#product" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Security", href: "/#security" },
  { label: "About", href: "/#about" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gold-light/80 transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
      <nav
        aria-label="Primary"
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-6",
          scrolled
            ? "border-border-gold bg-bg-primary/90 shadow-card backdrop-blur-md"
            : "border-transparent bg-bg-primary/30 backdrop-blur-sm"
        )}
      >
        <Link href="/" className="flex items-center gap-2" aria-label="NicoMach home">
          <Wordmark size={22} />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-cream/80 transition-colors hover:text-gold-light"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/demo" variant="secondary" size="sm">
            View Demo
          </Button>
          <Button href="/#pilot" variant="primary" size="sm">
            Request a Pilot
          </Button>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-border-gold px-3 py-1.5 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <WreathMark size={22} />
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1">
            <span
              className={cn(
                "h-px w-4 bg-cream transition-transform",
                mobileOpen && "translate-y-1.5 rotate-45"
              )}
            />
            <span className={cn("h-px w-4 bg-cream transition-opacity", mobileOpen && "opacity-0")} />
            <span
              className={cn(
                "h-px w-4 bg-cream transition-transform",
                mobileOpen && "-translate-y-1.5 -rotate-45"
              )}
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-3 top-[4.5rem] z-40 rounded-3xl border border-border-gold bg-bg-secondary/95 p-6 shadow-card lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base text-cream/90 hover:bg-white/5 hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3 border-t border-border-gold pt-4">
              <Button href="/demo" variant="secondary" onClick={() => setMobileOpen(false)}>
                View Demo
              </Button>
              <Button href="/#pilot" variant="primary" onClick={() => setMobileOpen(false)}>
                Request a Pilot
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
