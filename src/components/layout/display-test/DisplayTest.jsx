'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import styles from './DisplayTest.module.scss';

const BOX_COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

const DISPLAY_CLASS = {
  block: styles.block,
  inline: styles.inline,
  'inline-block': styles.inlineBlock,
  flex: styles.flex,
  'inline-flex': styles.inlineFlex,
  grid: styles.grid,
  'inline-grid': styles.inlineGrid,
  none: styles.none,
  contents: styles.contents,
  'flow-root': styles.flowRoot,
};

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
      <span className={styles.demoInlineHeading}>Heading </span>
      <span className={styles.demoInlineBox} style={{ background: BOX_COLORS[0] }}>Box 1 </span>
      <span className={styles.demoInlineBox} style={{ background: BOX_COLORS[1] }}>Box 2 </span>
      <span className={styles.demoInlineBox} style={{ background: BOX_COLORS[2] }}>Box 3</span>
    </>
  ) : (
    <>
      <h3 className={styles.demoHeading}>Heading</h3>
      <div className={styles.demoBox} style={{ background: BOX_COLORS[0] }}>Box 1</div>
      <div className={styles.demoBox} style={{ background: BOX_COLORS[1] }}>Box 2</div>
      <div className={styles.demoBox} style={{ background: BOX_COLORS[2] }}>Box 3</div>
    </>
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>CSS Display Playground</h1>
      <p className={styles.pageIntro}>
        Pick a display value from the list to experiment. If block and inline feel confusing,
        start with the comparison below — it shows the core difference side by side.
      </p>

      <section className={styles.compareSection}>
        <h3 className={styles.compareHeading}>Block vs inline — example 1: on the boxes themselves</h3>
        <p className={styles.compareNote}>
          Same three labels (A, B, C). Only the display on each box changes. Block = each box
          takes a full line and stacks. Inline = boxes sit in a row like words — with copy on
          either side so you can see them flow in the sentence.
        </p>
        <div className={styles.compareGrid}>
          <div className={styles.compareCard}>
            <p className={styles.compareLabel}>display: block</p>
            <div className={styles.compareFrame}>
              <div className={styles.blockItem} style={{ background: BOX_COLORS[0] }}>A</div>
              <div className={styles.blockItem} style={{ background: BOX_COLORS[1] }}>B</div>
              <div className={styles.blockItem} style={{ background: BOX_COLORS[2] }}>C</div>
            </div>
          </div>
          <div className={styles.compareCard}>
            <p className={styles.compareLabel}>display: inline</p>
            <div className={styles.compareFrame}>
              <span className={styles.flowText}>Some text before </span>
              <span className={styles.inlineItem} style={{ background: BOX_COLORS[0] }}>A</span>{' '}
              <span className={styles.inlineItem} style={{ background: BOX_COLORS[1] }}>B</span>{' '}
              <span className={styles.inlineItem} style={{ background: BOX_COLORS[2] }}>C</span>
              <span className={styles.flowText}> some text after.</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.compareSection}>
        <h3 className={styles.compareHeading}>Block vs inline — example 2: container in a sentence</h3>
        <p className={styles.compareNote}>
          Same sentence with a blue box in the middle. Block container breaks onto its own line
          and stretches full width. Inline container hugs the word inside and stays in the sentence.
        </p>
        <div className={styles.compareGrid}>
          <div className={styles.compareCard}>
            <p className={styles.compareLabel}>display: block (container)</p>
            <div className={styles.compareFrame}>
              <span className={styles.flowText}>Some text before.</span>
              <div className={styles.blockContainerMini}>BOX</div>
              <span className={styles.flowText}>Some text after.</span>
            </div>
          </div>
          <div className={styles.compareCard}>
            <p className={styles.compareLabel}>display: inline (container)</p>
            <div className={styles.compareFrame}>
              <span className={styles.flowText}>Some text before </span>
              <span className={styles.inlineContainerMini}>BOX</span>
              <span className={styles.flowText}> some text after.</span>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.layout}>
        <aside className={styles.controlPanel}>
          <p className={styles.controlLabel}>display:</p>
          {DISPLAY_OPTIONS.map((option) => (
            <button
              key={option.value}
              className={cx(styles.displayButton, display === option.value && styles.active)}
              onClick={() => setDisplay(option.value)}
            >
              {option.value}
            </button>
          ))}
        </aside>

        <div className={styles.demoPanel}>
          <h2 className={styles.currentValue}>display: {display}</h2>
          <p className={styles.explanation}>{selected?.description}</p>

          {isInlineDisplay && (
            <p className={styles.demoWarning}>
              The playground switches to <strong>inline children</strong> (spans) here.
              Before, it used block divs inside an inline container — browsers cannot lay that
              out properly, so it looked almost the same as block. That was the source of the
              confusion.
            </p>
          )}

          <div className={styles.demoArea}>
            <div className={styles.outerContext}>
              {isInlineDisplay ? (
                <>
                  <span className={cx(styles.contextText, styles.before)}>
                    <strong>Before — </strong>Some text before{' '}
                  </span>
                  <div className={cx(styles.demoContainer, DISPLAY_CLASS[display])}>{demoContent}</div>
                  <span className={cx(styles.contextText, styles.after)}>
                    {' '}
                    <strong>After — </strong>some text after.
                  </span>
                </>
              ) : (
                <>
                  <span className={cx(styles.contextText, styles.before)}>
                    <strong>Before — </strong>
                    The quick brown fox jumps over the lazy dog. This yellow text sits in the same
                    paragraph as the blue box — watch whether it stays on the same line or gets
                    pushed to a new one when you change display.
                  </span>{' '}
                  <div className={cx(styles.demoContainer, DISPLAY_CLASS[display])}>{demoContent}</div>{' '}
                  <span className={cx(styles.contextText, styles.after)}>
                    <strong>After — </strong>
                    Pack my box with five dozen liquor jugs. This green text comes right after the
                    blue box in the same flow. With inline values it should sit beside the box; with
                    block it usually drops below.
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
