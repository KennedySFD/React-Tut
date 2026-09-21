import { global } from './global';

/**
 * LAYER 3 — COMPONENT TOKENS
 *
 * Per-component values, built from the primitives and the resolved semantic
 * tokens for the active mode. Equivalent to a "Components" variable collection
 * in Figma.
 *
 * Rule of thumb used throughout this library:
 *   - GEOMETRY (height, padding, radius, font size) lives here.
 *   - COLOUR comes from semantic tokens at the point of use.
 *
 * That split is deliberate: it means a rebrand touches semantic.js only, while
 * a density/shape change touches this file only.
 *
 * @param {object} semantic - the resolved semantic token set for the current mode
 */
export function createComponents(semantic) {
  /**
   * Shared "field" tokens. Input, Textarea, Select and SearchBar all read from
   * this one object, which is what keeps them pixel-identical to each other.
   */
  const field = {
    radius: global.radii.md,
    borderWidth: global.borderWidths.thin,
    fontSize: global.fontSizes.md,
    gap: global.spacing.sm,
    sizes: {
      sm: {
        height: global.sizes.control.sm,
        paddingX: global.spacing.sm,
        fontSize: global.fontSizes.sm,
        iconSize: global.sizes.icon.sm,
      },
      md: {
        height: global.sizes.control.md,
        paddingX: global.spacing.md,
        fontSize: global.fontSizes.md,
        iconSize: global.sizes.icon.md,
      },
      lg: {
        height: global.sizes.control.lg,
        paddingX: global.spacing.lg,
        fontSize: global.fontSizes.md,
        iconSize: global.sizes.icon.lg,
      },
    },
    label: {
      gap: global.spacing.xs,
      fontSize: semantic.typography.label.size,
      fontWeight: semantic.typography.label.weight,
    },
    help: {
      gap: global.spacing.xs,
      fontSize: semantic.typography.caption.size,
    },
  };

  return {
    field,

    button: {
      radius: global.radii.md,
      borderWidth: global.borderWidths.thin,
      fontWeight: global.fontWeights.semibold,
      gap: global.spacing.sm,
      sizes: {
        sm: {
          height: global.sizes.control.sm,
          paddingX: global.spacing.md,
          fontSize: global.fontSizes.sm,
          iconSize: global.sizes.icon.sm,
        },
        md: {
          height: global.sizes.control.md,
          paddingX: global.spacing.lg,
          fontSize: global.fontSizes.sm,
          iconSize: global.sizes.icon.md,
        },
        lg: {
          height: global.sizes.control.lg,
          paddingX: global.spacing.xl,
          fontSize: global.fontSizes.md,
          iconSize: global.sizes.icon.lg,
        },
      },
    },

    card: {
      radius: global.radii.lg,
      borderWidth: global.borderWidths.thin,
      paddings: {
        sm: global.spacing.lg,
        md: global.spacing.xl,
        lg: global.spacing.xxl,
      },
    },

    tag: {
      radius: global.radii.full,
      borderWidth: global.borderWidths.thin,
      fontWeight: global.fontWeights.medium,
      sizes: {
        sm: {
          height: '1.375rem',
          paddingX: global.spacing.sm,
          fontSize: global.fontSizes.xs,
          gap: global.spacing.xs,
        },
        md: {
          height: '1.75rem',
          paddingX: global.spacing.md,
          fontSize: global.fontSizes.sm,
          gap: global.spacing.xs,
        },
      },
    },

    alert: {
      radius: global.radii.md,
      borderWidth: global.borderWidths.thin,
      padding: global.spacing.lg,
      gap: global.spacing.md,
      iconSize: global.sizes.icon.lg,
    },

    modal: {
      radius: global.radii.xl,
      padding: global.spacing.xl,
      gap: global.spacing.lg,
      widths: {
        sm: '22rem',
        md: '32rem',
        lg: '44rem',
      },
    },

    menu: {
      radius: global.radii.md,
      borderWidth: global.borderWidths.thin,
      padding: global.spacing.xs,
      maxHeight: '15rem',
      option: {
        radius: global.radii.sm,
        paddingX: global.spacing.md,
        paddingY: global.spacing.sm,
        fontSize: global.fontSizes.sm,
      },
    },

    choice: {
      // Checkbox / Radio box
      sizes: {
        sm: { box: '1rem', font: global.fontSizes.sm },
        md: { box: '1.25rem', font: global.fontSizes.md },
      },
      radius: global.radii.sm,
      borderWidth: global.borderWidths.thick,
      gap: global.spacing.sm,
    },

    switchControl: {
      sizes: {
        sm: { width: '2rem', height: '1.125rem', thumb: '0.875rem' },
        md: { width: '2.75rem', height: '1.5rem', thumb: '1.25rem' },
      },
      radius: global.radii.full,
      padding: '0.125rem',
      gap: global.spacing.sm,
    },

    tabs: {
      gap: global.spacing.xs,
      indicatorWidth: global.borderWidths.thick,
      tab: {
        paddingX: global.spacing.lg,
        paddingY: global.spacing.md,
        fontSize: global.fontSizes.sm,
        fontWeight: global.fontWeights.medium,
        radius: global.radii.md,
      },
    },

    tooltip: {
      radius: global.radii.sm,
      paddingX: global.spacing.md,
      paddingY: global.spacing.sm,
      fontSize: global.fontSizes.xs,
      maxWidth: '16rem',
      offset: global.spacing.sm,
    },

    accordion: {
      radius: global.radii.lg,
      borderWidth: global.borderWidths.thin,
      trigger: {
        paddingX: global.spacing.lg,
        paddingY: global.spacing.lg,
        fontSize: global.fontSizes.md,
        fontWeight: global.fontWeights.medium,
      },
      panel: {
        paddingX: global.spacing.lg,
        paddingBottom: global.spacing.lg,
      },
    },

    spinner: {
      sizes: {
        sm: '0.875rem',
        md: '1.125rem',
        lg: '1.5rem',
      },
      borderWidth: global.borderWidths.thick,
    },
  };
}
