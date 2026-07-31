import styled from 'styled-components';

export const Screen = styled.div`
  background: white;
  width: 390px;
  height: 793px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  border-radius: 6px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.03);
`;

export const Header = styled.header`
  background: transparent;
  display: flex;
  align-items: center;
  padding: 30px 20px;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 30;
`;

export const Logo = styled.img`
  width: 110px;
  height: auto;
  display: block;
`;

export const HeroVisual = styled.div`
  background: linear-gradient(to bottom, #ebf0fa 0%, #f5f7fa 77.027%);
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 110px 26px 20px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
`;

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
  position: relative;
  z-index: 1;
`;

export const HeadlineBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
  width: 100%;
`;

export const Headline = styled.h1`
  font-family: var(--font-open-sans), 'Open Sans', sans-serif;
  font-size: 32px;
  font-weight: 400;
  line-height: 38px;
  color: #141414;
  margin: 0;
  width: 100%;
  font-variation-settings: 'wdth' 100;
  text-align: center;
`;

export const LineMask = styled.div`
  display: block;
  overflow: hidden;
`;

export const LineInner = styled.div`
  display: block;
`;

export const GradientWord = styled.span`
  background: linear-gradient(to right, #2c5094, #298bcc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`;

export const Subtext = styled.div`
  font-family: var(--font-open-sans), 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 23px;
  color: #383838;
  margin: 0;
  width: 300px;
  font-variation-settings: 'wdth' 100;
`;

export const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const RegInput = styled.input`
  background: white;
  border: 1.5px solid #d1d6de;
  border-radius: 12px;
  height: 72px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  font-family: 'Segoe UI', 'Arial Black', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #16140f;
  letter-spacing: 0.06em;
  text-align: center;
  text-transform: uppercase;
  outline: none;

  &::placeholder {
    color: #16140f;
    opacity: 1;
  }

  &:focus {
    border-color: #298bcc;
  }
`;

export const CtaButton = styled.button`
  background: #0f0f0f;
  border: none;
  border-radius: 12px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  padding: 17px 95px;
  box-sizing: border-box;
`;

export const CtaInner = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-open-sans), 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: white;
  font-variation-settings: 'wdth' 100;
  white-space: nowrap;
`;

export const ArrowIcon = styled.img`
  width: 16px;
  height: 16px;
  display: block;
  flex-shrink: 0;
`;

export const SocialProof = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding-top: 2px;
`;

export const AvatarRow = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: ${({ $last }) => ($last ? '0' : '-12px')};
  flex-shrink: 0;
  background: white;
  border: 1.5px solid #e4e8f0;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AvatarBg = styled.img`
  display: none;
`;

export const CarImg = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  display: block;
`;

export const SoldText = styled.p`
  font-family: var(--font-open-sans), 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: rgba(31, 31, 31, 0.85);
  margin: 0;
  white-space: nowrap;
  font-variation-settings: 'wdth' 100;
`;

export const StarsRow = styled.p`
  font-family: var(--font-open-sans), 'Open Sans', sans-serif;
  font-size: 12.5px;
  color: rgba(31, 31, 31, 0.7);
  margin: 0;
  font-variation-settings: 'wdth' 100;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const GoldStars = styled.span`
  color: #ffcc5f;
`;

export const ExpandingCard = styled.div`
  position: absolute;
  background: white;
  opacity: 0;
  z-index: 20;
  pointer-events: none;
  border-radius: 12px;
  overflow: hidden;
`;

/* ── Screen 9 content ──────────────────────────────── */

export const CardContent = styled.div`
  padding: 110px 26px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CarImageBlock = styled.div`
  width: 100%;
  height: 145px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CarImageEl = styled.img`
  width: 90%;
  height: 100%;
  object-fit: contain;
`;

export const CarName = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #141414;
  text-align: center;
  line-height: 26px;
  font-family: var(--font-open-sans), sans-serif;
  margin: 0;
`;

export const CarSubtitle = styled.p`
  font-size: 14px;
  color: #5a5a5a;
  text-align: center;
  line-height: 20px;
  font-family: var(--font-open-sans), sans-serif;
  margin: 0;
`;

