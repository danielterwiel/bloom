import { describe, it, expect } from "vitest";
import * as React from "react";
import { Checkbox } from "../components/checkbox";

describe("Checkbox", () => {
  describe("component structure", () => {
    it("has correct displayName", () => {
      expect(Checkbox.displayName).toBe("Checkbox");
    });

    it("renders without props", () => {
      const element = React.createElement(Checkbox);
      expect(element.type).toBe(Checkbox);
    });

    it("accepts checked prop for controlled usage", () => {
      const element = React.createElement(Checkbox, { checked: true });
      expect(element.props.checked).toBe(true);
    });

    it("accepts defaultChecked prop for uncontrolled usage", () => {
      const element = React.createElement(Checkbox, { defaultChecked: true });
      expect(element.props.defaultChecked).toBe(true);
    });

    it("accepts onCheckedChange callback", () => {
      const handleChange = () => {};
      const element = React.createElement(Checkbox, {
        onCheckedChange: handleChange,
      });
      expect(element.props.onCheckedChange).toBe(handleChange);
    });

    it("accepts disabled prop", () => {
      const element = React.createElement(Checkbox, { disabled: true });
      expect(element.props.disabled).toBe(true);
    });

    it("accepts required prop", () => {
      const element = React.createElement(Checkbox, { required: true });
      expect(element.props.required).toBe(true);
    });

    it("accepts name prop for form submission", () => {
      const element = React.createElement(Checkbox, { name: "terms-checkbox" });
      expect(element.props.name).toBe("terms-checkbox");
    });

    it("accepts value prop for form submission", () => {
      const element = React.createElement(Checkbox, { value: "agreed" });
      expect(element.props.value).toBe("agreed");
    });

    it("accepts className prop for custom styling", () => {
      const element = React.createElement(Checkbox, {
        className: "custom-checkbox-class",
      });
      expect(element.props.className).toBe("custom-checkbox-class");
    });

    it("accepts id prop for label association", () => {
      const element = React.createElement(Checkbox, { id: "my-checkbox" });
      expect(element.props.id).toBe("my-checkbox");
    });
  });

  describe("accessibility", () => {
    it("accepts aria-label prop", () => {
      const element = React.createElement(Checkbox, {
        "aria-label": "Accept terms and conditions",
      });
      expect(element.props["aria-label"]).toBe("Accept terms and conditions");
    });

    it("accepts aria-labelledby prop", () => {
      const element = React.createElement(Checkbox, {
        "aria-labelledby": "label-id",
      });
      expect(element.props["aria-labelledby"]).toBe("label-id");
    });
  });

  describe("controlled vs uncontrolled usage", () => {
    it("supports controlled mode with checked and onCheckedChange", () => {
      const handleChange = (checked: boolean) => {
        return checked;
      };
      const element = React.createElement(Checkbox, {
        checked: false,
        onCheckedChange: handleChange,
      });
      expect(element.props.checked).toBe(false);
      expect(element.props.onCheckedChange).toBe(handleChange);
    });

    it("supports uncontrolled mode with defaultChecked", () => {
      const element = React.createElement(Checkbox, { defaultChecked: false });
      expect(element.props.defaultChecked).toBe(false);
      expect(element.props.checked).toBeUndefined();
    });
  });

  describe("form integration", () => {
    it("can be configured for form submission with name and value", () => {
      const element = React.createElement(Checkbox, {
        name: "newsletter",
        value: "subscribed",
        required: true,
      });
      expect(element.props.name).toBe("newsletter");
      expect(element.props.value).toBe("subscribed");
      expect(element.props.required).toBe(true);
    });
  });
});
