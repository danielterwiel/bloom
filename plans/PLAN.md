# Turborepo Monorepo Setup Plan

## Project: Astro + React Prototype (Flower Theme)

A monorepo showcasing Astro with React islands for a flower industry company database. Content pages use Astro with View Transitions; the interactive company explorer uses React islands with advanced filtering.

---

## CONFIRMED DECISIONS

1. **UI Library**: BaseUI only — headless primitives with custom Tailwind styling (no shadcn hybrid)

2. **Architecture**: Single Astro app with React islands (not two separate apps)
   - Simpler deployment, better performance
   - React islands hydrate only interactive components
   - Shared components work everywhere

3. **TanStack Router**: Used for client-side state management in React islands (URL-synced filters)

4. **Package manager**: Bun (fast, all-in-one toolkit)

5. **Runtime**: Bun (primary), Node 20+ for Playwright

6. **Oxc tools**: `oxlint` for linting, `oxfmt` for formatting

7. **Data**: 1000 flower industry company records loaded via API endpoint (not bundled statically)

8. **Charts**: uplot-react shared component in `packages/ui` — same component for Astro islands and companies page

9. **View Transitions**: Within Astro pages only (works out of the box)

10. **Tailwind v4**: Semantic design tokens with `@theme` (`--color-primary`, `--spacing-content`, etc.)

11. **Dark mode**: No — light mode only with flower theme

---

## Repository Structure

```
astro-react-proto/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions for CI
├── apps/
│   └── web/                       # Single Astro app with React islands
│       ├── src/
│       │   ├── components/
│       │   │   ├── astro/         # Astro components
│       │   │   └── react/         # React islands
│       │   │       ├── CompanyExplorer.tsx    # Main filtering UI
│       │   │       ├── CompanyCard.tsx
│       │   │       ├── FilterPanel.tsx
│       │   │       └── VirtualList.tsx
│       │   ├── layouts/
│       │   │   └── BaseLayout.astro
│       │   ├── pages/
│       │   │   ├── index.astro        # Landing page
│       │   │   ├── about.astro        # Content-heavy page
│       │   │   ├── insights.astro     # Graphs/data visualization
│       │   │   ├── companies.astro    # Company explorer (React island)
│       │   │   └── api/
│       │   │       └── companies.ts   # API endpoint for company data
│       │   └── styles/
│       ├── astro.config.mjs
│       ├── package.json
│       └── tsconfig.json
├── packages/
│   ├── styles/                    # Shared Tailwind config + theme
│   │   ├── src/
│   │   │   ├── base.css           # Base styles + Tailwind + @theme tokens
│   │   │   └── fonts.css          # Font imports
│   │   ├── tailwind.config.ts     # Shared Tailwind preset
│   │   └── package.json
│   ├── ui/                        # BaseUI components + charts
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── button.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── checkbox.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── slider.tsx
│   │   │   │   └── multi-select.tsx
│   │   │   ├── charts/
│   │   │   │   ├── base-chart.tsx     # Shared uPlot wrapper
│   │   │   │   ├── bar-chart.tsx
│   │   │   │   ├── line-chart.tsx
│   │   │   │   └── donut-chart.tsx
│   │   │   └── index.ts
│   │   └── package.json
│   ├── data/                      # Company data + types
│   │   ├── src/
│   │   │   ├── companies.ts       # 1000 flower industry records
│   │   │   ├── types.ts           # TypeScript types
│   │   │   ├── filters.ts         # Filter utility functions
│   │   │   └── index.ts
│   │   └── package.json
│   └── tsconfig/                  # Shared TypeScript configs
│       ├── base.json
│       ├── react.json
│       └── package.json
├── tests/
│   ├── e2e/                       # Playwright tests
│   │   └── *.spec.ts
│   └── playwright.config.ts
├── vitest.workspace.ts            # Vitest monorepo config
├── lefthook.yml                   # Pre-commit hooks config
├── turbo.json                     # Turborepo config
├── package.json                   # Root package.json (workspaces)
└── tsconfig.json                  # Root TypeScript config
```

