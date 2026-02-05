import * as React from "react";
import type { CompanyFilters } from "@repo/data";
import { serializeFilters, deserializeFilters } from "@repo/data";

/**
 * Hook that syncs CompanyFilters state with URL search params.
 *
 * - Reads initial state from URL on mount
 * - Updates URL when filters change (pushState)
 * - Responds to browser back/forward (popstate)
 */
export function useFilterUrlSync(): [CompanyFilters, (filters: CompanyFilters) => void] {
  // Initialize from current URL
  const [filters, setFiltersState] = React.useState<CompanyFilters>(() => {
    if (typeof window === "undefined") return {};
    return deserializeFilters(window.location.search.slice(1));
  });

  // Track whether we're handling a popstate to avoid pushing a redundant history entry
  const isPopstateRef = React.useRef(false);

  // Update URL when filters change
  React.useEffect(() => {
    if (isPopstateRef.current) {
      isPopstateRef.current = false;
      return;
    }

    const serialized = serializeFilters(filters);
    const newUrl = serialized
      ? `${window.location.pathname}?${serialized}`
      : window.location.pathname;

    // Only push if URL actually changed
    if (newUrl !== `${window.location.pathname}${window.location.search}`) {
      window.history.pushState(null, "", newUrl);
    }
  }, [filters]);

  // Listen for browser back/forward
  React.useEffect(() => {
    function handlePopstate() {
      isPopstateRef.current = true;
      setFiltersState(deserializeFilters(window.location.search.slice(1)));
    }

    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, []);

  return [filters, setFiltersState];
}
