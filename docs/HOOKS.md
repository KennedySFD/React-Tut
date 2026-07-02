# Custom Hooks

## Overview

Hooks are reusable functions that encapsulate stateful logic. They always start with the `use` prefix and live in `src/hooks/`.

Built-in React hooks used in this project:
- `useState` — stores a value that triggers re-renders when changed
- `useEffect` — runs code after render (fetch data, set up listeners)
- `useRef` — holds a reference to a DOM element

## Hook Pattern

A custom hook:
1. Imports built-in hooks from React
2. Sets up internal state and logic
3. Returns values and functions the component needs

### Example: `useCounter`

```javascript
import { useState } from 'react';

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}
```

Usage:

```javascript
const { count, increment, decrement, reset } = useCounter(0);
```

The component gets `count` (the value) and three functions to control it. It doesn't need to know about `useState` or how the state management works internally.

### Example: `useToggle`

```javascript
import { useState } from 'react';

export function useToggle(initialValue = false) {
  const [isOn, setIsOn] = useState(initialValue);

  const toggle = () => setIsOn(prev => !prev);
  const turnOn = () => setIsOn(true);
  const turnOff = () => setIsOn(false);

  return { isOn, toggle, turnOn, turnOff };
}
```

Usage — can be used multiple times for independent state:

```javascript
const modal = useToggle(false);
const darkMode = useToggle(false);

// modal.isOn, modal.toggle, modal.turnOn, modal.turnOff
// darkMode.isOn, darkMode.toggle, darkMode.turnOn, darkMode.turnOff
```

Each call creates a completely independent instance.

## When to Create a Hook

Create a custom hook when:
- The same stateful logic is used in multiple components
- A component has complex state management that clutters the JSX
- You want to combine multiple built-in hooks into one reusable unit

Do NOT create a hook for:
- Simple one-off state (`useState` directly in the component is fine)
- Pure utility functions with no React state (put those in `src/lib/`)

## Hooks with Animations

Hooks can combine state, refs, and animation libraries:

```javascript
import { useRef } from 'react';
import { useToggle } from './useToggle';
import gsap from 'gsap';

export function useAnimatedToggle() {
  const ref = useRef(null);
  const { isOn, toggle } = useToggle(false);

  const show = () => {
    toggle();
    gsap.fromTo(ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.3 }
    );
  };

  return { ref, isOn, show };
}
```

## Naming Conventions

- Always prefix with `use`: `useCounter`, `useToggle`, `useFetch`
- Use named exports: `export function useCounter()` (not default exports)
- One hook per file
- File name matches the hook name: `useCounter.js` exports `useCounter`

## File Location

All custom hooks live in `src/hooks/`:

```
src/hooks/
├── useCounter.js
├── useToggle.js
├── useFetch.js         (example — API data fetching)
├── useAnimation.js     (example — GSAP animation wrapper)
└── useLocalStorage.js  (example — persisted state)
```
