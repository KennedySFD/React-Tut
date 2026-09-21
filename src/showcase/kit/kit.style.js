import styled from 'styled-components';
import { focusRingOnly, typography } from '@/theme/mixins';

/* ------------------------------------------------------------ hero stage -- */

/**
 * Holds everything below the hero. The hero itself sits outside it, so the
 * stage spans the full content width while the documentation stays at a
 * readable measure.
 */
export const DocColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.global.spacing.xxl};
  width: 100%;
  max-width: 64rem;
  padding: var(--showcase-gutter) var(--showcase-gutter)
    ${({ theme }) => theme.global.spacing.xxxl};
`;

/**
 * The isolation stage: one instance of the component, alone, filling the
 * viewport.
 *
 * It sizes itself against the sticky top bar using a variable set on the
 * showcase Shell, so the whole stage is visible without scrolling and cannot
 * drift out of step with the layout.
 */
export const HeroStage = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.global.spacing.xl};
  width: 100%;
  padding: ${({ theme }) => theme.global.spacing.xxl};
  min-height: calc(100vh - var(--showcase-topbar));
  /* dvh accounts for mobile browser chrome that appears and disappears */
  min-height: calc(100dvh - var(--showcase-topbar));
  background: ${({ theme }) => theme.semantic.colors.background.canvas};
  border-bottom: ${({ theme }) => theme.global.borderWidths.thin} solid
    ${({ theme }) => theme.semantic.colors.border.subtle};
  overflow: hidden;
`;

/** Busy backdrop, for isolating a frosted component. */
export const GlassHeroStage = styled(HeroStage)`
  background: radial-gradient(
      circle at 18% 22%,
      ${({ theme }) => theme.semantic.colors.dispersion.violet} 0%,
      transparent 45%
    ),
    radial-gradient(
      circle at 82% 26%,
      ${({ theme }) => theme.semantic.colors.dispersion.cyan} 0%,
      transparent 45%
    ),
    radial-gradient(
      circle at 50% 88%,
      ${({ theme }) => theme.semantic.colors.dispersion.rose} 0%,
      transparent 50%
    ),
    ${({ theme }) => theme.semantic.colors.background.sunken};
  isolation: isolate;
`;

/** Component name, pinned to the top of the stage. */
export const HeroName = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.global.spacing.xl};
  left: 50%;
  transform: translateX(-50%);
  ${typography('caption')};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.global.letterSpacings.wide};
  color: ${({ theme }) => theme.semantic.colors.text.muted};
`;

/** The component itself, centred with room to breathe. */
/**
 * Takes the remaining height so the component stays centred in the space
 * above the controls panel, rather than the whole group being centred.
 *
 * Pass $wide to remove the max-width for layout components (Header, Footer)
 * that need to fill the available width.
 */
export const HeroSubject = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${({ $wide }) => ($wide ? 'none' : '32rem')};
`;

/**
 * The controls panel: flip the isolated instance between its states without
 * leaving the page. The equivalent of Storybook's Controls addon.
 */
export const HeroControlBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.global.spacing.lg};
  max-width: 100%;
  padding: ${({ theme }) => theme.global.spacing.md}
    ${({ theme }) => theme.global.spacing.lg};
  background: ${({ theme }) => theme.semantic.colors.background.raised};
  border: ${({ theme }) => theme.global.borderWidths.thin} solid
    ${({ theme }) => theme.semantic.colors.border.subtle};
  border-radius: ${({ theme }) => theme.global.radii.lg};
  box-shadow: ${({ theme }) => theme.semantic.shadows.sm};
`;

export const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.global.spacing.sm};
`;

export const ControlLabel = styled.span`
  ${typography('caption')};
  font-family: ${({ theme }) => theme.global.fontFamilies.mono};
  color: ${({ theme }) => theme.semantic.colors.text.muted};
  white-space: nowrap;
`;

/** A segmented toggle for the one-of-many controls. */
export const Segmented = styled.div`
  display: inline-flex;
  gap: 0.125rem;
  padding: 0.125rem;
  background: ${({ theme }) => theme.semantic.colors.background.sunken};
  border-radius: ${({ theme }) => theme.global.radii.md};
`;

