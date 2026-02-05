# PRD Task Breakdown: Astro + React Prototype (Atomic)

> Source: [PLAN.md](./PLAN.md)
> 47 atomic PRDs for sequential/parallel execution

---

## Foundation (PRDs 1-5)

### PRD-1: Initialize Monorepo Root

**Dependencies**: None

#### Objective

Create root package.json with Bun workspaces and turbo.json.

#### Deliverables

- [x] Root `package.json` with workspaces: `["apps/*", "packages/*"]`
- [x] `turbo.json` with pipelines: build, dev, lint, test, e2e
- [x] Root `tsconfig.json` (minimal, references packages)
- [x] `.gitignore` updated for monorepo

#### Acceptance Criteria

1. `bun install` runs without errors
2. Directory structure exists: `apps/`, `packages/`
3. `turbo --version` works

---

### PRD-2: Shared TypeScript Configs

**Dependencies**: PRD-1

#### Objective

Create packages/tsconfig with base, react, and astro configs.

#### Deliverables

- [x] `packages/tsconfig/package.json`
- [x] `packages/tsconfig/base.json` (strict mode, modern ES)
- [x] `packages/tsconfig/react.json` (extends base, JSX)
- [x] `packages/tsconfig/astro.json` (extends base, Astro-specific)

#### Acceptance Criteria

1. Package is recognized by workspace
2. Configs can be extended via `"extends": "@repo/tsconfig/base.json"`
3. No TypeScript errors in config files

---

### PRD-3: Vitest Setup

**Dependencies**: PRD-1

#### Objective

Configure Vitest for monorepo unit testing.

#### Deliverables

- [x] Vitest installed at root
- [x] `vitest.workspace.ts` configured for all packages
- [x] `packages/ui/src/__tests__/sample.test.ts` (placeholder)
- [x] `test` script in root package.json
- [x] `test` pipeline in turbo.json

#### Acceptance Criteria

1. `bun test` runs Vitest
2. Sample test passes
3. `turbo test` runs tests across packages

---

### PRD-4: Playwright Setup

**Dependencies**: PRD-1

#### Objective

Configure Playwright for E2E testing.

#### Deliverables

- [x] Playwright installed at root
- [x] `playwright.config.ts` (baseURL: localhost:4321)
- [x] `tests/e2e/sample.spec.ts` (placeholder)
- [x] `e2e` script in root package.json
- [x] `e2e` pipeline in turbo.json
- [x] Browsers installed: `bunx playwright install`

#### Acceptance Criteria

1. `bun run e2e` runs Playwright
2. Placeholder test structure works
3. Chrome/Firefox browsers available

---

### PRD-5: Oxfmt, Oxlint & Lefthook

**Dependencies**: PRD-3, PRD-4

#### Objective

Set up formatting, linting, and pre-commit hooks.

#### Deliverables

- [x] `.oxlintrc.json` configuration
- [x] `lefthook.yml` with pre-commit hooks
- [x] Lefthook installed: `lefthook install`
- [x] Scripts: `lint`, `format`, `format:check`

#### Acceptance Criteria

1. `bun run lint` runs oxlint
2. `bun run format` runs oxfmt
3. `bun run format:check` validates without changes
4. `lefthook run pre-commit` executes hooks
5. Hooks run on staged files only

---

## Styles Package (PRDs 6-7)

### PRD-6: Tailwind v4 Theme Tokens

**Dependencies**: PRD-2

#### Objective

Create styles package with Tailwind v4 @theme semantic tokens.

#### Deliverables

