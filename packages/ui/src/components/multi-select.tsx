import * as React from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { cn } from "../lib/utils";

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  /** The options to display in the select dropdown */
  options: MultiSelectOption[];
  /** Placeholder text when no values are selected */
  placeholder?: string;
  /** The controlled values (array of selected values) */
  value?: string[];
  /** The default values (uncontrolled) */
  defaultValue?: string[];
  /** Callback when the values change */
  onValueChange?: (values: string[]) => void;
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

const XIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M2 2L8 8M8 2L2 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function MultiSelect({
  options,
  placeholder = "Select options",
  value,
  defaultValue,
  onValueChange,
  disabled,
  required,
  name,
  className,
}: MultiSelectProps) {
  // Build items record for BaseUI to display labels properly
  const items = React.useMemo(() => {
    const record: Record<string, React.ReactNode> = {};
    for (const opt of options) {
      record[opt.value] = opt.label;
    }
    return record;
  }, [options]);

  // Track selected values for badge display
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue ?? []);
  const selectedValues = value ?? internalValue;

  const handleValueChange = React.useCallback(
    (newValue: string[] | null) => {
      const values = newValue ?? [];
      if (value === undefined) {
        setInternalValue(values);
      }
      onValueChange?.(values);
    },
    [value, onValueChange],
  );

  const handleRemoveValue = React.useCallback(
    (valueToRemove: string, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const newValues = selectedValues.filter((v) => v !== valueToRemove);
      handleValueChange(newValues);
    },
    [selectedValues, handleValueChange],
  );

  const handleClearAll = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleValueChange([]);
    },
    [handleValueChange],
  );

  // Get labels for selected values
  const selectedLabels = React.useMemo(() => {
    return selectedValues.map((v) => {
      const opt = options.find((o) => o.value === v);
      return { value: v, label: opt?.label ?? v };
    });
  }, [selectedValues, options]);

  return (
    <BaseSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
      disabled={disabled}
      required={required}
      name={name}
      items={items}
      multiple
    >
      <BaseSelect.Trigger
        className={cn(
          // Base styles matching Input component
          "flex min-h-10 w-full items-center gap-1 rounded-md border bg-background px-3 py-2 text-sm transition-colors",
          // Focus states
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Default border
          "border-border",
          className,
        )}
      >
        <div className="flex flex-1 flex-wrap items-center gap-1">
          {selectedValues.length === 0 ? (
            <span className="text-foreground-muted">{placeholder}</span>
          ) : (
            selectedLabels.map(({ value: v, label }) => (
              <span
                key={v}
                className="inline-flex items-center gap-1 rounded-md bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground"
              >
                {label}
                <button
                  type="button"
                  onClick={(e) => handleRemoveValue(v, e)}
                  className="rounded-sm hover:bg-primary-hover focus:outline-none focus:ring-1 focus:ring-primary-foreground"
                  aria-label={`Remove ${label}`}
                >
                  <XIcon />
                </button>
              </span>
            ))
          )}
        </div>
        <div className="flex items-center gap-1">
          {selectedValues.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="rounded-sm p-0.5 text-foreground-muted hover:text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              aria-label="Clear all selections"
            >
              <XIcon />
            </button>
          )}
          <BaseSelect.Icon className="flex-shrink-0 text-foreground-muted">
            <ChevronIcon />
          </BaseSelect.Icon>
        </div>
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

MultiSelect.displayName = "MultiSelect";

export { MultiSelect };
