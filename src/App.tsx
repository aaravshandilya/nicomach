import { useState } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { PanelMarket } from "./components/PanelMarket";
import { PanelProblem } from "./components/PanelProblem";
import { PanelExample } from "./components/PanelExample";
import { PanelLedger } from "./components/PanelLedger";
import { PanelResult } from "./components/PanelResult";
import { PanelTrust } from "./components/PanelTrust";
import { PanelPilot } from "./components/PanelPilot";
import { Footer } from "./components/Footer";
import { Brief } from "./components/Brief";
import { Demo } from "./components/Demo";
import { Legal } from "./components/Legal";
import { CookieBar } from "./components/CookieBar";

export default function App() {
  const [demo, setDemo] = useState(false);
  const [brief, setBrief] = useState(false);
  const [legal, setLegal] = useState<"terms" | "privacy" | null>(null);

  const openDemo = () => { setBrief(false); setDemo(true); };
  const openBrief = () => { setDemo(false); setBrief(true); };

  return (
    <>
      <Nav onOpenDemo={openDemo} onBrief={openBrief} />
      <main>
        <Hero onOpenDemo={openDemo} />
        <PanelMarket />
        <PanelProblem onBrief={openBrief} />
        <PanelExample />
        <PanelLedger onOpenDemo={openDemo} />
        <PanelResult onOpenDemo={openDemo} />
        <PanelTrust onBrief={openBrief} />
        <PanelPilot />
      </main>
      <Footer onBrief={openBrief} onOpenDemo={openDemo} onLegal={setLegal} />
      <CookieBar onPrivacy={() => setLegal("privacy")} />
      {brief && <Brief onClose={() => setBrief(false)} onOpenDemo={openDemo} />}
      {demo && <Demo onClose={() => setDemo(false)} />}
      {legal && <Legal doc={legal} onClose={() => setLegal(null)} />}
    </>
  );
}
