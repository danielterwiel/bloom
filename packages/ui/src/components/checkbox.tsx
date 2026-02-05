import * as React from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cn } from "../lib/utils";

export interface CheckboxProps {
  /** Whether the checkbox is checked (controlled) */
  checked?: boolean;
  /** The default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback when the checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Whether the checkbox is required */
  required?: boolean;
  /** The name attribute for form submission */
  name?: string;
  /** The value attribute for form submission */
  value?: string;
  /** Additional className for the checkbox root */
  className?: string;
  /** The id for the checkbox (useful for label association) */
  id?: string;
  /** aria-label for accessibility when no visible label is provided */
  "aria-label"?: string;
  /** aria-labelledby for accessibility */
  "aria-labelledby"?: string;
}

const CheckIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M2.5 6L5 8.5L9.5 3.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked,
      onCheckedChange,
      disabled,
      required,
      name,
      value,
      className,
      id,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
    },
    ref,
  ) => {
    return (
      <BaseCheckbox.Root
        ref={ref}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        required={required}
        name={name}
        value={value}
        id={id}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        className={cn(
          // Base styles
          "peer inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border transition-colors",
          // Unchecked state
          "border-border bg-background",
          // Checked state
          "data-[checked]:border-primary data-[checked]:bg-primary data-[checked]:text-primary-foreground",
          // Focus state
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        <BaseCheckbox.Indicator className="flex items-center justify-center">
          <CheckIcon />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
