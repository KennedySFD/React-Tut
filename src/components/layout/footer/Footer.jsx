'use client';

import { GithubIcon, ExternalLinkIcon } from '@/components/icons';
import { cx } from '@/lib/cx';
import styles from './Footer.module.scss';

/**
 * Footer — site-wide footer with link columns and a bottom bar.
 *
 * @param {string} brand     - site or company name
 * @param {string} copyright - copyright text (defaults to "© {year} {brand}")
 * @param {{title: string, links: {label: string, href: string, external?: boolean}[]}[]} columns
 * @param {{label: string, href: string, icon?: React.ReactNode}[]} social
 */
export default function Footer({
  brand = 'Project',
  copyright,
  columns = [],
  social = [],
  className,
  ...props
}) {
  const year = new Date().getFullYear();

  return (
    <footer className={cx(styles.footer, className)} {...props}>
      <div className={styles.top}>
        <div className={styles.grid}>
          {columns.map((col) => (
            <div key={col.title} className={styles.column}>
              <h4 className={styles.columnTitle}>{col.title}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      className={styles.link}
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                      {link.external && <ExternalLinkIcon size="0.75em" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>{copyright || `© ${year} ${brand}. All rights reserved.`}</p>
        {social.length > 0 && (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {social.map((s) => (
              <a
                key={s.label}
                className={styles.link}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                {s.icon || <GithubIcon />}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
