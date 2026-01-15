# Heatmap UI Sub Spec

## Overview

- Focused spec for the heatmap UI and the minimum data model required to render it.
- Uses hardcoded data for the current branch; no localStorage or backend services.
- Intended to be a lightweight, UI-only slice of `docs/heatmap.spec.md`.

## Goals

- Define the UI behaviors and structure needed to render a contribution-style heatmap.
- Specify the data shape required to drive the UI without persistence concerns.
- Keep the UI components presentational and easy to test with mock data.

## Non-goals

- Persistence (localStorage), repositories, or migrations.
- Authentication or cloud sync.
- Event logging, analytics, or historical editing.
