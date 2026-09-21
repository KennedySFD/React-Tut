'use client';

import { useState } from 'react';
import { Button, Tag } from '@/components/ui';
import { PropsTable, Row, Stack, StateName, Story } from '../kit';

const variants = ['neutral', 'accent', 'info', 'success', 'warning', 'danger'];
const initialTags = ['Design', 'Engineering', 'Research'];

export const heroControls = {
  variant: { type: 'select', options: variants, default: 'accent' },
  size: { type: 'select', options: ['sm', 'md'], default: 'md' },
  solid: { type: 'boolean', default: false },
  dot: { type: 'boolean', default: false },
  removable: { type: 'boolean', default: false },
};

export function Hero({ variant, size, solid, dot, removable }) {
  return (
    <Tag
      variant={variant}
      size={size}
      solid={solid}
      dot={dot}
      /* A no-op so the isolated instance cannot remove itself */
      onRemove={removable ? () => {} : undefined}
    >
      Engineering
    </Tag>
  );
}

export default function TagStories() {
  const [tags, setTags] = useState(initialTags);

  return (
    <>
      <Story
        title="Variants"
        description="Every variant resolves to the same three token slots on a feedback family, so adding one is a lookup rather than new CSS."
      >
        <Stack $gap="lg">
          <Stack $gap="sm">
            <StateName>Tinted</StateName>
            <Row $gap="sm">
              {variants.map((variant) => (
                <Tag key={variant} variant={variant}>
                  {variant}
                </Tag>
              ))}
            </Row>
          </Stack>

          <Stack $gap="sm">
            <StateName>Solid</StateName>
            <Row $gap="sm">
              {variants.map((variant) => (
                <Tag key={variant} variant={variant} solid>
                  {variant}
                </Tag>
              ))}
            </Row>
          </Stack>
        </Stack>
      </Story>

      <Story title="With status dot" description="For live state rather than category.">
        <Row $gap="sm">
          <Tag variant="success" dot>
            Live
          </Tag>
          <Tag variant="warning" dot>
            Degraded
          </Tag>
          <Tag variant="danger" dot>
            Down
          </Tag>
          <Tag variant="neutral" dot>
            Paused
          </Tag>
        </Row>
      </Story>

      <Story title="Sizes">
        <Row $gap="sm">
          <Tag size="sm" variant="accent">
            Small
          </Tag>
          <Tag size="md" variant="accent">
            Medium
          </Tag>
        </Row>
      </Story>

      <Story title="Removable" description="Passing onRemove renders a dismiss button.">
        <Row $gap="sm">
          {tags.map((tag) => (
            <Tag
              key={tag}
              variant="accent"
              onRemove={() => setTags((current) => current.filter((item) => item !== tag))}
            >
              {tag}
            </Tag>
          ))}
          {tags.length === 0 && (
            <Button size="sm" variant="ghost" onClick={() => setTags(initialTags)}>
              Reset tags
            </Button>
          )}
        </Row>
      </Story>

      <PropsTable
        rows={[
          {
            name: 'variant',
            type: "'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger'",
            default: "'neutral'",
            description: 'Colour family.',
          },
          {
            name: 'size',
            type: "'sm' | 'md'",
            default: "'md'",
            description: 'Height, padding and font size.',
          },
          {
            name: 'solid',
            type: 'boolean',
            default: 'false',
            description: 'Filled treatment instead of the tinted surface.',
          },
          {
            name: 'dot',
            type: 'boolean',
            default: 'false',
            description: 'Leading status dot.',
          },
          {
            name: 'onRemove',
            type: '() => void',
            description: 'Renders a dismiss button when provided.',
          },
        ]}
      />
    </>
  );
}
