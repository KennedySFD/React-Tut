'use client';

import { useState } from 'react';
import {
  Page,
  PageTitle,
  PageIntro,
  Layout,
  ControlPanel,
  ControlLabel,
  DisplayButton,
  DemoPanel,
  CurrentValue,
  Explanation,
  DemoArea,
  OuterContext,
  ContextText,
  DemoContainer,
  DemoHeading,
  DemoInlineHeading,
  DemoBox,
  DemoInlineBox,
  DemoWarning,
  CompareSection,
  CompareHeading,
  CompareNote,
  CompareGrid,
  CompareCard,
  CompareLabel,
  CompareFrame,
  BlockItem,
  InlineItem,
  BlockContainerMini,
  InlineContainerMini,
  FlowText,
} from './DisplayTest.style';

const BOX_COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

const DISPLAY_OPTIONS = [
  {
    value: 'block',
    description:
      'Takes full width of the parent and starts on a new line. Children stack vertically. Default for div, p, h1.',
  },
  {
    value: 'inline',
    description:
      'Flows alongside text on the same line and hugs its content. Important: inline elements cannot contain block-level children (div, h3) — the browser breaks the layout if you try.',
  },
  {
    value: 'inline-block',
    description:
      'Sits inline like text, but respects width and height. Useful for buttons or chips that need sizing.',
  },
  {
    value: 'flex',
    description:
      'Block-level flex container — full width. Children lay out in a row (by default) with gap and alignment control.',
  },
  {
    value: 'inline-flex',
    description:
      'Same flex layout inside, but the container is only as wide as its content and sits inline with surrounding text.',
  },
  {
    value: 'grid',
    description:
      'Block-level grid container — full width. Children are placed in columns and rows (3-column grid applied here).',
  },
  {
    value: 'inline-grid',
    description:
      'Same grid layout inside, but the container shrinks to fit content and flows inline with text.',
  },
  {
    value: 'none',
    description:
      'Removes the element from layout entirely. The blue container and everything inside disappears.',
  },
  {
    value: 'contents',
    description:
      'The container itself vanishes from layout — only the children render. The blue border disappears; boxes and heading remain.',
  },
  {
    value: 'flow-root',
    description:
      'Block container that establishes a new block formatting context. Similar to block but contains floats cleanly.',
  },
];

