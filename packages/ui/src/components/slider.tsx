import * as React from "react";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import { cn } from "../lib/utils";

export interface SliderProps {
  /** The controlled value (number for single, [number, number] for range) */
  value?: number | readonly [number, number];
  /** The default value (number for single, [number, number] for range) */
  defaultValue?: number | readonly [number, number];
  /** Callback when the value changes */
  onValueChange?: (
    value: number | readonly [number, number],
    details: { activeThumbIndex: number },
  ) => void;
  /** Callback when the value is committed (on pointerup) */
  onValueCommitted?: (value: number | readonly [number, number]) => void;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step increment for the slider */
  step?: number;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** The name attribute for form submission */
  name?: string;
  /** The component orientation */
  orientation?: "horizontal" | "vertical";
  /** Additional className for the root element */
  className?: string;
  /** aria-label for accessibility (single thumb) */
  "aria-label"?: string;
  /** aria-label getter for range sliders */
  getAriaLabel?: (index: number) => string;
  /** aria-valuetext getter for screen readers */
  getAriaValueText?: (formattedValue: string, value: number, index: number) => string;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      onValueCommitted,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      name,
      orientation = "horizontal",
      className,
      "aria-label": ariaLabel,
      getAriaLabel,
      getAriaValueText,
    },
    ref,
  ) => {
    // Determine if this is a range slider
    const isRange = Array.isArray(value) || Array.isArray(defaultValue);
    const isHorizontal = orientation === "horizontal";

    return (
      <BaseSlider.Root
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        onValueCommitted={onValueCommitted}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        name={name}
        orientation={orientation}
        className={cn(
          "relative flex touch-none select-none",
          isHorizontal ? "w-full items-center" : "h-full flex-col items-center",
          disabled && "opacity-50",
          className,
        )}
      >
        <BaseSlider.Control
          className={cn(
            "relative flex items-center justify-center",
            isHorizontal ? "h-5 w-full" : "w-5 h-full",
          )}
        >
          <BaseSlider.Track
            className={cn(
              "relative rounded-full bg-muted",
              isHorizontal ? "h-2 w-full" : "w-2 h-full",
            )}
          >
            <BaseSlider.Indicator
              className={cn("absolute rounded-full bg-primary", isHorizontal ? "h-full" : "w-full")}
            />
            {isRange ? (
              <>
                <BaseSlider.Thumb
                  index={0}
                  aria-label={ariaLabel}
                  getAriaLabel={getAriaLabel}
                  getAriaValueText={getAriaValueText}
                  className={cn(
                    "block h-5 w-5 rounded-full border-2 border-primary bg-muted shadow-md transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
                    "disabled:pointer-events-none",
                    "data-[dragging]:cursor-grabbing cursor-grab",
                  )}
                />
                <BaseSlider.Thumb
                  index={1}
                  aria-label={ariaLabel}
                  getAriaLabel={getAriaLabel}
                  getAriaValueText={getAriaValueText}
                  className={cn(
                    "block h-5 w-5 rounded-full border-2 border-primary bg-muted shadow-md transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
                    "disabled:pointer-events-none",
                    "data-[dragging]:cursor-grabbing cursor-grab",
                  )}
                />
              </>
            ) : (
              <BaseSlider.Thumb
                aria-label={ariaLabel}
                getAriaLabel={getAriaLabel}
                getAriaValueText={getAriaValueText}
                className={cn(
                  "block h-5 w-5 rounded-full border-2 border-primary bg-muted shadow-md transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
                  "disabled:pointer-events-none",
                  "data-[dragging]:cursor-grabbing cursor-grab",
                )}
              />
            )}
          </BaseSlider.Track>
        </BaseSlider.Control>
      </BaseSlider.Root>
    );
  },
);

Slider.displayName = "Slider";

export { Slider };
