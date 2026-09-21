import ShowcaseChrome from '@/showcase/ShowcaseChrome';

export const metadata = {
  title: {
    template: '%s · Component Library',
    default: 'Component Library',
  },
  description:
    'A token-driven React component library built with Next.js and styled-components.',
};

/**
 * Wraps every /showcase route. Because the chrome lives in the layout rather
 * than each page, navigating between components swaps only the content pane —
 * the sidebar keeps its scroll position and does not re-render.
 */
export default function ShowcaseLayout({ children }) {
  return <ShowcaseChrome>{children}</ShowcaseChrome>;
}
