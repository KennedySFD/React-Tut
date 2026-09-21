'use client';

import { DocColumn, Eyebrow, Hero, PageHead, PageSummary, PageTitle, StoryList } from './kit';

import * as accordion from './stories/AccordionStories';
import * as alert from './stories/AlertStories';
import * as avatar from './stories/AvatarStories';
import * as badge from './stories/BadgeStories';
import * as breadcrumb from './stories/BreadcrumbStories';
import * as button from './stories/ButtonStories';
import * as card from './stories/CardStories';
import * as checkbox from './stories/CheckboxStories';
import * as divider from './stories/DividerStories';
import * as field from './stories/FieldStories';
import * as footer from './stories/FooterStories';
import * as header from './stories/HeaderStories';
import * as input from './stories/InputStories';
import * as modal from './stories/ModalStories';
import * as motion from './stories/MotionStories';
import * as radio from './stories/RadioStories';
import * as searchbar from './stories/SearchBarStories';
import * as select from './stories/SelectStories';
import * as skeleton from './stories/SkeletonStories';
import * as spinner from './stories/SpinnerStories';
import * as switchControl from './stories/SwitchStories';
import * as tabs from './stories/TabsStories';
import * as tag from './stories/TagStories';
import * as textarea from './stories/TextareaStories';
import * as tokens from './stories/TokenStories';
import * as tooltip from './stories/TooltipStories';

/**
 * Maps a registry slug to its story module.
 *
 * Namespace imports rather than default imports, because each module exports
 * more than its stories: an optional `Hero` (the single isolated instance
 * shown at the top of the page) plus `heroControls` (the schema driving its
 * controls panel) and `heroSurface`.
 *
 * Kept in a client module because every story is interactive. The route
 * itself stays a Server Component, so it can still prerender each page and
 * generate metadata from the registry.
 */
const modulesBySlug = {
  tokens,
  motion,

  button,
  spinner,

  field,
  input,
  textarea,
  searchbar,
  select,
  checkbox,
  radio,
  switch: switchControl,

  avatar,
  badge,
  card,
  tag,
  accordion,
  divider,
  skeleton,

  alert,
  modal,
  tooltip,

  breadcrumb,
  tabs,

  header,
  footer,
};

export default function StoryRenderer({ slug, entry }) {
  const storyModule = modulesBySlug[slug];
  const Stories = storyModule?.default;
  const HeroSubject = storyModule?.Hero;

  return (
    <>
      {/* Foundations pages describe the system rather than one component,
          so they have no isolated instance to show. */}
      {HeroSubject && (
        <Hero
          name={entry.name}
          component={HeroSubject}
          controls={storyModule.heroControls}
          surface={storyModule.heroSurface ?? 'default'}
          wide={storyModule.heroWide ?? false}
        />
      )}

      <DocColumn>
        <PageHead>
          <Eyebrow>{entry.category}</Eyebrow>
          <PageTitle>{entry.name}</PageTitle>
          <PageSummary>{entry.summary}</PageSummary>
        </PageHead>

        <StoryList>{Stories ? <Stories /> : null}</StoryList>
      </DocColumn>
    </>
  );
}
