import { useRef, useEffect, useCallback } from "react";
import { cn } from "../lib/utils";
import { CHART_COLORS, CHART_LABEL_COLOR } from "../lib/chart-colors";

export interface DonutChartSegment {
  /** Label for the segment */
  label: string;
  /** Value for the segment */
  value: number;
  /** Optional color override (uses theme chart colors by default) */
  color?: string;
}

export interface DonutChartProps {
  /** Chart data as array of segments */
  segments: DonutChartSegment[];
  /** Additional CSS class names for the container */
  className?: string;
  /** Show legend */
  showLegend?: boolean;
  /** Chart title */
  title?: string;
  /** Inner radius as fraction of outer radius (0-1, default: 0.6) */
  innerRadius?: number;
  /** Show labels on segments */
  showLabels?: boolean;
  /** Show percentages instead of values in labels */
  showPercentages?: boolean;
  /** Accessible description for the chart (used as aria-label on canvas) */
  "aria-label"?: string;
}

/**
 * DonutChart component for displaying proportional data.
 * Uses theme colors (chart-1 through chart-5) by default.
 * Renders as a donut (ring) chart with configurable inner radius.
 */
export function DonutChart({
  segments,
  className,
  showLegend = true,
  title,
  innerRadius = 0.6,
  showLabels = false,
  showPercentages = true,
  "aria-label": ariaLabel,
}: DonutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate total value
  const total = segments.reduce((sum, seg) => sum + seg.value, 0);

  // Get segment colors
  const segmentColors = segments.map(
    (seg, i) => seg.color ?? CHART_COLORS[i % CHART_COLORS.length] ?? CHART_COLORS[0],
  );

  // Draw function
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get container dimensions — skip if too small for meaningful rendering
    const rect = container.getBoundingClientRect();
    if (rect.width < 20 || rect.height < 20) return;

    const dpr = window.devicePixelRatio || 1;

    // Set canvas size with device pixel ratio for sharp rendering
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    if (segments.length === 0 || total === 0) return;

    // Calculate chart dimensions
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const outerRadius = Math.min(centerX, centerY) - 10;
    const innerRad = outerRadius * innerRadius;

    // Draw segments
    let currentAngle = -Math.PI / 2; // Start from top

    segments.forEach((segment, i) => {
      const sliceAngle = (segment.value / total) * 2 * Math.PI;
      const color = segmentColors[i] as string;

      // Draw arc
      ctx.beginPath();
      ctx.moveTo(
        centerX + innerRad * Math.cos(currentAngle),
        centerY + innerRad * Math.sin(currentAngle),
      );
      ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRad, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.fill();

      // Draw labels if enabled
      if (showLabels && sliceAngle > 0.1) {
        // Only show label if segment is large enough
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelRadius = (outerRadius + innerRad) / 2;
        const labelX = centerX + labelRadius * Math.cos(labelAngle);
        const labelY = centerY + labelRadius * Math.sin(labelAngle);

        ctx.fillStyle = CHART_LABEL_COLOR;
        ctx.font = "12px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const labelText = showPercentages
          ? `${Math.round((segment.value / total) * 100)}%`
          : segment.value.toString();

        ctx.fillText(labelText, labelX, labelY);
      }

      currentAngle += sliceAngle;
    });
  }, [segments, segmentColors, total, innerRadius, showLabels, showPercentages]);

  // Initial draw and resize handling
  useEffect(() => {
    draw();

    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      draw();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [draw]);

  if (segments.length === 0) {
    return (
      <div
        className={cn("flex items-center justify-center text-foreground-muted", className)}
        data-testid="donut-chart-empty"
      >
        No data available
      </div>
    );
  }

  return (
    <div className={cn("donut-chart flex flex-col", className)} data-testid="donut-chart">
      {title && (
        <div
          className="text-center font-semibold text-foreground mb-2"
          data-testid="donut-chart-title"
        >
          {title}
        </div>
      )}
      <div className="flex flex-1 items-center gap-4">
        <div ref={containerRef} className="relative flex-1 h-full">
          <canvas
            ref={canvasRef}
            className="absolute inset-0"
            data-testid="donut-chart-canvas"
            role="img"
            aria-label={ariaLabel ?? title ?? "Donut chart"}
          />
        </div>
        {showLegend && (
          <div className="flex flex-col gap-2" data-testid="donut-chart-legend">
            {segments.map((segment, i) => (
              <div key={segment.label} className="flex items-center gap-2 text-sm">
                <div
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: segmentColors[i] }}
                />
                <span className="text-foreground">{segment.label}</span>
                <span className="text-foreground-muted ml-auto">
                  {showPercentages
                    ? `${Math.round((segment.value / total) * 100)}%`
                    : segment.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

DonutChart.displayName = "DonutChart";
