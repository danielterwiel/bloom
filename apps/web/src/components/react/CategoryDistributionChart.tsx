import { useMemo } from "react";
import { DonutChart, type DonutChartSegment } from "@repo/ui";
import { companies, CATEGORIES } from "@repo/data";

/**
 * React island component that displays category distribution as a donut chart.
 * Uses client:visible directive for lazy hydration when scrolled into view.
 */
export function CategoryDistributionChart() {
  // Aggregate category counts from company data
  const segments: DonutChartSegment[] = useMemo(() => {
    // Count companies per category
    const categoryCounts = new Map<string, number>();
    for (const category of CATEGORIES) {
      categoryCounts.set(category, 0);
    }

    for (const company of companies) {
      const count = categoryCounts.get(company.category) ?? 0;
      categoryCounts.set(company.category, count + 1);
    }

    // Convert to segments, sorted by count descending
    return Array.from(categoryCounts.entries())
      .filter(([, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([label, value]) => ({ label, value }));
  }, []);

  return (
    <DonutChart
      segments={segments}
      showLegend={true}
      showPercentages={true}
      innerRadius={0.6}
      className="h-64"
    />
  );
}

CategoryDistributionChart.displayName = "CategoryDistributionChart";