export default function DisplayTest() {
  const [display, setDisplay] = useState('block');

  const selected = DISPLAY_OPTIONS.find((option) => option.value === display);
  const isInlineDisplay = display === 'inline';

  const demoContent = isInlineDisplay ? (
    <>
      <DemoInlineHeading>Heading </DemoInlineHeading>
      <DemoInlineBox $color={BOX_COLORS[0]}>Box 1 </DemoInlineBox>
      <DemoInlineBox $color={BOX_COLORS[1]}>Box 2 </DemoInlineBox>
      <DemoInlineBox $color={BOX_COLORS[2]}>Box 3</DemoInlineBox>
    </>
  ) : (
    <>
      <DemoHeading>Heading</DemoHeading>
      <DemoBox $color={BOX_COLORS[0]}>Box 1</DemoBox>
      <DemoBox $color={BOX_COLORS[1]}>Box 2</DemoBox>
      <DemoBox $color={BOX_COLORS[2]}>Box 3</DemoBox>
    </>
  );

  return (
    <Page>
      <PageTitle>CSS Display Playground</PageTitle>
      <PageIntro>
        Pick a display value from the list to experiment. If block and inline feel confusing,
        start with the comparison below — it shows the core difference side by side.
      </PageIntro>

      <CompareSection>
        <CompareHeading>Block vs inline — example 1: on the boxes themselves</CompareHeading>
        <CompareNote>
          Same three labels (A, B, C). Only the display on each box changes. Block = each box
          takes a full line and stacks. Inline = boxes sit in a row like words — with copy on
          either side so you can see them flow in the sentence.
        </CompareNote>
        <CompareGrid>
          <CompareCard>
            <CompareLabel>display: block</CompareLabel>
            <CompareFrame>
              <BlockItem $color={BOX_COLORS[0]}>A</BlockItem>
              <BlockItem $color={BOX_COLORS[1]}>B</BlockItem>
              <BlockItem $color={BOX_COLORS[2]}>C</BlockItem>
            </CompareFrame>
          </CompareCard>
          <CompareCard>
            <CompareLabel>display: inline</CompareLabel>
            <CompareFrame>
              <FlowText>Some text before </FlowText>
              <InlineItem $color={BOX_COLORS[0]}>A</InlineItem>{' '}
              <InlineItem $color={BOX_COLORS[1]}>B</InlineItem>{' '}
              <InlineItem $color={BOX_COLORS[2]}>C</InlineItem>
              <FlowText> some text after.</FlowText>
            </CompareFrame>
          </CompareCard>
        </CompareGrid>
      </CompareSection>

      <CompareSection>
        <CompareHeading>Block vs inline — example 2: container in a sentence</CompareHeading>
        <CompareNote>
          Same sentence with a blue box in the middle. Block container breaks onto its own line
          and stretches full width. Inline container hugs the word inside and stays in the sentence.
        </CompareNote>
        <CompareGrid>
          <CompareCard>
            <CompareLabel>display: block (container)</CompareLabel>
            <CompareFrame>
              <FlowText>Some text before.</FlowText>
              <BlockContainerMini>BOX</BlockContainerMini>
              <FlowText>Some text after.</FlowText>
            </CompareFrame>
          </CompareCard>
          <CompareCard>
            <CompareLabel>display: inline (container)</CompareLabel>
            <CompareFrame>
              <FlowText>Some text before </FlowText>
              <InlineContainerMini>BOX</InlineContainerMini>
              <FlowText> some text after.</FlowText>
            </CompareFrame>
          </CompareCard>
        </CompareGrid>
      </CompareSection>

      <Layout>
        <ControlPanel>
          <ControlLabel>display:</ControlLabel>
          {DISPLAY_OPTIONS.map((option) => (
            <DisplayButton
              key={option.value}
              $active={display === option.value}
              onClick={() => setDisplay(option.value)}
            >
              {option.value}
            </DisplayButton>
          ))}
        </ControlPanel>

        <DemoPanel>
          <CurrentValue>display: {display}</CurrentValue>
          <Explanation>{selected?.description}</Explanation>

          {isInlineDisplay && (
            <DemoWarning>
              The playground switches to <strong>inline children</strong> (spans) here.
              Before, it used block divs inside an inline container — browsers cannot lay that
              out properly, so it looked almost the same as block. That was the source of the
              confusion.
            </DemoWarning>
          )}

          <DemoArea>
            <OuterContext>
              {isInlineDisplay ? (
                <>
                  <ContextText $variant="before">
                    <strong>Before — </strong>Some text before{' '}
                  </ContextText>
                  <DemoContainer $display={display}>{demoContent}</DemoContainer>
                  <ContextText $variant="after">
                    {' '}
                    <strong>After — </strong>some text after.
                  </ContextText>
                </>
              ) : (
                <>
                  <ContextText $variant="before">
                    <strong>Before — </strong>
                    The quick brown fox jumps over the lazy dog. This yellow text sits in the same
                    paragraph as the blue box — watch whether it stays on the same line or gets
                    pushed to a new one when you change display.
                  </ContextText>{' '}
                  <DemoContainer $display={display}>{demoContent}</DemoContainer>{' '}
                  <ContextText $variant="after">
                    <strong>After — </strong>
                    Pack my box with five dozen liquor jugs. This green text comes right after the
                    blue box in the same flow. With inline values it should sit beside the box; with
                    block it usually drops below.
                  </ContextText>
                </>
              )}
            </OuterContext>
          </DemoArea>
        </DemoPanel>
      </Layout>
    </Page>
  );
}
