/** @jsxImportSource react */
import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { FlowerCompany } from "@repo/data";
import { CompanyCard } from "./CompanyCard";

export interface VirtualListProps {
  items: FlowerCompany[];
  /** Estimated height of each row in pixels. Default: 180 */
  estimatedRowHeight?: number;
  /** Gap between items in pixels. Default: 16 */
  gap?: number;
  className?: string;
}

/**
 * VirtualList renders a virtualized list of CompanyCards.
 * Only items visible in the viewport (plus overscan) are rendered,
 * enabling smooth scrolling through 1000+ items.
 */
export function VirtualList({
  items,
  estimatedRowHeight = 120,
  gap = 12,
  className,
}: VirtualListProps) {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimatedRowHeight,
    overscan: 5,
    gap,
  });

  const virtualItems = virtualizer.getVirtualItems();

  if (items.length === 0) {
    return (
      <div
        className="flex items-center justify-center py-12 text-foreground-muted"
        role="status"
        aria-live="polite"
      >
        No companies found
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className={className}
      style={{
        height: "100%",
        overflow: "auto",
      }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualItems.map((virtualItem) => {
          const company = items[virtualItem.index];
          if (!company) return null;

          return (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <CompanyCard company={company} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

VirtualList.displayName = "VirtualList";
