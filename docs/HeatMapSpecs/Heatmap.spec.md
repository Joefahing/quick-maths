# GitHub-like Progress Heatmap Spec

## Overview

- Feature: contribution-style heatmap that visualizes daily play activity for the last 365 days.
- Phase 1 is local-only (no auth, no backend) and uses localStorage.
- Architecture is sync-ready for Phase 2 without rewriting UI logic.

## Goals

- Show a clear, motivating view of daily play activity and streaks.
- Keep UI and data logic cleanly separated, testable, and reusable.
- Persist data locally with versioned schema and safe fallbacks.

## Non-goals

- No authentication or cloud storage in Phase 1.
- No social features (sharing, friends, leaderboards).
- No historical editing or deletion of events in Phase 1.

## User Stories

- As a player, I can see my activity over the last year at a glance.
- As a player, I can hover or focus a day to see the exact date and sessions count.
- As a player, I can see a clear empty state when I have no history.
- As a player, I can view the heatmap on mobile without losing data context.

## UX/UI Requirements

- Grid layout:
  - Show last 365 days as a 7-row grid (Sun-Sat), 52-week columns.
  - Columns represent weeks; rows represent days of week.
  - Month labels across the top; day labels (Sun, Mon, Wed, Fri) on the left.
- Cell states:
  - 0 = empty (no activity).
  - 3 activity intensity levels for counts; legend "Less -> More".
  - Map counts to levels with a deterministic function (see Data model).
- Tooltip:
  - On hover and keyboard focus, show tooltip with:
    - date (YYYY-MM-DD)
    - activity count (e.g., "3 sessions")
  - Tooltip is accessible: `aria-describedby` or `role="tooltip"` with focus handling.
- Empty state:
  - Show blank grid with a short CTA: "No Contribution"
- Responsive behavior:
  - At narrow widths, keep all 52 weeks and enable horizontal scroll.
  - Reduce cell size and label density (e.g., hide day labels except Sun/Wed/Fri).
  - Month labels remain visible above the grid.

## Data Model

- Event log (append-only) stored in localStorage.
- Types:

```ts
export type ProgressEvent = {
	id: string; // UUID
	timestamp: number; // ms since epoch (UTC)
	stats: {
		correct: number;
		total: number;
		durationMs: number;
	};
};

export type DailyAggregate = Record<string, number>; // dateKey -> count
```

- Aggregate rules:
  - dateKey is UTC date string `YYYY-MM-DD`.
  - Each event increments the day's count by 1.
  - Intensity level function (example):

```ts
export const levelFromCount = (count: number): 0 | 1 | 2 | 3 => {
	if (count <= 0) return 0;
	if (count <= 1) return 1;
	if (count <= 3) return 2;
	return 3;
};
```

- Streaks (optional in Phase 1, spec included):
  - Current streak: consecutive days ending today (UTC) with count > 0.
  - Longest streak: max consecutive days with count > 0 within the 365-day window.
  - Provide `computeStreaks(aggregates, nowUtc)` as a pure utility.

## Date/Time Rules

- All date math in UTC to avoid local timezone shifts.
- `dateKeyFromTimestamp(ts)`:
  - Convert `ts` to UTC date and format as `YYYY-MM-DD`.
- Window:
  - `nowUtc` is injected (default `Date.now()`), used to build last 365 days.
  - Build the grid by weeks, ending on the week containing `nowUtc`.
- Grid build:
  - Generate 365 days in UTC, then chunk into 7-day weeks (Sun-Sat).
  - If the first week is partial, pad leading days with `null` cells.

## Persistence Design

- localStorage keys (versioned):
  - `quickmath:progress:events:v1` -> serialized `ProgressEvent[]`
  - `quickmath:progress:meta:v1` -> `{ schemaVersion: 1 }`
- Repository interface:

```ts
export interface ProgressRepository {
	getEvents(): Promise<ProgressEvent[]>;
	appendEvent(event: ProgressEvent): Promise<void>;
	replaceAll(events: ProgressEvent[]): Promise<void>; // sync-ready
}
```

