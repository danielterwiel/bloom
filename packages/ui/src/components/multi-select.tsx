import * as React from "react";
import { Popover } from "@base-ui/react/popover";
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

const SearchIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <path strokeLinecap="round" d="m21 21-4.35-4.35" />
  </svg>
);

const MAX_VISIBLE_BADGES = 2;

function MultiSelect({
  options,
  placeholder = "Select options",
  value,
  defaultValue,
  onValueChange,
  disabled,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const searchRef = React.useRef<HTMLInputElement>(null);

  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue ?? []);
  const selectedValues = value ?? internalValue;

  const updateValues = React.useCallback(
    (newValues: string[]) => {
      if (value === undefined) setInternalValue(newValues);
      onValueChange?.(newValues);
    },
    [value, onValueChange],
  );

  const handleToggle = React.useCallback(
    (val: string) => {
      const newValues = selectedValues.includes(val)
        ? selectedValues.filter((v) => v !== val)
        : [...selectedValues, val];
      updateValues(newValues);
    },
    [selectedValues, updateValues],
  );

  const handleClearAll = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      updateValues([]);
    },
    [updateValues],
  );

  const filteredOptions = React.useMemo(() => {
    if (!search.trim()) return options;
    const q = search.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, search]);

  // Clear search when popover closes
  React.useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  // Focus search input when popover opens
  React.useEffect(() => {
    if (open) {
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [open]);

  const selectedLabels = React.useMemo(() => {
    return selectedValues.map((v) => {
      const opt = options.find((o) => o.value === v);
      return { value: v, label: opt?.label ?? v };
    });
  }, [selectedValues, options]);

  return (
    <Popover.Root open={disabled ? false : open} onOpenChange={disabled ? undefined : setOpen}>
      <Popover.Trigger
        render={<div />}
        className={cn(
          "flex min-h-10 w-full cursor-pointer items-center gap-1 rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        tabIndex={disabled ? -1 : 0}
      >
        <div className="flex flex-1 flex-wrap items-center gap-1 overflow-hidden">
          {selectedValues.length === 0 ? (
            <span className="text-foreground-muted">{placeholder}</span>
          ) : selectedValues.length <= MAX_VISIBLE_BADGES ? (
            selectedLabels.slice(0, MAX_VISIBLE_BADGES).map(({ value: v, label }) => (
              <span
                key={v}
                className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground"
              >
                {label}
              </span>
            ))
          ) : (
            <span className="text-foreground-muted">{selectedValues.length} selected</span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {selectedValues.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="rounded-sm p-0.5 text-foreground-muted hover:text-foreground focus:outline-none"
              aria-label="Clear all selections"
            >
              <XIcon />
            </button>
          )}
          <span className="text-foreground-muted">
            <ChevronIcon />
          </span>
        </div>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Positioner sideOffset={4} className="z-50">
          <Popover.Popup
            className={cn(
              "w-[var(--anchor-width)] rounded-md border border-border bg-surface shadow-elevated",
              "origin-[var(--transform-origin)] transition-[transform,opacity] duration-150",
              "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
              "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            )}
          >
            {/* Search input */}
            <div className="flex items-center gap-2 border-b border-border px-3 py-2">
              <span className="text-foreground-muted">
                <SearchIcon />
              </span>
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-foreground-muted"
              />
            </div>
            {/* Options list */}
            <div className="max-h-48 overflow-y-auto p-1">
              {filteredOptions.length === 0 ? (
                <div className="px-2 py-4 text-center text-sm text-foreground-muted">
                  No results found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    disabled={option.disabled}
                    onClick={() => handleToggle(option.value)}
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none",
                      "hover:bg-muted focus-visible:bg-muted",
                      "disabled:pointer-events-none disabled:opacity-50",
                      selectedValues.includes(option.value) && "font-medium",
                    )}
                  >
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center text-primary">
                      {selectedValues.includes(option.value) && <CheckIcon />}
                    </span>
                    {option.label}
                  </button>
                ))
              )}
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

MultiSelect.displayName = "MultiSelect";

export { MultiSelect };
