import styled from 'styled-components';

export const Page = styled.article`
  max-width: 720px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  color: ${({ theme }) => theme.semantic.colors.foreground};
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: ${({ theme }) => theme.global.fontWeights.bold};
  line-height: 1.2;
  margin: 0 0 0.75rem;
`;

export const Meta = styled.p`
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
  color: #6b7280;
  margin: 0 0 1.25rem;
`;

export const LabNote = styled.p`
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
  line-height: 1.55;
  color: #4b5563;
  background: #f3f4f6;
  border-left: 3px solid #9ca3af;
  padding: 0.75rem 1rem;
  margin: 0 0 2.5rem;

  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.9em;
  }
`;

export const HeroImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.global.radii.lg};
  margin-bottom: 2.5rem;
`;

export const Body = styled.p`
  font-size: ${({ theme }) => theme.global.fontSizes.md};
  line-height: 1.8;
  margin: 0 0 1.5rem;
  color: #374151;
`;

export const Subheading = styled.h2`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.global.fontWeights.semibold};
  line-height: 1.3;
  margin: 2.5rem 0 1rem;
`;

export const InlineImage = styled.img`
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.global.radii.md};
  margin: 1.5rem 0 2rem;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 2.5rem 0;
`;

/* —— Media planes experience (Architecture A) —— */

export const MediaPage = styled.div`
  width: 100%;
  min-height: 100vh;
  /* Transparent so the WebGL plane (behind the DOM) shows through. */
  background: transparent;
`;

export const HeroStage = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: transparent;
`;

export const FullBleedHero = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0;
  border-radius: 0;
`;

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(1.5rem, 4vw, 3.5rem);
  pointer-events: none;
  color: #f8fafc;
  /* DOM-only scrim — sits above the WebGL plane, so shaders never touch it. */
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 100%
  );

  ${Title}, ${Body} {
    pointer-events: auto;
    max-width: 40rem;
  }

  ${Title} {
    color: #f8fafc;
    margin-bottom: 0.85rem;
  }

  ${Body} {
    color: rgba(248, 250, 252, 0.92);
    margin: 0;
  }
`;

/* —— Burn carousel controls (DOM over WebGL) —— */

export const CarouselControls = styled.div`
  position: fixed;
  left: 50%;
  bottom: clamp(1.25rem, 4vh, 2.5rem);
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 1rem;
  pointer-events: auto;
`;

export const CarouselButton = styled.button`
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(0, 0, 0, 0.45);
  color: #f8fafc;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.65rem 1rem;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.65);
    border-color: rgba(255, 255, 255, 0.55);
  }
`;

export const CarouselDots = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const CarouselDot = styled.button`
  appearance: none;
  width: 0.55rem;
  height: 0.55rem;
  padding: 0;
  border-radius: 0;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  cursor: pointer;

  &[aria-current='true'] {
    background: #f8fafc;
  }
`;
