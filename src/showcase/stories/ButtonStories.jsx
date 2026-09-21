'use client';

import { Button } from '@/components/ui';
import { MailIcon, PlusIcon } from '@/components/icons';
import { Grid, Hint, PropsTable, Row, StateCell, StateName, Story } from '../kit';

/** Control schema — keys match the props Hero receives. */
export const heroControls = {
  variant: {
    type: 'select',
    options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'],
    default: 'primary',
  },
  size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
  icon: { type: 'boolean', default: false },
  loading: { type: 'boolean', default: false },
  disabled: { type: 'boolean', default: false },
};

/** The isolated instance: hover it, press it, tab to it. */
export function Hero({ variant, size, icon, loading, disabled }) {
  return (
    <Button
      variant={variant}
      size={size}
      loading={loading}
      disabled={disabled}
      iconLeft={icon ? <PlusIcon /> : undefined}
    >
      Save changes
    </Button>
  );
}

export default function ButtonStories() {
  return (
    <>
      <Story title="Variants" description="Five variants, all reading from semantic tokens.">
        <Row>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </Row>
      </Story>

      <Story
        title="Sizes"
        description="Heights come from the shared control scale, so buttons line up with inputs and selects on the same row."
      >
        <Row>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Row>
      </Story>

      <Story
        title="States"
        description="Hover and focus are real, not simulated — hover with the mouse and press Tab to move through them."
      >
        <Grid $min="10rem">
          <StateCell>
            <StateName>Default</StateName>
            <Button>Save changes</Button>
          </StateCell>
          <StateCell>
            <StateName>Hover me</StateName>
            <Button>Save changes</Button>
          </StateCell>
          <StateCell>
            <StateName>
              Focus — press <code>Tab</code>
            </StateName>
            <Button>Save changes</Button>
          </StateCell>
          <StateCell>
            <StateName>Loading</StateName>
            <Button loading>Saving</Button>
          </StateCell>
          <StateCell>
            <StateName>Disabled</StateName>
            <Button disabled>Save changes</Button>
          </StateCell>
        </Grid>
        <Hint>
          <span>
            On hover the surface lifts, a chromatic keyline fades in and a sheen sweeps across —
            the <code>control</code> amplitude of the shared motion system.
          </span>
        </Hint>
      </Story>

      <Story title="With icons" description="Icons inherit the button's text size and colour.">
        <Row>
          <Button iconLeft={<PlusIcon />}>New project</Button>
          <Button variant="secondary" iconRight={<MailIcon />}>
            Send invite
          </Button>
          <Button variant="ghost" iconOnly aria-label="Add">
            <PlusIcon />
          </Button>
        </Row>
      </Story>

      <Story title="Full width" description="Stretches to fill its container.">
        <Button fullWidth variant="secondary">
          Full width
        </Button>
      </Story>

      <PropsTable
        rows={[
          {
            name: 'variant',
            type: "'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger'",
            default: "'primary'",
            description: 'Visual treatment.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Height, padding and font size.',
          },
          {
            name: 'loading',
            type: 'boolean',
            default: 'false',
            description: 'Swaps the leading icon for a spinner and blocks input.',
          },
          {
            name: 'iconOnly',
            type: 'boolean',
            default: 'false',
            description: 'Square button. Pass an icon as children and an aria-label.',
          },
          { name: 'iconLeft', type: 'ReactNode', description: 'Leading icon.' },
          { name: 'iconRight', type: 'ReactNode', description: 'Trailing icon.' },
          {
            name: 'fullWidth',
            type: 'boolean',
            default: 'false',
            description: 'Stretch to the container width.',
          },
          {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables the button and all of its motion.',
          },
        ]}
      />
    </>
  );
}
