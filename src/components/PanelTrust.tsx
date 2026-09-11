import { Panel } from "./Panel";

const lines = [
  ["Read-only", "It never gains the access required to move funds."],
  ["Minimum data", "Invoice fields only. No banking credentials."],
  ["You approve", "Every participant signs off before anything is paid."],
  ["Auditable", "Each instruction carries the obligations it closes."],
];

export function PanelTrust({ onBrief }: { onBrief: () => void }) {
  return (
    <Panel id="trust" ground="dark" tag="Trust">
      <div className="grid12 gap-y-14">
        <div className="col-span-12 lg:col-span-5">
          <h2 className="t-panel max-w-[11ch]">Nothing to trust us with.</h2>
          <div className="mt-11">
            <button className="btn btn--line" onClick={onBrief}>How it works, in full</button>
          </div>
        </div>

        <dl className="col-span-12 lg:col-span-6 lg:col-start-7" style={{ margin: 0 }}>
          {lines.map(([k, v]) => (
            <div key={k} className="border-t border-[color:var(--rule)] py-6">
              <dt className="t-sub">{k}</dt>
              <dd className="t-body mt-2 max-w-[42ch]" style={{ margin: "0.5rem 0 0", color: "var(--dim)" }}>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Panel>
  );
}
