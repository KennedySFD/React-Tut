'use client';

import { Avatar, Card, Skeleton } from '@/components/ui';
import { Grid, PropsTable, Row, Stack, Story } from '../kit';

export const heroControls = {
  variant: { type: 'select', options: ['text', 'circle', 'rect'], default: 'text' },
  lines: { type: 'select', options: ['1', '3', '5'], default: '3' },
};

export function Hero({ variant, lines }) {
  return (
    <div style={{ width: '100%', maxWidth: '24rem' }}>
      <Skeleton variant={variant} lines={variant === 'text' ? Number(lines) : 1} />
    </div>
  );
}

export default function SkeletonStories() {
  return (
    <>
      <Story title="Variants" description="Text, circle and rectangle placeholders.">
        <Stack style={{ gap: '1.5rem', maxWidth: '24rem' }}>
          <Skeleton variant="text" lines={3} />
          <Row style={{ gap: '1rem', alignItems: 'center' }}>
            <Skeleton variant="circle" />
            <Skeleton variant="text" width="10rem" />
          </Row>
          <Skeleton variant="rect" />
        </Stack>
      </Story>

      <Story title="Card placeholder" description="Composing skeletons to represent a loading card.">
        <Grid $min="16rem">
          <Card variant="outlined" padding="md">
            <Skeleton variant="rect" height="8rem" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" lines={2} />
          </Card>
          <Card variant="outlined" padding="md">
            <Row style={{ gap: '0.75rem', alignItems: 'center' }}>
              <Skeleton variant="circle" width="2.5rem" height="2.5rem" />
              <div style={{ flex: 1 }}>
                <Skeleton variant="text" width="50%" />
                <Skeleton variant="text" width="80%" />
              </div>
            </Row>
            <Skeleton variant="text" lines={3} />
          </Card>
        </Grid>
      </Story>

      <PropsTable
        rows={[
          { name: 'variant', type: "'text' | 'circle' | 'rect'", default: "'text'", description: 'Shape of the placeholder.' },
          { name: 'width', type: 'string', description: 'CSS width override.' },
          { name: 'height', type: 'string', description: 'CSS height override.' },
          { name: 'lines', type: 'number', default: '1', description: 'For text variant, renders multiple lines.' },
        ]}
      />
    </>
  );
}