- [x] `packages/styles/package.json`
- [x] `packages/styles/src/base.css` with full `@theme` block:
  ```css
  @theme {
    --color-primary: oklch(0.65 0.18 12);
    --color-primary-hover: oklch(0.58 0.2 12);
    --color-primary-foreground: oklch(0.98 0.01 12);
    --color-secondary: oklch(0.55 0.08 140);
    --color-secondary-hover: oklch(0.48 0.1 140);
    --color-secondary-foreground: oklch(0.98 0.01 140);
    --color-accent: oklch(0.6 0.15 45);
    --color-accent-hover: oklch(0.53 0.17 45);
    --color-background: oklch(0.99 0.005 90);
    --color-surface: oklch(0.98 0.01 90);
    --color-muted: oklch(0.94 0.015 90);
    --color-border: oklch(0.88 0.02 90);
    --color-foreground: oklch(0.2 0.02 90);
    --color-foreground-muted: oklch(0.45 0.02 90);
    --color-destructive: oklch(0.55 0.22 25);
    --color-success: oklch(0.55 0.15 145);
    --color-chart-1: oklch(0.65 0.18 12);
    --color-chart-2: oklch(0.55 0.08 140);
    --color-chart-3: oklch(0.6 0.15 45);
    --color-chart-4: oklch(0.7 0.12 320);
    --color-chart-5: oklch(0.65 0.1 280);
    --spacing-content: 1.5rem;
    --spacing-section: 4rem;
    --spacing-card: 1.25rem;
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-card: 1rem;
    --shadow-card: 0 2px 8px oklch(0.2 0.02 90 / 0.08);
    --shadow-elevated: 0 8px 24px oklch(0.2 0.02 90 / 0.12);
  }
  ```
- [x] `packages/styles/tailwind.config.ts` (shared preset)

#### Acceptance Criteria

1. Package builds without errors
2. All tokens from spec are defined
3. Tailwind preset exports correctly

---

### PRD-7: Font Configuration

**Dependencies**: PRD-6

#### Objective

Configure Playfair Display and Inter fonts.

#### Deliverables

- [x] `packages/styles/src/fonts.css` with @font-face or Google Fonts import
- [x] Font variables in base.css: `--font-heading`, `--font-body`
- [x] Export fonts.css from package

#### Acceptance Criteria

1. Playfair Display loads for headings
2. Inter loads for body text
3. Fonts work when imported in consuming app

---

## UI Components (PRDs 8-17)

### PRD-8: UI Package Setup

**Dependencies**: PRD-6

#### Objective

Initialize UI package with BaseUI and utilities.

#### Deliverables

- [x] `packages/ui/package.json`
- [x] `@base-ui-components/react` installed
- [x] `class-variance-authority` installed
- [x] `tailwind-merge` installed
- [x] `packages/ui/src/index.ts` (barrel export)
- [x] `packages/ui/src/lib/utils.ts` (cn helper)

#### Acceptance Criteria

1. Package builds without errors
2. Dependencies installed correctly
3. `cn()` utility works for class merging

---

### PRD-9: Button Component

**Dependencies**: PRD-8

#### Objective

Create Button with variants: default, outline, ghost, destructive.

#### Deliverables

- [x] `packages/ui/src/components/button.tsx`
- [x] Variants via CVA: default, outline, ghost, destructive
- [x] Sizes: sm, md, lg
- [x] Export from index.ts

#### Acceptance Criteria

1. All variants render correctly
2. Uses theme tokens (--color-primary, etc.)
3. Forwards ref, accepts className
4. Unit test: renders all variants

---

### PRD-10: Input Component

**Dependencies**: PRD-8

#### Objective

Create styled text Input component.

#### Deliverables

- [x] `packages/ui/src/components/input.tsx`
- [x] Styled with theme tokens
- [x] Support for error state
- [x] Export from index.ts

#### Acceptance Criteria

1. Renders correctly
2. Focus states visible
3. Error state styling works
4. Unit test: render, focus, error state

---

### PRD-11: Select Component

**Dependencies**: PRD-8

#### Objective

Create Select using BaseUI Select primitive.

#### Deliverables

- [x] `packages/ui/src/components/select.tsx`
- [x] Uses BaseUI Select internally
- [x] Styled with theme tokens
- [x] Export from index.ts

#### Acceptance Criteria

1. Opens/closes correctly
2. Keyboard navigation works
3. Selected value displays
4. Unit test: open, select, close

