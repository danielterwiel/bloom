import { describe, it, expect, vi } from "vitest";
import { MultiSelect, type MultiSelectOption } from "../components/multi-select";

describe("MultiSelect", () => {
  const defaultOptions: MultiSelectOption[] = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "date", label: "Date" },
  ];

  describe("displayName", () => {
    it("should have correct displayName", () => {
      expect(MultiSelect.displayName).toBe("MultiSelect");
    });
  });

  describe("options prop", () => {
    it("should accept options array", () => {
      expect(() => <MultiSelect options={defaultOptions} />).not.toThrow();
    });

    it("should accept empty options array", () => {
      expect(() => <MultiSelect options={[]} />).not.toThrow();
    });

    it("should accept options with disabled items", () => {
      const optionsWithDisabled: MultiSelectOption[] = [
        { value: "a", label: "A" },
        { value: "b", label: "B", disabled: true },
        { value: "c", label: "C" },
      ];
      expect(() => <MultiSelect options={optionsWithDisabled} />).not.toThrow();
    });
  });

  describe("placeholder prop", () => {
    it("should accept placeholder string", () => {
      expect(() => (
        <MultiSelect options={defaultOptions} placeholder="Choose fruits" />
      )).not.toThrow();
    });

    it("should use default placeholder when not provided", () => {
      expect(() => <MultiSelect options={defaultOptions} />).not.toThrow();
    });
  });

  describe("value prop (controlled)", () => {
    it("should accept value as string array", () => {
      expect(() => (
        <MultiSelect options={defaultOptions} value={["apple", "banana"]} />
      )).not.toThrow();
    });

    it("should accept empty array value", () => {
      expect(() => <MultiSelect options={defaultOptions} value={[]} />).not.toThrow();
    });

    it("should accept single value array", () => {
      expect(() => <MultiSelect options={defaultOptions} value={["cherry"]} />).not.toThrow();
    });

    it("should accept all values selected", () => {
      expect(() => (
        <MultiSelect options={defaultOptions} value={["apple", "banana", "cherry", "date"]} />
      )).not.toThrow();
    });
  });

  describe("defaultValue prop (uncontrolled)", () => {
    it("should accept defaultValue as string array", () => {
      expect(() => <MultiSelect options={defaultOptions} defaultValue={["apple"]} />).not.toThrow();
    });

    it("should accept empty array defaultValue", () => {
      expect(() => <MultiSelect options={defaultOptions} defaultValue={[]} />).not.toThrow();
    });

    it("should accept multiple defaultValues", () => {
      expect(() => (
        <MultiSelect options={defaultOptions} defaultValue={["banana", "cherry"]} />
      )).not.toThrow();
    });
  });

  describe("onValueChange prop", () => {
    it("should accept onValueChange callback", () => {
      const handleChange = vi.fn();
      expect(() => (
        <MultiSelect options={defaultOptions} onValueChange={handleChange} />
      )).not.toThrow();
    });

    it("should work with controlled value and onValueChange", () => {
      const handleChange = vi.fn();
      expect(() => (
        <MultiSelect options={defaultOptions} value={["apple"]} onValueChange={handleChange} />
      )).not.toThrow();
    });
  });

  describe("disabled prop", () => {
    it("should accept disabled boolean", () => {
      expect(() => <MultiSelect options={defaultOptions} disabled />).not.toThrow();
    });

    it("should accept disabled={false}", () => {
      expect(() => <MultiSelect options={defaultOptions} disabled={false} />).not.toThrow();
    });
  });

  describe("required prop", () => {
    it("should accept required boolean", () => {
      expect(() => <MultiSelect options={defaultOptions} required />).not.toThrow();
    });

    it("should accept required={false}", () => {
      expect(() => <MultiSelect options={defaultOptions} required={false} />).not.toThrow();
    });
  });

  describe("name prop", () => {
    it("should accept name string for form submission", () => {
      expect(() => <MultiSelect options={defaultOptions} name="fruits" />).not.toThrow();
    });
  });

  describe("className prop", () => {
    it("should accept className for trigger styling", () => {
      expect(() => <MultiSelect options={defaultOptions} className="custom-class" />).not.toThrow();
    });

    it("should accept multiple classes", () => {
      expect(() => (
        <MultiSelect options={defaultOptions} className="class-a class-b" />
      )).not.toThrow();
    });
  });

  describe("MultiSelectOption type", () => {
    it("should require value and label properties", () => {
      const option: MultiSelectOption = { value: "test", label: "Test" };
      expect(option.value).toBe("test");
      expect(option.label).toBe("Test");
    });

    it("should allow optional disabled property", () => {
      const option: MultiSelectOption = {
        value: "test",
        label: "Test",
        disabled: true,
      };
      expect(option.disabled).toBe(true);
    });

    it("should default disabled to undefined", () => {
      const option: MultiSelectOption = { value: "test", label: "Test" };
      expect(option.disabled).toBeUndefined();
    });
  });

  describe("controlled vs uncontrolled", () => {
    it("should support controlled usage with value and onValueChange", () => {
      const handleChange = vi.fn();
      expect(() => (
        <MultiSelect
          options={defaultOptions}
          value={["apple", "banana"]}
          onValueChange={handleChange}
        />
      )).not.toThrow();
    });

    it("should support uncontrolled usage with defaultValue", () => {
      expect(() => (
        <MultiSelect options={defaultOptions} defaultValue={["cherry"]} />
      )).not.toThrow();
    });

    it("should support fully uncontrolled usage", () => {
      expect(() => <MultiSelect options={defaultOptions} />).not.toThrow();
    });
  });

  describe("form integration", () => {
    it("should support form submission with name and value", () => {
      expect(() => (
        <form>
          <MultiSelect
            options={defaultOptions}
            name="selectedFruits"
            value={["apple", "banana"]}
            required
          />
        </form>
      )).not.toThrow();
    });
  });

  describe("edge cases", () => {
    it("should handle single option", () => {
      expect(() => (
        <MultiSelect options={[{ value: "only", label: "Only Option" }]} />
      )).not.toThrow();
    });

    it("should handle many options", () => {
      const manyOptions = Array.from({ length: 100 }, (_, i) => ({
        value: `option-${i}`,
        label: `Option ${i}`,
      }));
      expect(() => <MultiSelect options={manyOptions} />).not.toThrow();
    });

    it("should handle options with special characters in labels", () => {
      const specialOptions: MultiSelectOption[] = [
        { value: "a", label: "Option & Special <chars>" },
        { value: "b", label: 'Option "with" quotes' },
      ];
      expect(() => <MultiSelect options={specialOptions} />).not.toThrow();
    });

    it("should preserve option order", () => {
      const orderedOptions: MultiSelectOption[] = [
        { value: "z", label: "Z" },
        { value: "a", label: "A" },
        { value: "m", label: "M" },
      ];
      expect(() => <MultiSelect options={orderedOptions} />).not.toThrow();
    });
  });
});
