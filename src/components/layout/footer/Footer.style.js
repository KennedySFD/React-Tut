import styled from 'styled-components';
import { focusRingOnly, typography } from '@/theme/mixins';

export const StyledFooter = styled.footer`
  width: 100%;
  margin-top: auto;
  border-top: ${({ theme }) => theme.global.borderWidths.thin} solid
    ${({ theme }) => theme.semantic.colors.border.subtle};
  background: ${({ theme }) => theme.semantic.colors.background.subtle};
`;

export const FooterTop = styled.div`
  padding: ${({ theme }) => theme.global.spacing.xxl} ${({ theme }) => theme.global.spacing.xl};
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: ${({ theme }) => theme.global.spacing.xxl};
`;

export const FooterColumn = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.global.spacing.sm};
  }
`;

export const FooterColumnTitle = styled.h4`
  ${typography('label')};
  color: ${({ theme }) => theme.semantic.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.global.spacing.md};
`;

export const FooterLink = styled.a`
  ${typography('caption')};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.global.spacing.xs};
  color: ${({ theme }) => theme.semantic.colors.text.secondary};
  text-decoration: none;
  transition: color ${({ theme }) => theme.semantic.motion.fast};

  &:hover {
    color: ${({ theme }) => theme.semantic.colors.text.primary};
  }

  &:focus-visible {
    ${focusRingOnly};
    border-radius: ${({ theme }) => theme.global.radii.sm};
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.global.spacing.md};
  padding: ${({ theme }) => theme.global.spacing.lg} ${({ theme }) => theme.global.spacing.xl};
  border-top: ${({ theme }) => theme.global.borderWidths.thin} solid
    ${({ theme }) => theme.semantic.colors.border.subtle};
`;

export const Copyright = styled.p`
  ${typography('caption')};
  color: ${({ theme }) => theme.semantic.colors.text.muted};
  margin: 0;
`;
