'use client';

import { useCallback, useState } from 'react';
import HeroControls, { heroControlDefaults } from './HeroControls';
import {
  Canvas,
  GlassCanvas,
  GlassHeroStage,
  HeroName,
  HeroScrollCue,
  HeroStage,
  HeroSubject,
  PropDefault,
  PropName,
  PropType,
  StoryBlock,
  StoryDescription,
  StoryHead,
  StoryTitle,
  Table,
  TableWrap,
} from './kit.style';

export {
  DocColumn,
  Grid,
  Hint,
  PageHead,
  PageSummary,
  PageTitle,
  Eyebrow,
  Row,
  Stack,
  StateCell,
  StateName,
  StoryList,
} from './kit.style';

/**
 * The isolation stage at the top of every component page.
 *
 * One instance of the component, centred, filling the viewport, with a
 * controls panel beneath it — so it can be looked at on its own while a
 * design is being worked on, flipped between its states, and hovered and
 * clicked to see them for real. Everything else sits below the fold.
 *
 * The stage owns the control values and passes them straight to the
 * component as props, which is why a story module's `heroControls` keys must
 * match its `Hero` props.
 *
 * @param {string} name - component name, from the registry
 * @param {object} controls - the control schema, see HeroControls
 * @param {React.ComponentType} component - the module's Hero component
 * @param {'default'|'glass'} surface
 */
export function Hero({ name, controls, component: Subject, surface = 'default', wide = false }) {
  const [values, setValues] = useState(() => heroControlDefaults(controls));

  const handleChange = useCallback((key, value) => {
    setValues((current) => ({ ...current, [key]: value }));
  }, []);

  const Stage = surface === 'glass' ? GlassHeroStage : HeroStage;

  return (
    <Stage aria-label={`${name} in isolation`}>
      <HeroName>{name}</HeroName>

      <HeroSubject $wide={wide}>{Subject ? <Subject {...values} /> : null}</HeroSubject>

      <HeroControls schema={controls} values={values} onChange={handleChange} />

      <HeroScrollCue aria-hidden="true">Variants and props below ↓</HeroScrollCue>
    </Stage>
  );
}

/**
 * One story: a titled, isolated canvas.
 *
 * @param {string} title
 * @param {string} description
 * @param {'default'|'sunken'|'glass'} surface - the canvas backdrop
 * @param {'default'|'none'} padding
 * @param {boolean} clip - clip overflow (for backdrops that must not bleed)
 */
export function Story({
  title,
  description,
  surface = 'default',
  padding = 'default',
  clip = false,
  id,
  children,
}) {
  const Surface = surface === 'glass' ? GlassCanvas : Canvas;

  return (
    <StoryBlock id={id}>
      {(title || description) && (
        <StoryHead>
          {title && <StoryTitle>{title}</StoryTitle>}
          {description && <StoryDescription>{description}</StoryDescription>}
        </StoryHead>
      )}

      <Surface $surface={surface} $padding={padding} $clip={clip || surface === 'glass'}>
        {children}
      </Surface>
    </StoryBlock>
  );
}

/**
 * The component's API, rendered from a plain array so each story file keeps
 * its props documented next to its examples.
 *
 * @param {{name, type, default?, description}[]} rows
 */
export function PropsTable({ rows = [] }) {
  if (rows.length === 0) return null;

  return (
    <StoryBlock id="props">
      <StoryHead>
        <StoryTitle>Props</StoryTitle>
        <StoryDescription>
          Standard DOM props are forwarded to the underlying element.
        </StoryDescription>
      </StoryHead>

      <TableWrap>
        <Table>
          <thead>
            <tr>
              <th scope="col">Prop</th>
              <th scope="col">Type</th>
              <th scope="col">Default</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td>
                  <PropName>{row.name}</PropName>
                </td>
                <td>
                  <PropType>{row.type}</PropType>
                </td>
                <td>{row.default ? <PropDefault>{row.default}</PropDefault> : '—'}</td>
                <td>{row.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrap>
    </StoryBlock>
  );
}
