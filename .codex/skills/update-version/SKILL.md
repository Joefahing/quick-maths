---
name: update-version
description: Update `version.json` for release notes. Use when adding a new version entry or appending changes to the latest version. Follow the structure in `docs/Version/version.template.json`, keep versions ordered by date descending (newest first), and prompt the user to choose between creating a new version or updating the current latest version.
---

# Update Version

## Workflow

1. Open `version.json` and `docs/Version/version.template.json`.
2. Ask the user which task to perform: add a new version entry (new release) or update the latest version (append changes).

## Add A New Version Entry

1. Use the object shape from `docs/Version/version.template.json` as the template.
2. Ask the user for these fields:

- `version` (semver string)
- `date` (YYYY-MM-DD)
- `title` (short release title)
- `overview` (1–2 sentence summary)
- `changes` list items: `type`, `scope`, `text`

3. Insert the new version object at the top of `versions` (date-desc order).
4. Preserve existing `meta` and other versions unchanged.

## Update The Latest Version

1. Identify the first entry in `versions` (newest).
2. Ask the user for the list of changes to add.
3. Append the new change objects to the end of the latest version’s `changes` array.
4. Keep all other fields unchanged.

## Output Rules

- Only edit `version.json`.
- Preserve formatting style (tabs/spacing) already used in the file.
- Do not reorder or mutate existing change items except for the new additions.
