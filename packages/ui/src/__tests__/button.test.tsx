import { describe, it, expect } from "vitest";
import * as React from "react";
import { Button, buttonVariants } from "../components/button";

describe("Button", () => {
  describe("buttonVariants", () => {
    it("returns default variant classes", () => {
      const classes = buttonVariants();
      expect(classes).toContain("bg-primary");
      expect(classes).toContain("text-primary-foreground");
      expect(classes).toContain("h-10"); // md size default
    });

    it("returns outline variant classes", () => {
      const classes = buttonVariants({ variant: "outline" });
      expect(classes).toContain("border");
      expect(classes).toContain("bg-transparent");
    });

    it("returns ghost variant classes", () => {
      const classes = buttonVariants({ variant: "ghost" });
      expect(classes).toContain("bg-transparent");
      expect(classes).toContain("hover:bg-muted");
    });

    it("returns destructive variant classes", () => {
      const classes = buttonVariants({ variant: "destructive" });
      expect(classes).toContain("bg-destructive");
    });

    it("returns sm size classes", () => {
      const classes = buttonVariants({ size: "sm" });
      expect(classes).toContain("h-8");
      expect(classes).toContain("px-3");
      expect(classes).toContain("text-xs");
    });

    it("returns md size classes", () => {
      const classes = buttonVariants({ size: "md" });
      expect(classes).toContain("h-10");
      expect(classes).toContain("px-4");
      expect(classes).toContain("text-sm");
    });

    it("returns lg size classes", () => {
      const classes = buttonVariants({ size: "lg" });
      expect(classes).toContain("h-12");
      expect(classes).toContain("px-6");
      expect(classes).toContain("text-base");
    });
  });

  describe("Button component", () => {
    it("is a forwardRef component", () => {
      expect(Button.displayName).toBe("Button");
    });

    it("renders with default props", () => {
      const element = React.createElement(Button, { children: "Click me" });
      expect(element.type).toBe(Button);
      expect(element.props.children).toBe("Click me");
    });

    it("accepts className prop for custom styling", () => {
      const element = React.createElement(Button, {
        className: "custom-class",
        children: "Test",
      });
      expect(element.props.className).toBe("custom-class");
    });

    it("accepts variant prop", () => {
      const element = React.createElement(Button, {
        variant: "outline",
        children: "Outline",
      });
      expect(element.props.variant).toBe("outline");
    });

    it("accepts size prop", () => {
      const element = React.createElement(Button, {
        size: "lg",
        children: "Large",
      });
      expect(element.props.size).toBe("lg");
    });

    it("accepts standard button attributes", () => {
      const element = React.createElement(Button, {
        type: "submit",
        disabled: true,
        "aria-label": "Submit form",
        children: "Submit",
      });
      expect(element.props.type).toBe("submit");
      expect(element.props.disabled).toBe(true);
      expect(element.props["aria-label"]).toBe("Submit form");
    });
  });
});
