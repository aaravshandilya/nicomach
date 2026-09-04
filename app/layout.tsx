import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/600-italic.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "NicoMach — Move less money. Unlock more liquidity.",
  description:
    "NicoMach analyzes verified obligations between businesses and recommends a simpler settlement plan with fewer payments and less gross cash movement.",
  metadataBase: new URL("https://nicomach.com"),
  openGraph: {
    title: "NicoMach — Move less money. Unlock more liquidity.",
    description:
      "A read-only B2B settlement analysis platform. NicoMach does not hold or transfer funds.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NicoMach — Move less money. Unlock more liquidity.",
    description:
      "A read-only B2B settlement analysis platform. NicoMach does not hold or transfer funds.",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#050705",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="grain-overlay" />
        <AppShell>
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
        </AppShell>
      </body>
    </html>
  );
}