---

### PRD-12: Checkbox Component

**Dependencies**: PRD-8

#### Objective

Create Checkbox using BaseUI primitive.

#### Deliverables

- [x] `packages/ui/src/components/checkbox.tsx`
- [x] Uses BaseUI Checkbox internally
- [x] Styled with theme tokens
- [x] Export from index.ts

#### Acceptance Criteria

1. Toggles on click
2. Keyboard accessible (Space)
3. Visual checked/unchecked states
4. Unit test: toggle, keyboard

---

### PRD-13: Badge Component

**Dependencies**: PRD-8

#### Objective

Create Badge for labels and counts.

#### Deliverables

- [x] `packages/ui/src/components/badge.tsx`
- [x] Variants: default, secondary, outline
- [x] Export from index.ts

#### Acceptance Criteria

1. All variants render
2. Uses theme tokens
3. Unit test: all variants

---

### PRD-14: Card Component

**Dependencies**: PRD-8

#### Objective

Create Card container component.

#### Deliverables

- [x] `packages/ui/src/components/card.tsx`
- [x] Subcomponents: Card, CardHeader, CardContent, CardFooter
- [x] Uses --shadow-card, --radius-card
- [x] Export from index.ts

#### Acceptance Criteria

1. Renders with proper shadow/radius
2. Subcomponents compose correctly
3. Unit test: render with children

---

### PRD-15: Dialog Component

**Dependencies**: PRD-8

#### Objective

Create Dialog/Modal using BaseUI primitive.

#### Deliverables

- [x] `packages/ui/src/components/dialog.tsx`
- [x] Uses BaseUI Dialog internally
- [x] Backdrop, close button, content area
- [x] Export from index.ts

#### Acceptance Criteria

1. Opens/closes correctly
2. Escape key closes
3. Click outside closes (optional)
4. Focus trapped inside
5. Unit test: open, close, escape

---

### PRD-16: Slider Component

**Dependencies**: PRD-8

#### Objective

Create range Slider using BaseUI primitive.

#### Deliverables

- [ ] `packages/ui/src/components/slider.tsx`
- [ ] Uses BaseUI Slider internally
- [ ] Support for range (two thumbs)
- [ ] Export from index.ts

#### Acceptance Criteria

1. Draggable thumb(s)
2. Keyboard accessible
3. Value updates correctly
4. Unit test: drag, keyboard, range mode

---

### PRD-17: MultiSelect Component

**Dependencies**: PRD-11

#### Objective

Create MultiSelect for tag/category selection.

#### Deliverables

- [ ] `packages/ui/src/components/multi-select.tsx`
- [ ] Multiple selection support
- [ ] Selected items displayed as badges
- [ ] Clear all button
- [ ] Export from index.ts

#### Acceptance Criteria

1. Multiple items selectable
2. Badges show selected items
3. Items can be removed
4. Clear all works
5. Unit test: select multiple, remove, clear

---

## Chart Components (PRDs 18-22)

### PRD-18: Base Chart Wrapper

**Dependencies**: PRD-8

#### Objective

Create shared uPlot wrapper with lifecycle management.

#### Deliverables

- [ ] `uplot` and `uplot-react` installed
- [ ] `packages/ui/src/charts/base-chart.tsx`
- [ ] Ref management
- [ ] ResizeObserver for responsive sizing
- [ ] Cleanup on unmount

#### Acceptance Criteria

1. Chart instance created correctly
2. Resizes on container change
3. No memory leaks on unmount
4. Unit test: mount, resize, unmount

---

### PRD-19: Bar Chart

**Dependencies**: PRD-18

#### Objective

Create BarChart component.

#### Deliverables

- [ ] `packages/ui/src/charts/bar-chart.tsx`
- [ ] Uses theme colors (chart-1, chart-2, etc.)
- [ ] Configurable data and labels
- [ ] Export from index.ts

#### Acceptance Criteria

1. Renders bars correctly
2. Uses theme colors
3. Responsive
4. Unit test: render with data

