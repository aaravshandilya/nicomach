import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { DollarExample } from "@/components/home/DollarExample";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ResultsSection } from "@/components/home/ResultsSection";
import { TrustSecurity } from "@/components/home/TrustSecurity";
import { MarketContext } from "@/components/home/MarketContext";
import { WhyNicoMach } from "@/components/home/WhyNicoMach";
import { About } from "@/components/home/About";
import { FAQ } from "@/components/home/FAQ";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <DollarExample />
      <HowItWorks />
      <ResultsSection />
      <TrustSecurity />
      <MarketContext />
      <WhyNicoMach />
      <About />
      <FAQ />
      <CTASection />
    </>
  );
}
