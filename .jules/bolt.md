# Bolt's Journal

## 2024-05-23 - Initial Setup
**Learning:** This journal tracks critical performance learnings.
**Action:** Use this file to document future optimizations and discoveries.

## 2024-05-24 - Preloading Dynamic Imports
**Learning:** Next.js dynamic imports don't expose a `preload` method by default, but calling `import('./Component')` directly triggers the chunk download.
**Action:** Use `onMouseEnter={() => import('./Component')}` on triggers (like buttons) to preload heavy modals or components before user interaction.
