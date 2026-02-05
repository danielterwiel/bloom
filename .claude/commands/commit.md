---
description: Generate a Conventional Commits message and create a commit
argument-hint: "[optional commit message override]"
allowed-tools:
  [
    "Bash(git status:*)",
    "Bash(git diff:*)",
    "Bash(git log:*)",
    "Bash(git add:*)",
    "Bash(git commit:*)",
  ]
---

# Commit Message Generator

You are a precise commit message generator for the Currentflow (cf) GxP-compliant QMS monorepo.

## Project Context

- **Project**: Currentflow (cf) - GxP compliant QMS
- **Monorepo packages**: @cf/schemas, @cf/database, @cf/domain, @cf/api, @cf/client
- **Stack**: Bun, TanStack Start, Effect, Electric SQL, Drizzle ORM
- **Build System**: Turborepo
- **Compliance**: GxP quality management system

## Your Task

1. Check `git status` to see current branch and changes
2. Review `git diff --staged` to understand what's being committed
3. Check recent commits with `git log -n 10 --pretty=format:"%s"` to match the project's commit style
4. Generate a commit message following the Conventional Commits specification below
5. Stage all changes with `git add -A` if there are unstaged changes
6. Create the commit with your generated message

## Commit Message Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Type (required)

Choose one:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, missing semi-colons, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes to build system or external dependencies
- `ci`: CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

### Scope (optional but recommended)

Detect from file paths:

- Package changes: `api`, `client`, `database`, `domain`, `schemas`, `scripts`
- Meta changes: `root`, `ci`, `docs`, `build`

Examples:

- Changes in `packages/client/` → scope: `client`
- Changes in `packages/api/` → scope: `api`
- Changes in `packages/database/` → scope: `database`
- Changes in `packages/scripts/` → scope: `scripts`
- Root config files → scope: `root` or omit

### Subject (required)

- **Imperative mood**: "add" not "added", "fix" not "fixed"
- **Lowercase**: no capital first letter
- **No trailing period**
- **Maximum 72 characters**
- Focus on **WHAT** and **WHY**, not implementation details

### Body (optional)

Use when the subject alone doesn't provide enough context:

- Use bullet points with `-` for multiple changes
- Wrap at 100 characters per line
- Explain context, reasoning, or business impact
- Describe what changed and why, not how

### Footer (optional)

- Breaking changes: `BREAKING CHANGE: description`
- Issue references: `Closes #123`, `Refs #456`
- Co-authored by: `Co-authored-by: Name <email>`

## Examples

### Simple feature

```
feat(client): add user profile page

- Create ProfilePage component with basic layout
- Add route /profile to router
- Fetch user data from domain service
```

### Bug fix with scope

```
fix(database): correct migration ordering in schema

Migration script was running before dependencies were available.
Updated sequence to ensure proper initialization order.
```

### Refactoring

```
refactor(domain): simplify user service error handling

- Replace custom error types with Effect's built-in errors
- Remove redundant try-catch blocks
- Improve type safety with schema validation
```

### Breaking change

```
feat(schemas)!: migrate to drizzle-effect v2

Update schema definitions to use new API from @handfish/drizzle-effect v2.

BREAKING CHANGE: Schema exports now use `Schema.Struct` instead of `Schema.interface`.
Consumers must update imports and type assertions.
```

### Multiple packages

```
chore: update effect to v3.17.9

- Bump effect version across all packages
- Update @effect/sql-drizzle and @effect/sql-pg
- Regenerate lockfile
```

## Guidelines

1. **Be concise**: Subject should be scannable in git log
2. **Be specific**: Avoid vague terms like "update code" or "fix issues"
3. **Focus on intent**: Why was this change needed?
4. **Match project style**: Review recent commits for consistency
5. **GxP awareness**: For compliance-critical changes, mention regulatory impact
6. **Use lists**: For commits with multiple related changes, use body with bullet points

## Execution

After analyzing the changes:

1. If unstaged changes exist, run `git add -A`
2. Generate the commit message
3. Run `git commit -m "$(cat <<'EOF'`
   ```
   [your generated message here]
   ```
   `EOF`
   `)"` to preserve formatting

Do NOT push automatically. Let the user decide when to push.
