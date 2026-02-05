/** @jsxImportSource react */
import * as React from "react";
import { CATEGORIES, SPECIALTIES, CERTIFICATIONS, COUNTRIES } from "@repo/data";
import type { CompanyFilters } from "@repo/data";
import { Input, MultiSelect } from "@repo/ui";
import type { MultiSelectOption } from "@repo/ui";

export interface FilterPanelProps {
  filters: CompanyFilters;
  onFiltersChange: (filters: CompanyFilters) => void;
  resultsCount: number;
  totalCount: number;
  className?: string;
}

/**
 * Custom hook for debounced value
 * Returns a debounced version of the value that only updates after the delay
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

const categoryOptions: MultiSelectOption[] = CATEGORIES.map((c) => ({ value: c, label: c }));
const specialtyOptions: MultiSelectOption[] = SPECIALTIES.map((s) => ({ value: s, label: s }));
const certificationOptions: MultiSelectOption[] = CERTIFICATIONS.map((c) => ({
  value: c,
  label: c,
}));
const countryOptions: MultiSelectOption[] = COUNTRIES.map((c) => ({ value: c, label: c }));

/**
 * FilterPanel - Container component for all filter controls
 */
export function FilterPanel({
  filters,
  onFiltersChange,
  resultsCount,
  totalCount,
  className = "",
}: FilterPanelProps) {
  // Local state for the text input (updates immediately for responsive UX)
  const [searchText, setSearchText] = React.useState(filters.text ?? "");

  // Debounce the search text with 300ms delay
  const debouncedSearchText = useDebounce(searchText, 300);

  // Update filters when debounced value changes
  React.useEffect(() => {
    // Only update if the debounced value differs from current filter
    if (debouncedSearchText !== (filters.text ?? "")) {
      onFiltersChange({
        ...filters,
        text: debouncedSearchText || undefined,
      });
    }
  }, [debouncedSearchText, filters, onFiltersChange]);

  // Sync local state if filters.text is cleared externally (e.g., Clear All)
  React.useEffect(() => {
    if (!filters.text && searchText) {
      setSearchText("");
    }
  }, [filters.text, searchText]);

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
    setSearchText("");
    onFiltersChange({});
  }, [onFiltersChange]);

  const handleSearchChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  }, []);

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
        {/* Text search filter (PRD-43) */}
        <div className="relative sm:col-span-2 lg:col-span-3 xl:col-span-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-4 w-4 text-foreground-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <Input
            type="text"
            placeholder="Search companies by name or description..."
            value={searchText}
            onChange={handleSearchChange}
            className="pl-10"
            data-slot="text-search"
          />
        </div>

        {/* Multi-select filters (PRD-44) */}
        <MultiSelect
          options={categoryOptions}
          placeholder={`Category${filters.categories?.length ? ` (${filters.categories.length})` : ""}`}
          value={filters.categories ?? []}
          onValueChange={(values) =>
            onFiltersChange({ ...filters, categories: values.length > 0 ? values : undefined })
          }
        />
        <MultiSelect
          options={specialtyOptions}
          placeholder={`Specialty${filters.specialties?.length ? ` (${filters.specialties.length})` : ""}`}
          value={filters.specialties ?? []}
          onValueChange={(values) =>
            onFiltersChange({ ...filters, specialties: values.length > 0 ? values : undefined })
          }
        />
        <MultiSelect
          options={certificationOptions}
          placeholder={`Certifications${filters.certifications?.length ? ` (${filters.certifications.length})` : ""}`}
          value={filters.certifications ?? []}
          onValueChange={(values) =>
            onFiltersChange({ ...filters, certifications: values.length > 0 ? values : undefined })
          }
        />
        <MultiSelect
          options={countryOptions}
          placeholder={`Country${filters.countries?.length ? ` (${filters.countries.length})` : ""}`}
          value={filters.countries ?? []}
          onValueChange={(values) =>
            onFiltersChange({ ...filters, countries: values.length > 0 ? values : undefined })
          }
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
