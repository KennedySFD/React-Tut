'use client';

import { Field, Input } from '@/components/ui';
import { Grid, Hint, PropsTable, Story } from '../kit';

export const heroControls = {
  helperText: { type: 'boolean', default: true },
  required: { type: 'boolean', default: false },
  error: { type: 'boolean', default: false },
  disabled: { type: 'boolean', default: false },
};

export function Hero({ helperText, required, error, disabled }) {
  return (
    <Input
      label="Email address"
      helperText={helperText ? 'Field supplies this label and helper text.' : undefined}
      error={error ? 'Field supplies this error message too.' : undefined}
      required={required}
      disabled={disabled}
    />
  );
}

export default function FieldStories() {
  return (
    <>
      <Story
        title="What Field does"
        description="Field renders the label, the control and one line of helper or error text. Input, Textarea, Select and RadioGroup all compose it, so label typography, spacing and the error colour are defined exactly once."
      >
        <Grid>
          <Input label="Composed by Field" helperText="This helper text is Field's." />
          <Input label="Error state" error="So is this error message." defaultValue="Invalid" />
        </Grid>
        <Hint>
          <span>
            You rarely render Field directly — it is the shared chrome underneath the form
            components. It is exported for building new ones.
          </span>
        </Hint>
      </Story>

      <Story
        title="Direct use"
        description="Wrapping a control you have built yourself. Pass htmlFor and describedById so the label and help text are tied to it correctly."
      >
        <Field
          label="Custom control"
          helperText="Any control can sit inside."
          htmlFor="demo-custom"
          describedById="demo-custom-description"
        >
          <input
            id="demo-custom"
            aria-describedby="demo-custom-description"
            placeholder="A bare input"
            style={{ padding: '0.5rem', width: '100%' }}
          />
        </Field>
      </Story>

      <PropsTable
        rows={[
          { name: 'label', type: 'string', description: 'Label text.' },
          { name: 'helperText', type: 'string', description: 'Hint shown beneath the control.' },
          {
            name: 'error',
            type: 'string',
            description: 'Replaces helperText, turns red and gets role="alert".',
          },
          {
            name: 'htmlFor',
            type: 'string',
            description: 'Id of the control the label points at.',
          },
          {
            name: 'describedById',
            type: 'string',
            description: 'Id given to the help text, for aria-describedby.',
          },
          {
            name: 'required',
            type: 'boolean',
            default: 'false',
            description: 'Adds the required marker to the label.',
          },
          {
            name: 'as',
            type: 'ElementType',
            description: 'Render the label as another element, for grouped controls.',
          },
        ]}
      />
    </>
  );
}