---

## Implementation Phases

### Phase 1: Foundation & Tooling

**Goal**: Working monorepo skeleton with all dev tooling functional.

#### 1.1 Initialize Monorepo

- [ ] Create root `package.json` with Bun workspaces
- [ ] Create `turbo.json` with build/dev/lint/test/e2e pipelines
- [ ] Create root `tsconfig.json`

#### 1.2 Setup Shared TypeScript Config Package

- [ ] Create `packages/tsconfig/` with base configs
- [ ] Export configs for: base, react, astro

#### 1.3 Setup Vitest (Unit Testing)

- [ ] Install vitest at root
- [ ] Create `vitest.workspace.ts` for monorepo
- [ ] Add sample test to verify setup works
- [ ] Add `test` script to turbo pipeline

#### 1.4 Setup Playwright (E2E Testing)

- [ ] Install playwright at root
- [ ] Create `playwright.config.ts`
- [ ] Create `tests/e2e/` directory structure
- [ ] Add placeholder e2e test
- [ ] Add `e2e` script to turbo pipeline
- [ ] Install browsers: `bunx playwright install`

#### 1.5 Setup Lefthook Pre-commit Hooks

- [ ] Install lefthook
- [ ] Configure `lefthook.yml` with:
  - `oxfmt` - format (staged files)
  - `oxlint` - linting (staged files)
  - `vitest run --changed` - unit tests (affected by changes)
  - `playwright test` - e2e tests (on pre-push hook)
- [ ] Create `.oxlintrc.json` config
- [ ] Install hook: `lefthook install`

#### 1.6 Verify Full Pipeline

- [ ] `bun install` works
- [ ] `bun test` runs vitest
- [ ] `bun run e2e` runs playwright
- [ ] `bun run lint` runs oxlint
- [ ] `bun run format` runs oxfmt
- [ ] `lefthook run pre-commit` passes
- [ ] `lefthook run pre-push` passes

**Exit criteria**: All tooling functional, CI-ready pipeline.

---

### Phase 2: Shared Packages

**Goal**: Styles, UI components, and data package ready for consumption.

#### 2.1 Styles Package (`packages/styles`)

- [ ] Create Tailwind v4 configuration with `@theme` block
- [ ] Define semantic design tokens:

  ```css
  @theme {
    /* Semantic colors */
    --color-primary: oklch(0.65 0.18 12); /* Rose */
    --color-secondary: oklch(0.55 0.08 140); /* Sage */
    --color-accent: oklch(0.6 0.15 45); /* Terracotta */
    --color-surface: oklch(0.98 0.01 90); /* Cream */
    --color-muted: oklch(0.92 0.02 90);
    --color-destructive: oklch(0.55 0.2 25);

    /* Text colors */
    --color-foreground: oklch(0.2 0.02 90);
    --color-foreground-muted: oklch(0.45 0.02 90);

    /* Spacing */
    --spacing-content: 1.5rem;
    --spacing-section: 4rem;
    --spacing-card: 1.25rem;

    /* Radius */
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-card: 1rem;

    /* Shadows */
    --shadow-card: 0 2px 8px oklch(0.2 0.02 90 / 0.08);
    --shadow-elevated: 0 8px 24px oklch(0.2 0.02 90 / 0.12);
  }
  ```

- [ ] Configure fonts: Playfair Display (headings), Inter (body)
- [ ] Export CSS and Tailwind preset for consumption

#### 2.2 UI Package (`packages/ui`)

- [ ] Install BaseUI (`@base-ui-components/react`)
- [ ] Install uplot-react
- [ ] Create components with BaseUI primitives + Tailwind:
  - [ ] Button (variants: default, outline, ghost, destructive)
  - [ ] Input
  - [ ] Select (with BaseUI Select primitive)
  - [ ] Checkbox
  - [ ] Badge
  - [ ] Card
  - [ ] Dialog/Modal
  - [ ] Slider (for range filters)
  - [ ] MultiSelect (for tags/categories)
