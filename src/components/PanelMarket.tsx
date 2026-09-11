import { Panel } from "./Panel";

export function PanelMarket() {
  return (
    <Panel id="market" ground="paper" tag="Market context" note="PwC estimate">
      <div className="grid12 items-end gap-y-10">
        <p className="t-mega col-span-12 lg:col-span-8">€1.84T</p>
        <div className="col-span-12 lg:col-span-4 lg:pb-4">
          <p className="t-lead max-w-[34ch]">
            of excess working capital could potentially be released globally.
          </p>
          <p className="t-fine mt-6 max-w-[40ch]" style={{ color: "var(--dim)" }}>
            Covers inventory, receivables and payables. NicoMach addresses the
            settlement portion.
          </p>
        </div>
      </div>
    </Panel>
  );
}
