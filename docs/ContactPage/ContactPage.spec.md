# Contact Page Implementation Spec

## Overview

This spec reflects the current implemented behavior of the Contact page in QuickMath.

The Contact page is available at `/contact` and provides:
- A visible contact email with copy-to-clipboard action
- Template selection (`Feature` or `Bugs`)
- A live email template preview (subject + body rows)
- An `Email Me` CTA that opens a prefilled `mailto:` link

## Current Baseline In Repo

- Route wiring:
  - `paths.contact` in `src/routes/routes.ts`
  - `ContactPanel` mounted from `src/App.tsx`
  - Sidebar Contact button in `src/components/Share/SideMenu/SideMenu.tsx`
- Contact page is fully implemented (not a placeholder).

## Layout And UI

- Root component: `ContactPanel`
- Mobile-first layout:
  - Image at top
  - Content stacked below
- Desktop layout (`min-width: 769px`):
  - Two columns
  - Content on left, image on right
- Main content includes:
  1. Heading: `Contact`
  2. Support text: `Feature suggestion or bug report? Email me:`
  3. Email display row with address + `CopyButton`
  4. Template toggle buttons: `Feature`, `Bugs`
  5. `Email Template` preview card
  6. `Email Me` button

## Email Template Behavior

- Type: `EmailTemplateType = 'feature' | 'bug'`
- Default selection is `feature`
- Template data is provided by `ContactPanelService.getEmailTemplateData(...)`

### Feature template

- Subject: `Quick Maths Feature Request`
- Body rows:
  - `Type: Feature`
  - `Description:`
  - `Why:`

### Bug template

- Subject: `Quick Maths Bug Report`
- Body rows:
  - `Type: Bug`
  - `Device:`
  - `Expected:`
  - `Actual:`

## Preview Rendering

- Preview shows:
  - `Subject:` followed by selected template subject
  - `Body:` followed by one rendered row per body line
- Body container uses `white-space: pre-wrap`.

## Copy Behavior

- Email used across page: `quickmaths.run@gmail.com`
- Copy button states:
  - `idle` -> `Copy`
  - `success` -> `Copied`
  - `error` -> `Error`
- After success/error, status resets to `idle` after `3000ms` (default).

## Email CTA Behavior

- Clicking `Email Me` builds a mailto string via `ContactPanelService.buildMailtoString(...)`.
- Mailto format:
  - `mailto:<email>?subject=<encoded>&body=<encoded>`
- Body rows are joined with newline (`\n`) before URL encoding.
- Navigation is performed by assigning `window.location.href` to the generated mailto URL.

## Test Coverage Status

Current integration tests validate:
- Template preview updates and selected-state toggle behavior (`Feature` <-> `Bugs`)
- Copy action with clipboard call and `3000ms` reset
- `Email Me` invoking mailto builder with correct selected template payload

Primary test file:
- `src/test/ContactPanel.TemplateAndActions.integration.test.tsx`

## Non-goals (Current Implementation)

- Backend submission APIs (SMTP, serverless, form endpoints)
- In-app success/error submission workflow
- Additional template categories beyond `feature` and `bug`

## Acceptance Criteria

[x] Contact page is routed and reachable from sidebar navigation.  
[x] Contact UI renders image, heading, email row, toggle buttons, template preview, and CTA.  
[x] Default template is `feature`.  
[x] Switching toggle updates subject/body preview.  
[x] Copy button writes email to clipboard and resets state after `3000ms`.  
[x] `Email Me` generates and applies a valid prefilled `mailto:` link.
