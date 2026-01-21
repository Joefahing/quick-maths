# Developer Journal

### Jan 20, 2026

#### Questions Encountered
1. Does the name of the `.yml` file matters for git action?

### Jan 18, 2026

- Updated logic to retrieve streak

#### Architecture decision

- Should I directly call LocalStorage to get count or should I do it through `GetActivity`?

#### Resolution

- End up getting count directly from LocalStorage because I wouldn't have to deal with array of promises and I don't see any advantage gain from minmic API call from Local Storage

### Jan 15, 2026

- Heatmap project reflection

### Jan 14, 2026

- Added `useUserActivities` hook to replace fetching and updating of use activities to make userActivity more flexible and reusable
- Refactor `ActivityHeatmap` component to split in smaller sub components
- Added streak functionality
- Sync all date key

### Jan 10, 2026

#### Problem Encountered

1. Difference between Record and Map in Javascript?

#### Resolution

Record is a type and the key only support `number` and `string`. So is can be uses in siutation where we are only performing simple look up. Map is a class that allow key to be any data. Use it for more complex and dynamic situation.

### Jan 3, 2026

- Added tooltip component to display tool tip

#### Problem Encountered

1. After adding Tooltip, there was a problem `ActivityHeatmap` container uses `overflow: auto` in smaller screen size
   - Apparently absolute will still contribute to scroll size
   - There is a thing call createPortal (VIP)

#### Resolution

- Use createPortal create tooltip outside of component flow

### Jan 2, 2026

#### Overview

- Fixing grid layout issue I had where each grid area was spread out.
- Added function to generate month

#### Problem Encountered

1. How to get "month" abbreviation from date in Javascript

### Resoltuion

1. Javascript's `Intl` library date formatter(Date, number...) that can format dates to short month. THe library also contain other formatters such as (numbersm duration, plural, and etc). By using native library,
   I am able to avoid relying on external npm packages.

### Jan 1, 2026

#### Overview

Continue working on heatmap

#### Problem Encountered

1. Should I use table, grid, or flex to implement heatmap?
2. Do I need to explicitly define column and row for grid?
3. Why I don't need to explicitly define columns when using gridColumnStart?

#### Resolution

1. Grid would be the better solution because is easy to anchor month and week header since I can use grid make sure row and columns between different components
   all shares the same width and height.
2. Rows can be defined in css because there are only 7 rows representing days of week. Column can be dynamically defined in javascript base on how many weeks there are in "that" year.
3. Grid implicitly adds more columns when `grid-auto-flow` is used

### Dec 26, 2025

#### Overview

Added more advanced integration tests for the operation toggle workflow and calculation panel questions.

#### Problem Encountered

1. Does jsdom include `localStorage`, or do I need to mock it?
2. How do I mock `getQuestion` from `GeneratedQuestionService` in a component test?
3. How do I target specific HTML elements in a list?

#### Resolution

1. Mocking is not necessary because jsdom includes `localStorage`.
2. It is not advised to mock implementation details like props, so I used `vi.spyOn(GeneratedQuestionService.prototype, 'getQuestion')`.
3. Add `data-testid` or `aria-label` to help target specific elements.

---

### Dec 24, 2025

#### Overview

Added a color theme and tokens to centralize styling across the app. As the app grows, managing colors in multiple places has started to get messy. Using a theme should improve maintainability and keep the UI consistent.

#### Problem Encountered

1. I wasn't sure how to categorize the theme or which properties belonged in each section.
2. I forgot how to include CSS in React.

#### Resolution

1. I used ChatGPT to help define the categories and landed on:
   - Semantics: correct, warning, errors
   - Fonts: text and links
   - Border
   - Interactive: hover, pressed, selected, etc

   I may add more tokens if new needs come up, but for now I'm keeping it minimal and avoiding over-engineering.

2. I learned that using `@import` in a `.tsx` file lets Vite detect and apply the CSS globally, or scope it to a component if the file name includes `.module`. For assets, the bundler resolves file names to URLs.

---

### Dec 20, 2025

#### Overview

- Separated the timer into a `Timer` component to avoid `CalculationPanel` re-rendering every second due to the `useEffect` that updated `seconds`.

#### Problem Encountered

1. Wasn't sure how to update seconds without triggering a re-render in `CalculationPanel`.
2. Wasn't sure of the cause of the stale-closure issue causing `onTick` to receive 0 seconds every time.

#### Resolution

1. Used `useRef` to store the updated timer value without triggering a re-render in `CalculationPanel`.
2. The stale closure was caused by `useEffect` only running once due to the `[]` dependency. Resolved by separating into two `useEffect`s: one to update the timer, and a second to trigger `onTick` with `[seconds, onTick]` dependencies.
