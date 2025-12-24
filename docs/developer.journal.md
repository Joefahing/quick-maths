# Developer Journal

### Dec 24, 2025
#### Overview
Added a color theme and tokens to centralize styling across the app. As the app grows, managing colors in multiple places has started to get messy. Using a theme should improve maintainability and keep the UI consistent.

#### Problem Encountered
1. I wasn't sure how to categorize the theme or which properties belonged in each section.
2. I forgot how to include CSS in React.

#### Resolution
1. I used ChatGpt to help define the categories and landed on:
   - Semantics: correct, warning, errors
   - Fonts: text and links
   - Border
   - Interactive: hover, pressed, selected, etc

   I may add more tokens if new needs come up, but for now I'm keeping it minimal and avoiding over-engineering.
2. I learned that using `@import` in a `.tsx` file lets Vite detect and apply the CSS globally, or scope it to a component if the file name includes `module`. For assets, the bundler resolves file names to URLs.
 

### Dec 20, 2025

#### Overview

- Separated the timer into a `Timer` component to avoid `CalculationPanel` re-rendering every second due to the `useEffect` that updated `seconds`.

#### Problem Encountered

1. Wasn't sure how to update seconds without triggering a re-render in `CalculationPanel`.
2. Wasn't sure of the cause of the stale-closure issue causing `onTick` to receive 0 seconds every time.

#### Resolution

1. Used `useRef` to store the updated timer value without triggering a re-render in `CalculationPanel`.
2. The stale closure was caused by `useEffect` only running once due to the `[]` dependency. Resolved by separating into two `useEffect`s: one to update the timer, and a second to trigger `onTick` with `[seconds, onTick]` dependencies.