---

### PRD-20: Line Chart

**Dependencies**: PRD-18

#### Objective

Create LineChart component.

#### Deliverables

- [ ] `packages/ui/src/charts/line-chart.tsx`
- [ ] Uses theme colors
- [ ] Configurable data, labels, multiple series
- [ ] Export from index.ts

#### Acceptance Criteria

1. Renders line(s) correctly
2. Uses theme colors
3. Responsive
4. Unit test: render with data

---

### PRD-21: Donut Chart

**Dependencies**: PRD-18

#### Objective

Create DonutChart component.

#### Deliverables

- [ ] `packages/ui/src/charts/donut-chart.tsx`
- [ ] Uses theme colors
- [ ] Configurable segments and labels
- [ ] Export from index.ts

#### Acceptance Criteria

1. Renders donut correctly
2. Uses theme colors
3. Responsive
4. Unit test: render with data

---

### PRD-22: Export All Charts

**Dependencies**: PRD-19, PRD-20, PRD-21

#### Objective

Ensure all charts exported from UI package.

#### Deliverables

- [ ] Update `packages/ui/src/index.ts` with chart exports
- [ ] Verify tree-shaking works

#### Acceptance Criteria

1. All charts importable: `import { BarChart, LineChart, DonutChart } from '@repo/ui'`
2. Unused charts don't bloat bundle

---

## Data Package (PRDs 23-26)

### PRD-23: Data Types

**Dependencies**: PRD-2

#### Objective

Define FlowerCompany TypeScript interface.

#### Deliverables

- [ ] `packages/data/package.json`
- [ ] `packages/data/src/types.ts` with:

  ```typescript
  export interface FlowerCompany {
    id: string;
    name: string;
    category: string;
    specialty: string[];
    founded: number;
    employees: string;
    businessType: string;
    annualRevenue: string;
    headquarters: string;
    country: string;
    certifications: string[];
    description: string;
    website: string;
    imageUrl: string;
  }

  export const CATEGORIES: string[];
  export const SPECIALTIES: string[];
  export const EMPLOYEE_RANGES: string[];
  export const REVENUE_RANGES: string[];
  export const BUSINESS_TYPES: string[];
  export const CERTIFICATIONS: string[];
  export const COUNTRIES: string[];
  ```

#### Acceptance Criteria

1. Types compile without errors
2. All constants exported
3. Unit test: type validation

---

### PRD-24: Company Data Generation

**Dependencies**: PRD-23

#### Objective

Generate 1000 realistic flower company records.

#### Deliverables

- [ ] `packages/data/src/companies.ts`
- [ ] 1000 records with realistic distribution:
  - Categories: weighted toward Florist, Nursery, Wholesale
  - Countries: USA 40%, Netherlands 15%, Colombia 10%, others
  - Founded: bell curve 2005-2015
  - Certifications: 60% have at least one
- [ ] Deterministic generation (seeded random)

#### Acceptance Criteria

1. Exactly 1000 records generated
2. All fields populated with valid values
3. Distribution matches spec
4. Unit test: count, field validation, distribution

---

### PRD-25: Filter Utilities

**Dependencies**: PRD-23

#### Objective

Create filter functions for company data.

#### Deliverables

- [ ] `packages/data/src/filters.ts`
- [ ] Functions:
  ```typescript
  filterByText(companies, query): FlowerCompany[]
  filterByCategory(companies, categories): FlowerCompany[]
  filterBySpecialty(companies, specialties): FlowerCompany[]
  filterByFoundedRange(companies, min, max): FlowerCompany[]
  filterByEmployees(companies, ranges): FlowerCompany[]
  filterByBusinessType(companies, types): FlowerCompany[]
  filterByRevenue(companies, ranges): FlowerCompany[]
  filterByCountry(companies, countries): FlowerCompany[]
  filterByCertifications(companies, certs): FlowerCompany[]
  applyAllFilters(companies, filters): FlowerCompany[]
  ```

#### Acceptance Criteria

