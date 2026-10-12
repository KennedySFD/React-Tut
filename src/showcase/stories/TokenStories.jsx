'use client';

import { useThemeMode } from '@/context/ThemeModeContext';
import { Grid, Stack, Story } from '../kit';
import { useTheme } from '@/theme/ThemeProvider';
import styles from './token.module.scss';

const colorTokenPaths = [
  'background.canvas',
  'background.subtle',
  'background.sunken',
  'border.default',
  'text.primary',
  'text.muted',
  'accent.default',
  'accent.hover',
  'state.focusBorder',
  'state.selectedSurface',
  'feedback.success.solid',
  'feedback.warning.solid',
  'feedback.danger.solid',
  'feedback.info.solid',
];

/** Reads a dotted path off the resolved semantic colours. */
const read = (colors, path) => path.split('.').reduce((value, key) => value?.[key], colors);

export default function TokenStories() {
  const theme = useTheme();
  const { mode } = useThemeMode();

  const spacingScale = Object.entries(theme.global.spacing).filter(([key]) => key !== 'none');
  const radiiScale = Object.entries(theme.global.radii).filter(([key]) => key !== 'none');

  return (
    <>
      <Story
        title="Semantic colours"
        description={`Resolved for the active mode (${mode}). Toggle the theme in the header and every value here — and every component in the library — resolves against the other mode.`}
      >
        <div className={styles.swatchGrid}>
          {colorTokenPaths.map((path) => (
            <div key={path} className={styles.swatch}>
              <div className={styles.swatchChip} style={{ background: read(theme.semantic.colors, path) }} />
              <span className={styles.swatchName}>{path}</span>
            </div>
          ))}
        </div>
      </Story>

      <Story
        title="Interaction states"
        description="The tokens that keep a focused Input identical to a focused Select, Tab or Checkbox."
      >
        <div className={styles.swatchGrid}>
          {Object.entries(theme.semantic.colors.state).map(([name, value]) => (
            <div key={name} className={styles.swatch}>
              <div className={styles.swatchChip} style={{ background: value }} />
              <span className={styles.swatchName}>state.{name}</span>
            </div>
          ))}
        </div>
      </Story>

      <Story
        title="Dispersion"
        description="The chromatic fringe used by keylines and sheens. Kept low-saturation so it reads as refraction rather than as a rainbow."
      >
        <div className={styles.swatchGrid}>
          {Object.entries(theme.semantic.colors.dispersion).map(([name, value]) => (
            <div key={name} className={styles.swatch}>
              <div className={styles.swatchChip} style={{ background: value }} />
              <span className={styles.swatchName}>dispersion.{name}</span>
            </div>
          ))}
        </div>
      </Story>

      <Story title="Type scale" description="Semantic roles, not raw sizes.">
        <Stack $gap="md">
          {['display', 'heading', 'subheading', 'body', 'label', 'caption'].map((role) => (
            <div key={role} className={styles.scaleRow}>
              <span className={styles.scaleLabel}>{role}</span>
              <span
                style={{
                  fontSize: theme.semantic.typography[role].size,
                  fontWeight: theme.semantic.typography[role].weight,
                  lineHeight: theme.semantic.typography[role].lineHeight,
                }}
              >
                The quick brown fox
              </span>
            </div>
          ))}
        </Stack>
      </Story>

      <Story title="Spacing scale">
        <Stack $gap="sm">
          {spacingScale.map(([name, value]) => (
            <div key={name} className={styles.scaleRow}>
              <span className={styles.scaleLabel}>
                {name} · {value}
              </span>
              <div className={styles.scaleBar} style={{ width: value }} />
            </div>
          ))}
        </Stack>
      </Story>

      <Story title="Radii">
        <Grid $min="7rem">
          {radiiScale.map(([name, value]) => (
            <Stack key={name} $gap="sm">
              <div
                style={{
                  height: '3.5rem',
                  borderRadius: value,
                  background: theme.semantic.colors.accent.subtle,
                  border: `1px solid ${theme.semantic.colors.accent.border}`,
                }}
              />
              <span className={styles.scaleLabel}>
                {name} · {value}
              </span>
            </Stack>
          ))}
        </Grid>
      </Story>
    </>
  );
}
