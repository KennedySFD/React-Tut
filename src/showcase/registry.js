/**
 * The showcase index.
 *
 * Metadata only — no JSX — so this stays importable from Server Components
 * (the dynamic route uses it for `generateStaticParams` and page metadata).
 * The stories themselves are client components, mapped by slug in
 * StoryRenderer.jsx.
 *
 * Adding a component to the library means adding one entry here and one file
 * in ./stories.
 */

export const categories = [
  'Foundations',
  'Actions',
  'Forms',
  'Data display',
  'Feedback',
  'Navigation',
  'Layout',
];

export const registry = [
  {
    slug: 'tokens',
    name: 'Design tokens',
    category: 'Foundations',
    summary: 'The three-layer token system: colour, type, spacing and radii.',
  },
  {
    slug: 'motion',
    name: 'Motion & materials',
    category: 'Foundations',
    summary: 'Curves, gestures, amplitude families, and the glass material.',
  },

  {
    slug: 'button',
    name: 'Button',
    category: 'Actions',
    summary: 'Five variants across three sizes, with loading and icon layouts.',
  },
  {
    slug: 'spinner',
    name: 'Spinner',
    category: 'Actions',
    summary: 'Indeterminate loading indicator that inherits currentColor.',
  },

  {
    slug: 'field',
    name: 'Field',
    category: 'Forms',
    summary: 'The shared label and help-text chrome every form control composes.',
  },
  {
    slug: 'input',
    name: 'Input',
    category: 'Forms',
    summary: 'Single-line text field with label, helper text and validation.',
  },
  {
    slug: 'textarea',
    name: 'Textarea',
    category: 'Forms',
    summary: 'Multi-line text field sharing the Input surface exactly.',
  },
  {
    slug: 'searchbar',
    name: 'SearchBar',
    category: 'Forms',
    summary: 'A search-shaped Input with clear button and Enter to search.',
  },
  {
    slug: 'select',
    name: 'Select',
    category: 'Forms',
    summary: 'Custom dropdown listbox with full keyboard support.',
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    category: 'Forms',
    summary: 'Binary choice with an indeterminate state.',
  },
  {
    slug: 'radio',
    name: 'Radio',
    category: 'Forms',
    summary: 'Mutually exclusive options, individually or as a group.',
  },
  {
    slug: 'switch',
    name: 'Switch',
    category: 'Forms',
    summary: 'On/off toggle for settings that apply immediately.',
  },

  {
    slug: 'avatar',
    name: 'Avatar',
    category: 'Data display',
    summary: 'User or entity image with an initials fallback and status dot.',
  },
  {
    slug: 'badge',
    name: 'Badge',
    category: 'Data display',
    summary: 'Small count or status indicator overlaid on another element.',
  },
  {
    slug: 'card',
    name: 'Card',
    category: 'Data display',
    summary: 'Surfaces for grouping content, with image, glass and interactive variants.',
  },
  {
    slug: 'tag',
    name: 'Tag',
    category: 'Data display',
    summary: 'Compact status and category labels in six variants.',
  },
  {
    slug: 'accordion',
    name: 'Accordion',
    category: 'Data display',
    summary: 'Collapsible sections that expand to their content height.',
  },
  {
    slug: 'divider',
    name: 'Divider',
    category: 'Data display',
    summary: 'Horizontal or vertical separator with optional label.',
  },
  {
    slug: 'skeleton',
    name: 'Skeleton',
    category: 'Data display',
    summary: 'Pulsing placeholder shapes for content that is still loading.',
  },

  {
    slug: 'alert',
    name: 'Alert',
    category: 'Feedback',
    summary: 'Inline messages in the four feedback families.',
  },
  {
    slug: 'modal',
    name: 'Modal',
    category: 'Feedback',
    summary: 'Portalled dialog with focus trap, scroll lock and Escape.',
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    category: 'Feedback',
    summary: 'Short label on hover and keyboard focus, in four placements.',
  },

  {
    slug: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'Navigation',
    summary: 'A trail of links showing the current page hierarchy.',
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    category: 'Navigation',
    summary: 'Two variants with a single indicator that travels between tabs.',
  },

  {
    slug: 'header',
    name: 'Header',
    category: 'Layout',
    summary: 'Sticky top bar with brand, navigation links and an actions slot.',
  },
  {
    slug: 'footer',
    name: 'Footer',
    category: 'Layout',
    summary: 'Site-wide footer with link columns, social icons and copyright.',
  },
];

/** Look up one entry by slug. */
export function getEntry(slug) {
  return registry.find((entry) => entry.slug === slug) ?? null;
}

/** The registry grouped into sidebar sections, in category order. */
export function getGroupedRegistry() {
  return categories
    .map((category) => ({
      category,
      entries: registry.filter((entry) => entry.category === category),
    }))
    .filter((group) => group.entries.length > 0);
}
