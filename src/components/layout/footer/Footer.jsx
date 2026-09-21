'use client';

import { GithubIcon, ExternalLinkIcon } from '@/components/icons';
import {
  Copyright,
  FooterBottom,
  FooterColumn,
  FooterColumnTitle,
  FooterGrid,
  FooterLink,
  FooterTop,
  StyledFooter,
} from './Footer.style';

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
  ...props
}) {
  const year = new Date().getFullYear();

  return (
    <StyledFooter {...props}>
      <FooterTop>
        <FooterGrid>
          {columns.map((col) => (
            <FooterColumn key={col.title}>
              <FooterColumnTitle>{col.title}</FooterColumnTitle>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                      {link.external && <ExternalLinkIcon size="0.75em" />}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          ))}
        </FooterGrid>
      </FooterTop>

      <FooterBottom>
        <Copyright>{copyright || `© ${year} ${brand}. All rights reserved.`}</Copyright>
        {social.length > 0 && (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {social.map((s) => (
              <FooterLink
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                {s.icon || <GithubIcon />}
              </FooterLink>
            ))}
          </div>
        )}
      </FooterBottom>
    </StyledFooter>
  );
}
