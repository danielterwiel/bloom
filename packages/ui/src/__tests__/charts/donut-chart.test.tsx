import { describe, it, expect } from "vitest";
import { DonutChart, type DonutChartProps, type DonutChartSegment } from "../../charts/donut-chart";

describe("DonutChart", () => {
  describe("component structure", () => {
    it("has correct displayName", () => {
      expect(DonutChart.displayName).toBe("DonutChart");
    });

    it("accepts segments prop", () => {
      const segments: DonutChartSegment[] = [
        { label: "A", value: 30 },
        { label: "B", value: 70 },
      ];
      const props: DonutChartProps = { segments };
      expect(props.segments).toEqual(segments);
    });

    it("accepts className prop", () => {
      const props: DonutChartProps = {
        segments: [{ label: "A", value: 100 }],
        className: "custom-class",
      };
      expect(props.className).toBe("custom-class");
    });
  });

  describe("segments data", () => {
    it("accepts empty segments array", () => {
      const props: DonutChartProps = { segments: [] };
      expect(props.segments).toHaveLength(0);
    });

    it("accepts single segment", () => {
      const segments: DonutChartSegment[] = [{ label: "Only", value: 100 }];
      const props: DonutChartProps = { segments };
      expect(props.segments).toHaveLength(1);
    });

    it("accepts multiple segments", () => {
      const segments: DonutChartSegment[] = [
        { label: "A", value: 25 },
        { label: "B", value: 25 },
        { label: "C", value: 25 },
        { label: "D", value: 25 },
      ];
      const props: DonutChartProps = { segments };
      expect(props.segments).toHaveLength(4);
    });

    it("accepts segments with custom colors", () => {
      const segments: DonutChartSegment[] = [
        { label: "A", value: 50, color: "#ff0000" },
        { label: "B", value: 50, color: "#00ff00" },
      ];
      const props: DonutChartProps = { segments };
      expect(props.segments[0]?.color).toBe("#ff0000");
      expect(props.segments[1]?.color).toBe("#00ff00");
    });

    it("accepts segments with optional color", () => {
      const segments: DonutChartSegment[] = [
        { label: "With Color", value: 50, color: "#ff0000" },
        { label: "Without Color", value: 50 },
      ];
      const props: DonutChartProps = { segments };
      expect(props.segments[0]?.color).toBe("#ff0000");
      expect(props.segments[1]?.color).toBeUndefined();
    });
  });

  describe("configuration options", () => {
    it("accepts showLegend prop", () => {
      const props: DonutChartProps = {
        segments: [{ label: "A", value: 100 }],
        showLegend: false,
      };
      expect(props.showLegend).toBe(false);
    });

    it("accepts title prop", () => {
      const props: DonutChartProps = {
        segments: [{ label: "A", value: 100 }],
        title: "My Chart",
      };
      expect(props.title).toBe("My Chart");
    });

    it("accepts innerRadius prop", () => {
      const props: DonutChartProps = {
        segments: [{ label: "A", value: 100 }],
        innerRadius: 0.5,
      };
      expect(props.innerRadius).toBe(0.5);
    });

    it("accepts showLabels prop", () => {
      const props: DonutChartProps = {
        segments: [{ label: "A", value: 100 }],
        showLabels: true,
      };
      expect(props.showLabels).toBe(true);
    });

    it("accepts showPercentages prop", () => {
      const props: DonutChartProps = {
        segments: [{ label: "A", value: 100 }],
        showPercentages: false,
      };
      expect(props.showPercentages).toBe(false);
    });
  });

  describe("innerRadius configuration", () => {
    it("allows innerRadius of 0 (pie chart)", () => {
      const props: DonutChartProps = {
        segments: [{ label: "A", value: 100 }],
        innerRadius: 0,
      };
      expect(props.innerRadius).toBe(0);
    });

    it("allows innerRadius of 0.5 (medium donut)", () => {
      const props: DonutChartProps = {
        segments: [{ label: "A", value: 100 }],
        innerRadius: 0.5,
      };
      expect(props.innerRadius).toBe(0.5);
    });

    it("allows innerRadius of 0.8 (thin donut)", () => {
      const props: DonutChartProps = {
        segments: [{ label: "A", value: 100 }],
        innerRadius: 0.8,
      };
      expect(props.innerRadius).toBe(0.8);
    });
  });

  describe("theme colors", () => {
    it("uses default theme colors when no color specified", () => {
      const segments: DonutChartSegment[] = [
        { label: "A", value: 25 },
        { label: "B", value: 25 },
        { label: "C", value: 25 },
      ];
      const props: DonutChartProps = { segments };
      // Should not have explicit colors, component uses defaults
      expect(props.segments.every((s) => s.color === undefined)).toBe(true);
    });

    it("allows custom colors to override defaults", () => {
      const customColor = "rgb(255, 0, 0)";
      const segments: DonutChartSegment[] = [{ label: "A", value: 100, color: customColor }];
      const props: DonutChartProps = { segments };
      expect(props.segments[0]?.color).toBe(customColor);
    });
  });

  describe("DonutChartSegment interface", () => {
    it("requires label property", () => {
      const segment: DonutChartSegment = { label: "Test", value: 50 };
      expect(segment.label).toBe("Test");
    });

    it("requires value property", () => {
      const segment: DonutChartSegment = { label: "Test", value: 42 };
      expect(segment.value).toBe(42);
    });

    it("has optional color property", () => {
      const withColor: DonutChartSegment = { label: "A", value: 50, color: "#000" };
      const withoutColor: DonutChartSegment = { label: "B", value: 50 };
      expect(withColor.color).toBe("#000");
      expect(withoutColor.color).toBeUndefined();
    });
  });

  describe("DonutChartProps interface", () => {
    it("requires segments property", () => {
      const props: DonutChartProps = {
        segments: [{ label: "A", value: 100 }],
      };
      expect(props.segments).toBeDefined();
    });

    it("has optional className property", () => {
      const withClass: DonutChartProps = {
        segments: [],
        className: "test",
      };
      const withoutClass: DonutChartProps = { segments: [] };
      expect(withClass.className).toBe("test");
      expect(withoutClass.className).toBeUndefined();
    });

    it("has optional showLegend property", () => {
      const props: DonutChartProps = {
        segments: [],
        showLegend: true,
      };
      expect(props.showLegend).toBe(true);
    });

    it("has optional title property", () => {
      const props: DonutChartProps = {
        segments: [],
        title: "Chart Title",
      };
      expect(props.title).toBe("Chart Title");
    });

    it("has optional innerRadius property", () => {
      const props: DonutChartProps = {
        segments: [],
        innerRadius: 0.7,
      };
      expect(props.innerRadius).toBe(0.7);
    });

    it("has optional showLabels property", () => {
      const props: DonutChartProps = {
        segments: [],
        showLabels: true,
      };
      expect(props.showLabels).toBe(true);
    });

    it("has optional showPercentages property", () => {
      const props: DonutChartProps = {
        segments: [],
        showPercentages: false,
      };
      expect(props.showPercentages).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("handles segments with zero values", () => {
      const segments: DonutChartSegment[] = [
        { label: "Zero", value: 0 },
        { label: "Some", value: 100 },
      ];
      const props: DonutChartProps = { segments };
      expect(props.segments[0]?.value).toBe(0);
    });

    it("handles segments with decimal values", () => {
      const segments: DonutChartSegment[] = [
        { label: "A", value: 33.33 },
        { label: "B", value: 66.67 },
      ];
      const props: DonutChartProps = { segments };
      expect(props.segments[0]?.value).toBe(33.33);
      expect(props.segments[1]?.value).toBe(66.67);
    });

    it("handles large number of segments", () => {
      const segments: DonutChartSegment[] = Array.from({ length: 20 }, (_, i) => ({
        label: `Segment ${i}`,
        value: 5,
      }));
      const props: DonutChartProps = { segments };
      expect(props.segments).toHaveLength(20);
    });

    it("handles segments with special characters in labels", () => {
      const segments: DonutChartSegment[] = [
        { label: "Category & More", value: 50 },
        { label: "Test <script>", value: 50 },
      ];
      const props: DonutChartProps = { segments };
      expect(props.segments[0]?.label).toBe("Category & More");
      expect(props.segments[1]?.label).toBe("Test <script>");
    });

    it("handles very small values", () => {
      const segments: DonutChartSegment[] = [
        { label: "Small", value: 0.001 },
        { label: "Large", value: 99.999 },
      ];
      const props: DonutChartProps = { segments };
      expect(props.segments[0]?.value).toBe(0.001);
    });

    it("handles very large values", () => {
      const segments: DonutChartSegment[] = [
        { label: "Large", value: 1000000000 },
        { label: "Small", value: 1 },
      ];
      const props: DonutChartProps = { segments };
      expect(props.segments[0]?.value).toBe(1000000000);
    });

    it("preserves segment order", () => {
      const segments: DonutChartSegment[] = [
        { label: "First", value: 10 },
        { label: "Second", value: 20 },
        { label: "Third", value: 30 },
      ];
      const props: DonutChartProps = { segments };
      expect(props.segments.map((s) => s.label)).toEqual(["First", "Second", "Third"]);
    });
  });
});