export const SegmentedOption = styled.button`
  padding: ${({ theme }) => theme.global.spacing.xs}
    ${({ theme }) => theme.global.spacing.sm};
  font-family: ${({ theme }) => theme.global.fontFamilies.mono};
  font-size: ${({ theme }) => theme.global.fontSizes.xs};
  line-height: 1;
  white-space: nowrap;
  border: none;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.global.radii.sm};
  /* Selected uses the same tokens as a chosen dropdown option */
  background: ${({ theme, $active }) =>
    $active ? theme.semantic.colors.background.raised : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.semantic.colors.state.selectedText : theme.semantic.colors.text.secondary};
  box-shadow: ${({ theme, $active }) => ($active ? theme.semantic.shadows.xs : 'none')};
  transition: background ${({ theme }) => theme.semantic.motion.fast},
    color ${({ theme }) => theme.semantic.motion.fast};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.semantic.colors.text.primary};
  }

  &:focus-visible {
    ${focusRingOnly};
  }
`;

export const HeroScrollCue = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.global.spacing.xs};
  ${typography('caption')};
  color: ${({ theme }) => theme.semantic.colors.text.muted};
  white-space: nowrap;
`;

/* ----------------------------------------------------------- page header -- */

export const PageHead = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.global.spacing.sm};
  padding-bottom: ${({ theme }) => theme.global.spacing.lg};
  border-bottom: ${({ theme }) => theme.global.borderWidths.thin} solid
    ${({ theme }) => theme.semantic.colors.border.subtle};
`;

export const Eyebrow = styled.span`
  ${typography('caption')};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.global.letterSpacings.wide};
  color: ${({ theme }) => theme.semantic.colors.accent.text};
`;

export const PageTitle = styled.h1`
  ${typography('display')};
  font-size: ${({ theme }) => theme.global.fontSizes.xxl};
  color: ${({ theme }) => theme.semantic.colors.text.primary};
`;

export const PageSummary = styled.p`
  ${typography('body')};
  max-width: 48rem;
  color: ${({ theme }) => theme.semantic.colors.text.secondary};
`;

export const StoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.global.spacing.xxl};
`;

/* ------------------------------------------------------------ one story -- */

export const StoryBlock = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.global.spacing.md};
  scroll-margin-top: 5rem;
`;

export const StoryHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.global.spacing.xxs};
`;

export const StoryTitle = styled.h2`
  ${typography('subheading')};
  font-size: ${({ theme }) => theme.global.fontSizes.md};
  color: ${({ theme }) => theme.semantic.colors.text.primary};
`;

export const StoryDescription = styled.p`
  ${typography('caption')};
  max-width: 48rem;
  color: ${({ theme }) => theme.semantic.colors.text.muted};
`;

const surfaces = {
  /* The default isolated canvas — deliberately the page's *raised* surface so
     it separates from the (subtle) page background behind it. */
  default: ({ theme }) => theme.semantic.colors.background.raised,
  sunken: ({ theme }) => theme.semantic.colors.background.sunken,
};

/**
 * The isolated canvas a story renders into.
 *
 * Storybook's core idea: a component is shown on its own surface, away from
 * page layout, so what you are looking at is the component and not its
 * context.
 */
export const Canvas = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.global.spacing.lg};
  padding: ${({ theme, $padding }) =>
    $padding === 'none' ? '0' : theme.global.spacing.xl};
  background: ${({ theme, $surface }) =>
    (surfaces[$surface] ?? surfaces.default)({ theme })};
  border: ${({ theme }) => theme.global.borderWidths.thin} solid
    ${({ theme }) => theme.semantic.colors.border.subtle};
  border-radius: ${({ theme }) => theme.global.radii.lg};
  overflow: ${({ $clip }) => ($clip ? 'hidden' : 'visible')};
`;

/**
 * A busy backdrop for glass stories. Frosted panes are invisible without
 * something behind them to refract.
 */
export const GlassCanvas = styled(Canvas)`
  background: radial-gradient(
      circle at 15% 20%,
      ${({ theme }) => theme.semantic.colors.dispersion.violet} 0%,
      transparent 45%
    ),
    radial-gradient(
      circle at 85% 25%,
      ${({ theme }) => theme.semantic.colors.dispersion.cyan} 0%,
      transparent 45%
    ),
    radial-gradient(
      circle at 50% 90%,
      ${({ theme }) => theme.semantic.colors.dispersion.rose} 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 75% 70%,
      ${({ theme }) => theme.semantic.colors.dispersion.amber} 0%,
      transparent 40%
    ),
    ${({ theme }) => theme.semantic.colors.background.sunken};
  isolation: isolate;
`;

