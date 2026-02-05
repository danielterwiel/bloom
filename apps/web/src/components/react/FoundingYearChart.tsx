import { useMemo } from "react";
import { LineChart, type LineChartSeries } from "@repo/ui";
import { companies } from "@repo/data";

/**
 * React island component that displays companies by founding year as a line chart.
 * Uses client:visible directive for lazy hydration when scrolled into view.
 */
export function FoundingYearChart() {
  // Aggregate founding year counts from company data
  const series: LineChartSeries[] = useMemo(() => {
    // Count companies per founding year
    const yearCounts = new Map<number, number>();

    for (const company of companies) {
      const count = yearCounts.get(company.founded) ?? 0;
      yearCounts.set(company.founded, count + 1);
    }

    // Convert to line chart data format, sorted by year
    const data = Array.from(yearCounts.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([year, count]) => ({
        x: year,
        y: count,
      }));

    return [
      {
        name: "Companies Founded",
        data,
        fill: true,
        fillOpacity: 0.15,
      },
    ];
  }, []);

  return <LineChart series={series} showLegend={false} className="h-64" />;
}

FoundingYearChart.displayName = "FoundingYearChart";
