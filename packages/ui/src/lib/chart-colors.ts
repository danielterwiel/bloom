/**
 * Shared chart color constants.
 *
 * Canvas-based charts cannot reference CSS custom properties (e.g. var(--color-chart-1)),
 * so we duplicate the oklch values from the @theme block in packages/styles/src/base.css.
 *
 * If theme colors change, update both base.css AND this file.
 */
export const CHART_COLORS = [
  "oklch(0.65 0.18 12)", // chart-1 (primary)
  "oklch(0.55 0.08 140)", // chart-2 (secondary)
  "oklch(0.6 0.15 45)", // chart-3 (accent)
  "oklch(0.7 0.12 320)", // chart-4
  "oklch(0.65 0.1 280)", // chart-5
] as const;

/** Light text color for labels drawn on colored chart segments. Mirrors --color-primary-foreground. */
export const CHART_LABEL_COLOR = "oklch(0.98 0.01 12)";

/**
 * Adds alpha/opacity to an oklch color string.
 * Returns the original string unchanged for non-oklch formats.
 */
export function addAlphaToOklch(color: string, alpha: number): string {
  if (color.startsWith("oklch(")) {
    const base = color.slice(0, -1);
    return `${base} / ${alpha})`;
  }
  return color;
}