/* ------------------------------------------------------ layout helpers -- */

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: ${({ $align }) => $align || 'center'};
  gap: ${({ theme, $gap }) => theme.global.spacing[$gap || 'lg']};
`;

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ $align }) => $align || 'stretch'};
  gap: ${({ theme, $gap }) => theme.global.spacing[$gap || 'md']};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${({ $min }) => $min || '16rem'}, 1fr));
  gap: ${({ theme, $gap }) => theme.global.spacing[$gap || 'lg']};
  align-items: start;
`;

export const StateCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.global.spacing.sm};
  min-width: 0;
`;

export const StateName = styled.span`
  ${typography('caption')};
  color: ${({ theme }) => theme.semantic.colors.text.muted};

  code {
    font-family: ${({ theme }) => theme.global.fontFamilies.mono};
    font-size: ${({ theme }) => theme.global.fontSizes.xs};
    color: ${({ theme }) => theme.semantic.colors.accent.text};
  }
`;

export const Hint = styled.p`
  ${typography('caption')};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.global.spacing.xs};
  padding: ${({ theme }) => theme.global.spacing.md};
  background: ${({ theme }) => theme.semantic.colors.background.subtle};
  border-radius: ${({ theme }) => theme.global.radii.md};
  color: ${({ theme }) => theme.semantic.colors.text.muted};

  kbd {
    font-family: ${({ theme }) => theme.global.fontFamilies.mono};
    font-size: ${({ theme }) => theme.global.fontSizes.xs};
    padding: 0.125rem 0.375rem;
    background: ${({ theme }) => theme.semantic.colors.background.raised};
    border: ${({ theme }) => theme.global.borderWidths.thin} solid
      ${({ theme }) => theme.semantic.colors.border.default};
    border-radius: ${({ theme }) => theme.global.radii.sm};
    color: ${({ theme }) => theme.semantic.colors.text.secondary};
  }
`;

/* --------------------------------------------------------- props table -- */

export const TableWrap = styled.div`
  overflow-x: auto;
  border: ${({ theme }) => theme.global.borderWidths.thin} solid
    ${({ theme }) => theme.semantic.colors.border.subtle};
  border-radius: ${({ theme }) => theme.global.radii.lg};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.global.fontSizes.sm};

  th,
  td {
    text-align: left;
    padding: ${({ theme }) => theme.global.spacing.md};
    vertical-align: top;
    border-bottom: ${({ theme }) => theme.global.borderWidths.thin} solid
      ${({ theme }) => theme.semantic.colors.border.subtle};
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  th {
    ${typography('caption')};
    text-transform: uppercase;
    letter-spacing: ${({ theme }) => theme.global.letterSpacings.wide};
    color: ${({ theme }) => theme.semantic.colors.text.muted};
    background: ${({ theme }) => theme.semantic.colors.background.subtle};
    white-space: nowrap;
  }

  td {
    color: ${({ theme }) => theme.semantic.colors.text.secondary};
  }
`;

export const PropName = styled.code`
  font-family: ${({ theme }) => theme.global.fontFamilies.mono};
  font-size: ${({ theme }) => theme.global.fontSizes.xs};
  font-weight: ${({ theme }) => theme.global.fontWeights.semibold};
  color: ${({ theme }) => theme.semantic.colors.text.primary};
  white-space: nowrap;
`;

export const PropType = styled.code`
  font-family: ${({ theme }) => theme.global.fontFamilies.mono};
  font-size: ${({ theme }) => theme.global.fontSizes.xs};
  color: ${({ theme }) => theme.semantic.colors.accent.text};
`;

export const PropDefault = styled.code`
  font-family: ${({ theme }) => theme.global.fontFamilies.mono};
  font-size: ${({ theme }) => theme.global.fontSizes.xs};
  color: ${({ theme }) => theme.semantic.colors.text.muted};
  white-space: nowrap;
`;
