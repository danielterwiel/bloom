import * as React from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { cn } from "../lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  /** The options to display in the select dropdown */
  options: SelectOption[];
  /** Placeholder text when no value is selected */
  placeholder?: string;
  /** The controlled value */
  value?: string;
  /** The default value (uncontrolled) */
  defaultValue?: string;
  /** Callback when the value changes (value is null when cleared) */
  onValueChange?: (value: string | null) => void;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the select is required */
  required?: boolean;
  /** The name attribute for form submission */
  name?: string;
  /** Additional className for the trigger button */
  className?: string;
}

const ChevronIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M2.5 4.5L6 8L9.5 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function Select({
  options,
  placeholder = "Select an option",
  value,
  defaultValue,
  onValueChange,
  disabled,
  required,
  name,
  className,
}: SelectProps) {
  // Build items record for BaseUI to display labels properly
  const items = React.useMemo(() => {
    const record: Record<string, React.ReactNode> = {};
    for (const opt of options) {
      record[opt.value] = opt.label;
    }
    return record;
  }, [options]);

  return (
    <BaseSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      required={required}
      name={name}
      items={items}
    >
      <BaseSelect.Trigger
        className={cn(
          // Base styles matching Input component
          "flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm transition-colors",
          // Placeholder color
          "data-[placeholder]:text-foreground-muted",
          // Focus states
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Default border
          "border-border",
          className,
        )}
      >
        <BaseSelect.Value placeholder={placeholder} />
        <BaseSelect.Icon className="ml-2 flex-shrink-0 text-foreground-muted">
          <ChevronIcon />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Positioner className="z-50">
          <BaseSelect.Popup
            className={cn(
              "min-w-[var(--anchor-width)] overflow-hidden rounded-md border border-border bg-surface shadow-elevated",
              // Animation
              "origin-[var(--transform-origin)] transition-[transform,opacity] duration-150",
              "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
              "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            )}
          >
            <BaseSelect.List className="p-1">
              {options.map((option) => (
                <BaseSelect.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={cn(
                    "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 pl-8 text-sm outline-none",
                    // Highlighted state (keyboard navigation or hover)
                    "data-[highlighted]:bg-muted",
                    // Selected state
                    "data-[selected]:font-medium",
                    // Disabled state
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  )}
                >
                  <BaseSelect.ItemIndicator className="absolute left-2 flex h-4 w-4 items-center justify-center">
                    <CheckIcon />
                  </BaseSelect.ItemIndicator>
                  <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}

Select.displayName = "Select";

export { Select };
