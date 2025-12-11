# Progress Bar Requirements

Context: Quick Math game calculation screen needs a concise progress indicator to replace the previous/upcoming question widgets.

## Functional Requirements

- Render one circle per question (numbered 1..N) in order.
- Highlight the current question’s circle distinctly.
- Color previous circles based on answer correctness: green (`#0f9d58`) when correct, red (`#db4437`) when incorrect.
- Keep unanswered future circles neutral.
- Connect circles with small horizontal lines to show continuity.
- Position: under the main calculation input section.
- Maintain existing timer and answer handling; component is purely visual based on provided props.

## Component Contract

- Component: `ProgressBar`
- Props:
  - `questions: Question[]` (each with unique `id`)
  - `answers: QuestionAnswer[]` (includes `question`, `isCorrect`)
  - `currentIndex: number` (zero-based index of active question)

## Styling Notes

- Dark-theme friendly: dark background circles, subdued neutral borders.
- Current circle can be slightly larger with a soft glow or highlight.
- Ensure horizontal flex layout with connectors; allow horizontal scroll on small screens.
