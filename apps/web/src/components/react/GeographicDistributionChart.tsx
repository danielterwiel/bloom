/** @jsxImportSource react */
import { useMemo } from "react";
import { BarChart, type BarChartSeries } from "@repo/ui";
import { companies } from "@repo/data";

/**
 * React island component that displays geographic distribution as a bar chart.
 * Shows top countries by number of flower companies.
 * Uses client:visible directive for lazy hydration when scrolled into view.
 */
export function GeographicDistributionChart() {
  // Aggregate country counts from company data
  const series: BarChartSeries[] = useMemo(() => {
    // Count companies per country
    const countryCounts = new Map<string, number>();

    for (const company of companies) {
      const count = countryCounts.get(company.country) ?? 0;
      countryCounts.set(company.country, count + 1);
    }

    // Convert to array and sort by count descending
    const sortedCountries = Array.from(countryCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10); // Top 10 countries

    // Convert to bar chart data format
    const data = sortedCountries.map(([country, count]) => ({
      label: country,
      value: count,
    }));

    return [
      {
        name: "Companies",
        data,
      },
    ];
  }, []);

  return <BarChart series={series} showLegend={false} className="h-64" />;
}

GeographicDistributionChart.displayName = "GeographicDistributionChart";
