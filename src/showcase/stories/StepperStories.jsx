'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import Stepper from '@/components/ui/stepper';
import { PropsTable, Row, Story } from '../kit';

const steps = [
  { label: 'Account' },
  { label: 'Details' },
  { label: 'Review' },
  { label: 'Confirm' },
];

export const heroControls = {
  activeStep: { type: 'select', options: ['0', '1', '2', '3', '4'], default: '2' },
};

export function Hero({ activeStep }) {
  return <Stepper steps={steps} activeStep={Number(activeStep)} style={{ width: '20rem' }} />;
}

export default function StepperStories() {
  return (
    <>
      <Story title="Interactive" description="Navigate through steps with buttons.">
        {(() => {
          const [step, setStep] = useState(1);
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
              <Stepper steps={steps} activeStep={step} style={{ maxWidth: '28rem', width: '100%' }} />
              <Row>
                <Button size="sm" variant="secondary" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>Back</Button>
                <Button size="sm" onClick={() => setStep((s) => Math.min(steps.length, s + 1))} disabled={step >= steps.length}>Next</Button>
              </Row>
            </div>
          );
        })()}
      </Story>

      <PropsTable
        rows={[
          { name: 'steps', type: 'Array<{label}>', description: 'Step definitions in order.' },
          { name: 'activeStep', type: 'number', default: '0', description: 'Zero-indexed current step.' },
        ]}
      />
    </>
  );
}
