'use client';

import { HomeIcon, MenuIcon } from '@/components/icons';
import { useState } from 'react';
import {
  HeaderActions,
  HeaderBrand,
  HeaderLogo,
  HeaderNav,
  HeaderNavLink,
  MobileMenuButton,
  MobileNav,
  StyledHeader,
} from './Header.style';

/**
 * Header — top-level site navigation.
 *
 * @param {string} brand - site or app name
 * @param {{label: string, href: string, active?: boolean}[]} links
 * @param {React.ReactNode} actions - slot for buttons, avatar, theme toggle, etc.
 */
export default function Header({ brand = 'Project', links = [], actions, ...props }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <StyledHeader {...props}>
      <HeaderBrand href="/">
        <HeaderLogo aria-hidden="true"><HomeIcon /></HeaderLogo>
        {brand}
      </HeaderBrand>

      <HeaderNav>
        {links.map((link) => (
          <HeaderNavLink
            key={link.label}
            href={link.href}
            $active={link.active}
          >
            {link.label}
          </HeaderNavLink>
        ))}
      </HeaderNav>

      {actions && <HeaderActions>{actions}</HeaderActions>}

      {links.length > 0 && (
        <MobileMenuButton
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <MenuIcon />
        </MobileMenuButton>
      )}

      {mobileOpen && (
        <MobileNav>
          {links.map((link) => (
            <HeaderNavLink
              key={link.label}
              href={link.href}
              $active={link.active}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </HeaderNavLink>
          ))}
        </MobileNav>
      )}
    </StyledHeader>
  );
}