1. Each filter function works correctly
2. Text search matches name and description
3. Multi-value filters use OR logic within, AND between
4. Unit test: each filter function

---

### PRD-26: Data Package Exports

**Dependencies**: PRD-24, PRD-25

#### Objective

Export all data package contents.

#### Deliverables

- [ ] `packages/data/src/index.ts` barrel export
- [ ] Verify all types, data, and functions exported

#### Acceptance Criteria

1. `import { FlowerCompany, companies, filterByText } from '@repo/data'` works
2. Tree-shaking works

---

## Astro App Setup (PRDs 27-29)

### PRD-27: Astro App Initialization

**Dependencies**: PRD-6, PRD-8

#### Objective

Create Astro app with React integration.

#### Deliverables

- [ ] `apps/web/package.json`
- [ ] `apps/web/astro.config.mjs`:
  - Vercel adapter
  - React integration
  - View Transitions
  - Tailwind integration
- [ ] `apps/web/tsconfig.json` (extends @repo/tsconfig/astro)
- [ ] `apps/web/src/` directory structure

#### Acceptance Criteria

1. `bun run dev` starts dev server on :4321
2. `bun run build` succeeds
3. React components can be imported

---

### PRD-28: Base Layout

**Dependencies**: PRD-27

#### Objective

Create shared BaseLayout with head, slots.

#### Deliverables

- [ ] `apps/web/src/layouts/BaseLayout.astro`
- [ ] Imports styles package CSS
- [ ] ViewTransitions component in head
- [ ] Slot for page content
- [ ] Meta tags (title, description)

#### Acceptance Criteria

1. Layout renders correctly
2. Styles applied globally
3. View Transitions enabled

---

### PRD-29: Header & Footer

**Dependencies**: PRD-28

#### Objective

Create navigation header and footer.

#### Deliverables

- [ ] `apps/web/src/components/astro/Header.astro`
  - Logo/brand
  - Nav links: Home, About, Insights, Companies
  - Mobile responsive
- [ ] `apps/web/src/components/astro/Footer.astro`
  - Flower theme styling
  - Minimal content

#### Acceptance Criteria

1. Header displays on all pages
2. Nav links work
3. Footer displays on all pages
4. Mobile responsive

---

## Static Pages (PRDs 30-32)

### PRD-30: Landing Page

**Dependencies**: PRD-29

#### Objective

Create the home page with hero and CTA.

#### Deliverables

- [ ] `apps/web/src/pages/index.astro`
- [ ] Hero section with flower theme
- [ ] "Flower Industry Directory" headline
- [ ] CTA button → /companies
- [ ] Featured section (placeholder)
- [ ] View Transition animations

#### Acceptance Criteria

1. Page renders at /
2. CTA links to /companies
3. View Transition works
4. Matches flower theme

---

### PRD-31: About Page

**Dependencies**: PRD-29

#### Objective

Create content-focused about page.

#### Deliverables

- [ ] `apps/web/src/pages/about.astro`
- [ ] Content about the directory
- [ ] Uses Card components
- [ ] Flower-themed decorative elements

#### Acceptance Criteria

1. Page renders at /about
2. View Transition from home works
3. Cards display correctly

---

### PRD-32: Insights Page Shell

**Dependencies**: PRD-29

#### Objective

Create insights page structure (charts added later).

#### Deliverables

- [ ] `apps/web/src/pages/insights.astro`
- [ ] Page title and intro text
- [ ] Grid layout for charts (placeholders)
- [ ] `client:visible` directive ready

#### Acceptance Criteria

1. Page renders at /insights
2. Layout ready for chart islands

---

## Insights Charts (PRDs 33-36)

### PRD-33: Category Distribution Chart

**Dependencies**: PRD-21, PRD-24, PRD-32

#### Objective

Add category distribution donut chart to insights.

#### Deliverables

- [ ] React island component wrapping DonutChart
- [ ] Data aggregation for categories
- [ ] `client:visible` directive

#### Acceptance Criteria

