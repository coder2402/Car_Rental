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
## 2024-05-26 - Optimizing Array Filtering
**Learning:** Normalizing strings inside a filter loop (e.g. `.toLowerCase().replace(...)`) is O(N*L) and can be expensive on every render.
**Action:** Pre-calculate normalized values outside the component or use `useMemo` to reduce complexity to O(N) with simple string comparisons.

## 2024-05-27 - Unmounting Closed Modals
**Learning:** Headless UI Dialogs combined with state flags like `hasOpened` can keep heavy components mounted forever even when hidden.
**Action:** Use the `afterLeave` prop on the `Transition` component to trigger a cleanup callback that resets the `hasOpened` state, forcing the component to unmount and free memory.

## 2024-05-28 - Next.js App Router Data Re-fetching
**Learning:** Updating `searchParams` via Next.js `router.push()` triggers a re-fetch of the Server Component, which then passes completely new object references (arrays, objects) down to all Client Components, destroying any default shallow-equality optimizations.
**Action:** When a Client Component renders a large list based on Server Component data (like `CarCard`), wrap the component in `React.memo` and explicitly define a custom `arePropsEqual` function to check primitive values instead of object references to prevent O(N) re-renders when "Show More" or filters are used. Also, use `{scroll: false}` in `router.push()` calls for pagination/filtering to avoid disruptive layout shifts to the top of the page.
