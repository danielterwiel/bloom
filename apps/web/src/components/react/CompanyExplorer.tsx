/** @jsxImportSource react */
import * as React from "react";
import type { FlowerCompany, CompanyFilters } from "@repo/data";
import { applyAllFilters } from "@repo/data";
import { VirtualList } from "./VirtualList";
import { FilterPanel } from "./FilterPanel";

interface ApiResponse {
  data: FlowerCompany[];
  total: number;
}

type FetchState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: FlowerCompany[]; total: number };

/**
 * CompanyExplorer - Main React island for the companies page
 *
 * Fetches company data from /api/companies and displays it
 * in a virtualized list for efficient rendering of 1000+ items.
 */
export function CompanyExplorer() {
  const [state, setState] = React.useState<FetchState>({ status: "loading" });
  const [filters, setFilters] = React.useState<CompanyFilters>({});

  // Apply filters to get filtered data
  const filteredData = React.useMemo(() => {
    if (state.status !== "success") return [];
    return applyAllFilters(state.data, filters);
  }, [state, filters]);

  const fetchCompanies = React.useCallback(async () => {
    setState({ status: "loading" });

    try {
      const response = await fetch("/api/companies");

      if (!response.ok) {
        throw new Error(`Failed to fetch companies: ${response.status} ${response.statusText}`);
      }

      const json = (await response.json()) as ApiResponse;
      setState({ status: "success", data: json.data, total: json.total });
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      setState({ status: "error", message });
    }
  }, []);

  React.useEffect(() => {
    void fetchCompanies();
  }, [fetchCompanies]);

  if (state.status === "loading") {
    return (
      <div className="rounded-card bg-background p-card shadow-card">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-foreground-muted">Loading companies...</p>
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="rounded-card bg-background p-card shadow-card">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <svg
              className="h-6 w-6 text-destructive"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h3 className="font-heading text-lg font-semibold text-foreground">
            Failed to Load Companies
          </h3>
          <p className="mt-2 text-sm text-foreground-muted">{state.message}</p>
          <button
            onClick={() => void fetchCompanies()}
            className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <FilterPanel
        filters={filters}
        onFiltersChange={setFilters}
        resultsCount={filteredData.length}
        totalCount={state.total}
      />
      <div className="rounded-card bg-background shadow-card overflow-hidden">
        <div style={{ height: "calc(100vh - 400px)", minHeight: "400px" }}>
          <VirtualList items={filteredData} />
        </div>
      </div>
    </div>
  );
}

CompanyExplorer.displayName = "CompanyExplorer";
