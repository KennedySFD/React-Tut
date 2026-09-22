import { global } from './global';
import { cssDurations, curves } from './motion';

/**
 * LAYER 2 — SEMANTIC TOKENS (purpose)
 *
 * Maps primitives to *roles*. Components must never reach into `global`
 * for a colour — they read a role from here, so one edit re-skins everything.
 *
 * This layer is the equivalent of a "Semantic" variable collection in Figma
 * with two modes: Light and Dark. Both objects below have an identical shape,
 * which is what makes the Figma mode-swap a 1:1 mapping.
 *
 * The `state` group is the important one: `state.focusRing` is a single token
 * shared by Input, Select, SearchBar, Button, Checkbox, Tabs and everything
 * else that can receive focus. Change it once, every component follows.
 */

// Mode-independent roles (type scale, motion) — identical in light and dark.
const shared = {
  typography: {
    display: {
      family: global.fontFamilies.sans,
      size: global.fontSizes.xxxl,
      weight: global.fontWeights.bold,
      lineHeight: global.lineHeights.tight,
      letterSpacing: global.letterSpacings.tight,
    },
    heading: {
      family: global.fontFamilies.sans,
      size: global.fontSizes.xl,
      weight: global.fontWeights.semibold,
      lineHeight: global.lineHeights.snug,
      letterSpacing: global.letterSpacings.tight,
    },
    subheading: {
      family: global.fontFamilies.sans,
      size: global.fontSizes.lg,
      weight: global.fontWeights.semibold,
      lineHeight: global.lineHeights.snug,
      letterSpacing: global.letterSpacings.normal,
    },
    body: {
      family: global.fontFamilies.sans,
      size: global.fontSizes.md,
      weight: global.fontWeights.regular,
      lineHeight: global.lineHeights.normal,
      letterSpacing: global.letterSpacings.normal,
    },
    label: {
      family: global.fontFamilies.sans,
      size: global.fontSizes.sm,
      weight: global.fontWeights.medium,
      lineHeight: global.lineHeights.snug,
      letterSpacing: global.letterSpacings.normal,
    },
    caption: {
      family: global.fontFamilies.sans,
      size: global.fontSizes.xs,
      weight: global.fontWeights.regular,
      lineHeight: global.lineHeights.snug,
      letterSpacing: global.letterSpacings.normal,
    },
    code: {
      family: global.fontFamilies.mono,
      size: global.fontSizes.sm,
      weight: global.fontWeights.regular,
      lineHeight: global.lineHeights.normal,
      letterSpacing: global.letterSpacings.normal,
    },
  },

  /**
   * CSS transition shorthands, built from the same curves GSAP uses.
   * A CSS `transition` written with `motion.fast` and a GSAP tween written
   * with `ease: 'glass'` are the identical easing function.
   */
  motion: {
    fast: `${cssDurations.press} ${curves.glass.css}`,
    base: `${cssDurations.hover} ${curves.glass.css}`,
    slow: `${cssDurations.settle} ${curves.glass.css}`,
    entrance: `${cssDurations.reveal} ${curves.glass.css}`,
    exit: `${cssDurations.press} ${curves.glassIn.css}`,
    travel: `${cssDurations.travel} ${curves.glassInOut.css}`,
  },
};

