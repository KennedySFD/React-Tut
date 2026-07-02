'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { InputWrapper, StyledInput, BorderLine } from './Input.style';

export default function Input({ delay = 0, ...props }) {
  const borderRef = useRef(null);

  useEffect(() => {
    const tween = gsap.to(borderRef.current, {
      scaleX: 1,
      duration: 0.95,
      ease: 'expo.inOut',
      delay,
    });
    return () => tween.kill();
  }, [delay]);

  return (
    <InputWrapper>
      <StyledInput {...props} />
      <BorderLine ref={borderRef} />
    </InputWrapper>
  );
}
