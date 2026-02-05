import { useMemo } from "react";
import uPlot from "uplot";
import { BaseChart } from "./base-chart";
import { cn } from "../lib/utils";
import { CHART_COLORS } from "../lib/chart-colors";

export interface BarChartDataPoint {
  /** Label for the bar (x-axis category) */
  label: string;
  /** Value for the bar */
  value: number;
}

export interface BarChartSeries {
  /** Name of the series (for legend) */
  name: string;
  /** Data points for this series */
  data: BarChartDataPoint[];
  /** Optional color override (uses theme chart colors by default) */
  color?: string;
}

export interface BarChartProps {
  /** Chart data as array of series */
  series: BarChartSeries[];
  /** Additional CSS class names for the container */
  className?: string;
  /** Show legend */
  showLegend?: boolean;
  /** Chart title */
  title?: string;
  /** Bar width as fraction of available space (0-1) */
  barWidth?: number;
}

/**
 * Creates a bars drawing plugin for uPlot
 */
function barsPlugin(opts: { barWidth: number; colors: string[] }): uPlot.Plugin {
  const { barWidth, colors } = opts;

  return {
    hooks: {
      draw: (u: uPlot) => {
        const ctx = u.ctx;
        const { left, top, width, height } = u.bbox;

        // Get the number of data points (excluding x-axis at index 0)
        const seriesCount = u.series.length - 1;
        if (seriesCount === 0) return;

        const dataLen = u.data[0]?.length ?? 0;
        if (dataLen === 0) return;

        // Calculate bar dimensions
        const groupWidth = width / dataLen;
        const singleBarWidth = (groupWidth * barWidth) / seriesCount;
        const groupOffset = (groupWidth * (1 - barWidth)) / 2;

        // Draw bars for each series
        for (let si = 1; si <= seriesCount; si++) {
          const series = u.series[si];
          if (!series || series.show === false) continue;

          const data = u.data[si];
          if (!data) continue;

          const color = colors[(si - 1) % colors.length] ?? CHART_COLORS[0];
          ctx.fillStyle = color ?? CHART_COLORS[0];

          for (let i = 0; i < dataLen; i++) {
            const val = data[i];
            if (val === null || val === undefined) continue;

            // X position: center of group + offset for this series
            const x = left + i * groupWidth + groupOffset + (si - 1) * singleBarWidth;

            // Y position: convert value to pixel coordinate
            const yScale = u.scales["y"];
            if (
              !yScale ||
              yScale.min === null ||
              yScale.min === undefined ||
              yScale.max === null ||
              yScale.max === undefined
            )
              continue;

            const yMin = yScale.min;
            const yMax = yScale.max;
            const yRange = yMax - yMin;

            // Bar starts at 0 (or yMin if 0 is below yMin)
            const barBase = Math.max(0, yMin);
            const barTop = val;

            // Convert to pixels (y increases downward in canvas)
            const pxPerUnit = height / yRange;
            const baseY = top + height - (barBase - yMin) * pxPerUnit;
            const topY = top + height - (barTop - yMin) * pxPerUnit;

            const barHeight = baseY - topY;

            if (barHeight > 0) {
              ctx.fillRect(x, topY, singleBarWidth - 1, barHeight);
            }
          }
        }
      },
    },
  };
}

/**
 * BarChart component for displaying categorical data.
 * Uses theme colors (chart-1 through chart-5) by default.
 */
export function BarChart({
  series,
  className,
  showLegend = true,
  title,
  barWidth = 0.7,
}: BarChartProps) {
  // Transform series data to uPlot format
  const { options, data } = useMemo(() => {
    if (series.length === 0) {
      return {
        options: {} as Omit<uPlot.Options, "width" | "height">,
        data: [[]] as uPlot.AlignedData,
        colors: [],
      };
    }

    // Get all unique labels
    const allLabels = series[0]?.data.map((d) => d.label) ?? [];

    // X values are indices
    const xValues = allLabels.map((_, i) => i);

    // Y values for each series
    const yValues = series.map((s) => s.data.map((d) => d.value));

    // Collect colors
    const seriesColors = series.map(
      (s, i) => s.color ?? CHART_COLORS[i % CHART_COLORS.length] ?? CHART_COLORS[0],
    );

    // Build uPlot series config
    const uplotSeries: uPlot.Series[] = [
      {
        // x-axis series (required but not displayed as bars)
        label: "x",
      },
      ...series.map((s, i) => ({
        label: s.name,
        stroke: seriesColors[i],
        fill: seriesColors[i],
        // Hide the default line/points rendering
        paths: () => null,
        points: { show: false },
      })),
    ];

    // Build uPlot options
    const uplotOptions: Omit<uPlot.Options, "width" | "height"> = {
      title,
      series: uplotSeries,
      plugins: [barsPlugin({ barWidth, colors: seriesColors as string[] })],
      scales: {
        x: {
          time: false,
        },
        y: {
          auto: true,
          range: (_u, min, max) => {
            // Ensure y-axis starts at 0 for bar charts
            return [Math.min(0, min), max];
          },
        },
      },
      axes: [
        {
          // X-axis
          values: (_, ticks) => ticks.map((t) => allLabels[t] ?? ""),
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
        x: false,
        y: false,
      },
    };

    const uplotData: uPlot.AlignedData = [xValues, ...yValues];

    return { options: uplotOptions, data: uplotData, colors: seriesColors };
  }, [series, showLegend, title, barWidth]);

  if (series.length === 0) {
    return (
      <div
        className={cn("flex items-center justify-center text-foreground-muted", className)}
        data-testid="bar-chart-empty"
      >
        No data available
      </div>
    );
  }

  return <BaseChart options={options} data={data} className={cn("bar-chart", className)} />;
}

BarChart.displayName = "BarChart";
