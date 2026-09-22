'use client';

import { useState } from 'react';
import Slider from '@/components/ui/slider';
import { PropsTable, Story } from '../kit';

export function Hero() {
  const [val, setVal] = useState(40);
  return <Slider value={val} onChange={setVal} label="Volume" style={{ width: '16rem' }} />;
}

export default function SliderStories() {
  return (
    <>
      <Story title="Basic" description="A simple range slider with label and value.">
        {(() => {
          const [v, setV] = useState(50);
          return <Slider value={v} onChange={setV} label="Brightness" style={{ maxWidth: '20rem' }} />;
        })()}
      </Story>

      <Story title="Custom range" description="Min 0, max 1000, step 50.">
        {(() => {
          const [v, setV] = useState(250);
          return <Slider value={v} onChange={setV} min={0} max={1000} step={50} label="Budget" style={{ maxWidth: '20rem' }} />;
        })()}
      </Story>

      <Story title="Disabled" description="Non-interactive dimmed state.">
        <Slider value={30} disabled label="Locked" style={{ maxWidth: '20rem' }} />
      </Story>

      <PropsTable
        rows={[
          { name: 'value', type: 'number', default: '0', description: 'Current value.' },
          { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
          { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
          { name: 'step', type: 'number', default: '1', description: 'Step increment.' },
          { name: 'label', type: 'string', description: 'Text label above the slider.' },
          { name: 'showValue', type: 'boolean', default: 'true', description: 'Display the current value.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction.' },
          { name: 'onChange', type: '(value: number) => void', description: 'Called when value changes.' },
        ]}
      />
    </>
  );
}
