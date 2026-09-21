'use client';

import { Input } from '@/components/ui';
import { MailIcon, UserIcon } from '@/components/icons';
import { Grid, Hint, PropsTable, Story } from '../kit';

export const heroControls = {
  size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
  icon: { type: 'boolean', default: false },
  required: { type: 'boolean', default: false },
  error: { type: 'boolean', default: false },
  disabled: { type: 'boolean', default: false },
};

export function Hero({ size, icon, required, error, disabled }) {
  return (
    <Input
      label="Email"
      placeholder="you@company.com"
      helperText="Click in to focus."
      size={size}
      required={required}
      disabled={disabled}
      error={error ? 'Enter a valid email address.' : undefined}
      iconLeft={icon ? <MailIcon /> : undefined}
    />
  );
}

export default function InputStories() {
  return (
    <>
      <Story title="States" description="Every state the field can be in.">
        <Grid>
          <Input label="Default" placeholder="you@company.com" />
          <Input
            label="With helper text"
            placeholder="you@company.com"
            helperText="We'll never share your address."
          />
          <Input label="Focus — press Tab" placeholder="Tab into me" />
          <Input label="Error" defaultValue="not-an-email" error="Enter a valid email address." />
          <Input label="Disabled" placeholder="Unavailable" disabled />
          <Input label="Read only" defaultValue="Locked value" readOnly />
          <Input label="Required" placeholder="Required field" required />
        </Grid>
        <Hint>
          <span>
            On focus a chromatic keyline draws outward from the centre of the lower edge. Select,
            Textarea and SearchBar all do the same thing, from the same hook.
          </span>
        </Hint>
      </Story>

      <Story title="Sizes" description="Matches the Button and Select control scale.">
        <Grid>
          <Input label="Small" size="sm" placeholder="Small" />
          <Input label="Medium" size="md" placeholder="Medium" />
          <Input label="Large" size="lg" placeholder="Large" />
        </Grid>
      </Story>

      <Story title="With icons" description="Leading and trailing slots inside the field.">
        <Grid>
          <Input label="Leading" placeholder="Your name" iconLeft={<UserIcon />} />
          <Input label="Trailing" placeholder="you@company.com" iconRight={<MailIcon />} />
          <Input
            label="Both"
            placeholder="Your name"
            iconLeft={<UserIcon />}
            iconRight={<MailIcon />}
          />
        </Grid>
      </Story>

      <PropsTable
        rows={[
          { name: 'label', type: 'string', description: 'Label, tied to the input with htmlFor.' },
          { name: 'helperText', type: 'string', description: 'Hint shown beneath the field.' },
          {
            name: 'error',
            type: 'string',
            description: 'Replaces helperText, turns the field red and sets aria-invalid.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Height, padding and font size.',
          },
          { name: 'iconLeft', type: 'ReactNode', description: 'Leading icon inside the field.' },
          { name: 'iconRight', type: 'ReactNode', description: 'Trailing icon inside the field.' },
          {
            name: 'required',
            type: 'boolean',
            default: 'false',
            description: 'Marks the label and the input as required.',
          },
          {
            name: 'fullWidth',
            type: 'boolean',
            default: 'true',
            description: 'Stretch to the container width.',
          },
        ]}
      />
    </>
  );
}
