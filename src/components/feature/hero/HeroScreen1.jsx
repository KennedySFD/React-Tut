'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  Screen,
  Header,
  Logo,
  HeroVisual,
  HeroContent,
  HeadlineBlock,
  Headline,
  LineMask,
  LineInner,
  GradientWord,
  Subtext,
  FormBlock,
  InputRow,
  RegInput,
  CtaButton,
  CtaInner,
  ArrowIcon,
  SocialProof,
  AvatarRow,
  Avatar,
  AvatarBg,
  CarImg,
  SoldText,
  StarsRow,
  GoldStars,
  ExpandingCard,
  CardContent,
  CarImageBlock,
  CarImageEl,
  CarName,
  CarSubtitle,
  SpecRow,
  SpecCol,
  SpecLabel,
  SpecValue,
  MileageBlock,
  MileageLabel,
  MileageInput,
  ConfirmBtn,
  Screen10Content,
  Screen10CarBlock,
  Screen10CarImg,
  FormFields,
  FormField,
  FormLabelRow,
  FormLabel,
  FormOptional,
  FormInput,
  TeaserCard,
  TeaserPrice,
  TeaserWhite,
  TeaserMuted,
  TeaserLock,
  ConfirmDetailsBtn,
  DarkCard,
  DarkCardContent,
} from './HeroScreen1.style';

const CARS = [
  '/hero/v2-car-1.png',
  '/hero/v2-car-2.png',
  '/hero/v2-car-3.png',
  '/hero/v2-car-4.png',
  '/hero/v2-car-5.png',
  '/hero/v2-car-6.png',
  '/hero/v2-car-7.png',
];

