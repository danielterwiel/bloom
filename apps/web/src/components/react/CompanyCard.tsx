/** @jsxImportSource react */
import * as React from "react";
import type { FlowerCompany } from "@repo/data";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@repo/ui";

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
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{company.name}</CardTitle>
          <Badge variant="secondary" className="shrink-0">
            {company.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Specialty badges */}
        {company.specialty.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {company.specialty.slice(0, 3).map((spec) => (
              <Badge key={spec} variant="outline" className="text-xs">
                {spec}
              </Badge>
            ))}
            {company.specialty.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{company.specialty.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Company details */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <div className="text-foreground-muted">Location</div>
          <div className="truncate">{location}</div>

          <div className="text-foreground-muted">Employees</div>
          <div>{company.employees}</div>

          <div className="text-foreground-muted">Founded</div>
          <div>{company.founded}</div>

          <div className="text-foreground-muted">Type</div>
          <div>{company.businessType}</div>
        </div>
      </CardContent>
    </Card>
  );
});

CompanyCard.displayName = "CompanyCard";
