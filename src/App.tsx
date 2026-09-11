import { useState } from "react";
import { useChrome } from "@/hooks/useChrome";
import { TopBar } from "@/components/chrome/TopBar";
import { SectionIndex } from "@/components/chrome/SectionIndex";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { SimpleExample } from "@/components/sections/SimpleExample";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Results } from "@/components/sections/Results";
import { TrustSecurity } from "@/components/sections/TrustSecurity";
import { MarketContext } from "@/components/sections/MarketContext";
import { WhyNicoMach } from "@/components/sections/WhyNicoMach";
import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";
import { Pilot } from "@/components/sections/Pilot";
import { Footer } from "@/components/sections/Footer";
import { Annihilation } from "@/components/Annihilation";

export default function App() {
  const [demo, setDemo] = useState(false);
  const chrome = useChrome();
  const openDemo = () => setDemo(true);

  return (
    <>
      <TopBar ground={chrome.top} progress={chrome.progress} onOpenDemo={openDemo} />

      <main>
        <Hero onOpenDemo={openDemo} />
        <Problem />
        <SimpleExample />
        <HowItWorks />
        <Results onOpenDemo={openDemo} />
        <TrustSecurity />
        <MarketContext />
        <WhyNicoMach />
        <About />
        <FAQ />
        <Pilot />
      </main>

      <Footer onOpenDemo={openDemo} />

      <SectionIndex ground={chrome.bottom} activeId={chrome.activeId} />

      {demo && <Annihilation onClose={() => setDemo(false)} />}
    </>
  );
}
