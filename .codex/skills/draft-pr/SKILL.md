---
name: draft-pr
description: Draft a high-quality PR (title + description) from the current git diff for this repo.
metadata:
  short-description: Draft PR title + description
---

When invoked, do the following:

1. Inspect the current git status and diff (staged + unstaged).
2. If the diff is too large or mixed, propose how to split into smaller PRs.
3. Propose a PR title (imperative, concise).
4. Produce a PR description using THIS template:

## Summary

- <1–3 bullets: what changed>

## Why

- <problem / motivation>

## How

- <key implementation choices; mention main files/modules>

## File Changes

- Should build a git friendly table with Header row (File, Changes)
- File should be name of file that was changed
- Changes should be 1 sentence summary on what was change in the file

Constraints:

- Keep it readable and scannable.
- Keep it github markdown friendly
- Should be able to copy and paste to github PR with minimal edit