- [ ] Create chart components (shared uPlot wrapper):
  - [ ] BaseChart (ref management, resize, cleanup)
  - [ ] BarChart
  - [ ] LineChart
  - [ ] DonutChart
- [ ] Use `class-variance-authority` for variants
- [ ] Use `tailwind-merge` for class merging
- [ ] Export all components
- [ ] **Unit tests for each component** (render, variants, interactions)

#### 2.3 Data Package (`packages/data`)

- [ ] Define `FlowerCompany` TypeScript interface:
  ```ts
  interface FlowerCompany {
    id: string;
    name: string;
    category: string; // "Nursery", "Florist", "Wholesale", "Delivery", "Events", "Botanical Garden", "Seed Company", "Equipment"
    specialty: string[]; // ["roses", "orchids", "succulents", "native plants", "wedding", "corporate"]
    founded: number; // year
    employees: string; // range: "1-10", "11-50", "51-200", etc.
    businessType: string; // "B2B", "B2C", "Both"
    annualRevenue: string; // range: "<500K", "500K-1M", "1-5M", "5-10M", "10M+"
    headquarters: string; // city
    country: string;
    certifications: string[]; // ["organic", "fair-trade", "sustainable", "local"]
    description: string;
    website: string;
    imageUrl: string; // placeholder URL
  }
  ```
- [ ] Generate 1000 diverse flower industry records with realistic distribution
- [ ] Create filter utility functions
- [ ] Export typed data and utilities
- [ ] **Unit tests for data generation, filters, and type validation**

**Exit criteria**: `bun run build` succeeds, `bun test` passes for all packages.

---

### Phase 3: Astro Application

**Goal**: All pages working with View Transitions, charts, and React islands.

#### 3.1 Initialize Astro App

- [ ] Create `apps/web/` with Astro
- [ ] Configure Vercel adapter
- [ ] Enable View Transitions
- [ ] Import shared styles package
- [ ] Configure Tailwind integration
- [ ] Configure React integration for islands

#### 3.2 Landing Page (`/`)

- [ ] Hero section with flower-themed design
- [ ] Value proposition for "Flower Industry Directory"
- [ ] CTA button linking to `/companies`
- [ ] Featured companies preview
- [ ] View Transition animations

#### 3.3 About Page (`/about`)

- [ ] Content-heavy page about the directory
- [ ] Flower-themed decorative elements
- [ ] Uses shared UI components (cards, etc.)

#### 3.4 Insights Page (`/insights`)

- [ ] Graphs showing company database statistics (React islands):
  - Category distribution (donut chart)
  - Business type distribution (bar chart)
  - Companies by founding year (line chart)
  - Geographic distribution (bar chart by country)
- [ ] Use shared chart components from `packages/ui`
- [ ] `client:visible` directive for lazy hydration

#### 3.5 Companies Page (`/companies`)

- [ ] React island: `CompanyExplorer` component
- [ ] Fetches data from `/api/companies` endpoint
- [ ] Advanced filtering (see Phase 4)
- [ ] `client:load` directive for immediate hydration

#### 3.6 API Endpoint (`/api/companies`)

- [ ] Returns company data as JSON
- [ ] Supports query params for server-side filtering (optional optimization)
- [ ] Caching headers for performance

#### 3.7 Shared Layout

- [ ] Header with navigation (Home, About, Insights, Companies)
- [ ] Footer with flower theme
- [ ] ViewTransitions component in head

#### 3.8 Testing

- [ ] **E2E tests**: All pages load correctly
- [ ] **E2E tests**: View Transitions animate between Astro pages
- [ ] **E2E tests**: Charts render on insights page
- [ ] **E2E tests**: Navigation works

**Exit criteria**: All pages render, View Transitions work, charts display.

---

### Phase 4: Company Explorer (React Island)

**Goal**: Interactive company filtering with URL state, virtualization.

