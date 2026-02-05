import { useMemo } from "react";
import uPlot from "uplot";
import { BaseChart } from "./base-chart";
import { cn } from "../lib/utils";
import { CHART_COLORS, addAlphaToOklch } from "../lib/chart-colors";

export interface LineChartDataPoint {
  /** X-axis value (typically a timestamp or number) */
  x: number;
  /** Y-axis value */
  y: number;
}

export interface LineChartSeries {
  /** Name of the series (for legend) */
  name: string;
  /** Data points for this series */
  data: LineChartDataPoint[];
  /** Optional color override (uses theme chart colors by default) */
  color?: string;
  /** Line width in pixels (default: 2) */
  width?: number;
  /** Show points on the line (default: false) */
  showPoints?: boolean;
  /** Fill area under the line (default: false) */
  fill?: boolean;
  /** Fill opacity when fill is true (0-1, default: 0.1) */
  fillOpacity?: number;
}

export interface LineChartProps {
  /** Chart data as array of series */
  series: LineChartSeries[];
  /** Additional CSS class names for the container */
  className?: string;
  /** Show legend */
  showLegend?: boolean;
  /** Chart title */
  title?: string;
  /** Format x-axis values as time (default: false) */
  timeScale?: boolean;
}

/**
 * LineChart component for displaying time-series or continuous data.
 * Uses theme colors (chart-1 through chart-5) by default.
 * Supports multiple series, area fills, and point markers.
 */
export function LineChart({
  series,
  className,
  showLegend = true,
  title,
  timeScale = false,
}: LineChartProps) {
  // Transform series data to uPlot format
  const { options, data } = useMemo(() => {
    if (series.length === 0) {
      return {
        options: {} as Omit<uPlot.Options, "width" | "height">,
        data: [[]] as uPlot.AlignedData,
      };
    }

    // Collect all unique x values and sort them
    const allXValues = new Set<number>();
    for (const s of series) {
      for (const point of s.data) {
        allXValues.add(point.x);
      }
    }
    const xValues = Array.from(allXValues).sort((a, b) => a - b);

    // Create a map from x value to index for fast lookup
    const xToIndex = new Map<number, number>();
    xValues.forEach((x, i) => xToIndex.set(x, i));

    // Y values for each series, aligned to x values (null for missing points)
    const yValues = series.map((s) => {
      const yArray = new Array(xValues.length).fill(null) as (number | null)[];
      for (const point of s.data) {
        const idx = xToIndex.get(point.x);
        if (idx !== undefined) {
          yArray[idx] = point.y;
        }
      }
      return yArray;
    });

    // Collect colors
    const seriesColors = series.map(
      (s, i) => s.color ?? CHART_COLORS[i % CHART_COLORS.length] ?? CHART_COLORS[0],
    );

    // Build uPlot series config
    const uplotSeries: uPlot.Series[] = [
      {
        // x-axis series
        label: "x",
      },
      ...series.map((s, i) => {
        const color = seriesColors[i] as string;
        const seriesConfig: uPlot.Series = {
          label: s.name,
          stroke: color,
          width: s.width ?? 2,
          points: {
            show: s.showPoints ?? false,
            size: 6,
            fill: color,
          },
        };

        // Add fill if requested
        if (s.fill) {
          const opacity = s.fillOpacity ?? 0.1;
          seriesConfig.fill = addAlphaToOklch(color, opacity);
        }

        return seriesConfig;
      }),
    ];

    // Build uPlot options
    const uplotOptions: Omit<uPlot.Options, "width" | "height"> = {
      title,
      series: uplotSeries,
      scales: {
        x: {
          time: timeScale,
        },
        y: {
          auto: true,
        },
      },
      axes: [
        {
          // X-axis
          gap: 5,
        },
        {
          // Y-axis
          gap: 5,
        },
      ],
      legend: {
        show: showLegend,
      },
      cursor: {
        show: true,
        sync: {
          key: "line-chart",
        },
      },
    };

    const uplotData: uPlot.AlignedData = [xValues, ...yValues];

    return { options: uplotOptions, data: uplotData };
  }, [series, showLegend, title, timeScale]);

  if (series.length === 0) {
    return (
      <div
        className={cn("flex items-center justify-center text-foreground-muted", className)}
        data-testid="line-chart-empty"
      >
        No data available
      </div>
    );
  }

  return <BaseChart options={options} data={data} className={cn("line-chart", className)} />;
}

LineChart.displayName = "LineChart";
