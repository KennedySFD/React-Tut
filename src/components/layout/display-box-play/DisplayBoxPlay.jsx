'use client';

import { Button } from '@/components/ui';
import { Wrapper, Heading, BoxRow, ColorBox } from './DisplayBoxPlay.style';

const BOX_COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

export default function DisplayBoxPlay() {
  return (
    <Wrapper>
      <Heading>Display Box Play</Heading>
      <BoxRow>
        <ColorBox $color={BOX_COLORS[0]}>Box 1</ColorBox>
        <ColorBox $color={BOX_COLORS[1]}>Box 2</ColorBox>
        <ColorBox $color={BOX_COLORS[2]}>Box 3</ColorBox>

      </BoxRow>
      <Button variant="primary">Click me</Button>
    </Wrapper>
  );
}
