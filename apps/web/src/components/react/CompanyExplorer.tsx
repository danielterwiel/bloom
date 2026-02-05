/** @jsxImportSource react */
/**
 * CompanyExplorer - Main React island for the companies page
 *
 * This is a placeholder component that will be expanded in PRD-41
 * to include data fetching, loading states, and the virtual list.
 */

export function CompanyExplorer() {
  return (
    <div className="rounded-card bg-background p-card shadow-card">
      <div className="text-center py-12">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <svg
            className="h-6 w-6 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h3 className="font-heading text-lg font-semibold text-foreground">Company Explorer</h3>
        <p className="mt-2 text-sm text-foreground-muted">Loading company directory...</p>
      </div>
    </div>
  );
}
