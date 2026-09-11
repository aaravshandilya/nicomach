import { Panel } from "./Panel";

export function PanelProblem({ onBrief }: { onBrief: () => void }) {
  return (
    <Panel id="problem" ground="dark" tag="The problem">
      <h2 className="t-panel max-w-[15ch]">
        Businesses optimise everything except the obligations between them.
      </h2>
      <p className="t-lead mt-12 max-w-[38ch]" style={{ color: "var(--dim)" }}>
        Invoices are paid one at a time. Nobody sees what the network owes itself.
      </p>
      <div className="mt-12">
        <button className="btn btn--line" onClick={onBrief}>Read the brief</button>
      </div>
    </Panel>
  );
}
