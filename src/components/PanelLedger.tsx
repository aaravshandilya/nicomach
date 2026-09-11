import { Panel } from "./Panel";
import { Console } from "./Console";

export function PanelLedger({ onOpenDemo }: { onOpenDemo: () => void }) {
  return (
    <Panel id="ledger" ground="paper" tag="The ledger" note="Demonstration data">
      <div className="grid12 items-end gap-y-8">
        <h2 className="t-head col-span-12 max-w-[15ch] lg:col-span-6">
          Nine obligations. Two transfers.
        </h2>
        <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:pb-1">
          <p className="t-body max-w-[34ch]" style={{ color: "var(--dim)" }}>
            Two are disputed or unconfirmed and never enter the calculation.
          </p>
          <div className="mt-6">
            <button className="btn" onClick={onOpenDemo}>Open the demonstration</button>
          </div>
        </div>
      </div>

      <div className="mt-9">
        <Console step={3} dense />
      </div>
    </Panel>
  );
}
