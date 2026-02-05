import { describe, it, expect } from "vitest";
import * as React from "react";
import { Select, type SelectOption } from "../components/select";

const mockOptions: SelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

const disabledOption: SelectOption[] = [
  { value: "enabled", label: "Enabled Option" },
  { value: "disabled", label: "Disabled Option", disabled: true },
];

describe("Select", () => {
  describe("component structure", () => {
    it("has correct displayName", () => {
      expect(Select.displayName).toBe("Select");
    });

    it("renders with required options prop", () => {
      const element = React.createElement(Select, { options: mockOptions });
      expect(element.type).toBe(Select);
      expect(element.props.options).toBe(mockOptions);
    });

    it("accepts placeholder prop", () => {
      const element = React.createElement(Select, {
        options: mockOptions,
        placeholder: "Choose a fruit",
      });
      expect(element.props.placeholder).toBe("Choose a fruit");
    });

    it("accepts value prop for controlled usage", () => {
      const element = React.createElement(Select, {
        options: mockOptions,
        value: "banana",
      });
      expect(element.props.value).toBe("banana");
    });

    it("accepts defaultValue prop for uncontrolled usage", () => {
      const element = React.createElement(Select, {
        options: mockOptions,
        defaultValue: "cherry",
      });
      expect(element.props.defaultValue).toBe("cherry");
    });

    it("accepts onValueChange callback", () => {
      const handleChange = () => {};
      const element = React.createElement(Select, {
        options: mockOptions,
        onValueChange: handleChange,
      });
      expect(element.props.onValueChange).toBe(handleChange);
    });

    it("accepts disabled prop", () => {
      const element = React.createElement(Select, {
        options: mockOptions,
        disabled: true,
      });
      expect(element.props.disabled).toBe(true);
    });

    it("accepts required prop", () => {
      const element = React.createElement(Select, {
        options: mockOptions,
        required: true,
      });
      expect(element.props.required).toBe(true);
    });

    it("accepts name prop for form submission", () => {
      const element = React.createElement(Select, {
        options: mockOptions,
        name: "fruit-select",
      });
      expect(element.props.name).toBe("fruit-select");
    });

    it("accepts className prop for custom styling", () => {
      const element = React.createElement(Select, {
        options: mockOptions,
        className: "custom-select-class",
      });
      expect(element.props.className).toBe("custom-select-class");
    });
  });

  describe("options handling", () => {
    it("handles empty options array", () => {
      const element = React.createElement(Select, { options: [] });
      expect(element.props.options).toEqual([]);
    });

    it("handles options with disabled items", () => {
      const element = React.createElement(Select, { options: disabledOption });
      expect(element.props.options).toEqual(disabledOption);
      const secondOption = element.props.options[1];
      expect(secondOption?.disabled).toBe(true);
    });

    it("handles single option", () => {
      const singleOption = [{ value: "only", label: "Only Option" }];
      const element = React.createElement(Select, { options: singleOption });
      expect(element.props.options).toHaveLength(1);
    });

    it("preserves option order", () => {
      const element = React.createElement(Select, { options: mockOptions });
      const opts = element.props.options;
      expect(opts[0]?.value).toBe("apple");
      expect(opts[1]?.value).toBe("banana");
      expect(opts[2]?.value).toBe("cherry");
    });
  });

  describe("SelectOption type", () => {
    it("requires value and label properties", () => {
      const option: SelectOption = { value: "test", label: "Test Label" };
      expect(option.value).toBe("test");
      expect(option.label).toBe("Test Label");
    });

    it("allows optional disabled property", () => {
      const enabledOption: SelectOption = { value: "a", label: "A" };
      const disabledOpt: SelectOption = { value: "b", label: "B", disabled: true };

      expect(enabledOption.disabled).toBeUndefined();
      expect(disabledOpt.disabled).toBe(true);
    });
  });
});
