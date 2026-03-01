# Contact Page Integration Test Plan

## Summary

Add Contact page integration coverage in Vitest/Testing Library with a hybrid entry strategy:

1. Keep one SideMenu navigation smoke test.
2. Put Contact behavior tests on direct `/contact` route for speed and stability.

Decisions locked:

- Default template assertion: `feature` selected initially.
- Clipboard coverage: success path + 3000ms reset back to `Copy`.
- `Email Me` coverage: integration-only wiring validation (no separate unit test).

## Public API / Interface Changes

- No public API/type/interface changes.
- Test-only updates:
  - `src/test/GameLayout.SideMenuButton.Navigate.Pages.integration.test.tsx`
  - `src/test/ContactPanel.TemplateAndActions.integration.test.tsx`

## Test Cases and Scenarios

### 1) Navigation Smoke (existing file update)

- Start at `/`.
- Click SideMenu `Contact` button (`alt="Contact"`).
- Assert Contact page is visible (for example heading `Contact` and `Email Template` text).
- Replace obsolete assertion expecting `Coming Soon`.

### 2) Template Toggle + Preview Content (new file)

- Render app at `/contact`.
- Assert initial state:
  - `Feature` button is selected.
  - Subject is `Quick Maths Feature Request`.
  - Body rows include `Type: Feature`, `Description:`, `Why:`.
- Click `Bugs`.
- Assert updated state:
  - `Bugs` button selected, `Feature` unselected.
  - Subject is `Quick Maths Bug Report`.
  - Body rows include `Type: Bug`, `Device:`, `Expected:`, `Actual:`.
- Click `Feature` again and assert content switches back.

### 3) Copy Button Integration (new file)

- Mock `navigator.clipboard.writeText` with resolved promise.
- Assert initial button text `Copy`.
- Click `Copy`.
- Assert `writeText` called with `quickmaths.run@gmail.com`.
- Assert button state becomes `Copied`.
- Use fake timers and advance `3000ms`.
- Assert button returns to `Copy`.

### 4) Email Me Wiring (new file, integration-only)

- Spy on `ContactPanelService.buildMailtoString`.
- With default Feature state, click `Email Me`.
- Assert `buildMailtoString` called with Feature template data (`email`, Feature subject, Feature body rows).
- Switch to `Bugs`, click `Email Me`, assert call uses Bug template data.
- Assert returned value from spy call result matches expected `mailto:` for each template.

## Test Implementation Notes

- Use `MemoryRouter initialEntries={['/contact']}` for direct Contact tests.
- Keep tests user-facing (`getByRole`, `findByText`) and avoid brittle DOM selectors.
- Import CSS module only where selected-state class verification is necessary.
- Cleanup per test:
  - `vi.restoreAllMocks()`
  - `vi.useRealTimers()` if fake timers were used.

## Assumptions and Defaults

- Contact page behavior under test is current implementation (default `feature`, not `none`).
- Copy reset delay remains `3000ms`.
- Email address remains `quickmaths.run@gmail.com`.
- `Email Me` is validated via service-wiring assertions rather than direct `window.location.href` verification due to JSDOM navigation limitations.
