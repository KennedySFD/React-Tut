import { global } from './global';
import { semantic } from './semantic';

export const components = {
  button: {
    padding: `${global.spacing.sm} ${global.spacing.md}`,
    borderRadius: global.radii.md,
    fontSize: global.fontSizes.md,
    fontWeight: global.fontWeights.semibold,
    primary: {
      background: semantic.colors.primary,
      color: global.colors.white,
    },
  },
  input: {
    padding: `${global.spacing.sm} ${global.spacing.md}`,
    borderRadius: global.radii.md,
    fontSize: global.fontSizes.md,
    borderColor: global.colors.grey100,
  },
};
