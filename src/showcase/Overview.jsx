'use client';

import Link from 'next/link';
import { Card } from '@/components/ui';
import {
  DocColumn,
  Eyebrow,
  Grid,
  Hint,
  PageHead,
  PageSummary,
  PageTitle,
  Story,
  StoryList,
} from './kit';
import { getGroupedRegistry, registry } from './registry';

export default function Overview() {
  const groups = getGroupedRegistry();

  return (
    <DocColumn>
      <PageHead>
        <Eyebrow>Overview</Eyebrow>
        <PageTitle>Component library</PageTitle>
        <PageSummary>
          {registry.length} entries, each on its own page. Every component is built from the same
          three-layer token system, shares one definition of each interaction state, and moves on
          one set of curves — so the focus ring you see on an input is the identical token used by
          the dropdown, the tabs and the checkboxes.
        </PageSummary>
      </PageHead>

      <StoryList>
        {groups.map((group) => (
          <Story key={group.category} title={group.category} padding="none" id={group.category}>
            <Grid $min="15rem" $gap="md">
              {group.entries.map((entry) => (
                <Card
                  key={entry.slug}
                  as={Link}
                  href={`/showcase/${entry.slug}`}
                  interactive
                  variant="outlined"
                  title={entry.name}
                  description={entry.summary}
                />
              ))}
            </Grid>
          </Story>
        ))}

        <Hint>
          <span>
            Interaction states are real, not simulated. Hover with the mouse, press <kbd>Tab</kbd>{' '}
            to see focus rings, and <kbd>Esc</kbd> to close overlays. The toggle in the header
            switches every token to its dark-mode value.
          </span>
        </Hint>
      </StoryList>
    </DocColumn>
  );
}