const light = {
  ...shared,

  colors: {
    // Surfaces — from furthest back to closest to the viewer
    background: {
      canvas: global.colors.neutral0,
      subtle: global.colors.neutral50,
      sunken: global.colors.neutral100,
      raised: global.colors.neutral0,
      overlay: global.colors.neutral0,
      inverse: global.colors.neutral900,
      scrim: global.alphas.overlayLight,
    },

    // Text
    text: {
      primary: global.colors.neutral900,
      secondary: global.colors.neutral600,
      muted: global.colors.neutral500,
      placeholder: global.colors.neutral400,
      disabled: global.colors.neutral400,
      inverse: global.colors.neutral0,
      onAccent: global.colors.neutral0,
      link: global.colors.brand600,
    },

    // Borders
    border: {
      subtle: global.colors.neutral200,
      default: global.colors.neutral300,
      strong: global.colors.neutral400,
      inverse: global.colors.neutral700,
    },

    // Brand / accent
    accent: {
      subtle: global.colors.brand50,
      muted: global.colors.brand100,
      border: global.colors.brand300,
      default: global.colors.brand500,
      hover: global.colors.brand600,
      active: global.colors.brand700,
      text: global.colors.brand700,
      onAccent: global.colors.neutral0,
    },

    // Feedback families — every one has the same 5 slots
    feedback: {
      info: {
        surface: global.colors.brand50,
        border: global.colors.brand200,
        text: global.colors.brand700,
        solid: global.colors.brand500,
        onSolid: global.colors.neutral0,
      },
      success: {
        surface: global.colors.green50,
        border: global.colors.green200,
        text: global.colors.green700,
        solid: global.colors.green600,
        onSolid: global.colors.neutral0,
      },
      warning: {
        surface: global.colors.amber50,
        border: global.colors.amber200,
        text: global.colors.amber700,
        solid: global.colors.amber500,
        onSolid: global.colors.neutral900,
      },
      danger: {
        surface: global.colors.red50,
        border: global.colors.red200,
        text: global.colors.red700,
        solid: global.colors.red600,
        onSolid: global.colors.neutral0,
      },
      neutral: {
        surface: global.colors.neutral100,
        border: global.colors.neutral200,
        text: global.colors.neutral700,
        solid: global.colors.neutral600,
        onSolid: global.colors.neutral0,
      },
    },

    /**
     * INTERACTION STATES — shared by every interactive component.
     * These are the tokens that keep an Input's focus ring identical to a
     * Select's, a Tab's and a Checkbox's.
     */
    state: {
      hoverSurface: global.alphas.hoverLight,
      activeSurface: global.alphas.activeLight,
      hoverBorder: global.colors.neutral400,

      focusBorder: global.colors.brand500,
      focusRing: global.alphas.brandRingLight,

      selectedSurface: global.colors.brand50,
      selectedBorder: global.colors.brand500,
      selectedText: global.colors.brand700,

      errorBorder: global.colors.red500,
      errorRing: global.alphas.dangerRingLight,
      errorText: global.colors.red600,

      disabledSurface: global.colors.neutral100,
      disabledBorder: global.colors.neutral200,
      disabledText: global.colors.neutral400,
    },

    /**
     * GLASS — translucent surfaces that let the page show through.
     * `highlight` is the bright inner edge where light catches the top of a
     * pane; `shade` is the soft inner shadow on the lower edge.
     */
    glass: {
      surface: 'rgba(255, 255, 255, 0.70)',
      surfaceStrong: 'rgba(255, 255, 255, 0.88)',
      highlight: 'rgba(255, 255, 255, 0.95)',
      shade: 'rgba(9, 9, 11, 0.05)',
    },

    /**
     * DISPERSION — the chromatic fringe of light split through a glass edge.
     * Used as a keyline gradient, never as a fill. Vivid enough to read as
     * a deliberate prismatic accent, not a washed-out tint.
     */
    dispersion: {
      cyan: 'rgba(34, 211, 238, 0.88)',
      violet: 'rgba(139, 92, 246, 0.85)',
      amber: 'rgba(245, 158, 11, 0.78)',
      rose: 'rgba(236, 72, 153, 0.80)',
      sheen: 'rgba(255, 255, 255, 0.90)',
    },
  },

  shadows: global.shadows.light,
};

