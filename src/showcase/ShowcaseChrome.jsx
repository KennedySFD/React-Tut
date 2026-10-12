'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/button';
import Tag from '@/components/ui/tag';
import { MoonIcon, SunIcon } from '@/components/icons';
import { useThemeMode } from '@/context/ThemeModeContext';
import { cx } from '@/lib/cx';
import { getGroupedRegistry, registry } from './registry';
import styles from './ShowcaseChrome.module.scss';

/**
 * The persistent frame around every showcase page.
 *
 * It lives in `layout.js`, so navigating between components swaps only the
 * content pane — the sidebar keeps its scroll position and the page does not
 * flash, which is what makes it feel like an app rather than a set of docs.
 */
export default function ShowcaseChrome({ children }) {
  const { mode, toggleMode } = useThemeMode();
  const pathname = usePathname();
  const groups = getGroupedRegistry();

  return (
    <div className={styles.shell}>
      <header className={styles.topBar}>
        <Link className={styles.brand} href="/showcase">
          <span className={styles.brandMark} aria-hidden="true">UI</span>
          <span className={styles.brandName}>Component Library</span>
        </Link>

        <div className={styles.actions}>
          <Tag variant="accent" size="sm">
            {registry.length} entries
          </Tag>
          <Button
            variant="secondary"
            size="sm"
            iconLeft={mode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleMode}
          >
            {mode === 'light' ? 'Dark' : 'Light'}
          </Button>
        </div>
      </header>

      <div className={styles.content}>
        <nav className={styles.sidebar} aria-label="Components">
          <div className={styles.sidebarInner}>
            <Link
              className={cx(styles.navLink, pathname === '/showcase' && styles.active)}
              href="/showcase"
            >
              Overview
            </Link>

            {groups.map((group) => (
              <div key={group.category}>
                <span className={styles.groupLabel}>{group.category}</span>
                {group.entries.map((entry) => {
                  const href = `/showcase/${entry.slug}`;
                  return (
                    <Link
                      key={entry.slug}
                      className={cx(styles.navLink, pathname === href && styles.active)}
                      href={href}
                      aria-current={pathname === href ? 'page' : undefined}
                    >
                      {entry.name}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </nav>

        <main>{children}</main>
      </div>
    </div>
  );
}
