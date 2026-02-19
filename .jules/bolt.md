# Bolt's Journal

## 2024-05-23 - Initial Setup
**Learning:** This journal tracks critical performance learnings.
**Action:** Use this file to document future optimizations and discoveries.

## 2024-05-23 - Preloading Lazy Loaded Components
**Learning:** `next/dynamic` provides code splitting, but introduces interaction latency.
**Action:** Use `onMouseEnter` to trigger `import()` for the dynamic component to preload the chunk before user interaction.