const dark = {
  ...shared,

  colors: {
    background: {
      canvas: global.colors.neutral950,
      subtle: global.colors.neutral900,
      sunken: global.colors.black,
      raised: global.colors.neutral900,
      overlay: global.colors.neutral800,
      inverse: global.colors.neutral0,
      scrim: global.alphas.overlayDark,
    },

    text: {
      primary: global.colors.neutral50,
      secondary: global.colors.neutral300,
      muted: global.colors.neutral400,
      placeholder: global.colors.neutral500,
      disabled: global.colors.neutral600,
      inverse: global.colors.neutral900,
      onAccent: global.colors.neutral0,
      link: global.colors.neutral200,
    },

    border: {
      subtle: global.colors.neutral800,
      default: global.colors.neutral700,
      strong: global.colors.neutral600,
      inverse: global.colors.neutral300,
    },

    accent: {
      subtle: 'rgba(255, 255, 255, 0.08)',
      muted: 'rgba(255, 255, 255, 0.14)',
      border: global.colors.neutral600,
      default: global.colors.neutral0,
      hover: global.colors.neutral200,
      active: global.colors.neutral300,
      text: global.colors.neutral200,
      onAccent: global.colors.neutral950,
    },

    feedback: {
      info: {
        surface: 'rgba(255, 255, 255, 0.08)',
        border: 'rgba(255, 255, 255, 0.20)',
        text: global.colors.neutral300,
        solid: global.colors.neutral300,
        onSolid: global.colors.neutral950,
      },
      success: {
        surface: 'rgba(16, 185, 129, 0.14)',
        border: 'rgba(16, 185, 129, 0.32)',
        text: global.colors.green400,
        solid: global.colors.green500,
        onSolid: global.colors.neutral950,
      },
      warning: {
        surface: 'rgba(245, 158, 11, 0.14)',
        border: 'rgba(245, 158, 11, 0.32)',
        text: global.colors.amber400,
        solid: global.colors.amber500,
        onSolid: global.colors.neutral950,
      },
      danger: {
        surface: 'rgba(239, 68, 68, 0.14)',
        border: 'rgba(239, 68, 68, 0.32)',
        text: global.colors.red400,
        solid: global.colors.red500,
        onSolid: global.colors.neutral0,
      },
      neutral: {
        surface: global.colors.neutral800,
        border: global.colors.neutral700,
        text: global.colors.neutral300,
        solid: global.colors.neutral600,
        onSolid: global.colors.neutral0,
      },
    },

    state: {
      hoverSurface: global.alphas.hoverDark,
      activeSurface: global.alphas.activeDark,
      hoverBorder: global.colors.neutral600,

      focusBorder: global.colors.neutral300,
      focusRing: global.alphas.brandRingDark,

      selectedSurface: 'rgba(255, 255, 255, 0.12)',
      selectedBorder: global.colors.neutral300,
      selectedText: global.colors.neutral100,

      errorBorder: global.colors.red400,
      errorRing: global.alphas.dangerRingDark,
      errorText: global.colors.red400,

      disabledSurface: global.colors.neutral800,
      disabledBorder: global.colors.neutral800,
      disabledText: global.colors.neutral600,
    },

    glass: {
      surface: 'rgba(24, 24, 27, 0.64)',
      surfaceStrong: 'rgba(24, 24, 27, 0.86)',
      highlight: 'rgba(255, 255, 255, 0.12)',
      shade: 'rgba(0, 0, 0, 0.35)',
    },

    /* Brighter on dark, where the fringe has to survive a low-luminance
       backdrop. Pushed to full vivid so the prismatic ring pops. */
    dispersion: {
      cyan: 'rgba(34, 211, 238, 0.90)',
      violet: 'rgba(167, 139, 250, 0.88)',
      amber: 'rgba(250, 204, 21, 0.78)',
      rose: 'rgba(244, 114, 182, 0.82)',
      sheen: 'rgba(255, 255, 255, 0.40)',
    },
  },

  shadows: global.shadows.dark,
};

/** Both modes, shaped identically. Consumed by createTheme() in index.js. */
export const semantic = { light, dark };

export const themeModes = ['light', 'dark'];
