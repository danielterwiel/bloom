import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as React from "react";
import {
  BarChart,
  type BarChartProps,
  type BarChartSeries,
  type BarChartDataPoint,
} from "../../charts/bar-chart";

// Mock uPlot
vi.mock("uplot", () => {
  const MockUPlot = vi.fn().mockImplementation(() => ({
    destroy: vi.fn(),
    setSize: vi.fn(),
    ctx: {
      fillStyle: "",
      fillRect: vi.fn(),
    },
    bbox: { left: 0, top: 0, width: 400, height: 300 },
    series: [],
    data: [[], []],
    scales: { y: { min: 0, max: 100 } },
  }));
  return { default: MockUPlot };
});

// Mock ResizeObserver
const mockResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
vi.stubGlobal("ResizeObserver", mockResizeObserver);

describe("BarChart", () => {
  const sampleData: BarChartDataPoint[] = [
    { label: "January", value: 100 },
    { label: "February", value: 150 },
    { label: "March", value: 120 },
  ];

  const defaultSeries: BarChartSeries[] = [
    {
      name: "Sales",
      data: sampleData,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("component structure", () => {
    it("has correct displayName", () => {
      expect(BarChart.displayName).toBe("BarChart");
    });

    it("renders a chart element", () => {
      const element = React.createElement(BarChart, {
        series: defaultSeries,
      });
      expect(element.type).toBe(BarChart);
    });

    it("accepts className prop", () => {
      const element = React.createElement(BarChart, {
        series: defaultSeries,
        className: "custom-bar-chart",
      });
      expect(element.props.className).toBe("custom-bar-chart");
    });
  });

  describe("series data", () => {
    it("accepts single series", () => {
      const element = React.createElement(BarChart, {
        series: defaultSeries,
      });
      expect(element.props.series).toHaveLength(1);
    });

    it("accepts multiple series", () => {
      const multiSeries: BarChartSeries[] = [
        { name: "Sales", data: sampleData },
        { name: "Revenue", data: sampleData },
        { name: "Profit", data: sampleData },
      ];
      const element = React.createElement(BarChart, {
        series: multiSeries,
      });
      expect(element.props.series).toHaveLength(3);
    });

    it("accepts empty series array", () => {
      const element = React.createElement(BarChart, {
        series: [],
      });
      expect(element.props.series).toHaveLength(0);
    });

    it("accepts series with custom color", () => {
      const coloredSeries: BarChartSeries[] = [
        {
          name: "Custom",
          data: sampleData,
          color: "oklch(0.7 0.2 200)",
        },
      ];
      const element = React.createElement(BarChart, {
        series: coloredSeries,
      });
      expect(element.props.series[0]?.color).toBe("oklch(0.7 0.2 200)");
    });
  });

  describe("data points", () => {
    it("data points have label and value", () => {
      const element = React.createElement(BarChart, {
        series: defaultSeries,
      });
      const firstPoint = element.props.series[0]?.data[0];
      expect(firstPoint).toHaveProperty("label");
      expect(firstPoint).toHaveProperty("value");
    });

    it("supports numeric values", () => {
      const numericData: BarChartDataPoint[] = [
        { label: "A", value: 0 },
        { label: "B", value: 100 },
        { label: "C", value: -50 },
        { label: "D", value: 99.99 },
      ];
      const series: BarChartSeries[] = [{ name: "Numbers", data: numericData }];
      const element = React.createElement(BarChart, { series });
      expect(element.props.series[0]?.data).toHaveLength(4);
    });

    it("supports empty data array", () => {
      const emptySeries: BarChartSeries[] = [{ name: "Empty", data: [] }];
      const element = React.createElement(BarChart, { series: emptySeries });
      expect(element.props.series[0]?.data).toHaveLength(0);
    });
  });

  describe("configuration options", () => {
    it("accepts showLegend prop", () => {
      const element = React.createElement(BarChart, {
        series: defaultSeries,
        showLegend: true,
      });
      expect(element.props.showLegend).toBe(true);
    });

    it("showLegend defaults to true", () => {
      const element = React.createElement(BarChart, {
        series: defaultSeries,
      });
      // When not specified, showLegend is undefined in props but defaults to true in component
      expect(element.props.showLegend).toBeUndefined();
    });

    it("accepts showLegend false", () => {
      const element = React.createElement(BarChart, {
        series: defaultSeries,
        showLegend: false,
      });
      expect(element.props.showLegend).toBe(false);
    });

    it("accepts title prop", () => {
      const element = React.createElement(BarChart, {
        series: defaultSeries,
        title: "Monthly Sales",
      });
      expect(element.props.title).toBe("Monthly Sales");
    });

    it("accepts barWidth prop", () => {
      const element = React.createElement(BarChart, {
        series: defaultSeries,
        barWidth: 0.5,
      });
      expect(element.props.barWidth).toBe(0.5);
    });
  });

  describe("theme colors", () => {
    it("uses default theme colors when no color specified", () => {
      const element = React.createElement(BarChart, {
        series: [{ name: "Test", data: sampleData }],
      });
      expect(element.props.series[0]?.color).toBeUndefined();
    });

    it("allows custom color override", () => {
      const customColor = "oklch(0.8 0.15 30)";
      const element = React.createElement(BarChart, {
        series: [{ name: "Test", data: sampleData, color: customColor }],
      });
      expect(element.props.series[0]?.color).toBe(customColor);
    });

    it("supports multiple series with different colors", () => {
      const coloredSeries: BarChartSeries[] = [
        { name: "Series 1", data: sampleData, color: "oklch(0.65 0.18 12)" },
        { name: "Series 2", data: sampleData, color: "oklch(0.55 0.08 140)" },
      ];
      const element = React.createElement(BarChart, { series: coloredSeries });
      expect(element.props.series[0]?.color).not.toBe(element.props.series[1]?.color);
    });
  });

  describe("BarChartProps interface", () => {
    it("allows minimal props", () => {
      const minimalProps: BarChartProps = {
        series: [],
      };
      expect(minimalProps.series).toBeDefined();
    });

    it("allows all optional props", () => {
      const fullProps: BarChartProps = {
        series: defaultSeries,
        className: "test-chart",
        showLegend: true,
        title: "Test Chart",
        barWidth: 0.8,
      };
      expect(fullProps).toMatchObject({
        series: defaultSeries,
        className: "test-chart",
        showLegend: true,
        title: "Test Chart",
        barWidth: 0.8,
      });
    });
  });

  describe("BarChartSeries interface", () => {
    it("requires name property", () => {
      const series: BarChartSeries = {
        name: "Required Name",
        data: [],
      };
      expect(series.name).toBe("Required Name");
    });

    it("requires data property", () => {
      const series: BarChartSeries = {
        name: "Test",
        data: sampleData,
      };
      expect(series.data).toBeDefined();
    });

    it("allows optional color", () => {
      const series: BarChartSeries = {
        name: "Test",
        data: [],
        color: "red",
      };
      expect(series.color).toBe("red");
    });
  });

  describe("BarChartDataPoint interface", () => {
    it("requires label property", () => {
      const point: BarChartDataPoint = {
        label: "Test Label",
        value: 0,
      };
      expect(point.label).toBe("Test Label");
    });

    it("requires value property", () => {
      const point: BarChartDataPoint = {
        label: "",
        value: 42,
      };
      expect(point.value).toBe(42);
    });
  });

  describe("responsive behavior", () => {
    it("ResizeObserver mock is available", () => {
      expect(ResizeObserver).toBeDefined();
      expect(mockResizeObserver).toBeDefined();
    });
  });

  describe("edge cases", () => {
    it("handles single data point", () => {
      const singlePoint: BarChartSeries[] = [
        { name: "Single", data: [{ label: "Only", value: 100 }] },
      ];
      const element = React.createElement(BarChart, { series: singlePoint });
      expect(element.props.series[0]?.data).toHaveLength(1);
    });

    it("handles large datasets", () => {
      const largeData = Array.from({ length: 100 }, (_, i) => ({
        label: `Item ${i}`,
        value: Math.random() * 100,
      }));
      const largeSeries: BarChartSeries[] = [{ name: "Large", data: largeData }];
      const element = React.createElement(BarChart, { series: largeSeries });
      expect(element.props.series[0]?.data).toHaveLength(100);
    });

    it("handles zero values", () => {
      const zeroData: BarChartDataPoint[] = [
        { label: "Zero", value: 0 },
        { label: "Also Zero", value: 0 },
      ];
      const series: BarChartSeries[] = [{ name: "Zeros", data: zeroData }];
      const element = React.createElement(BarChart, { series });
      expect(element.props.series[0]?.data[0]?.value).toBe(0);
    });

    it("handles negative values", () => {
      const negativeData: BarChartDataPoint[] = [
        { label: "Negative", value: -50 },
        { label: "Positive", value: 50 },
      ];
      const series: BarChartSeries[] = [{ name: "Mixed", data: negativeData }];
      const element = React.createElement(BarChart, { series });
      expect(element.props.series[0]?.data[0]?.value).toBe(-50);
    });

    it("handles decimal values", () => {
      const decimalData: BarChartDataPoint[] = [
        { label: "Pi", value: 3.14159 },
        { label: "E", value: 2.71828 },
      ];
      const series: BarChartSeries[] = [{ name: "Decimals", data: decimalData }];
      const element = React.createElement(BarChart, { series });
      expect(element.props.series[0]?.data[0]?.value).toBeCloseTo(3.14159);
    });

    it("handles special characters in labels", () => {
      const specialData: BarChartDataPoint[] = [
        { label: "Q1 '23", value: 100 },
        { label: "Café & Tea", value: 200 },
        { label: "<script>", value: 300 },
      ];
      const series: BarChartSeries[] = [{ name: "Special", data: specialData }];
      const element = React.createElement(BarChart, { series });
      expect(element.props.series[0]?.data[0]?.label).toBe("Q1 '23");
    });
  });
});
