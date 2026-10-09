import { ExampleCard, ExampleInput } from '@example/stencil-lib-react/next';

export default function SlotsRuntime() {
  return (
    <div className="container">
      <h1>Control: same markup via Runtime SSR (/next)</h1>
      <ExampleCard id="card">
        <ExampleInput slot="start" id="projected" placeholder="component in start slot">
          <span slot="label">nested label slot</span>
        </ExampleInput>
        <span slot="start" id="markup">markup in start slot</span>
        <p>default slot content</p>
      </ExampleCard>
    </div>
  );
}