#### 4.1 CompanyExplorer Component

- [ ] Fetch data from API on mount
- [ ] Display as virtualized card grid (TanStack Virtual)
- [ ] Loading and error states

#### 4.2 Advanced Filtering System

- [ ] Filter controls using shared UI components:
  - [ ] Text search (name, description) — debounced
  - [ ] Category multi-select
  - [ ] Specialty multi-select
  - [ ] Founding year range slider
  - [ ] Employee count select
  - [ ] Business type select (B2B/B2C/Both)
  - [ ] Revenue range select
  - [ ] Country filter
  - [ ] Certifications multi-select
- [ ] Filter state synced to URL (shareable links)
- [ ] Filter count badges
- [ ] Clear all filters button
- [ ] Results count display

#### 4.3 Performance

- [ ] Client-side filtering (data loaded once)
- [ ] Virtualization for 1000 records
- [ ] Memoized filter computations
- [ ] Debounced search input

#### 4.4 Testing

- [ ] **Unit tests**: Filter logic (all combinations)
- [ ] **Unit tests**: URL state serialization/deserialization
- [ ] **E2E tests**: All filters work correctly
- [ ] **E2E tests**: URL state persists on reload
- [ ] **E2E tests**: Virtualization renders correctly on scroll

**Exit criteria**: Company explorer fully functional, all filters work, URL state persists.

---

### Phase 5: Polish & Integration

**Goal**: Consistent theming, smooth experience, production-ready.

#### 5.1 Theme Consistency

- [ ] Verify flower theme applies correctly everywhere
- [ ] Consistent spacing, typography, colors
- [ ] Charts match theme colors

#### 5.2 Performance Audit

- [ ] Lighthouse scores > 90
- [ ] Core Web Vitals passing
- [ ] Bundle size audit

#### 5.3 Accessibility

- [ ] Keyboard navigation works
- [ ] Screen reader testing
- [ ] Color contrast compliance

#### 5.4 Testing

- [ ] **E2E tests**: Full user journey (land → explore → filter → insights → back)
- [ ] **E2E tests**: Performance budget (LCP < 2.5s)

**Exit criteria**: Production-ready, all tests pass, performance targets met.

---

### Phase 6: Deployment

**Goal**: Deployed on Vercel, CI/CD functional.

#### 6.1 Vercel Configuration

- [ ] Configure for Astro with Vercel adapter
- [ ] Single deployment (no rewrites needed)
- [ ] Environment variables if needed

#### 6.2 CI/CD Pipeline

- [ ] GitHub Actions workflow:
  - Lint (oxlint)
  - Format check (oxfmt)
  - Unit tests (vitest)
  - E2E tests (playwright)
  - Build
- [ ] Deploy preview on PR
- [ ] Deploy production on main merge

#### 6.3 Production Testing

- [ ] Deploy to Vercel preview
- [ ] Run E2E tests against preview URL
- [ ] Verify all pages work
- [ ] Test on mobile devices

**Exit criteria**: Production URL accessible, CI passes, everything works.

---

## Tech Stack Summary

| Layer         | Technology                         |
| ------------- | ---------------------------------- |
| Monorepo      | Turborepo + Bun                    |
| Formatting    | oxfmt                              |
| Linting       | oxlint                             |
| Pre-commit    | Lefthook                           |
| Framework     | Astro 5.x with React islands       |
| Styling       | Tailwind CSS v4 with @theme tokens |
| UI Primitives | BaseUI                             |
| Charts        | uPlot via uplot-react              |
| Virtual List  | TanStack Virtual                   |
| Unit Testing  | Vitest                             |
| E2E Testing   | Playwright                         |
| Deployment    | Vercel                             |

---

## Flower Theme Specification

### Semantic Design Tokens

