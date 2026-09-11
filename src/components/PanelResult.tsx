import { Panel } from "./Panel";

export function PanelResult({ onOpenDemo }: { onOpenDemo: () => void }) {
  return (
    <Panel id="result" ground="sand" art="flat" tag="The result" note="Synthetic data">
      <div className="grid12 items-end gap-y-12">
        <div className="col-span-12 lg:col-span-7">
          <p className="t-mega">
            14<span style={{ opacity: 0.42, padding: "0 0.12em" }}>→</span>4
          </p>
          <p className="t-tag mt-8" style={{ color: "var(--dim)" }}>Payments</p>
        </div>

        <div className="col-span-12 lg:col-span-5 lg:pb-3">
          <p className="t-lead max-w-[34ch]">
            $92,100 of obligations discharged by $16,420 actually moving.
          </p>
          <div className="mt-9">
            <button className="btn btn--veil" onClick={onOpenDemo}>See it happen</button>
          </div>
          <p className="t-fine mt-9 max-w-[42ch]" style={{ color: "var(--dim)" }}>
            Illustrative example based on synthetic data, not a guaranteed outcome.
          </p>
        </div>
      </div>
    </Panel>
  );
}
