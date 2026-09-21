/**
 * LAYER 1 — GLOBAL TOKENS (primitives)
 *
 * Raw values only. No semantic meaning, no component knowledge.
 * This layer is the equivalent of a "Primitives" variable collection in Figma.
 *
 * Rebranding rule: to reskin the whole library, you usually only need to
 * change the `brand` colour ramp below. Everything else derives from it
 * through semantic.js.
 */
export const global = {
  colors: {
    // Absolute
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',

    // Neutral ramp — surfaces, text, borders
    neutral0: '#FFFFFF',
    neutral50: '#FAFAFA',
    neutral100: '#F4F4F5',
    neutral200: '#E4E4E7',
    neutral300: '#D4D4D8',
    neutral400: '#A1A1AA',
    neutral500: '#71717A',
    neutral600: '#52525B',
    neutral700: '#3F3F46',
    neutral800: '#27272A',
    neutral900: '#18181B',
    neutral950: '#09090B',

    // Brand ramp — swap these to rebrand the library
    brand50: '#EFF6FF',
    brand100: '#DBEAFE',
    brand200: '#BFDBFE',
    brand300: '#93C5FD',
    brand400: '#60A5FA',
    brand500: '#3B82F6',
    brand600: '#2563EB',
    brand700: '#1D4ED8',
    brand800: '#1E40AF',
    brand900: '#1E3A8A',

    // Success
    green50: '#ECFDF5',
    green100: '#D1FAE5',
    green200: '#A7F3D0',
    green400: '#34D399',
    green500: '#10B981',
    green600: '#059669',
    green700: '#047857',
    green900: '#064E3B',

    // Warning
    amber50: '#FFFBEB',
    amber100: '#FEF3C7',
    amber200: '#FDE68A',
    amber400: '#FBBF24',
    amber500: '#F59E0B',
    amber600: '#D97706',
    amber700: '#B45309',
    amber900: '#78350F',

    // Danger
    red50: '#FEF2F2',
    red100: '#FEE2E2',
    red200: '#FECACA',
    red400: '#F87171',
    red500: '#EF4444',
    red600: '#DC2626',
    red700: '#B91C1C',
    red900: '#7F1D1D',
  },

  // Alpha values used for overlays and translucent states
  alphas: {
    overlayLight: 'rgba(9, 9, 11, 0.45)',
    overlayDark: 'rgba(0, 0, 0, 0.65)',
    brandRingLight: 'rgba(59, 130, 246, 0.35)',
    brandRingDark: 'rgba(96, 165, 250, 0.40)',
    dangerRingLight: 'rgba(239, 68, 68, 0.30)',
    dangerRingDark: 'rgba(248, 113, 113, 0.35)',
    hoverLight: 'rgba(9, 9, 11, 0.04)',
    hoverDark: 'rgba(255, 255, 255, 0.06)',
    activeLight: 'rgba(9, 9, 11, 0.08)',
    activeDark: 'rgba(255, 255, 255, 0.10)',
  },

  fontFamilies: {
    sans: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
  },

  fontSizes: {
    xs: '0.75rem', //   12px
    sm: '0.875rem', //  14px
    md: '1rem', //      16px
    lg: '1.125rem', //  18px
    xl: '1.375rem', //  22px
    xxl: '1.75rem', //  28px
    xxxl: '2.25rem', // 36px
  },

  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeights: {
    tight: 1.2,
    snug: 1.35,
    normal: 1.5,
    relaxed: 1.65,
  },

  letterSpacings: {
    tight: '-0.015em',
    normal: '0',
    wide: '0.03em',
  },

  spacing: {
    none: '0',
    xxs: '0.125rem', // 2px
    xs: '0.25rem', //   4px
    sm: '0.5rem', //    8px
    md: '0.75rem', //   12px
    lg: '1rem', //      16px
    xl: '1.5rem', //    24px
    xxl: '2rem', //     32px
    xxxl: '3rem', //    48px
  },

  radii: {
    none: '0',
    sm: '0.25rem', //  4px
    md: '0.5rem', //   8px
    lg: '0.75rem', //  12px
    xl: '1rem', //     16px
    full: '9999px',
  },

  borderWidths: {
    none: '0',
    thin: '1px',
    thick: '2px',
    ring: '3px', // focus ring thickness — see mixins.focusRing
  },

  // Control heights keep Button / Input / Select / SearchBar aligned on a row
  sizes: {
    control: {
      sm: '2rem', //    32px
      md: '2.5rem', //  40px
      lg: '3rem', //    48px
    },
    icon: {
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
    },
  },

  shadows: {
    light: {
      none: 'none',
      xs: '0 1px 2px rgba(9, 9, 11, 0.06)',
      sm: '0 1px 3px rgba(9, 9, 11, 0.08), 0 1px 2px rgba(9, 9, 11, 0.04)',
      md: '0 4px 12px rgba(9, 9, 11, 0.08), 0 2px 4px rgba(9, 9, 11, 0.04)',
      lg: '0 12px 28px rgba(9, 9, 11, 0.12), 0 4px 8px rgba(9, 9, 11, 0.06)',
    },
    dark: {
      none: 'none',
      xs: '0 1px 2px rgba(0, 0, 0, 0.40)',
      sm: '0 1px 3px rgba(0, 0, 0, 0.50), 0 1px 2px rgba(0, 0, 0, 0.30)',
      md: '0 4px 12px rgba(0, 0, 0, 0.55), 0 2px 4px rgba(0, 0, 0, 0.35)',
      lg: '0 12px 28px rgba(0, 0, 0, 0.65), 0 4px 8px rgba(0, 0, 0, 0.45)',
    },
  },

  /* Backdrop blur strengths for glass surfaces */
  blurs: {
    glass: '14px',
    strong: '22px',
  },

  /**
   * Raw motion primitives are declared in theme/motion.js, which builds both
   * the CSS and the GSAP representation of each curve from one set of control
   * points. They are surfaced on the theme as `theme.motion`.
   */

  opacities: {
    disabled: 0.45,
    muted: 0.7,
    full: 1,
  },

  zIndex: {
    base: 0,
    raised: 10,
    dropdown: 1000,
    sticky: 1100,
    overlay: 1200,
    modal: 1300,
    tooltip: 1400,
  },
};
