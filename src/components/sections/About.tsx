import { SectionHead } from "@/components/ui/SectionHead";
import { CrackFrame } from "@/components/marks/CrackFrame";
import { WreathMark } from "@/components/marks/WreathMark";

const founders = [
  {
    name: "Aarav Shandilya",
    role: "Technical modeling & product",
    bio: "Leads technical modeling, optimization, and product development. His background includes developing and benchmarking supply-chain optimization models using industrial data at Arizona State University.",
  },
  {
    name: "Hayden",
    role: "Finance & strategy",
    bio: "Leads finance, business strategy, sales, and customer discovery. His background includes writing C++ trading algorithms for the NinjaScript environment on the NinjaTrader platform, several years in sales and customer service, and ongoing mathematical modeling research at Grand Canyon University.",
  },
];

export function About() {
  return (
    <section id="team" data-ground="ink" className="band relative overflow-hidden">
      <SectionHead n="08" label="About" note="Two people" />

      <WreathMark
        size={520}
        letter={false}
        className="pointer-events-none absolute -left-32 bottom-10 text-gold opacity-[0.06]"
      />

      <div className="frame relative cols gap-y-8 pt-14 md:pt-20">
        <h2 className="t-statement col-span-12 lg:col-span-7">Meet the people building it.</h2>
      </div>

      <div className="frame relative cols gap-y-8 pb-20 pt-14 md:pb-28">
        {founders.map((f) => (
          <div key={f.name} className="col-span-12 md:col-span-6">
            <CrackFrame className="h-full">
              <div className="flex h-full flex-col p-8 md:p-11">
                <span className="t-label" style={{ color: "var(--accent)" }}>
                  {f.role}
                </span>
                <h3 className="t-statement mt-6 text-[clamp(1.75rem,3.2vw,2.75rem)]">{f.name}</h3>
                <p className="t-body-lg mt-6 max-w-md" style={{ color: "var(--dim)" }}>
                  {f.bio}
                </p>
              </div>
            </CrackFrame>
          </div>
        ))}
      </div>
    </section>
  );
}
