'use client';

import { CheckIcon } from '@/components/icons';
import { StepperRoot, StepItem, StepIndicator, StepConnector, StepLabel } from './Stepper.style';

/**
 * Stepper
 *
 * Multi-step wizard indicator. Shows progress through a sequence of steps.
 *
 * @param {Array<{label: string}>} steps
 * @param {number} activeStep - 0-indexed current step
 */
export default function Stepper({ steps = [], activeStep = 0, ...props }) {
  return (
    <StepperRoot role="list" {...props}>
      {steps.map((step, i) => {
        const status = i < activeStep ? 'complete' : i === activeStep ? 'active' : 'upcoming';
        return (
          <StepItem key={i} role="listitem">
            {i < steps.length - 1 && <StepConnector $complete={i < activeStep} />}
            <StepIndicator $status={status}>
              {status === 'complete' ? <CheckIcon size="0.875rem" /> : i + 1}
            </StepIndicator>
            <StepLabel $status={status}>{step.label}</StepLabel>
          </StepItem>
        );
      })}
    </StepperRoot>
  );
}
