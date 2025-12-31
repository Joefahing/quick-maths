## Intro Panel Integration Test

### Overview

This document outlines integration tests related to the Intro Panel and the initial calculation flow. Some tests extend into the Calculation panel to verify the end-to-end behavior.

### Test 1: Operation Toggle Button Correctly Selected

#### Requirement:

- An operation toggle button should be selectable when it is currently unselected.
- When an operation is selected, it should be highlighted with the selected border.
- The last selected operation should remain selected when clicked (cannot unselect all).

#### Coverage:

- `src/test/IntroPanelOperationButtons.test.tsx` verifies the selected state toggle and the selected border class.

### Test 2: Questions and indicators reflect submitted answers

#### Requirement:

- When Start is pressed, the calculation questions are loaded and displayed.
- Submitting a correct answer shows the correct indicator on the first question.
- Submitting an incorrect answer shows the incorrect indicator on the first question.
- The next question becomes the in-progress indicator after submission.

#### Coverage:

- `src/test/CalculationPanelQuestionInputInteraction.test.tsx` uses a mocked `GeneratedQuestionService` to supply a deterministic list of questions and asserts indicator updates.
