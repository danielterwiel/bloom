/** @jsxImportSource react */
import * as React from "react";
import type { CompanyFilters } from "@repo/data";

export interface FilterPanelProps {
  filters: CompanyFilters;
  onFiltersChange: (filters: CompanyFilters) => void;
  resultsCount: number;
  totalCount: number;
  className?: string;
}

/**
 * FilterPanel - Container component for all filter controls
 *
 * Provides a grid/flex layout for filter controls with:
 * - Results count display
 * - Clear all button
 * - Slots for individual filter components (to be added in PRDs 43-45)
 */
export function FilterPanel({
  filters,
  onFiltersChange,
  resultsCount,
  totalCount,
  className = "",
}: FilterPanelProps) {
  const hasActiveFilters = React.useMemo(() => {
    return (
      (filters.text && filters.text.trim().length > 0) ||
      (filters.categories && filters.categories.length > 0) ||
      (filters.specialties && filters.specialties.length > 0) ||
      (filters.employees && filters.employees.length > 0) ||
      (filters.businessTypes && filters.businessTypes.length > 0) ||
      (filters.revenues && filters.revenues.length > 0) ||
      (filters.countries && filters.countries.length > 0) ||
      (filters.certifications && filters.certifications.length > 0) ||
      filters.foundedMin !== undefined ||
      filters.foundedMax !== undefined
    );
  }, [filters]);

  const handleClearAll = React.useCallback(() => {
    onFiltersChange({});
  }, [onFiltersChange]);

  return (
    <div className={`rounded-card bg-background p-card shadow-card ${className}`}>
      {/* Header with results count and clear button */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="text-sm text-foreground-muted">
          Showing{" "}
          <span className="font-medium text-foreground">{resultsCount.toLocaleString()}</span>
          {resultsCount !== totalCount && (
            <>
              {" "}
              of <span className="font-medium text-foreground">{totalCount.toLocaleString()}</span>
            </>
          )}{" "}
          companies
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-foreground-muted transition-colors hover:bg-muted hover:text-foreground"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear all
          </button>
        )}
      </div>

      {/* Filter controls grid - placeholders for filter components (PRDs 43-45) */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Text search filter slot (PRD-43) */}
        <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
          <div
            className="h-10 rounded-md border border-dashed border-border bg-muted/30"
            data-slot="text-search"
          />
        </div>

        {/* Multi-select filter slots (PRD-44) */}
        <div
          className="h-10 rounded-md border border-dashed border-border bg-muted/30"
          data-slot="category-filter"
        />
        <div
          className="h-10 rounded-md border border-dashed border-border bg-muted/30"
          data-slot="specialty-filter"
        />
        <div
          className="h-10 rounded-md border border-dashed border-border bg-muted/30"
          data-slot="certifications-filter"
        />
        <div
          className="h-10 rounded-md border border-dashed border-border bg-muted/30"
          data-slot="country-filter"
        />

        {/* Single-select and range filter slots (PRD-45) */}
        <div
          className="h-10 rounded-md border border-dashed border-border bg-muted/30"
          data-slot="employees-filter"
        />
        <div
          className="h-10 rounded-md border border-dashed border-border bg-muted/30"
          data-slot="business-type-filter"
        />
        <div
          className="h-10 rounded-md border border-dashed border-border bg-muted/30"
          data-slot="revenue-filter"
        />
        <div
          className="h-10 rounded-md border border-dashed border-border bg-muted/30"
          data-slot="founded-year-filter"
        />
      </div>
    </div>
  );
}

FilterPanel.displayName = "FilterPanel";
