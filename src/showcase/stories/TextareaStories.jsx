'use client';

import { Textarea } from '@/components/ui';
import { Grid, PropsTable, Story } from '../kit';

export const heroControls = {
  size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
  resize: { type: 'select', options: ['none', 'vertical', 'both'], default: 'vertical' },
  error: { type: 'boolean', default: false },
  disabled: { type: 'boolean', default: false },
};

export function Hero({ size, resize, error, disabled }) {
  return (
    <Textarea
      label="Description"
      placeholder="Tell us about the project…"
      size={size}
      resize={resize}
      disabled={disabled}
      error={error ? 'Minimum 40 characters.' : undefined}
    />
  );
}

export default function TextareaStories() {
  return (
    <>
      <Story
        title="States"
        description="The surface comes from the same fieldBase mixin as Input, so the two are indistinguishable."
      >
        <Grid $min="20rem">
          <Textarea
            label="Description"
            placeholder="Tell us about the project…"
            helperText="Markdown is supported."
          />
          <Textarea label="Error" defaultValue="Too short" error="Minimum 40 characters." />
          <Textarea label="Disabled" placeholder="Unavailable" disabled />
          <Textarea label="Read only" defaultValue="Locked value" readOnly />
        </Grid>
      </Story>

      <Story title="Rows and resize" description="Height and whether the user can drag it.">
        <Grid $min="20rem">
          <Textarea label="Two rows" rows={2} placeholder="Compact" />
          <Textarea label="No resize" resize="none" placeholder="Fixed height" />
        </Grid>
      </Story>

      <PropsTable
        rows={[
          { name: 'label', type: 'string', description: 'Label, tied to the textarea.' },
          { name: 'helperText', type: 'string', description: 'Hint shown beneath the field.' },
          { name: 'error', type: 'string', description: 'Replaces helperText and turns it red.' },
          { name: 'rows', type: 'number', default: '4', description: 'Visible line count.' },
          {
            name: 'resize',
            type: "'none' | 'vertical' | 'horizontal' | 'both'",
            default: "'vertical'",
            description: 'Which directions the user can resize.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Padding and font size.',
          },
        ]}
      />
    </>
  );
}
