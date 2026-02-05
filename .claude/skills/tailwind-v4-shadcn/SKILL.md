---
name: tailwind-v4-baseui
description: |
  Tailwind CSS v4 with Base UI and Astro setup for this project.

  Use when: styling components, adding design tokens, working with Base UI
  primitives, debugging CSS variable issues, adding Tailwind utilities,
  or working with the shared styles package.

  Covers: @theme block pattern, OKLCH color space, Base UI + CVA component
  patterns, Astro + Vite integration, monorepo style sharing, and
  project-specific design tokens.

  Keywords: Tailwind v4, Base UI, @base-ui/react, @theme, OKLCH, CVA,
  class-variance-authority, tailwind-merge, design tokens, Astro integration,
  colors not working, variables broken, theme not applying, @plugin directive
---

# Tailwind v4 + Base UI — Project Style Guide

**Project**: astro-react-proto (Flower Industry Directory)
**Stack**: Astro + React islands, Tailwind v4, Base UI, CVA, tailwind-merge
**Theme**: Light mode only, flower-themed OKLCH tokens

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Design Tokens](#design-tokens)
3. [Component Pattern](#component-pattern-base-ui--cva--tailwind)
4. [Monorepo Style Sharing](#monorepo-style-sharing)
5. [Critical Rules](#critical-rules)
6. [Common Issues & Fixes](#common-issues--fixes)
7. [Adding New Tokens](#adding-new-tokens)
8. [Reference Documentation](#reference-documentation)

---

## Architecture Overview

This project uses Tailwind v4's **`@theme` block** (not `@theme inline`) to define all design tokens directly in CSS. No `tailwind.config.ts` file — everything is in CSS.

**Key differences from shadcn/ui pattern:**

- **OKLCH color space** (not HSL) — perceptually uniform, better for design
- **`@theme` block** (not `:root` variables + `@theme inline` mapping)
- **Base UI** (not Radix UI / shadcn) — headless primitives, zero styling opinions
- **No dark mode** — light mode only with flower theme
- **No `components.json`** — components live in `packages/ui/`

### File Locations

```
packages/styles/src/base.css    ← All design tokens (@theme block)
packages/ui/src/                ← React components (Base UI + CVA)
apps/web/astro.config.mjs       ← Astro + @tailwindcss/vite integration
```

---

## Design Tokens

All tokens are defined in `packages/styles/src/base.css` using Tailwind v4's `@theme` block:

```css
@import "tailwindcss";

@theme {
  /* Font families */
  --font-heading: "Playfair Display", ui-serif, Georgia, ...;
  --font-body: "Inter", ui-sans-serif, system-ui, ...;

  /* Primary: Rose tones */
  --color-primary: oklch(0.65 0.18 12);
  --color-primary-hover: oklch(0.58 0.2 12);
  --color-primary-foreground: oklch(0.98 0.01 12);

  /* Secondary: Sage green */
  --color-secondary: oklch(0.55 0.08 140);

  /* Accent: Terracotta */
  --color-accent: oklch(0.6 0.15 45);

  /* Surfaces */
  --color-background: oklch(0.99 0.005 90);
  --color-surface: oklch(0.98 0.01 90);
  --color-muted: oklch(0.94 0.015 90);
  --color-border: oklch(0.88 0.02 90);

  /* Text */
  --color-foreground: oklch(0.2 0.02 90);
  --color-foreground-muted: oklch(0.45 0.02 90);

  /* Semantic */
  --color-destructive: oklch(0.55 0.22 25);
  --color-success: oklch(0.55 0.15 145);

  /* Spacing, radius, shadows... */
  --spacing-content: 1.5rem;
  --radius-card: 1rem;
  --shadow-card: 0 2px 8px oklch(0.2 0.02 90 / 0.08);
}
```

**Usage in components:**

```tsx
<div className="bg-primary text-primary-foreground">Rose button</div>
<div className="bg-surface shadow-card rounded-card p-content">Card</div>
<p className="font-heading text-foreground">Heading</p>
<p className="font-body text-foreground-muted">Body text</p>
```

---

## Component Pattern: Base UI + CVA + Tailwind

Components use **Base UI** for accessible headless primitives, **CVA** for variant logic, and **tailwind-merge** for class composition.

### Example Component

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-body text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
        outline: "border border-border bg-transparent hover:bg-surface",
        ghost: "hover:bg-surface",
        destructive: "bg-destructive text-primary-foreground",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={twMerge(buttonVariants({ variant, size }), className)} {...props} />;
}
```

### Using Base UI Primitives

For complex interactive components (selects, dialogs, sliders), wrap Base UI:

```tsx
import { Select } from "@base-ui/react";

function CategorySelect({ value, onChange, options }) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-surface px-3 text-sm">
        <Select.Value placeholder="Select category..." />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup className="rounded-md border border-border bg-surface p-1 shadow-elevated">
            {options.map((opt) => (
              <Select.Option
                key={opt}
                value={opt}
                className="cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:bg-muted"
              >
                <Select.OptionText>{opt}</Select.OptionText>
              </Select.Option>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
```

---

## Monorepo Style Sharing

Styles flow from the shared package to the app:

```
packages/styles/src/base.css    → Defines @theme tokens
packages/ui/                    → Uses tokens in components
apps/web/                       → Imports styles package, renders components
```

In `apps/web`, Tailwind picks up the theme via the Vite plugin (`@tailwindcss/vite`).

---

## Critical Rules

### Always Do:

1. **Use `@theme` block for all design tokens** (not `:root` CSS variables)

   ```css
   @theme {
     --color-primary: oklch(0.65 0.18 12); /* ✅ */
   }
   ```

2. **Use OKLCH color space** for all colors

   ```css
   --color-accent: oklch(0.6 0.15 45); /* ✅ */
   --color-accent: hsl(25 70% 50%); /* ❌ not this project */
   ```

3. **Use `twMerge()` for class composition** (not raw concatenation)

   ```tsx
   className={twMerge(baseClasses, className)} /* ✅ */
   className={`${baseClasses} ${className}`}   /* ❌ */
   ```

4. **Use CVA for component variants**

5. **Use semantic token names** in components
   ```tsx
   <div className="bg-primary">  /* ✅ */
   <div className="bg-rose-500"> /* ❌ use tokens */
   ```

### Never Do:

1. **Don't add dark mode** — this project is light mode only

2. **Don't use `tailwind.config.ts`** — v4 uses CSS `@theme` block

3. **Don't use shadcn/ui or Radix UI** — this project uses Base UI

4. **Don't use HSL colors** — project uses OKLCH

5. **Don't use `@apply`** (deprecated in Tailwind v4)

6. **Don't use `:root` variables for theme colors** — use `@theme` block directly

---

## Common Issues & Fixes

| Symptom                      | Cause                       | Fix                                                   |
| ---------------------------- | --------------------------- | ----------------------------------------------------- |
| `bg-primary` doesn't work    | Token not in `@theme`       | Add to `packages/styles/src/base.css`                 |
| Color looks wrong            | Mixing HSL/OKLCH            | Use OKLCH values only                                 |
| Utility not generating       | Wrong token prefix          | Use `--color-*` for colors, `--spacing-*` for spacing |
| Styles not applying in app   | Missing `@tailwindcss/vite` | Check `apps/web/astro.config.mjs` has the Vite plugin |
| Component styles don't match | Raw string concat           | Use `twMerge()` for class composition                 |

---

## Adding New Tokens

To add a new design token:

1. Add to `packages/styles/src/base.css` inside the `@theme` block
2. Use the correct prefix for automatic utility generation:

```css
@theme {
  /* Colors → bg-*, text-*, border-* utilities */
  --color-info: oklch(0.6 0.15 250);

  /* Spacing → p-*, m-*, gap-* utilities */
  --spacing-dialog: 2rem;

  /* Radius → rounded-* utilities */
  --radius-pill: 9999px;

  /* Shadows → shadow-* utilities */
  --shadow-focus: 0 0 0 3px oklch(0.65 0.18 12 / 0.3);

  /* Fonts → font-* utilities */
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

---

## Tailwind v4 Plugins

Tailwind v4 uses the `@plugin` directive in CSS (not `require()` in config):

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@plugin "@tailwindcss/forms";
```

**Common error:**

- ❌ `@import "@tailwindcss/typography"` (doesn't work)
- ✅ `@plugin "@tailwindcss/typography"` (correct)

**Built-in features:** Container queries are core in v4 (no plugin needed).

---

## Reference Documentation

For deeper troubleshooting, the `references/` directory contains:

- **common-gotchas.md** — General Tailwind v4 pitfalls and fixes
- **dark-mode.md** — Dark mode patterns (not used in this project, reference only)
- **migration-guide.md** — Migrating from Tailwind v3 to v4
- **plugins-reference.md** — Official Tailwind v4 plugins
- **advanced-usage.md** — Advanced patterns and custom colors

Load these when encountering specific issues not covered above.