- localStorage implementation:
  - Serialize with `JSON.stringify`, parse with `JSON.parse`.
  - Validate shape minimally (array + required fields).
  - If localStorage unavailable or parse fails:
    - Fallback to in-memory store for the session.
    - Surface a non-blocking warning in UI state.
- Migration strategy:
  - On load, read `meta` key; if missing, assume v1.
  - Placeholder `migrateV1ToV2` function in repository.

## Component + Hook Design

- Component tree:
  - `ProgressHeatmap` (container, data access + layout)
  - `HeatmapGrid` (renders grid and labels)
  - `HeatmapCell` (presentational; no business logic)
  - `HeatmapLegend` (levels, "Less -> More")
  - `HeatmapTooltip` (positioning + content)
- Component responsibilities:
  - `ProgressHeatmap`:
    - loads events via `useProgressEvents`
    - builds aggregates and grid via hooks/utilities
    - renders empty state if no data
  - `HeatmapGrid`:
    - receives precomputed `weeks: WeekCell[][]`
    - renders labels and cells
  - `HeatmapCell`:
    - props: `dateKey`, `count`, `level`, `isEmpty`, `onFocus`, `onHover`
    - renders accessible focusable element and data attributes
  - `HeatmapTooltip`:
    - props: `targetRect`, `dateKey`, `count`, `isVisible`
  - `HeatmapLegend`:
    - props: `levels: Array<{ level: number; label: string }>`
- Hooks/utilities:

```ts
export const useProgressEvents = (repo: ProgressRepository) => ({
  events,
  isLoading,
  error,
  addEvent, // wraps appendEvent and updates state
});

export const useDailyAggregates = (events: ProgressEvent[]) => ({
  aggregates,
  streaks, // optional for Phase 1
});

export const getLastNDays = (nowUtc: number, n: number) => Date[];
export const buildWeeksGrid = (days: Date[]) => WeekCell[][];
export const dateKeyFromTimestamp = (ts: number) => string;
```

- Memoization:
  - `useMemo` on aggregates from events to avoid recompute.
  - `useMemo` on grid from `nowUtc` and aggregates.
  - Cells are pure; wrap `HeatmapCell` in `React.memo`.

## Error States

- localStorage unavailable or full:
  - Render heatmap with in-memory data only.
  - Show subtle inline warning: "Progress will not persist in this browser."
- Malformed stored data:
  - Fall back to empty list and log a console warning.
- Empty events:
  - Render empty state (blank grid + CTA).

## Testing Plan (Vitest + React Testing Library)

- Unit tests (pure utilities):
  - `dateKeyFromTimestamp` handles timezone boundaries (UTC midnight).
  - `buildWeeksGrid` returns 52 columns and 7 rows.
  - `aggregateEvents` handles empty, single day, multiple events same day.
  - `computeStreaks` handles gaps and all-empty data.
- Component tests:
  - renders correct number of cells (52 \* 7).
  - tooltip appears on hover and focus with correct date/count.
  - legend renders 4 levels (empty + 3 intensities) with "Less -> More".
  - empty state text appears with no events.
- Deterministic date handling:
  - Pass `nowUtc` into utilities.
  - Use `vi.setSystemTime` in component tests where needed.

## Acceptance Criteria

[ ] Heatmap shows the last 365 days in a 52-week grid with labels.  
[ ] Hover and focus show tooltip with `YYYY-MM-DD` and count.  
[ ] Legend shows three intensity levels and "Less -> More".  
[ ] Empty state appears when no events exist.  
[ ] localStorage schema is versioned and resilient to parse errors.  
[ ] Repository interface supports `get`, `append`, and `replaceAll`.  
[ ] Unit tests cover date/aggregation edge cases.  
[ ] Component tests pass for grid, tooltip, legend, and empty state.

## Milestones / Phases

- Phase 1 (must):  
  [ ] Heatmap UI + tooltip + legend.  
  [ ] Event log + repository (localStorage).  
  [ ] Date utilities + aggregates + tests.
- Phase 2 (optional):
  - Auth + cloud sync using `replaceAll`.
  - Conflict resolution (last-write-wins or merge by event id).
  - Backfill UI with sync status and error states.

## Out-of-scope

- Editing or deleting events.
- Social sharing or public profiles.
- Detailed analytics dashboards.
