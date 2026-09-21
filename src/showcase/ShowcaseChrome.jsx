'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/button';
import Tag from '@/components/ui/tag';
import { MoonIcon, SunIcon } from '@/components/icons';
import { useThemeMode } from '@/context/ThemeModeContext';
import { getGroupedRegistry, registry } from './registry';
import {
  Brand,
  BrandMark,
  BrandName,
  Content,
  GroupLabel,
  NavLink,
  Shell,
  Sidebar,
  SidebarInner,
  TopBar,
  TopBarActions,
} from './ShowcaseChrome.style';

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
    <Shell>
      <TopBar>
        <Brand as={Link} href="/showcase">
          <BrandMark aria-hidden="true">UI</BrandMark>
          <BrandName>Component Library</BrandName>
        </Brand>

        <TopBarActions>
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
        </TopBarActions>
      </TopBar>

      <Content>
        <Sidebar aria-label="Components">
          <SidebarInner>
            <NavLink as={Link} href="/showcase" $active={pathname === '/showcase'}>
              Overview
            </NavLink>

            {groups.map((group) => (
              <div key={group.category}>
                <GroupLabel>{group.category}</GroupLabel>
                {group.entries.map((entry) => {
                  const href = `/showcase/${entry.slug}`;
                  return (
                    <NavLink
                      key={entry.slug}
                      as={Link}
                      href={href}
                      $active={pathname === href}
                      aria-current={pathname === href ? 'page' : undefined}
                    >
                      {entry.name}
                    </NavLink>
                  );
                })}
              </div>
            ))}
          </SidebarInner>
        </Sidebar>

        <main>{children}</main>
      </Content>
    </Shell>
  );
}
