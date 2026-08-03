'use client';

import styled from 'styled-components';

/**
 * Article after the cube orbit. ShaderScrollScene pins a sticky viewport for
 * the orbit scrub so this block only enters once the 360° turn is done.
 */
export default function ShaderTestCube() {
  return (
    <Article>
      <Title>After the orbit</Title>
      <Lead>
        The camera finished a full turn around the cube. Scroll is unlocked
        now — keep going and the page moves like a normal document while the
        scene stays parked behind this copy.
      </Lead>

      {SECTIONS.map((section) => (
        <Section key={section.heading}>
          <Heading>{section.heading}</Heading>
          {section.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Section>
      ))}
    </Article>
  );
}

const SECTIONS = [
  {
    heading: 'What you just scrubbed',
    paragraphs: [
      'The tall empty stretch above this article was not empty for the camera. Every pixel of scroll through that zone mapped to a slice of a 360° orbit. When the scrub hit the end of that zone, the angle locked and the document was free to continue.',
      'That split — “scroll drives a cinematic beat, then scroll becomes reading again” — is the same idea used in product storytelling pages: pin a 3D moment, play it out, then hand control back to the page.',
    ],
  },
  {
    heading: 'Why the cube stays put',
    paragraphs: [
      'The WebGL canvas is fixed behind the page. During the orbit you look through a transparent spacer. Once this article slides up, its solid background covers the stage so the type stays readable.',
      'If you scroll back up into the spacer, the orbit reverses with you. Progress is tied to position in that zone, not to time, so stopping mid-turn leaves the camera exactly where you left it.',
    ],
  },
  {
    heading: 'A longer stretch of body',
    paragraphs: [
      'Below is filler so you can feel a real reading length after the effect. Skim it, or use it as a scroll runway to confirm the camera no longer drifts once the orbit section is behind you.',
      'In a harbour at low tide the stones remember every hull that kissed them. Rope fibres bleach in the sun until they look like driftwood. Someone left a enamel mug on the quay wall; rain diluted the tea into a pale ring that will outlast the afternoon.',
      'Further inland the path narrows between blackthorn and a fence that has been mended three different ways. A radio in a workshop plays something tinny. The smell of cut cedar arrives before you see the shed. None of this needs to mean anything — it only needs to take up scroll.',
      'By the time you reach the next rise the wind has changed. Clouds tear open and close again. A delivery van negotiates a lane built for carts. You can still picture the white cube turning under a dark clear colour, one full revolution bought with the height of a few viewports.',
      'Keep scrolling. The orbit is done. The page is just a page again — title, body, and as much runway as we need to prove the unlock worked.',
    ],
  },
  {
    heading: 'One more section for good measure',
    paragraphs: [
      'Labs like this are easier to judge when the second act is obviously different from the first. If the cube were still orbiting here, you would feel it. It should feel still.',
      'When you wire this pattern into a real project, swap the filler for brand copy, product beats, or a second scene cue. The important contract stays the same: finish the circular move, then let the document breathe.',
      'End of the demo runway. Scroll back up if you want to ride the orbit again.',
    ],
  },
];

const Article = styled.article`
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  width: 100%;
  padding: clamp(3rem, 8vh, 6rem) clamp(1.25rem, 4vw, 3rem) 8rem;
  background: #efe8dc;
  color: #1c1914;
`;

const Title = styled.h1`
  margin: 0 0 0.75rem;
  max-width: 14ch;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.03em;
`;

const Lead = styled.p`
  margin: 0 0 3rem;
  max-width: 38rem;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(1.15rem, 2.4vw, 1.45rem);
  line-height: 1.55;
  color: #3a342c;
`;

const Section = styled.section`
  max-width: 40rem;
  margin-bottom: 2.75rem;

  p {
    margin: 0 0 1.1rem;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 1.05rem;
    line-height: 1.7;
    color: #2a251f;
  }
`;

const Heading = styled.h2`
  margin: 0 0 0.85rem;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(1.35rem, 3vw, 1.75rem);
  font-weight: 600;
  letter-spacing: -0.02em;
`;
