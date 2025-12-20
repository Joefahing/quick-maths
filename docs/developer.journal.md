# Developer Journal
### Dec 20, 2025
#### Overview
- Separated the timer into a `Timer` component to avoid `CalculationPanel` re-rendering every second due to the `useEffect` that updated `seconds`.

#### Problem Encountered
1. Wasn't sure how to update seconds without triggering a re-render in `CalculationPanel`.
2. Wasn't sure of the cause of the stale-closure issue causing `onTick` to receive 0 seconds every time.

#### Resolution
1. Used `useRef` to store the updated timer value without triggering a re-render in `CalculationPanel`.
2. The stale closure was caused by `useEffect` only running once due to the `[]` dependency. Resolved by separating into two `useEffect`s: one to update the timer, and a second to trigger `onTick` with `[seconds, onTick]` dependencies.