```css
@theme {
  /* Primary: Rose tones */
  --color-primary: oklch(0.65 0.18 12);
  --color-primary-hover: oklch(0.58 0.2 12);
  --color-primary-foreground: oklch(0.98 0.01 12);

  /* Secondary: Sage green */
  --color-secondary: oklch(0.55 0.08 140);
  --color-secondary-hover: oklch(0.48 0.1 140);
  --color-secondary-foreground: oklch(0.98 0.01 140);

  /* Accent: Terracotta */
  --color-accent: oklch(0.6 0.15 45);
  --color-accent-hover: oklch(0.53 0.17 45);

  /* Surfaces */
  --color-background: oklch(0.99 0.005 90); /* Off-white */
  --color-surface: oklch(0.98 0.01 90); /* Cream */
  --color-muted: oklch(0.94 0.015 90);
  --color-border: oklch(0.88 0.02 90);

  /* Text */
  --color-foreground: oklch(0.2 0.02 90);
  --color-foreground-muted: oklch(0.45 0.02 90);

  /* Semantic */
  --color-destructive: oklch(0.55 0.22 25);
  --color-success: oklch(0.55 0.15 145);

  /* Chart colors */
  --color-chart-1: oklch(0.65 0.18 12); /* Rose */
  --color-chart-2: oklch(0.55 0.08 140); /* Sage */
  --color-chart-3: oklch(0.6 0.15 45); /* Terracotta */
  --color-chart-4: oklch(0.7 0.12 320); /* Peony */
  --color-chart-5: oklch(0.65 0.1 280); /* Lavender */
}
```

### Typography

- Headings: `Playfair Display` (serif, elegant)
- Body: `Inter` (clean, readable)

### Design Notes

- Soft rounded corners (--radius-md: 0.5rem, --radius-lg: 0.75rem)
- Subtle shadows with warm undertones
- Organic, botanical aesthetic
- Light mode only — refined, not flashy

---

## Flower Company Data Fields

| Field          | Type     | Example Values                                                                                           |
| -------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| id             | string   | "fc_001"                                                                                                 |
| name           | string   | "Bloom & Petal Nursery"                                                                                  |
| category       | string   | "Nursery", "Florist", "Wholesale", "Delivery", "Events", "Botanical Garden", "Seed Company", "Equipment" |
| specialty      | string[] | ["roses", "orchids", "succulents", "native plants", "wedding", "corporate", "seasonal"]                  |
| founded        | number   | 1990-2024                                                                                                |
| employees      | string   | "1-10", "11-50", "51-200", "201-500", "500+"                                                             |
| businessType   | string   | "B2B", "B2C", "Both"                                                                                     |
| annualRevenue  | string   | "<500K", "500K-1M", "1-5M", "5-10M", "10M+"                                                              |
| headquarters   | string   | "Portland", "Amsterdam", "Tokyo", etc.                                                                   |
| country        | string   | "USA", "Netherlands", "Japan", "Colombia", etc.                                                          |
| certifications | string[] | ["organic", "fair-trade", "sustainable", "local", "veriflora"]                                           |
| description    | string   | 2-3 sentence company description                                                                         |
| website        | string   | "https://example.com"                                                                                    |
| imageUrl       | string   | placeholder service URL                                                                                  |

---

## Risk Mitigation

| Risk                    | Mitigation                                              |
| ----------------------- | ------------------------------------------------------- |
| BaseUI learning curve   | Start with simple components, unit test each            |
| uPlot imperative API    | Wrap in reusable React component with proper cleanup    |
| 1000 records rendering  | TanStack Virtual handles this; test on low-end devices  |
| Astro + React hydration | Use appropriate client directives; test SSR + hydration |
| Tailwind v4 @theme      | New syntax; follow official docs closely                |

---

## Next Steps

Ready to implement:

1. **Phase 1**: Foundation & Tooling
2. **Phase 2**: Shared Packages
3. **Phase 3**: Astro Application
4. **Phase 4**: Company Explorer
5. **Phase 5**: Polish & Integration
6. **Phase 6**: Deployment

**Testing Philosophy**: No phase is complete until its tests pass. Lefthook blocks commits that fail tests.
