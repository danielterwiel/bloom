// UI package barrel export

// Utilities
export { cn } from "./lib/utils";
export { CHART_COLORS, CHART_LABEL_COLOR, addAlphaToOklch } from "./lib/chart-colors";

// Components
export { Button, buttonVariants, type ButtonProps } from "./components/button";
export { Input, type InputProps } from "./components/input";
export { Select, type SelectProps, type SelectOption } from "./components/select";
export { Checkbox, type CheckboxProps } from "./components/checkbox";
export { Badge, badgeVariants, type BadgeProps } from "./components/badge";
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  type CardProps,
  type CardHeaderProps,
  type CardTitleProps,
  type CardDescriptionProps,
  type CardContentProps,
  type CardFooterProps,
} from "./components/card";
export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  type DialogProps,
  type DialogTriggerProps,
  type DialogPortalProps,
  type DialogBackdropProps,
  type DialogContentProps,
  type DialogHeaderProps,
  type DialogFooterProps,
  type DialogTitleProps,
  type DialogDescriptionProps,
  type DialogCloseProps,
} from "./components/dialog";
export { Slider, type SliderProps } from "./components/slider";
export {
  MultiSelect,
  type MultiSelectProps,
  type MultiSelectOption,
} from "./components/multi-select";

// Charts
export { BaseChart, type BaseChartProps } from "./charts/base-chart";
export {
  BarChart,
  type BarChartProps,
  type BarChartSeries,
  type BarChartDataPoint,
} from "./charts/bar-chart";
export {
  LineChart,
  type LineChartProps,
  type LineChartSeries,
  type LineChartDataPoint,
} from "./charts/line-chart";
export { DonutChart, type DonutChartProps, type DonutChartSegment } from "./charts/donut-chart";
