'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { SearchIcon } from '@/components/icons';
import {
  Backdrop,
  PalettePanel,
  PaletteInput,
  ResultList,
  GroupLabel,
  ResultItem,
  Shortcut,
} from './CommandPalette.style';

/**
 * CommandPalette
 *
 * ⌘K search/action bar. Pass `items` grouped by category.
 *
 * @param {boolean} open
 * @param {() => void} onClose
 * @param {Array<{id, label, icon?, group?, shortcut?, onSelect?}>} items
 */
export default function CommandPalette({ open, onClose, items = [], ...props }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return items.filter((item) => item.label.toLowerCase().includes(q));
  }, [items, query]);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const item of filtered) {
      const g = item.group || 'Actions';
      if (!map.has(g)) map.set(g, []);
      map.get(g).push(item);
    }
    return map;
  }, [filtered]);

  const flat = useMemo(() => filtered, [filtered]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const select = useCallback(
    (item) => {
      item.onSelect?.();
      onClose?.();
    },
    [onClose],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') return onClose?.();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % flat.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + flat.length) % flat.length);
      } else if (e.key === 'Enter' && flat[activeIndex]) {
        e.preventDefault();
        select(flat[activeIndex]);
      }
    },
    [flat, activeIndex, select, onClose],
  );

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <Backdrop onClick={onClose} {...props}>
      <PalettePanel onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
        <PaletteInput
          ref={inputRef}
          placeholder="Type a command or search…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <ResultList>
          {[...grouped.entries()].map(([group, groupItems]) => {
            return (
              <div key={group}>
                <GroupLabel>{group}</GroupLabel>
                {groupItems.map((item) => {
                  const idx = flat.indexOf(item);
                  const Icon = item.icon;
                  return (
                    <ResultItem
                      key={item.id}
                      $active={idx === activeIndex}
                      onClick={() => select(item)}
                      onMouseEnter={() => setActiveIndex(idx)}
                    >
                      {Icon ? <Icon /> : <SearchIcon />}
                      {item.label}
                      {item.shortcut && <Shortcut>{item.shortcut}</Shortcut>}
                    </ResultItem>
                  );
                })}
              </div>
            );
          })}
          {flat.length === 0 && (
            <ResultItem as="div" style={{ color: 'inherit', cursor: 'default' }}>
              No results
            </ResultItem>
          )}
        </ResultList>
      </PalettePanel>
    </Backdrop>,
    document.body,
  );
}
