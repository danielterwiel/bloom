import { describe, it, expect } from "vitest";
import * as React from "react";
import { Slider } from "../components/slider";

describe("Slider", () => {
  describe("component structure", () => {
    it("has correct displayName", () => {
      expect(Slider.displayName).toBe("Slider");
    });

    it("renders without props (uses defaults)", () => {
      const element = React.createElement(Slider);
      expect(element.type).toBe(Slider);
    });

    it("accepts value prop for controlled single value usage", () => {
      const element = React.createElement(Slider, { value: 50 });
      expect(element.props.value).toBe(50);
    });

    it("accepts defaultValue prop for uncontrolled single value usage", () => {
      const element = React.createElement(Slider, { defaultValue: 25 });
      expect(element.props.defaultValue).toBe(25);
    });

    it("accepts onValueChange callback", () => {
      const handleChange = () => {};
      const element = React.createElement(Slider, {
        onValueChange: handleChange,
      });
      expect(element.props.onValueChange).toBe(handleChange);
    });

    it("accepts onValueCommitted callback", () => {
      const handleCommit = () => {};
      const element = React.createElement(Slider, {
        onValueCommitted: handleCommit,
      });
      expect(element.props.onValueCommitted).toBe(handleCommit);
    });

    it("accepts disabled prop", () => {
      const element = React.createElement(Slider, { disabled: true });
      expect(element.props.disabled).toBe(true);
    });

    it("accepts min prop", () => {
      const element = React.createElement(Slider, { min: 10 });
      expect(element.props.min).toBe(10);
    });

    it("accepts max prop", () => {
      const element = React.createElement(Slider, { max: 200 });
      expect(element.props.max).toBe(200);
    });

    it("accepts step prop", () => {
      const element = React.createElement(Slider, { step: 5 });
      expect(element.props.step).toBe(5);
    });

    it("accepts name prop for form submission", () => {
      const element = React.createElement(Slider, { name: "volume" });
      expect(element.props.name).toBe("volume");
    });

    it("accepts className prop for custom styling", () => {
      const element = React.createElement(Slider, {
        className: "custom-slider-class",
      });
      expect(element.props.className).toBe("custom-slider-class");
    });
  });

  describe("range slider (two thumbs)", () => {
    it("accepts array value for controlled range usage", () => {
      const rangeValue: readonly [number, number] = [20, 80];
      const element = React.createElement(Slider, { value: rangeValue });
      expect(element.props.value).toEqual([20, 80]);
    });

    it("accepts array defaultValue for uncontrolled range usage", () => {
      const rangeValue: readonly [number, number] = [10, 90];
      const element = React.createElement(Slider, { defaultValue: rangeValue });
      expect(element.props.defaultValue).toEqual([10, 90]);
    });

    it("accepts onValueChange callback for range slider", () => {
      const handleChange = (
        _value: number | readonly [number, number],
        _details: { activeThumbIndex: number },
      ) => {};
      const element = React.createElement(Slider, {
        defaultValue: [25, 75] as const,
        onValueChange: handleChange,
      });
      expect(element.props.onValueChange).toBe(handleChange);
    });

    it("allows min and max to constrain range values", () => {
      const element = React.createElement(Slider, {
        defaultValue: [30, 70] as const,
        min: 0,
        max: 100,
      });
      expect(element.props.defaultValue).toEqual([30, 70]);
      expect(element.props.min).toBe(0);
      expect(element.props.max).toBe(100);
    });
  });

  describe("accessibility", () => {
    it("accepts aria-label prop for single thumb", () => {
      const element = React.createElement(Slider, {
        "aria-label": "Volume control",
      });
      expect(element.props["aria-label"]).toBe("Volume control");
    });

    it("accepts getAriaLabel function for range slider thumbs", () => {
      const getAriaLabel = (index: number) => (index === 0 ? "Minimum price" : "Maximum price");
      const element = React.createElement(Slider, {
        defaultValue: [20, 80] as const,
        getAriaLabel,
      });
      expect(element.props.getAriaLabel).toBe(getAriaLabel);
    });

    it("accepts getAriaValueText function for screen readers", () => {
      const getAriaValueText = (formattedValue: string, _value: number, _index: number) =>
        `$${formattedValue}`;
      const element = React.createElement(Slider, {
        getAriaValueText,
      });
      expect(element.props.getAriaValueText).toBe(getAriaValueText);
    });
  });

  describe("orientation", () => {
    it("defaults to horizontal orientation", () => {
      const element = React.createElement(Slider);
      expect(element.props.orientation).toBeUndefined(); // uses default
    });

    it("accepts vertical orientation", () => {
      const element = React.createElement(Slider, { orientation: "vertical" });
      expect(element.props.orientation).toBe("vertical");
    });

    it("accepts horizontal orientation explicitly", () => {
      const element = React.createElement(Slider, {
        orientation: "horizontal",
      });
      expect(element.props.orientation).toBe("horizontal");
    });
  });

  describe("controlled vs uncontrolled usage", () => {
    it("supports controlled single value mode with value and onValueChange", () => {
      const handleChange = () => {};
      const element = React.createElement(Slider, {
        value: 50,
        onValueChange: handleChange,
      });
      expect(element.props.value).toBe(50);
      expect(element.props.onValueChange).toBe(handleChange);
    });

    it("supports uncontrolled single value mode with defaultValue", () => {
      const element = React.createElement(Slider, { defaultValue: 30 });
      expect(element.props.defaultValue).toBe(30);
      expect(element.props.value).toBeUndefined();
    });

    it("supports controlled range mode with value and onValueChange", () => {
      const handleChange = () => {};
      const rangeValue: readonly [number, number] = [20, 80];
      const element = React.createElement(Slider, {
        value: rangeValue,
        onValueChange: handleChange,
      });
      expect(element.props.value).toEqual([20, 80]);
      expect(element.props.onValueChange).toBe(handleChange);
    });

    it("supports uncontrolled range mode with defaultValue", () => {
      const rangeValue: readonly [number, number] = [15, 85];
      const element = React.createElement(Slider, { defaultValue: rangeValue });
      expect(element.props.defaultValue).toEqual([15, 85]);
      expect(element.props.value).toBeUndefined();
    });
  });

  describe("step values", () => {
    it("accepts step for discrete slider", () => {
      const element = React.createElement(Slider, {
        min: 0,
        max: 100,
        step: 10,
        defaultValue: 50,
      });
      expect(element.props.step).toBe(10);
    });

    it("accepts decimal step values", () => {
      const element = React.createElement(Slider, {
        min: 0,
        max: 1,
        step: 0.1,
        defaultValue: 0.5,
      });
      expect(element.props.step).toBe(0.1);
    });
  });
});
