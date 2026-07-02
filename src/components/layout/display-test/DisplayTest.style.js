import styled, { css } from 'styled-components';

export const Page = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: ${({ theme }) => theme.semantic.colors.background};
  color: ${({ theme }) => theme.semantic.colors.foreground};
`;

export const PageTitle = styled.h1`
  margin: 0 0 0.5rem;
  font-size: ${({ theme }) => theme.global.fontSizes.xxl};
`;

export const PageIntro = styled.p`
  margin: 0 0 2rem;
  max-width: 42rem;
  line-height: 1.6;
  color: #525252;
`;

export const Layout = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ControlPanel = styled.aside`
  flex: 0 0 220px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ControlLabel = styled.p`
  margin: 0 0 0.5rem;
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #737373;
`;

export const DisplayButton = styled.button`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${({ $active }) => ($active ? '#3b82f6' : '#e5e5e5')};
  border-radius: ${({ theme }) => theme.global.radii.sm};
  background: ${({ $active }) => ($active ? '#eff6ff' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#1d4ed8' : '#171717')};
  font-family: monospace;
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
  text-align: left;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: #3b82f6;
    background: #f8fafc;
  }
`;

export const DemoPanel = styled.div`
  flex: 1;
  min-width: 0;
`;

export const CurrentValue = styled.h2`
  margin: 0 0 0.75rem;
  font-size: ${({ theme }) => theme.global.fontSizes.xl};
  font-family: monospace;
`;

export const Explanation = styled.p`
  margin: 0 0 1.25rem;
  max-width: 42rem;
  line-height: 1.6;
  color: #525252;
`;

export const DemoArea = styled.div`
  padding: 1rem;
  background: #fafafa;
  border: 1px dashed #d4d4d4;
  border-radius: ${({ theme }) => theme.global.radii.md};
`;

export const OuterContext = styled.div`
  line-height: 1.8;
  font-size: ${({ theme }) => theme.global.fontSizes.md};
  color: #404040;
`;

export const ContextText = styled.span`
  display: inline;
  padding: 0.15rem 0.35rem;
  border-radius: ${({ theme }) => theme.global.radii.sm};
  background: ${({ $variant }) => ($variant === 'before' ? '#fef3c7' : '#dcfce7')};
  border: 1px solid ${({ $variant }) => ($variant === 'before' ? '#fcd34d' : '#86efac')};

  strong {
    font-size: ${({ theme }) => theme.global.fontSizes.sm};
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
`;

export const DemoContainer = styled.div`
  display: ${({ $display }) => $display};
  border: 2px solid #3b82f6;
  padding: 0.5rem;
  vertical-align: middle;

  ${({ $display }) =>
    ($display === 'flex' || $display === 'inline-flex') &&
    css`
      flex-wrap: wrap;
      gap: 0.5rem;
    `}

  ${({ $display }) =>
    ($display === 'grid' || $display === 'inline-grid') &&
    css`
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
    `}
`;

export const DemoHeading = styled.h3`
  margin: 0;
  padding: 0.5rem 0.75rem;
  font-size: ${({ theme }) => theme.global.fontSizes.md};
  font-weight: 600;
  background: #e5e5e5;
  border-radius: ${({ theme }) => theme.global.radii.sm};
`;

export const DemoInlineHeading = styled.span`
  display: inline;
  padding: 0.35rem 0.5rem;
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
  font-weight: 600;
  background: #e5e5e5;
  border-radius: ${({ theme }) => theme.global.radii.sm};
`;

export const DemoBox = styled.div`
  padding: 0.75rem 1rem;
  background: ${({ $color }) => $color};
  color: white;
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.global.radii.sm};
  text-align: center;
`;

export const DemoInlineBox = styled.span`
  display: inline;
  padding: 0.35rem 0.5rem;
  background: ${({ $color }) => $color};
  color: white;
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.global.radii.sm};
`;

export const DemoWarning = styled.p`
  margin: 0 0 1rem;
  padding: 0.75rem 1rem;
  background: #fff7ed;
  border: 1px solid #fdba74;
  border-radius: ${({ theme }) => theme.global.radii.sm};
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
  line-height: 1.5;
  color: #9a3412;
`;

export const CompareSection = styled.section`
  margin-bottom: 2rem;
`;

export const CompareHeading = styled.h3`
  margin: 0 0 0.5rem;
  font-size: ${({ theme }) => theme.global.fontSizes.lg};
`;

export const CompareNote = styled.p`
  margin: 0 0 1rem;
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
  line-height: 1.5;
  color: #525252;
`;

export const CompareGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const CompareCard = styled.div`
  padding: 1rem;
  background: #fafafa;
  border: 1px dashed #d4d4d4;
  border-radius: ${({ theme }) => theme.global.radii.md};
`;

export const CompareLabel = styled.p`
  margin: 0 0 0.75rem;
  font-family: monospace;
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
  font-weight: 600;
  color: #1d4ed8;
`;

export const CompareFrame = styled.div`
  padding: 0.75rem;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: ${({ theme }) => theme.global.radii.sm};
  font-size: ${({ theme }) => theme.global.fontSizes.md};
  line-height: 1.8;
`;

export const BlockItem = styled.div`
  display: block;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.25rem;
  background: ${({ $color }) => $color};
  color: white;
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.global.radii.sm};
  text-align: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const InlineItem = styled.span`
  display: inline;
  padding: 0.5rem 0.75rem;
  background: ${({ $color }) => $color};
  color: white;
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.global.radii.sm};
`;

export const BlockContainerMini = styled.div`
  display: block;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  border: 2px solid #3b82f6;
  background: #eff6ff;
  color: #1d4ed8;
  font-weight: 600;
  text-align: center;
  font-family: monospace;
`;

export const InlineContainerMini = styled.span`
  display: inline;
  padding: 0.5rem 0.75rem;
  border: 2px solid #3b82f6;
  background: #eff6ff;
  color: #1d4ed8;
  font-weight: 600;
  font-family: monospace;
`;

export const FlowText = styled.span`
  color: #525252;
`;
