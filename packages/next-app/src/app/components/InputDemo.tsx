'use client';

import { useState } from 'react';
import { ExampleInput } from '@example/stencil-lib-react/next';

export function InputDemo() {
  const [basicValue, setBasicValue] = useState('');

  const handleChange = (event: CustomEvent<string>) => {
    setBasicValue(event.detail);
  };

  return (
    <div className="demo-section">
      <section>
        <ExampleInput
          value={basicValue}
          placeholder="Type something..."
          onExampleChange={handleChange}
        >
          <span slot="label">Basic Input</span>
          <span slot="helper">Current value: {basicValue}</span>
        </ExampleInput>
      </section>
    </div>
  );
}