1. Chart renders when scrolled into view
2. Shows correct category distribution
3. Uses theme colors

---

### PRD-34: Business Type Chart

**Dependencies**: PRD-19, PRD-24, PRD-32

#### Objective

Add business type bar chart to insights.

#### Deliverables

- [ ] React island component wrapping BarChart
- [ ] Data aggregation for B2B/B2C/Both
- [ ] `client:visible` directive

#### Acceptance Criteria

1. Chart renders when visible
2. Shows correct distribution
3. Uses theme colors

---

### PRD-35: Founding Year Chart

**Dependencies**: PRD-20, PRD-24, PRD-32

#### Objective

Add companies by founding year line chart.

#### Deliverables

- [ ] React island component wrapping LineChart
- [ ] Data aggregation by year
- [ ] `client:visible` directive

#### Acceptance Criteria

1. Chart renders when visible
2. Shows timeline correctly
3. Uses theme colors

---

### PRD-36: Geographic Distribution Chart

**Dependencies**: PRD-19, PRD-24, PRD-32

#### Objective

Add country distribution bar chart.

#### Deliverables

- [ ] React island component wrapping BarChart
- [ ] Data aggregation by country
- [ ] `client:visible` directive

#### Acceptance Criteria

1. Chart renders when visible
2. Shows top countries
3. Uses theme colors

---

## API & Data Loading (PRD 37)

### PRD-37: Companies API Endpoint

**Dependencies**: PRD-24, PRD-27

#### Objective

Create API endpoint serving company data.

#### Deliverables

- [ ] `apps/web/src/pages/api/companies.ts`
- [ ] Returns: `{ data: FlowerCompany[], total: number }`
- [ ] Cache-Control headers

#### Acceptance Criteria

1. GET /api/companies returns JSON
2. All 1000 records included
3. Response cached appropriately

---

## Company Explorer (PRDs 38-41)

### PRD-38: Companies Page Shell

**Dependencies**: PRD-29

#### Objective

Create companies page with React island mount point.

#### Deliverables

- [ ] `apps/web/src/pages/companies.astro`
- [ ] CompanyExplorer island with `client:load`
- [ ] Loading state while hydrating

#### Acceptance Criteria

1. Page renders at /companies
2. Island hydrates immediately
3. Loading state visible briefly

---

### PRD-39: Company Card

**Dependencies**: PRD-14, PRD-23

#### Objective

Create CompanyCard component displaying company info.

#### Deliverables

- [ ] `apps/web/src/components/react/CompanyCard.tsx`
- [ ] Displays: name, category, specialty badges, location, employees
- [ ] Uses Card from UI package
- [ ] Memoized for virtualization

#### Acceptance Criteria

1. Renders all company fields
2. Uses theme styling
3. Memoized (React.memo)

---

### PRD-40: Virtual List

**Dependencies**: PRD-39

#### Objective

Create virtualized list for 1000 cards.

#### Deliverables

- [ ] TanStack Virtual installed
- [ ] `apps/web/src/components/react/VirtualList.tsx`
- [ ] Renders CompanyCard items
- [ ] Configurable row height

#### Acceptance Criteria

1. Only visible items rendered
2. Smooth scrolling (60fps)
3. Handles 1000 items

---

### PRD-41: Company Explorer Core

**Dependencies**: PRD-37, PRD-40

#### Objective

Create CompanyExplorer with data fetching.

#### Deliverables

- [ ] `apps/web/src/components/react/CompanyExplorer.tsx`
- [ ] Fetches from /api/companies
- [ ] Loading state
- [ ] Error state
- [ ] Passes data to VirtualList

#### Acceptance Criteria

1. Data loads on mount
2. Loading spinner shown
3. Error handled gracefully
4. List renders with data

---

## Filter Components (PRDs 42-45)

### PRD-42: Filter Panel Shell

**Dependencies**: PRD-41

#### Objective

Create FilterPanel container with layout.

#### Deliverables

