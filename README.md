# Repro: `@stencil/ssr` Next.js strategy breaks named slot assignment

Based on the official [Stencil + Next.js starter](https://github.com/johnjenkins/stencil-starter-next).

With `@stencil/ssr/next` (strategy `nextjs`), every Stencil component rendered from React is wrapped in `<div style="display: contents">`. The consumer's `slot` prop is applied to the inner custom element, not to the wrapper, so a Stencil component placed in another component's **named** slot is assigned to the **default** slot instead. Plain HTML elements are not wrapped and are assigned correctly. The wrapper is emitted on both server and client, so hydration does not correct it.

## Versions

- `@stencil/core` 4.45.2
- `@stencil/react-output-target` 1.6.4
- `@stencil/ssr` 0.4.0
- `next` 15.5.9, `react` 19.2.3
- Node 22

## Run

```bash
pnpm install
pnpm start
```

Open http://localhost:3000/slots (bug) and http://localhost:3000/slots-runtime (control).

## Pages

Both pages render the same markup. `example-card` has a named `start` slot and a default slot.

```tsx
<ExampleCard>
  <ExampleInput slot="start" placeholder="component in start slot">
    <span slot="label">nested label slot</span>
  </ExampleInput>
  <span slot="start">markup in start slot</span>
  <p>default slot content</p>
</ExampleCard>
```

| Page | Import | SSR |
| --- | --- | --- |
| `/slots` | `@example/stencil-lib-react` | Compiler, `@stencil/ssr/next` in `packages/next-app/next.config.mjs` |
| `/slots-runtime` | `@example/stencil-lib-react/next` | Runtime (`components.server.ts`) |

## Check

Run in the browser console on each page:

```js
const sr = document.querySelector('example-card').shadowRoot;
const show = (s) => s.assignedNodes().filter((n) => n.nodeType === 1).map((n) => n.tagName.toLowerCase());
({ start: show(sr.querySelector('slot[name="start"]')), default: show(sr.querySelector('slot:not([name])')) });
```

| Page | `start` slot | default slot |
| --- | --- | --- |
| Expected | `example-input`, `span` | `p` |
| `/slots` (Compiler) | `span` | `div` (wrapper around `example-input`), `p` |
| `/slots-runtime` (Runtime) | `example-input`, `span` | `p` |

The same result is visible in first-paint HTML (`curl http://localhost:3000/slots`): `<example-input slot="start">` is inside `<div style="display:contents">`.

## Cause

In `@stencil/ssr`'s transform, the `nextjs` branch returns `<div style={{ display: 'contents' }}>` around the component in both the `typeof window !== 'undefined'` branch and the server branch, and spreads `{...props}` (including `slot`) onto the inner element. Slot assignment only considers direct children of the host, so the wrapper (which has no `slot` attribute) goes to the default slot.

A possible fix is to move `slot` from the props onto the wrapper `div`.
