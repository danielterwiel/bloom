---
name: create-prd
description: "Generate a Product Requirements Document (PRD) for this project. Creates PRDs with user stories, acceptance criteria, and quality gates optimized for AI agent execution. Triggers on: create a prd, write prd for, plan this feature, requirements for, spec out."
---

# PRD Generator

Create detailed Product Requirements Documents optimized for AI agent execution.

---

## The Job

1. Receive a feature description from the user
2. Ask 3-5 essential clarifying questions (with lettered options) - one set at a time
3. **Always ask about quality gates** (what commands must pass)
4. After each answer, ask follow-up questions if needed (adaptive exploration)
5. Generate a structured PRD when you have enough context

**Important:** Do NOT start implementing. Just create the PRD.

---

## Project Context

This is an **Astro + React monorepo** (Turborepo) for a flower industry company directory.

**Tech stack:**

- Astro 5.x with React islands (selective hydration)
- Tailwind CSS v4 with `@theme` tokens (OKLCH color space)
- Base UI (@base-ui/react) for headless UI primitives
- uPlot for charting, TanStack Virtual for virtualized lists
- Vitest (unit), Playwright (e2e), oxlint (lint), oxfmt (format)
- Deployed on Vercel

**Monorepo structure:**

- `apps/web/` — Astro app with React islands
- `packages/data/` — Company data, types, filter utilities
- `packages/ui/` — Reusable React components (Base UI + charts)
- `packages/styles/` — Shared Tailwind v4 config and CSS
- `packages/tsconfig/` — Shared TypeScript configs

---

## Step 1: Clarifying Questions (Iterative)

Ask questions one set at a time. Each answer should inform your next questions. Focus on:

- **Problem/Goal:** What problem does this solve?
- **Core Functionality:** What are the key actions?
- **Scope/Boundaries:** What should it NOT do?
- **Success Criteria:** How do we know it's done?
- **Integration:** How does it fit with existing features?
- **Quality Gates:** What commands must pass for each story? (REQUIRED)

### Format Questions Like This

```
1. What is the primary goal of this feature?
   A. Improve user onboarding experience
   B. Increase user retention
   C. Reduce support burden
   D. Other: [please specify]

2. Who is the target user?
   A. New users only
   B. Existing users only
   C. All users
   D. Admin users only
```

This lets users respond with "1A, 2C" for quick iteration.

### Quality Gates Question (REQUIRED)

Always ask about quality gates — suggest the project defaults:

```
What quality commands must pass for each user story?
   A. npm run typecheck && npm run lint && npm run test (Recommended)
   B. npm run typecheck && npm run lint && npm run test && npm run e2e
   C. npm run typecheck only
   D. Other: [specify your commands]
```

### Adaptive Questioning

After each response, decide whether to:

- Ask follow-up questions (if answers reveal complexity)
- Ask about a new aspect (if current area is clear)
- Generate the PRD (if you have enough context)

Typically 2-4 rounds of questions are needed.

---

## Step 2: PRD Structure

Generate the PRD with these sections:

### 1. Introduction/Overview

Brief description of the feature and the problem it solves.

### 2. Goals

Specific, measurable objectives (bullet list).

### 3. Quality Gates

**CRITICAL:** List the commands that must pass for every user story.

```markdown
## Quality Gates

These commands must pass for every user story:

- `npm run typecheck` - Type checking
- `npm run lint` - Linting
- `npm run test` - Unit tests
```

### 4. User Stories

Each story needs:

- **Title:** Short descriptive name
- **Description:** "As a [user], I want [feature] so that [benefit]"
- **Acceptance Criteria:** Verifiable checklist of what "done" means

Each story should be small enough to implement in one focused AI agent session.

**Format:**

```markdown
### US-001: [Title]

**Description:** As a [user], I want [feature] so that [benefit].

**Acceptance Criteria:**

- [ ] Specific verifiable criterion
- [ ] Another criterion
```

**Note:** Do NOT include quality gate commands in individual story criteria — they are defined once in the Quality Gates section and applied automatically.

**Important:**

- Acceptance criteria must be verifiable, not vague
- "Works correctly" is bad
- "Button shows confirmation dialog before deleting" is good
- Each story should be independently completable

### 5. Functional Requirements

Numbered list of specific functionalities:

- "FR-1: The system must allow users to..."
- "FR-2: When a user clicks X, the system must..."

Be explicit and unambiguous.

### 6. Non-Goals (Out of Scope)

What this feature will NOT include. Critical for managing scope.

### 7. Technical Considerations (Optional)

- Known constraints or dependencies
- Which packages are affected (apps/web, packages/ui, packages/data, etc.)
- Integration points with existing systems
- Performance requirements

### 8. Success Metrics

How will success be measured?

### 9. Open Questions

Remaining questions or areas needing clarification.

---

## Writing for AI Agents

The PRD will be executed by AI coding agents. Therefore:

- Be explicit and unambiguous
- User stories should be small (completable in one session)
- Acceptance criteria must be machine-verifiable where possible
- Include specific file paths if you know them
- Reference existing code patterns in the project
- Mention which monorepo package(s) each story affects

---

## Output Format

Save the PRD to `./plans/prd-[feature-name].md`

---

## Example Conversation Flow

**User:** Create a PRD for adding a company detail page

**Assistant:** I'll help you create a PRD for company detail pages. Let me ask a few questions:

1. What is the primary goal?
   A. Show full company information when clicking a card
   B. Create a standalone page for each company (SEO)
   C. Both — detail view + individual URL
   D. Other

2. How should the detail view open?
   A. New Astro page (`/companies/[id]`)
   B. Modal/dialog overlay on the companies page
   C. Expandable card inline
   D. Other

**User:** 1C, 2A

**Assistant:** Great! A couple more questions:

1. What data should the detail page show beyond what's on the card?
   A. Full description + all metadata fields
   B. Add charts (specialty breakdown, similar companies)
   C. Minimal — same as card but with more space
   D. Other

2. What quality commands must pass for each story?
   A. npm run typecheck && npm run lint && npm run test (Recommended)
   B. npm run typecheck && npm run lint && npm run test && npm run e2e
   C. Other: [specify]

**User:** 1A, 2B

**Assistant:** Perfect, I have enough to generate the PRD.

_(generates PRD and saves to `./plans/prd-company-detail-page.md`)_

---

## Checklist

Before outputting the PRD:

- [ ] Asked clarifying questions with lettered options
- [ ] Asked about quality gates (REQUIRED)
- [ ] Asked follow-up questions when needed
- [ ] Quality Gates section included with project-specific commands
- [ ] User stories are small and independently completable
- [ ] User stories do NOT include quality gate commands
- [ ] Functional requirements are numbered and unambiguous
- [ ] Non-goals section defines clear boundaries
- [ ] Technical considerations reference correct monorepo packages
