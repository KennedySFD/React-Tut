import { global } from './global';

export const semantic = {
  colors: {
    primary: global.colors.blue500,
    background: global.colors.white,
    foreground: global.colors.grey900,
    surface: global.colors.grey100,
  },
  typography: {
    body: {
      size: global.fontSizes.md,
      weight: global.fontWeights.regular,
    },
    heading: {
      size: global.fontSizes.xl,
      weight: global.fontWeights.bold,
    },
    caption: {
      size: global.fontSizes.sm,
      weight: global.fontWeights.regular,
    },
  },
};
