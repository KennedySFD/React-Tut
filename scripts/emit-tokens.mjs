import { writeFileSync } from 'node:fs';
import { createTheme } from '../src/theme/index.js';

function walk(value, path, out) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value)) {
      walk(child, [...path, key], out);
    }
    return;
  }
  out.set(path.join('-'), String(value));
}

function block(selector, entries) {
  const lines = [...entries.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, value]) => `  --${name}: ${value};`);
  return `${selector} {\n${lines.join('\n')}\n}\n`;
}

const light = createTheme('light');
const dark = createTheme('dark');

const globalVars = new Map();
walk(light.global, ['global'], globalVars);

const lightSemantic = new Map();
const darkSemantic = new Map();
walk(light.semantic, ['semantic'], lightSemantic);
walk(dark.semantic, ['semantic'], darkSemantic);

const componentVars = new Map();
walk(light.components, ['components'], componentVars);

const darkOnly = new Map();
for (const [name, value] of darkSemantic) {
  if (lightSemantic.get(name) !== value) darkOnly.set(name, value);
}

const css = `/* Generated from src/theme. Re-run: node --experimental-default-type=module --import ./scripts/register-loader.mjs scripts/emit-tokens.mjs */\n\n${block(':root', new Map([...globalVars, ...lightSemantic, ...componentVars]))}\n${block('[data-theme="dark"]', darkOnly)}`;

writeFileSync(new URL('../src/theme/tokens.css', import.meta.url), css);
console.log(`wrote tokens.css (${globalVars.size} global, ${lightSemantic.size} semantic, ${componentVars.size} component, ${darkOnly.size} dark overrides)`);
