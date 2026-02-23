# Bolt's Journal

## 2024-05-23 - Initial Setup
**Learning:** This journal tracks critical performance learnings.
**Action:** Use this file to document future optimizations and discoveries.

## 2024-05-24 - Preloading Dynamic Imports
**Learning:** Next.js dynamic imports don't expose a `preload` method by default, but calling `import('./Component')` directly triggers the chunk download.
**Action:** Use `onMouseEnter={() => import('./Component')}` on triggers (like buttons) to preload heavy modals or components before user interaction.

## 2024-05-25 - Optimizing Modal Images
**Learning:** Images inside fixed-width modals often default to `100vw` without `sizes`, causing massive over-fetching on high-res screens.
**Action:** Always add `sizes` relative to the modal's max-width (e.g., `(max-width: 640px) 100vw, 512px` for a `max-w-lg` modal).

## 2024-05-26 - Optimizing Filter Loops
**Learning:** Filtering arrays inside render loops with complex operations (like regex creation) on every item is a common performance anti-pattern.
**Action:** Lift the query transformation out of the loop or extract the entire filtering logic to a pure function that can be optimized and tested independently.
