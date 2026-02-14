# Side Menu Bar Requirements (Instagram-like)

Context: Quick Math needs a persistent, discoverable way to navigate to key resource pages (Home, Settings, Updates, About Me, Contact) without cluttering the main game UI.

## Overview

- Add a left-side vertical menu bar similar to Instagram’s desktop sidebar.
- Default state is collapsed (icons-only); on hover (or keyboard focus) it expands to show labels.
- Only Home navigation is “real” in this story; all other destinations show a placeholder “Coming Soon” page.

## Goals

- Provide quick navigation with minimal screen impact in the collapsed state.
- Make the menu self-explanatory when expanded (icon + label).
- Keep implementation simple and theme-consistent.

## Non-goals

- Implementing real Settings/Updates/About/Contact content and actions.
- Authentication, profile features, or user-specific navigation.
- Reworking game state semantics when navigating away (handled in a later story if needed).

## Functional Requirements

- Placement + layout:
  - Render a vertical sidebar fixed to the left edge of the viewport.
  - Sidebar is visible across the app (Home, Calculate, Score, and placeholder pages).
  - Main content must not be obscured by the sidebar; content area accounts for sidebar width.
- Menu items:
  - Menu contains 5 items: Home, Settings, Updates, About Me, Contact.
  - Each item must render an icon in both collapsed and expanded states.
  - In expanded state, each icon has a visible text label.
  - Contact may be pinned to the bottom section (optional, but preferred to match the design sketch).
- Expand / collapse behavior:
  - Default state: collapsed (icons-only).
  - On pointer hover entering the sidebar region: expand to show labels.
  - On pointer leaving the sidebar region: collapse back to icons-only.
  - Expansion/collapse should be animated (width + label fade) to feel smooth and intentional.
- Navigation behavior:
  - Clicking Home navigates to the index page (`/`).
  - Clicking Settings/Updates/About Me/Contact navigates to a route that displays a “Coming Soon” page.
- Placeholder pages:
  - The “Coming Soon” page must display the text “Coming Soon”.
  - (Optional) Show which page is being visited (e.g., “Settings — Coming Soon”) to confirm navigation.

## Accessibility Requirements

- Keyboard:
  - Sidebar expands when it (or any child link) receives keyboard focus.
  - Sidebar collapses when focus leaves the sidebar (blur to outside).
  - All menu items are reachable via `Tab` and activated via `Enter`/`Space`.
- Semantics:
  - Sidebar uses `<nav aria-label="Primary">`.
  - Each item has an accessible name (visible label when expanded; `aria-label` when collapsed).
- Reduced motion:

## Routing Requirements (Proposed)

- Add routes:
  - `/` -> existing IntroPanel (Home)
  - `/settings` -> Coming Soon
  - `/updates` -> Coming Soon
  - `/about` -> Coming Soon
  - `/contact` -> Coming Soon

## Component Contract (Proposed)

- `SideMenu`
  - Responsibility: render nav items, manage expanded/collapsed UI state, and apply styling.
  - Implementation detail (recommended): use `NavLink` from `react-router-dom` for active styling.
- `ComingSoonPage`
  - Responsibility: simple placeholder screen with “Coming Soon” (and optional title).

## Styling Notes

- Collapsed width: ~64–80px.
- Expanded width: ~220–280px.
- Use existing dark theme tokens:
  - Background: `var(--color-surface)` or `var(--color-background)`
  - Text: `var(--color-text-primary)`
  - Hover/selected: `var(--color-hover)` / `var(--color-selected)` (or a neutral highlight)
- Menu item hover/active state should resemble Instagram:
  - Rounded highlight background on hover
  - Active route stays highlighted

## Acceptance Criteria

[x] Sidebar renders on the left across the app.  
[x] Sidebar is collapsed by default (icons-only).  
[x] Hovering over the sidebar expands it and shows labels for all menu items.  
[x] Moving the pointer out of the sidebar collapses it back to icons-only.  
[x] Clicking Home navigates to `/`.  
[x] Clicking Settings/Updates/About Me/Contact navigates to a page that displays “Coming Soon”.  
[ ] Create integration test to ensure side bar is working as expected
