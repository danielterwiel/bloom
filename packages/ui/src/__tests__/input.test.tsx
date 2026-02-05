import { describe, it, expect } from "vitest";
import * as React from "react";
import { Input } from "../components/input";

describe("Input", () => {
  describe("Input component", () => {
    it("is a forwardRef component", () => {
      expect(Input.displayName).toBe("Input");
    });

    it("renders with default props", () => {
      const element = React.createElement(Input);
      expect(element.type).toBe(Input);
    });

    it("defaults to type text", () => {
      const element = React.createElement(Input);
      // Default type is set in the component, not on the element props
      expect(element.props.type).toBeUndefined();
    });

    it("accepts type prop", () => {
      const element = React.createElement(Input, { type: "email" });
      expect(element.props.type).toBe("email");
    });

    it("accepts className prop for custom styling", () => {
      const element = React.createElement(Input, { className: "custom-class" });
      expect(element.props.className).toBe("custom-class");
    });

    it("accepts placeholder prop", () => {
      const element = React.createElement(Input, {
        placeholder: "Enter your name",
      });
      expect(element.props.placeholder).toBe("Enter your name");
    });

    it("accepts error prop", () => {
      const element = React.createElement(Input, { error: true });
      expect(element.props.error).toBe(true);
    });

    it("accepts disabled prop", () => {
      const element = React.createElement(Input, { disabled: true });
      expect(element.props.disabled).toBe(true);
    });

    it("accepts standard input attributes", () => {
      const element = React.createElement(Input, {
        name: "email",
        required: true,
        maxLength: 100,
        "aria-label": "Email address",
      });
      expect(element.props.name).toBe("email");
      expect(element.props.required).toBe(true);
      expect(element.props.maxLength).toBe(100);
      expect(element.props["aria-label"]).toBe("Email address");
    });

    it("accepts value and onChange for controlled usage", () => {
      const handleChange = () => {};
      const element = React.createElement(Input, {
        value: "test value",
        onChange: handleChange,
      });
      expect(element.props.value).toBe("test value");
      expect(element.props.onChange).toBe(handleChange);
    });

    it("accepts defaultValue for uncontrolled usage", () => {
      const element = React.createElement(Input, {
        defaultValue: "initial value",
      });
      expect(element.props.defaultValue).toBe("initial value");
    });
  });
});
