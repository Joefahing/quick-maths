# Contact Page Implementation Spec

## Overview

Define the Contact page behavior based on the current implemented UI, then extend it with an email template preview panel.

No backend infrastructure is required (no SMTP/API/serverless).

## Current Baseline In Repo (Aligned With Current Design)

- Route and navigation are already wired:
  - `paths.contact` in `src/routes/routes.ts`
  - `ContactPanel` mounted from `src/App.tsx`
  - Sidebar Contact button in `src/components/Share/SideMenu/SideMenu.tsx`
- `ContactPanel` already renders real UI (not `ComingSoon`).
- Layout behavior:
  - Mobile: image first, content stacked below.
  - Desktop (`min-width: 1024px`): 2-column layout, content on left and image on right.
- Existing content in `contact_wrapper`:
  1. Heading: `Contact`
  2. Subtitle: `Feature suggestion or bug report? Email me:`
  3. Email display row with `quickmaths.run@gmail.com` and copy button
  4. Toggle group: `Feature`, `Bugs`
  5. `Email Template` section with an empty preview container
  6. `Email Me` button (currently no action)
- Existing copy state behavior:
  - `idle` -> `Copy`
  - `success` -> `Copied`
  - `error` -> `Error`
  - Status resets to `idle` after ~3000ms
- Toggle state is currently `EmailTemplate = 'none' | 'feature' | 'bug'` with default `'none'`.

## Goals For Next Iteration

- Keep the current UI layout and styling direction.
- Implement preview panel content for selected template type.
- Add template-generation logic that can be reused by both preview and future `mailto` behavior.

## Non-goals (This Iteration)

- Backend submission flow
- Spam/rate limiting/captcha
- Full form UX
- Major visual redesign of the current Contact layout

## Functional Requirements

### Preview Panel (New)

- The `Email Template` container must display preview text based on selected `emailTemplate`.
- States:
  - `none`: show helper text prompting user to select a template.
  - `feature`: show feature template.
  - `bug`: show bug template.
- Preserve line breaks in preview text.
- Preview content is read-only.

Suggested templates:

```text
Type: Feature
Description:
Why:
```

```text
Type: Bug
Device:
Expected:
Actual:
```

### Toggle Behavior

- Keep current button labels: `Feature` and `Bugs`.
- Keep default selection as `none`.
- Selected button must keep distinct selected styling via `GroupToggleButtons`.

### Copy Behavior

- Keep existing clipboard logic and status-based button text/icons.
- Keep ~3000ms reset timing unless product decision explicitly changes it.

### Email CTA Behavior

- Keep `Email Me` button visible in this iteration.
- If mailto wiring is not implemented yet, button can remain inert or be marked as pending.
- Template generation should be implemented in a way that can be consumed by future `mailto` wiring.

## Accessibility / UX Requirements

- All controls remain keyboard-accessible (`button` semantics).
- Focus indication must remain visible on dark theme.
- Preview text should be readable with current theme tokens.

## Suggested Implementation Notes

### Suggested Constants / Types

```ts
type EmailTemplate = 'none' | 'feature' | 'bug';

const CONTACT_EMAIL = 'quickmaths.run@gmail.com';
```

### Suggested Helper

Use a helper so preview and mailto body do not drift:

```ts
export function getEmailTemplateBody(type: EmailTemplate): string;
```

Behavior:

- `none` -> helper preview text (or empty string for mailto use-case)
- `feature` -> feature template body
- `bug` -> bug template body

### Rendering Notes

- Render preview text inside `.email_template`.
- Use CSS (`white-space: pre-wrap`) so multi-line template displays correctly.

## Task Checklist

- [x] Replace `ComingSoon` with real Contact UI.
- [x] Implement responsive image/content layout (mobile stack + desktop 2-column).
- [x] Implement clipboard copy states (`Copy` / `Copied` / `Error`) with timeout reset.
- [x] Add toggle group for `Feature`/`Bugs` with selected styling support.
- [x] Add `Email Template` panel shell.
- [ ] Render dynamic preview content based on `emailTemplate`.
- [ ] Add template helper function for reusable template generation.
- [ ] Decide and implement `Email Me` behavior (pending or mailto wiring).
- [ ] Add/update tests for preview rendering and template generation.

## Acceptance Criteria

- Contact page matches current implemented layout and component structure.
- Preview panel shows meaningful text for `none`, `feature`, and `bug` states.
- Preview text formatting preserves line breaks.
- Template-generation logic is centralized and reusable.
- Existing copy behavior continues to work unchanged.
