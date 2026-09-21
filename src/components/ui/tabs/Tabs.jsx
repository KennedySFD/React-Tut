'use client';

import { useEffect, useId, useRef, useState } from 'react';
import gsap, { prefersReducedMotion } from '@/lib/gsap';
import { gesture } from '@/theme/motion';
import { Indicator, Panel, Tab, TabList, TabsRoot } from './Tabs.style';

/** Next non-disabled tab, wrapping at either end. */
function getNextEnabledIndex(items, from, direction) {
  const count = items.length;
  let next = from;

  for (let step = 0; step < count; step += 1) {
    next = (next + direction + count) % count;
    if (!items[next].disabled) return next;
  }
  return from;
}

/**
 * Tabs
 *
 * @param {{id: string, label: string, content?: React.ReactNode, disabled?: boolean}[]} items
 * @param {'underline'|'pill'} variant
 * @param {string} value        - controlled active tab id
 * @param {string} defaultValue - uncontrolled starting tab id
 *
 * States: hover, focus, selected, disabled.
 * Keyboard: Arrow keys move between tabs, Home/End jump to the ends.
 *
 * Motion: one indicator travels between tabs rather than each tab drawing its
 * own underline, on the shared `travel` gesture.
 */
export default function Tabs({
  items = [],
  variant = 'underline',
  value,
  defaultValue,
  onChange,
  className,
}) {
  const baseId = useId();
  const tabRefs = useRef([]);
  const listRef = useRef(null);
  const indicatorRef = useRef(null);
  const hasPositioned = useRef(false);

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? items.find((item) => !item.disabled)?.id,
  );
  const activeId = isControlled ? value : internalValue;
  const activeIndex = items.findIndex((item) => item.id === activeId);
  const activeItem = items[activeIndex];

  /**
   * Measure the selected tab and move the indicator onto it. The first
   * placement is instant — animating in from x:0 on mount would read as a
   * glitch rather than as motion.
   */
  useEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;

    const place = () => {
      const tab = tabRefs.current[activeIndex];
      if (!list || !indicator || !tab) return;

      const vars = {
        x: tab.offsetLeft - list.scrollLeft,
        width: tab.offsetWidth,
        opacity: 1,
      };

      if (!hasPositioned.current || prefersReducedMotion()) {
        gsap.set(indicator, vars);
        hasPositioned.current = true;
        return;
      }

      gsap.to(indicator, {
        ...vars,
        duration: gesture.travel.duration,
        ease: gesture.travel.ease,
      });
    };

    place();

    // Keep it aligned when the strip reflows
    const observer = new ResizeObserver(place);
    if (list) observer.observe(list);

    return () => observer.disconnect();
  }, [activeIndex, variant, items.length]);

  const selectTab = (index) => {
    const item = items[index];
    if (!item || item.disabled) return;

    if (!isControlled) setInternalValue(item.id);
    onChange?.(item.id);
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (event) => {
    const keys = {
      ArrowRight: () => getNextEnabledIndex(items, activeIndex, 1),
      ArrowLeft: () => getNextEnabledIndex(items, activeIndex, -1),
      Home: () => getNextEnabledIndex(items, -1, 1),
      End: () => getNextEnabledIndex(items, 0, -1),
    };

    const resolve = keys[event.key];
    if (!resolve) return;

    event.preventDefault();
    selectTab(resolve());
  };

  return (
    <TabsRoot className={className}>
      <TabList ref={listRef} role="tablist" $variant={variant} onKeyDown={handleKeyDown}>
        <Indicator ref={indicatorRef} $variant={variant} aria-hidden="true" />

        {items.map((item, index) => {
          const selected = item.id === activeId;

          return (
            <Tab
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              /* roving tabindex: only the active tab is in the tab order */
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              $variant={variant}
              onClick={() => selectTab(index)}
            >
              {item.label}
            </Tab>
          );
        })}
      </TabList>

      {activeItem?.content && (
        <Panel
          role="tabpanel"
          id={`${baseId}-panel-${activeItem.id}`}
          aria-labelledby={`${baseId}-tab-${activeItem.id}`}
          tabIndex={0}
        >
          {activeItem.content}
        </Panel>
      )}
    </TabsRoot>
  );
}
