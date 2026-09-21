'use client';

import { Button, Card, Tag } from '@/components/ui';
import { amplitude, curves, gesture } from '@/theme/motion';
import { Grid, Hint, Row, Stack, StateCell, StateName, Story } from '../kit';
import {
  CurveBox,
  CurveGrid,
  CurveMeta,
  CurveName,
  ScaleBar,
  ScaleLabel,
  ScaleRow,
} from './token.style';

/**
 * Plots a cubic-bezier from its control points. Drawn from the same numbers
 * the CSS and GSAP curves are built from, so what you see is literally the
 * easing the components run on.
 */
function CurvePlot({ points: [x1, y1, x2, y2] }) {
  const path = `M0,100 C${x1 * 100},${100 - y1 * 100} ${x2 * 100},${100 - y2 * 100} 100,0`;

  return (
    <svg viewBox="0 0 100 100" role="img" aria-label="Easing curve">
      <line className="grid-line" x1="0" y1="100" x2="100" y2="100" />
      <line className="grid-line" x1="0" y1="0" x2="0" y2="100" />
      <path className="curve" d={path} />
    </svg>
  );
}

export default function MotionStories() {
  return (
    <>
      <Story
        title="Curves"
        description="A curve is declared once as four control points. Those points render both the CSS cubic-bezier() and the GSAP CustomEase, so a transition and a tween run the identical easing function rather than two that merely look alike."
      >
        <CurveGrid>
          {Object.entries(curves).map(([name, curve]) => (
            <CurveBox key={name}>
              <CurvePlot points={curve.points} />
              <CurveName>{name}</CurveName>
              <CurveMeta>{curve.css}</CurveMeta>
            </CurveBox>
          ))}
        </CurveGrid>
      </Story>

      <Story
        title="Gestures"
        description="A named duration and ease pair. Components reference a gesture, never a raw number. Note press is roughly a third of release — down fast, back slow."
      >
        <Stack $gap="sm">
          {Object.entries(gesture).map(([name, value]) => (
            <ScaleRow key={name}>
              <ScaleLabel>{name}</ScaleLabel>
              <ScaleBar $width={`${value.duration * 220}px`} />
              <CurveMeta>
                {value.duration}s · {value.ease}
              </CurveMeta>
            </ScaleRow>
          ))}
        </Stack>
      </Story>

      <Story
        title="Amplitude"
        description="The only thing that varies between component families is how far they travel. Hover each of these: the timing is identical, the distance is not."
      >
        <Row $gap="xl" $align="flex-end">
          {Object.entries(amplitude).map(([name, value]) => (
            <StateCell key={name}>
              <StateName>
                {name} · lift {value.lift}px · press {value.press}
              </StateName>
              {name === 'chip' ? (
                <Tag variant="accent">Tag</Tag>
              ) : (
                <Button variant={name === 'surface' ? 'secondary' : 'primary'}>{name}</Button>
              )}
            </StateCell>
          ))}
        </Row>
      </Story>

      <Story
        title="Glass & dispersion"
        surface="glass"
        description="Frosted panes blur and saturate whatever sits behind them, so they need a busy backdrop to read as glass at all. The chromatic keyline is the dispersion of light through an edge — hover the second card to see it rotate."
      >
        <Grid $min="14rem">
          <Card
            variant="glass"
            title="Frosted"
            description="Translucent, blurred, lit along the top edge."
          />
          <Card
            variant="glass"
            interactive
            title="Dispersion"
            description="Hover for the keyline and sheen."
          />
          <Card
            variant="glass"
            title="Layered"
            description="Saturation is what keeps a blur from going grey."
            footer={<Button size="sm">Action</Button>}
          />
        </Grid>
      </Story>

      <Story
        title="Reduced motion"
        description="Every motion hook checks prefers-reduced-motion and sets the end state directly instead of tweening to it."
        padding="default"
      >
        <Hint>
          <span>
            Turn on “Reduce motion” in your OS accessibility settings and reload — the interface
            still reflects every state change, it just stops moving to get there.
          </span>
        </Hint>
      </Story>
    </>
  );
}