- [ ] `apps/web/src/components/react/FilterPanel.tsx`
- [ ] Grid/flex layout for filter controls
- [ ] Results count display
- [ ] Clear all button
- [ ] Filter state interface

#### Acceptance Criteria

1. Panel renders with placeholder slots
2. Clear all button present
3. Results count displays

---

### PRD-43: Text Search Filter

**Dependencies**: PRD-42, PRD-10

#### Objective

Add debounced text search.

#### Deliverables

- [ ] Search Input in FilterPanel
- [ ] Debounce (300ms)
- [ ] Searches name + description

#### Acceptance Criteria

1. Input renders
2. Debounce works (no search on every keystroke)
3. Results filter correctly

---

### PRD-44: Multi-Select Filters

**Dependencies**: PRD-42, PRD-17

#### Objective

Add multi-select filters for: Category, Specialty, Certifications, Country.

#### Deliverables

- [ ] Category MultiSelect
- [ ] Specialty MultiSelect
- [ ] Certifications MultiSelect
- [ ] Country MultiSelect
- [ ] Each shows selected count badge

#### Acceptance Criteria

1. All four multi-selects work
2. Multiple selection allowed
3. Badges show count
4. Filters combine correctly

---

### PRD-45: Single-Select & Range Filters

**Dependencies**: PRD-42, PRD-11, PRD-16

#### Objective

Add remaining filters: Employees, Business Type, Revenue, Founded Year.

#### Deliverables

- [ ] Employees Select
- [ ] Business Type Select
- [ ] Revenue Select
- [ ] Founded Year Range Slider (min/max)

#### Acceptance Criteria

1. All filters work
2. Range slider has two thumbs
3. Filters combine correctly

---

### PRD-46: URL State Sync

**Dependencies**: PRD-45

#### Objective

Sync all filter state to URL for shareable links.

#### Deliverables

- [ ] URL serialization for all filters
- [ ] URL deserialization on page load
- [ ] Browser back/forward works
- [ ] Clean URLs (omit default values)

#### Acceptance Criteria

1. Filters update URL
2. Reload preserves filters
3. Shareable links work
4. Back/forward navigates filter history
5. Unit test: serialize/deserialize

---

## E2E Tests (PRD 47)

### PRD-47: E2E Test Suite

**Dependencies**: PRD-46

#### Objective

Comprehensive E2E tests for all functionality.

#### Deliverables

- [ ] `tests/e2e/navigation.spec.ts` - nav links, view transitions
- [ ] `tests/e2e/landing.spec.ts` - hero, CTA
- [ ] `tests/e2e/about.spec.ts` - content renders
- [ ] `tests/e2e/insights.spec.ts` - all charts render
- [ ] `tests/e2e/companies.spec.ts` - data loads, virtualization
- [ ] `tests/e2e/filters.spec.ts` - all filters, URL state

#### Acceptance Criteria

1. All tests pass
2. No flaky tests
3. < 2 min total runtime
4. CI integration ready

---

## Polish (PRDs 48-50)

### PRD-48: Theme Audit

**Dependencies**: PRD-47

#### Objective

Verify design consistency across all pages.

#### Deliverables

- [ ] Audit checklist completed
- [ ] Fixes applied for inconsistencies
- [ ] Screenshots of all pages

#### Acceptance Criteria

1. Colors match spec everywhere
2. Spacing consistent
3. Typography hierarchy correct
4. Charts use theme colors

---

### PRD-49: Performance Audit

**Dependencies**: PRD-47

#### Objective

Ensure performance targets met.

#### Deliverables

- [ ] Lighthouse report (all pages)
- [ ] Bundle size analysis
- [ ] Performance fixes applied

#### Acceptance Criteria

1. Lighthouse > 90 all categories
2. LCP < 2.5s
3. CLS < 0.1
4. Bundle size documented

---

### PRD-50: Accessibility Audit

**Dependencies**: PRD-47

#### Objective

Ensure WCAG AA compliance.

#### Deliverables

