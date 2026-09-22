import styled from 'styled-components';
import { typography } from '@/theme/mixins';

export const EmptyRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.global.spacing.lg};
  padding: ${({ theme }) => theme.global.spacing.xxxl} ${({ theme }) => theme.global.spacing.xl};
  text-align: center;
`;

export const IllustrationWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: ${({ theme }) => theme.global.radii.full};
  background: ${({ theme }) => theme.semantic.colors.background.subtle};
  color: ${({ theme }) => theme.semantic.colors.text.muted};

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

export const EmptyTitle = styled.h3`
  ${typography('subheading')};
  color: ${({ theme }) => theme.semantic.colors.text.primary};
  margin: 0;
`;

export const EmptyDescription = styled.p`
  ${typography('body')};
  color: ${({ theme }) => theme.semantic.colors.text.secondary};
  max-width: 24rem;
  margin: 0;
`;

export const EmptyActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.global.spacing.sm};
`;
