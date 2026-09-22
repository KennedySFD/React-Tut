'use client';

import { Button, Card } from '@/components/ui';
import { Grid, Hint, PropsTable, Story } from '../kit';

/**
 * The stage uses the busy backdrop so the glass variant can be isolated
 * properly; the opaque variants read fine over it too.
 */
export const heroSurface = 'glass';

export const heroControls = {
  variant: {
    type: 'select',
    options: ['elevated', 'outlined', 'filled', 'glass'],
    default: 'elevated',
  },
  padding: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
  interactive: { type: 'boolean', default: true },
  footer: { type: 'boolean', default: true },
};

export function Hero({ variant, padding, interactive, footer }) {
  return (
    <Card
      variant={variant}
      padding={padding}
      interactive={interactive}
      title="Project settings"
      description="Hover to lift, press to compress, tab to focus."
      footer={
        footer
          ? interactive
            ? 'Open'
            : <Button size="sm">Open</Button>
          : undefined
      }
      style={{ width: '100%' }}
    />
  );
}

export default function CardStories() {
  return (
    <>
      <Story title="Variants" description="Four surface treatments.">
        <Grid $min="16rem">
          <Card
            variant="elevated"
            title="Elevated"
            description="Raised surface with a soft shadow. The default."
          />
          <Card
            variant="outlined"
            title="Outlined"
            description="Flat surface with a visible border."
          />
          <Card variant="filled" title="Filled" description="Tinted surface with no border." />
        </Grid>
      </Story>

      <Story
        title="Glass"
        surface="glass"
        description="The frosted variant, shown over a busy backdrop — glass over a flat surface just looks like a lighter box."
      >
        <Grid $min="14rem">
          <Card
            variant="glass"
            title="Frosted"
            description="Translucent, blurred and lit along the top edge."
          />
          <Card
            variant="glass"
            interactive
            title="Dispersion"
            description="Hover for the chromatic keyline and sheen."
          />
        </Grid>
      </Story>

      <Story
        title="Interactive"
        description="Adds hover lift, an active press and the shared focus ring. Renders as a button unless the as prop overrides it."
      >
        <Grid $min="16rem">
          <Card interactive title="Hover me" description="Then press Tab to focus me." />
          <Card
            interactive
            variant="outlined"
            title="Outlined + interactive"
            description="Any variant can be interactive."
          />
        </Grid>
        <Hint>
          <span>
            Cards use the <code>surface</code> amplitude — a larger lift and a gentler press than a
            Button, on the identical curve.
          </span>
        </Hint>
      </Story>

      <Story title="With footer" description="Cards can carry actions.">
        <Grid $min="16rem">
          <Card
            variant="outlined"
            title="Confirm deployment"
            description="This will publish to production."
            footer={
              <>
                <Button size="sm">Confirm</Button>
                <Button size="sm" variant="ghost">
                  Cancel
                </Button>
              </>
            }
          />
        </Grid>
      </Story>

      <PropsTable
        rows={[
          {
            name: 'variant',
            type: "'elevated' | 'outlined' | 'filled' | 'glass'",
            default: "'elevated'",
            description: 'Surface treatment.',
          },
          {
            name: 'padding',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Inner spacing.',
          },
          {
            name: 'interactive',
            type: 'boolean',
            default: 'false',
            description: 'Hover, press and focus affordances. Renders as a button.',
          },
          { name: 'title', type: 'string', description: 'Heading.' },
          { name: 'description', type: 'string', description: 'Supporting line under the title.' },
          { name: 'footer', type: 'ReactNode', description: 'Action row at the bottom.' },
          {
            name: 'as',
            type: 'ElementType',
            description: 'Override the rendered element (e.g. an anchor).',
          },
        ]}
      />
    </>
  );
}
