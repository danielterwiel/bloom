---
name: convert-prd-to-github-issues
description: "Convert PRDs to GitHub issues for LLM execution. Creates issues with acceptance criteria, dependencies, and quality gates from PRD user stories. Use when user asks to create github issues, convert prd to issues, or mentions breaking down PRD into tracked work."
---

# Convert PRD to GitHub Issues

Convert Product Requirements Documents into GitHub issues optimized for the LLM workflow in `plans/PROMPT.md`.

## Core Pattern

1. Parse PRD user stories
2. Extract quality gates (if present)
3. Create issues with `gh issue create`
4. Reference dependencies by issue number
5. Apply labels for prioritization

## Issue Body Template

```markdown
**Description:** As a [user], I want [feature] so that [benefit]

## Acceptance Criteria

- [ ] Criterion 1 from PRD
- [ ] Criterion 2 from PRD
- [ ] `bun run check` passes

## Dependencies

Depends on:

- #123 - [Dependency story title]

## Quality Gates

\`\`\`bash
bun run check
\`\`\`
```

**Note:** Acceptance criteria should be verifiable actions, not vague statements like "works correctly" or "good UX".

## Labels for Prioritization

Apply labels aligned with PROMPT.md task selection:

- `bug` - Critical bugfixes (highest priority)
- `tracer-bullet` - End-to-end feature slice
- `feature` - New functionality
- `polish` - Quick wins, UX improvements
- `refactor` - Code cleanup

**Technical labels:**

- `database`, `backend`, `frontend`, `testing`

**Branch isolation labels:**

- `branch:<branch-name>` - Scope issue to specific branch (e.g., `branch:feat/deployments`)
- `global` - Available to Ralph on all branches

**IMPORTANT:** Always add branch label to prevent cross-branch conflicts in Ralph workflow:

```bash
CURRENT_BRANCH=$(git branch --show-current)
--label "feature,database,branch:${CURRENT_BRANCH}"
```

Example: `--label "feature,database,tracer-bullet,branch:feat/deployments"`

## Quality Gates

Look for "Quality Gates" section in PRD. If missing, use project default:

- `bun run check` (runs lint, typecheck, test, knip, security)

Append quality gates to each story's acceptance criteria. For UI stories, add browser verification if specified.

## Dependency Order

Create issues foundation-first:

1. Schema/database (no dependencies)
2. Backend logic (depends on schema)
3. UI components (depends on backend)
4. Polish (depends on UI)

Reference prior issues in body:

```markdown
## Dependencies

Depends on:

- #101 - Add database schema
```

## Example Workflow

**PRD excerpt:**

```markdown
### US-001: Add priority field to database

As a developer, I need to store task priority.

- [ ] Add priority column: 1-4 (default 2)
- [ ] Migration runs successfully

### US-002: Display priority badge

As a user, I want to see task priority at a glance.

- [ ] Badge shows P1/P2/P3/P4 with colors
      **Depends on:** US-001
```

**Create issues:**

```bash
# Get current branch for labeling
CURRENT_BRANCH=$(git branch --show-current)

# Foundation
ISSUE_1=$(gh issue create \
  --title "Add priority field to database" \
  --label "feature,database,tracer-bullet,branch:${CURRENT_BRANCH}" \
  --body "$(cat <<'EOF'
**Description:** As a developer, I need to store task priority.

## Acceptance Criteria

- [ ] Add priority column: 1-4 (default 2)
- [ ] Migration runs successfully
- [ ] `bun run check` passes

## Quality Gates

\`\`\`bash
bun run check
\`\`\`
EOF
)" --json number --jq '.number')

# UI (depends on foundation)
gh issue create \
  --title "Display priority badge on task cards" \
  --label "feature,frontend,branch:${CURRENT_BRANCH}" \
  --body "$(cat <<'EOF'
**Description:** As a user, I want to see task priority at a glance.

## Acceptance Criteria

- [ ] Badge shows P1/P2/P3/P4 with colors
- [ ] `bun run check` passes

## Dependencies

Depends on:
- #${ISSUE_1} - Add priority field to database

## Quality Gates

\`\`\`bash
bun run check
\`\`\`
EOF
)"
```

## Tips

- **Heredoc syntax:** Use `cat <<'EOF' ... EOF` for multi-line bodies (single quotes prevent shell interpolation)
- **Capture issue numbers:** Store in variables for dependency references
- **Right-size stories:** Each should be completable in one LLM iteration; if you can't describe it in 2-3 sentences, split it
- **Create in parallel:** Use Task tool with multiple subagents for many issues