export const SpecRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 22px;
`;

export const SpecCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 80px;
`;

export const SpecLabel = styled.p`
  font-size: 8px;
  color: #737373;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-family: var(--font-open-sans), sans-serif;
  margin: 0;
`;

export const SpecValue = styled.p`
  font-size: 14px;
  color: #141310;
  font-family: var(--font-open-sans), sans-serif;
  margin: 0;
`;

export const MileageBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  margin-top: 40px;
`;

export const MileageLabel = styled.p`
  font-size: 8px;
  color: #737373;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-family: var(--font-open-sans), sans-serif;
  margin: 0;
`;

export const MileageInput = styled.input`
  width: 100%;
  height: 48px;
  border: 1px solid #e4e9f2;
  border-radius: 12px;
  padding: 0 20px;
  font-size: 14px;
  color: rgba(22, 20, 15, 0.9);
  background: white;
  box-sizing: border-box;
  font-family: var(--font-open-sans), sans-serif;
  outline: none;

  &:focus {
    border-color: #141414;
  }
`;

export const ConfirmBtn = styled.button`
  width: 100%;
  height: 56px;
  background: #0f0f0f;
  border-radius: 12px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 24px;
  cursor: pointer;
  margin-top: 20px;
  color: white;
  font-size: 16px;
  font-family: var(--font-open-sans), sans-serif;
`;

export const DecorShape1 = styled.div`
  position: absolute;
  bottom: -60px;
  right: -60px;
  width: 340px;
  height: 340px;
  pointer-events: none;
`;

export const DecorShape1Inner = styled.div``;

export const DecorShape1Img = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const DecorShape2 = styled.div`
  position: absolute;
  bottom: -80px;
  left: -40px;
  width: 260px;
  height: 260px;
  pointer-events: none;
  opacity: 0.6;
`;

export const DecorShape2Inner = styled.div``;

export const DecorShape2Img = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

/* ── Screen 10 content ──────────────────────────────── */

export const Screen10Content = styled.div`
  position: absolute;
  top: 210px;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background: white;
  z-index: 5;
  overflow-y: auto;
`;

export const Screen10CarBlock = styled.div`
  width: 250px;
  height: 97px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Screen10CarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

export const FormLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FormLabel = styled.p`
  font-size: 8px;
  color: #737373;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-family: var(--font-open-sans), sans-serif;
  margin: 0;
`;

export const FormOptional = styled.p`
  font-size: 8px;
  color: #a6a6a6;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-family: var(--font-open-sans), sans-serif;
  margin: 0;
`;

export const FormInput = styled.input`
  width: 100%;
  height: 48px;
  border: 1px solid #e4e9f2;
  border-radius: 12px;
  padding: 0 20px;
  font-size: 12px;
  color: rgba(22, 20, 15, 0.9);
  background: white;
  box-sizing: border-box;
  font-family: var(--font-open-sans), sans-serif;
  outline: none;

  &::placeholder {
    color: rgba(22, 20, 15, 0.3);
  }

  &:focus {
    border-color: #141414;
  }
`;

export const TeaserCard = styled.div`
  width: 100%;
  background: #16140f;
  border-radius: 12px;
  padding: 20px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  margin-top: 32px;
`;

export const TeaserPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;
  font-size: 22px;
  font-weight: 600;
  font-family: var(--font-open-sans), sans-serif;
`;

export const TeaserWhite = styled.span`
  color: white;
`;

export const TeaserMuted = styled.span`
  color: #a6a096;
`;

export const TeaserLock = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  color: white;
  font-family: var(--font-open-sans), sans-serif;
`;

export const ConfirmDetailsBtn = styled.button`
  width: 100%;
  height: 62px;
  background: #3059a5;
  border-radius: 15px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  margin-top: 32px;
  color: white;
  font-size: 16.5px;
  font-family: var(--font-open-sans), sans-serif;
`;

/* ── Final dark screen ──────────────────────────────── */

export const DarkCard = styled.div`
  position: absolute;
  background: #16140f;
  opacity: 0;
  z-index: 40;
  pointer-events: none;
  border-radius: 12px;
  overflow: hidden;
`;

export const DarkCardContent = styled.div`
  padding: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
`;
