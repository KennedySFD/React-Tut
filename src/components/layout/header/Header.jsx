'use client';

import { HomeIcon, MenuIcon } from '@/components/icons';
import { useState } from 'react';
import { cx } from '@/lib/cx';
import styles from './Header.module.scss';

/**
 * Header — top-level site navigation.
 *
 * @param {string} brand - site or app name
 * @param {{label: string, href: string, active?: boolean}[]} links
 * @param {React.ReactNode} actions - slot for buttons, avatar, theme toggle, etc.
 */
export default function Header({ brand = 'Project', links = [], actions, className, ...props }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={cx(styles.header, className)} {...props}>
      <a className={styles.brand} href="/">
        <span className={styles.logo} aria-hidden="true"><HomeIcon /></span>
        {brand}
      </a>

      <nav className={styles.nav}>
        {links.map((link) => (
          <a
            key={link.label}
            className={cx(styles.link, link.active && styles.active)}
            href={link.href}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {actions && <div className={styles.actions}>{actions}</div>}

      {links.length > 0 && (
        <button
          className={styles.menuButton}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <MenuIcon />
        </button>
      )}

      {mobileOpen && (
        <div className={styles.mobileNav}>
          {links.map((link) => (
            <a
              key={link.label}
              className={cx(styles.link, link.active && styles.active)}
              href={link.href}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