- [ ] Keyboard navigation verified
- [ ] Screen reader testing done
- [ ] Color contrast checked
- [ ] ARIA labels added where needed

#### Acceptance Criteria

1. All interactive elements keyboard accessible
2. Focus indicators visible
3. Color contrast AA compliant
4. No critical a11y violations

---

## Deployment (PRDs 51-52)

### PRD-51: GitHub Actions CI

**Dependencies**: PRD-47

#### Objective

Set up CI pipeline.

#### Deliverables

- [ ] `.github/workflows/ci.yml`
- [ ] Steps: install, lint, format:check, test, build, e2e
- [ ] Runs on PR and push to main

#### Acceptance Criteria

1. CI runs on every PR
2. All checks must pass to merge
3. < 10 min total runtime

---

### PRD-52: Vercel Deployment

**Dependencies**: PRD-51

#### Objective

Deploy to Vercel with preview and production.

#### Deliverables

- [ ] Vercel project configured
- [ ] Preview deploys on PR
- [ ] Production deploy on main
- [ ] Environment variables (if any)

#### Acceptance Criteria

1. Preview URL works on PR
2. Production URL accessible
3. All pages work in production
4. E2E tests pass against production

---

## Dependency Graph

```
PRD-1 (Monorepo Root)
├── PRD-2 (TS Configs)
│   ├── PRD-23 (Data Types) → PRD-24 (Generation) → PRD-25 (Filters) → PRD-26 (Exports)
│   └── PRD-6 (Theme Tokens) → PRD-7 (Fonts)
├── PRD-3 (Vitest)
├── PRD-4 (Playwright)
└── PRD-5 (Oxfmt/Oxlint/Lefthook)

PRD-6 (Theme)
└── PRD-8 (UI Setup)
    ├── PRD-9 (Button)
    ├── PRD-10 (Input)
    ├── PRD-11 (Select) → PRD-17 (MultiSelect)
    ├── PRD-12 (Checkbox)
    ├── PRD-13 (Badge)
    ├── PRD-14 (Card)
    ├── PRD-15 (Dialog)
    ├── PRD-16 (Slider)
    └── PRD-18 (Base Chart) → PRD-19 (Bar) → PRD-20 (Line) → PRD-21 (Donut) → PRD-22 (Exports)

PRD-6 + PRD-8
└── PRD-27 (Astro Init) → PRD-28 (Layout) → PRD-29 (Header/Footer)
    ├── PRD-30 (Landing)
    ├── PRD-31 (About)
    ├── PRD-32 (Insights Shell) → PRD-33/34/35/36 (Charts)
    └── PRD-38 (Companies Shell)

PRD-24 + PRD-27
└── PRD-37 (API)

PRD-14 + PRD-23
└── PRD-39 (Company Card) → PRD-40 (Virtual List)

PRD-37 + PRD-40
└── PRD-41 (Explorer Core) → PRD-42 (Filter Panel)
    ├── PRD-43 (Text Search)
    ├── PRD-44 (Multi-Selects)
    └── PRD-45 (Single/Range) → PRD-46 (URL State)

PRD-46
└── PRD-47 (E2E Tests) → PRD-48/49/50 (Polish) → PRD-51 (CI) → PRD-52 (Deploy)
```

---

## Execution Tracks (Parallelizable)

**Track A: Foundation**
PRD-1 → PRD-2 → PRD-3 → PRD-4 → PRD-5

**Track B: Styles + UI** (after PRD-2)
PRD-6 → PRD-7 → PRD-8 → PRD-9..17 → PRD-18..22

**Track C: Data** (after PRD-2)
PRD-23 → PRD-24 → PRD-25 → PRD-26

**Track D: Astro** (after Track B partial)
PRD-27 → PRD-28 → PRD-29 → PRD-30..32

**Track E: Company Explorer** (after Track B, C, D)
PRD-37 → PRD-38..41 → PRD-42..46

**Track F: Finalization** (after Track E)
PRD-47 → PRD-48..50 → PRD-51 → PRD-52
