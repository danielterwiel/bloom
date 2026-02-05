/** @jsxImportSource react */
import * as React from "react";
import type { FlowerCompany } from "@repo/data";
import { Badge, cn } from "@repo/ui";

export interface CompanyCardProps {
  company: FlowerCompany;
  className?: string;
}

/**
 * CompanyCard displays a single flower company's information.
 * Memoized for efficient use in virtualized lists.
 */
export const CompanyCard = React.memo<CompanyCardProps>(function CompanyCard({
  company,
  className,
}) {
  const location = company.headquarters
    ? `${company.headquarters}, ${company.country}`
    : company.country;

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/30",
        className,
      )}
    >
      {/* Top row: Name + Category */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold leading-tight text-foreground">{company.name}</h3>
        <Badge variant="default" className="shrink-0 p-1.5">
          {company.category}
        </Badge>
      </div>

      {/* Metadata row */}
      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-foreground-muted">
        <span className="inline-flex items-center gap-1">
          <svg
            className="h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          {location}
        </span>
        <span className="opacity-40">·</span>
        <span>{company.employees} employees</span>
        <span className="opacity-40">·</span>
        <span>Est. {company.founded}</span>
        <span className="opacity-40">·</span>
        <span>{company.businessType}</span>
      </div>

      {/* Specialty badges */}
      {company.specialty.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {company.specialty.slice(0, 4).map((spec) => (
            <Badge key={spec} variant="outline" className="text-[11px] px-1 py-0.5">
              {spec}
            </Badge>
          ))}
          {company.specialty.length > 4 && (
            <span className="inline-flex items-center text-[11px] text-foreground-muted">
              +{company.specialty.length - 4} more
            </span>
          )}
        </div>
      )}
    </div>
  );
});

CompanyCard.displayName = "CompanyCard";
