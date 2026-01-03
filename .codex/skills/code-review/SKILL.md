---
name: code-review
description: Perform a structured code review on the current git diff in this repository.
metadata:
  short-description: Review current git changes
---

When invoked, follow these steps exactly:

## Execution Steps

1. Inspect the current git status and git diff.
   - Include both staged and unstaged changes.
2. If **no diff is found**:
   - Stop execution.
   - Respond with: "No changes detected. Nothing to review."
3. If a diff **is found**:
   - Review the changes carefully.
   - Identify potential issues, improvements, or questions.

## Review Scope

Focus on:
- Correctness (logic, bugs, edge cases)
- Code clarity and readability
- Maintainability and structure
- Consistency with existing patterns in the repo
- React + TypeScript best practices (if applicable)
- Performance or scalability issues (only if relevant)
- Missing tests or weak test coverage (if applicable)

Do **not**:
- Rewrite any code, only provide suggestions
- Suggest speculative changes unrelated to the diff
- Comment on formatting already handled by Prettier / ESLint unless there is a real issue

## Feedback Format

Provide feedback as a **list of issues**, ordered by **Severity (highest → lowest)**.

For each issue, use this exact structure:

### Problem
Briefly describe what is wrong, risky, unclear, or suboptimal.
Reference specific files or code sections when possible.

### Suggestion
Explain how the issue can be fixed, improved, or clarified.
Be concrete and actionable.

### Severity
Give a short descirption on the rating and Rate the importance from **1 to 10**:
- 9–10: Bug, data loss, broken behavior, or serious maintainability risk
- 6–8: Correctness risk, architectural concern, or likely future issue
- 3–5: Readability, consistency, or minor design concern
- 1–2: Nit, optional improvement, or stylistic preference


## Output Rules

- Sort all feedback strictly by Severity (descending).
- It is acceptable to return **zero issues** if the diff looks solid.
- If returning zero issues, respond with:
  "No significant issues found. Changes look good."

Keep feedback concise, professional, and review-ready.
