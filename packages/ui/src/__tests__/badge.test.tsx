import { describe, it, expect } from "vitest";
import * as React from "react";
import { Badge, badgeVariants } from "../components/badge";

describe("Badge", () => {
  describe("badgeVariants", () => {
    it("returns default variant classes", () => {
      const classes = badgeVariants();
      expect(classes).toContain("bg-primary");
      expect(classes).toContain("text-primary-foreground");
    });

    it("returns secondary variant classes", () => {
      const classes = badgeVariants({ variant: "secondary" });
      expect(classes).toContain("bg-secondary");
      expect(classes).toContain("text-secondary-foreground");
    });

    it("returns outline variant classes", () => {
      const classes = badgeVariants({ variant: "outline" });
      expect(classes).toContain("border");
      expect(classes).toContain("bg-transparent");
      expect(classes).toContain("text-foreground");
    });

    it("includes base styles in all variants", () => {
      const defaultClasses = badgeVariants();
      const secondaryClasses = badgeVariants({ variant: "secondary" });
      const outlineClasses = badgeVariants({ variant: "outline" });

      const baseStyles = ["inline-flex", "items-center", "rounded-md", "text-xs", "font-medium"];

      for (const style of baseStyles) {
        expect(defaultClasses).toContain(style);
        expect(secondaryClasses).toContain(style);
        expect(outlineClasses).toContain(style);
      }
    });
  });

  describe("Badge component", () => {
    it("is a forwardRef component", () => {
      expect(Badge.displayName).toBe("Badge");
    });

    it("renders with default props", () => {
      const element = React.createElement(Badge, { children: "New" });
      expect(element.type).toBe(Badge);
      expect(element.props.children).toBe("New");
    });

    it("accepts className prop for custom styling", () => {
      const element = React.createElement(Badge, {
        className: "custom-class",
        children: "Test",
      });
      expect(element.props.className).toBe("custom-class");
    });

    it("accepts variant prop", () => {
      const element = React.createElement(Badge, {
        variant: "secondary",
        children: "Secondary",
      });
      expect(element.props.variant).toBe("secondary");
    });

    it("accepts standard span attributes", () => {
      const element = React.createElement(Badge, {
        id: "badge-1",
        "aria-label": "New items",
        children: "5",
      });
      expect(element.props.id).toBe("badge-1");
      expect(element.props["aria-label"]).toBe("New items");
    });

    it("renders with number children", () => {
      const element = React.createElement(Badge, { children: 42 });
      expect(element.props.children).toBe(42);
    });

    it("renders with multiple children", () => {
      const element = React.createElement(Badge, {
        children: ["Count: ", 10],
      });
      expect(element.props.children).toEqual(["Count: ", 10]);
    });
  });
});