export default function HeroScreen1() {
  const linesRef = useRef([]);
  const screen9Ref = useRef([]);
  const screen10Ref = useRef([]);
  const screenRef = useRef(null);
  const heroVisualRef = useRef(null);
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const inputRef = useRef(null);
  const expandCardRef = useRef(null);
  const screen10CardRef = useRef(null);
  const darkCardRef = useRef(null);
  const teaserRef = useRef(null);
  const [regValue, setRegValue] = useState('');
  const [mileageValue, setMileageValue] = useState('');


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        opacity: 0,
        y: 8,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.05,
      });
      gsap.from(linesRef.current, {
        y: '110%',
        duration: 0.9,
        stagger: 0.13,
        ease: 'power3.out',
        delay: 0.2,
      });
    });
    return () => ctx.revert();
  }, []);

  const handleGetValuation = () => {
    if (!regValue.trim()) return;

    const inputEl = inputRef.current;
    const screenEl = screenRef.current;
    const cardEl = expandCardRef.current;
    const headerEl = headerRef.current;
    if (!inputEl || !screenEl || !cardEl || !headerEl) return;

    const inputRect = inputEl.getBoundingClientRect();
    const screenRect = screenEl.getBoundingClientRect();

    const relLeft = inputRect.left - screenRect.left;
    const relTop = inputRect.top - screenRect.top;
    const headerH = headerEl.offsetHeight;

    gsap.set(cardEl, {
      left: relLeft,
      top: relTop,
      width: inputRect.width,
      height: inputRect.height,
      borderRadius: 12,
      opacity: 1,
    });

    // Hide Screen 9 content below their masks until the card expansion finishes
    const s9Els = screen9Ref.current.filter(Boolean);
    gsap.set(s9Els, { y: '110%' });

    const tl = gsap.timeline();

    // Exit: headline lines
    tl.to([linesRef.current[0], linesRef.current[1]], {
      y: '-130%',
      opacity: 0,
      stagger: 0.06,
      duration: 0.48,
      ease: 'power3.in',
    });

    // Exit: subtext lines
    tl.to([linesRef.current[2], linesRef.current[3], linesRef.current[4]], {
      y: '-130%',
      opacity: 0,
      stagger: 0.05,
      duration: 0.42,
      ease: 'power3.in',
    }, '<0.04');

    // Exit: CTA + social proof
    tl.to([linesRef.current[6], linesRef.current[7], linesRef.current[8], linesRef.current[9]], {
      opacity: 0,
      y: 24,
      stagger: 0.05,
      duration: 0.32,
      ease: 'power2.in',
    }, '<');

    // Phase 1: Expand left and right — starts simultaneously with content exits
    tl.to(cardEl, {
      left: 0,
      width: '100%',
      borderRadius: 0,
      duration: 0.6,
      ease: 'power4.inOut',
    }, 0);

    // Phase 2: Grow height — stops short of bottom, rounds bottom corners
    tl.to(cardEl, {
      top: 0,
      height: 640,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      duration: 1.1,
      ease: 'expo.inOut',
      onComplete() {
        // Enable interaction on the card now that it's fully expanded
        gsap.set(cardEl, { pointerEvents: 'auto' });

        // Animate Screen 9 content in — same mask-in pattern as the load animation
        const els = screen9Ref.current.filter(Boolean);
        gsap.to(els, {
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
        });
      },
    });
  };

  const handleConfirmVehicle = () => {
    const s10Card = screen10CardRef.current;
    const cardEl = expandCardRef.current;
    if (!s10Card || !cardEl) return;

    const s10Els = screen10Ref.current.filter(Boolean);
    gsap.set(s10Els, { y: '110%' });

    const tl = gsap.timeline();

    // Exit: car name, subtitle, spec rows, mileage, confirm btn
    tl.to([screen9Ref.current[1], screen9Ref.current[2], screen9Ref.current[3], screen9Ref.current[4], screen9Ref.current[5], screen9Ref.current[6]], {
      y: '-130%',
      opacity: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: 'power3.in',
    });

    // Shrink the car image and move it up into position
    const carMask = screen9Ref.current[0].parentElement;
    gsap.set(carMask, { overflow: 'visible' });
    tl.to(screen9Ref.current[0], {
      scale: 0.9,
      y: -55,
      duration: 0.6,
      ease: 'power2.inOut',
    }, '<0.1');

    // Expand card to full screen height to fit Screen 10 content
    tl.to(cardEl, {
      height: '100%',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      duration: 0.5,
      ease: 'power2.inOut',
    }, '-=0.1');

    // Show screen 10 overlay
    tl.set(s10Card, {
      opacity: 1,
      pointerEvents: 'auto',
    });

    // Animate screen 10 content in with staggered mask-in
    tl.to(s10Els, {
      y: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power3.out',
    });
  };

  const handleConfirmDetails = () => {
    const darkEl = darkCardRef.current;
    const teaserEl = teaserRef.current;
    const screenEl = screenRef.current;
    const logoEl = logoRef.current;
    if (!darkEl || !teaserEl || !screenEl || !logoEl) return;

    const screenRect = screenEl.getBoundingClientRect();
    const teaserRect = teaserEl.getBoundingClientRect();

    const relLeft = teaserRect.left - screenRect.left;
    const relTop = teaserRect.top - screenRect.top;

    // Pre-position dark card exactly over the teaser (still invisible)
    gsap.set(darkEl, {
      left: relLeft,
      top: relTop,
      width: teaserRect.width,
      height: teaserRect.height,
      borderRadius: 12,
      opacity: 0,
    });

    const tl = gsap.timeline();

    // Step 1: Exit everything EXCEPT the teaser (index 4)
    const otherEls = [screen10Ref.current[0], screen10Ref.current[1], screen10Ref.current[2], screen10Ref.current[3], screen10Ref.current[5]].filter(Boolean);
    tl.to(otherEls, {
      y: '-130%',
      opacity: 0,
      stagger: 0.06,
      duration: 0.48,
      ease: 'power3.in',
    });

    tl.to(screen9Ref.current[0], {
      opacity: 0,
      duration: 0.3,
    }, '<');

    // Step 2: Swap — hide original teaser, show dark card in same spot
    tl.add(() => {
      gsap.set(teaserEl, { visibility: 'hidden' });
      gsap.set(darkEl, { opacity: 1 });
    });

    // Step 3: Expand left and right
    tl.to(darkEl, {
      left: 0,
      width: '100%',
      borderRadius: 0,
      duration: 0.6,
      ease: 'power4.inOut',
    });

    // Step 4: Grow height to fill screen
    let logoInverted = false;
    tl.to(darkEl, {
      top: 0,
      height: '100%',
      duration: 1.1,
      ease: 'expo.inOut',
      onUpdate() {
        if (!logoInverted && parseFloat(gsap.getProperty(darkEl, 'top')) <= 74) {
          logoInverted = true;
          gsap.to(logoEl, { filter: 'invert(1)', duration: 0.15, overwrite: true });
        }
      },
    });
  };

  return (
    <Screen ref={screenRef}>
      <DarkCard ref={darkCardRef}>
        <DarkCardContent>
          <TeaserPrice>
            <TeaserWhite>£1</TeaserWhite>
            <TeaserMuted>•</TeaserMuted>
            <TeaserWhite>,</TeaserWhite>
            <TeaserMuted>•••</TeaserMuted>
          </TeaserPrice>
          <TeaserLock>
            Confirm to reveal
          </TeaserLock>
        </DarkCardContent>
      </DarkCard>
      <ExpandingCard ref={expandCardRef}>
        <CardContent>
          {/* Car image */}
          <LineMask style={{ width: '100%' }}>
            <LineInner ref={el => screen9Ref.current[0] = el}>
              <CarImageBlock>
                <CarImageEl src="/hero/renault-megane.png" alt="Renault Megane" />
              </CarImageBlock>
            </LineInner>
          </LineMask>

          {/* Car name */}
          <LineMask style={{ width: '100%', textAlign: 'center' }}>
            <LineInner ref={el => screen9Ref.current[1] = el}>
              <CarName>Renault Megane</CarName>
            </LineInner>
          </LineMask>

          {/* Car subtitle */}
          <LineMask style={{ width: '100%', textAlign: 'center' }}>
            <LineInner ref={el => screen9Ref.current[2] = el}>
              <CarSubtitle>Dynamique DCI 106</CarSubtitle>
            </LineInner>
          </LineMask>

          {/* Spec row 1 */}
          <LineMask style={{ width: '100%' }}>
            <LineInner ref={el => screen9Ref.current[3] = el}>
              <SpecRow>
                <SpecCol>
                  <SpecLabel>Registration</SpecLabel>
                  <SpecValue>{regValue || 'LX19 OBC'}</SpecValue>
                </SpecCol>
                <SpecCol>
                  <SpecLabel>Fuel</SpecLabel>
                  <SpecValue>Diesel</SpecValue>
                </SpecCol>
                <SpecCol>
                  <SpecLabel>Body</SpecLabel>
                  <SpecValue>Hatchback</SpecValue>
                </SpecCol>
              </SpecRow>
            </LineInner>
          </LineMask>

          {/* Spec row 2 */}
          <LineMask style={{ width: '100%' }}>
            <LineInner ref={el => screen9Ref.current[4] = el}>
              <SpecRow>
                <SpecCol>
                  <SpecLabel>Year</SpecLabel>
                  <SpecValue>2019</SpecValue>
                </SpecCol>
                <SpecCol>
                  <SpecLabel>Transmission</SpecLabel>
                  <SpecValue>Manual</SpecValue>
                </SpecCol>
                <SpecCol>
                  <SpecLabel>MOT</SpecLabel>
                  <SpecValue>Valid</SpecValue>
                </SpecCol>
              </SpecRow>
            </LineInner>
          </LineMask>

          {/* Mileage input */}
          <LineMask style={{ width: '100%' }}>
            <LineInner ref={el => screen9Ref.current[5] = el}>
              <MileageBlock>
                <MileageLabel>Recorded mileage at last MOT</MileageLabel>
                <MileageInput
                  type="text"
                  placeholder="116,000"
                  value={mileageValue}
                  onChange={e => setMileageValue(e.target.value)}
                  aria-label="Recorded mileage"
                />
              </MileageBlock>
            </LineInner>
          </LineMask>

          {/* Confirm CTA */}
          <LineMask style={{ width: '100%' }}>
            <LineInner ref={el => screen9Ref.current[6] = el}>
              <ConfirmBtn onClick={handleConfirmVehicle}>
                Confirm vehicle
              </ConfirmBtn>
            </LineInner>
          </LineMask>
        </CardContent>

        {/* Screen 10 content — hidden until transition */}
        <Screen10Content ref={screen10CardRef} style={{ opacity: 0, pointerEvents: 'none' }}>
          <LineMask style={{ width: '100%' }}>
            <LineInner ref={el => screen10Ref.current[0] = el}>
              <FormField>
                <FormLabel>Full name</FormLabel>
                <FormInput type="text" placeholder="Enter name" />
              </FormField>
            </LineInner>
          </LineMask>

          <LineMask style={{ width: '100%' }}>
            <LineInner ref={el => screen10Ref.current[1] = el}>
              <FormField>
                <FormLabel>Email address</FormLabel>
                <FormInput type="email" placeholder="Enter email" />
              </FormField>
            </LineInner>
          </LineMask>

          <LineMask style={{ width: '100%' }}>
            <LineInner ref={el => screen10Ref.current[2] = el}>
              <FormField>
                <FormLabel>Postcode</FormLabel>
                <FormInput type="text" placeholder="Enter postcode" />
              </FormField>
            </LineInner>
          </LineMask>

          <LineMask style={{ width: '100%' }}>
            <LineInner ref={el => screen10Ref.current[3] = el}>
              <FormField>
                <FormLabelRow>
                  <FormLabel>Mobile number</FormLabel>
                  <FormOptional>Optional</FormOptional>
                </FormLabelRow>
                <FormInput type="tel" placeholder="Enter number" />
              </FormField>
            </LineInner>
          </LineMask>

          <LineMask style={{ width: '100%' }}>
            <LineInner ref={el => screen10Ref.current[4] = el}>
              <TeaserCard ref={teaserRef}>
                <TeaserPrice>
                  <TeaserWhite>£1</TeaserWhite>
                  <TeaserMuted>•</TeaserMuted>
                  <TeaserWhite>,</TeaserWhite>
                  <TeaserMuted>•••</TeaserMuted>
                </TeaserPrice>
                <TeaserLock>
                  Confirm to reveal
                </TeaserLock>
              </TeaserCard>
            </LineInner>
          </LineMask>

          <LineMask style={{ width: '100%' }}>
            <LineInner ref={el => screen10Ref.current[5] = el}>
              <ConfirmDetailsBtn onClick={handleConfirmDetails}>
                Confirm details
                <span style={{ fontFamily: 'monospace' }}>→</span>
              </ConfirmDetailsBtn>
            </LineInner>
          </LineMask>
        </Screen10Content>
      </ExpandingCard>
      <Header ref={headerRef}>
        <Logo ref={logoRef} src="/hero/eh-logo.png" alt="Evans Halshaw" />
      </Header>

      <HeroVisual ref={heroVisualRef}>
        <HeroContent>
          <HeadlineBlock>
            <Headline>
              <LineMask>
                <LineInner ref={el => linesRef.current[0] = el}>
                  The <GradientWord>considered</GradientWord> way
                </LineInner>
              </LineMask>
              <LineMask>
                <LineInner ref={el => linesRef.current[1] = el}>
                  to sell your car.
                </LineInner>
              </LineMask>
            </Headline>
            <Subtext>
              <LineMask>
                <LineInner ref={el => linesRef.current[2] = el}>
                  Start with an instant valuation,
                </LineInner>
              </LineMask>
              <LineMask>
                <LineInner ref={el => linesRef.current[3] = el}>
                  book an appointment,
                </LineInner>
              </LineMask>
              <LineMask>
                <LineInner ref={el => linesRef.current[4] = el}>
                  get paid in as little as 72 hours.
                </LineInner>
              </LineMask>
            </Subtext>
          </HeadlineBlock>

          <FormBlock>
            <InputRow>
              <LineMask>
                <LineInner ref={el => linesRef.current[5] = el}>
                  <RegInput
                    ref={inputRef}
                    type="text"
                    placeholder="ENTER REG"
                    maxLength={8}
                    aria-label="Vehicle registration number"
                    value={regValue}
                    onChange={e => setRegValue(e.target.value.toUpperCase())}
                  />
                </LineInner>
              </LineMask>
              <LineMask>
                <LineInner ref={el => linesRef.current[6] = el}>
                  <CtaButton onClick={handleGetValuation}>
                    <CtaInner>
                      Get my valuation
                    </CtaInner>
                  </CtaButton>
                </LineInner>
              </LineMask>
            </InputRow>

            <SocialProof>
              <LineMask>
                <LineInner ref={el => linesRef.current[7] = el}>
                  <AvatarRow>
                    {CARS.map((src, i) => (
                      <Avatar key={i} $last={i === CARS.length - 1}>
                        <AvatarBg src="/hero/ellipse.png" alt="" />
                        <CarImg src={src} alt="" />
                      </Avatar>
                    ))}
                  </AvatarRow>
                </LineInner>
              </LineMask>
              <LineMask>
                <LineInner ref={el => linesRef.current[8] = el}>
                  <SoldText>245+ cars sold this month</SoldText>
                </LineInner>
              </LineMask>
              <LineMask>
                <LineInner ref={el => linesRef.current[9] = el}>
                  <StarsRow>
                    <GoldStars>★★★★★</GoldStars>
                    Rated Excellent
                  </StarsRow>
                </LineInner>
              </LineMask>
            </SocialProof>
          </FormBlock>
        </HeroContent>


      </HeroVisual>
    </Screen>
  );
}
