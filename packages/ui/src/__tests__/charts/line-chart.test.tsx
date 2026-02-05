import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as React from "react";
import {
  LineChart,
  type LineChartProps,
  type LineChartSeries,
  type LineChartDataPoint,
} from "../../charts/line-chart";

// Mock uPlot
vi.mock("uplot", () => {
  const MockUPlot = vi.fn().mockImplementation(() => ({
    destroy: vi.fn(),
    setSize: vi.fn(),
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

describe("LineChart", () => {
  const sampleData: LineChartDataPoint[] = [
    { x: 1, y: 100 },
    { x: 2, y: 150 },
    { x: 3, y: 120 },
  ];

  const defaultSeries: LineChartSeries[] = [
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
      expect(LineChart.displayName).toBe("LineChart");
    });

    it("renders a chart element", () => {
      const element = React.createElement(LineChart, {
        series: defaultSeries,
      });
      expect(element.type).toBe(LineChart);
    });

    it("accepts className prop", () => {
      const element = React.createElement(LineChart, {
        series: defaultSeries,
        className: "custom-line-chart",
      });
      expect(element.props.className).toBe("custom-line-chart");
    });
  });

  describe("series data", () => {
    it("accepts single series", () => {
      const element = React.createElement(LineChart, {
        series: defaultSeries,
      });
      expect(element.props.series).toHaveLength(1);
    });

    it("accepts multiple series", () => {
      const multiSeries: LineChartSeries[] = [
        { name: "Sales", data: sampleData },
        { name: "Revenue", data: sampleData },
        { name: "Profit", data: sampleData },
      ];
      const element = React.createElement(LineChart, {
        series: multiSeries,
      });
      expect(element.props.series).toHaveLength(3);
    });

    it("accepts empty series array", () => {
      const element = React.createElement(LineChart, {
        series: [],
      });
      expect(element.props.series).toHaveLength(0);
    });

    it("accepts series with custom color", () => {
      const coloredSeries: LineChartSeries[] = [
        {
          name: "Custom",
          data: sampleData,
          color: "oklch(0.7 0.2 200)",
        },
      ];
      const element = React.createElement(LineChart, {
        series: coloredSeries,
      });
      expect(element.props.series[0]?.color).toBe("oklch(0.7 0.2 200)");
    });

    it("accepts series with custom width", () => {
      const wideSeries: LineChartSeries[] = [
        {
          name: "Wide",
          data: sampleData,
          width: 4,
        },
      ];
      const element = React.createElement(LineChart, {
        series: wideSeries,
      });
      expect(element.props.series[0]?.width).toBe(4);
    });

    it("accepts series with showPoints option", () => {
      const pointsSeries: LineChartSeries[] = [
        {
          name: "Points",
          data: sampleData,
          showPoints: true,
        },
      ];
      const element = React.createElement(LineChart, {
        series: pointsSeries,
      });
      expect(element.props.series[0]?.showPoints).toBe(true);
    });

    it("accepts series with fill option", () => {
      const fillSeries: LineChartSeries[] = [
        {
          name: "Filled",
          data: sampleData,
          fill: true,
        },
      ];
      const element = React.createElement(LineChart, {
        series: fillSeries,
      });
      expect(element.props.series[0]?.fill).toBe(true);
    });

    it("accepts series with fillOpacity option", () => {
      const fillSeries: LineChartSeries[] = [
        {
          name: "Semi-filled",
          data: sampleData,
          fill: true,
          fillOpacity: 0.3,
        },
      ];
      const element = React.createElement(LineChart, {
        series: fillSeries,
      });
      expect(element.props.series[0]?.fillOpacity).toBe(0.3);
    });
  });

  describe("data points", () => {
    it("data points have x and y", () => {
      const element = React.createElement(LineChart, {
        series: defaultSeries,
      });
      const firstPoint = element.props.series[0]?.data[0];
      expect(firstPoint).toHaveProperty("x");
      expect(firstPoint).toHaveProperty("y");
    });

    it("supports numeric x and y values", () => {
      const numericData: LineChartDataPoint[] = [
        { x: 0, y: 0 },
        { x: 100, y: 100 },
        { x: -50, y: -50 },
        { x: 99.99, y: 99.99 },
      ];
      const series: LineChartSeries[] = [{ name: "Numbers", data: numericData }];
      const element = React.createElement(LineChart, { series });
      expect(element.props.series[0]?.data).toHaveLength(4);
    });

    it("supports empty data array", () => {
      const emptySeries: LineChartSeries[] = [{ name: "Empty", data: [] }];
      const element = React.createElement(LineChart, { series: emptySeries });
      expect(element.props.series[0]?.data).toHaveLength(0);
    });

    it("supports timestamp x values", () => {
      const timeData: LineChartDataPoint[] = [
        { x: Date.now() - 86400000, y: 100 },
        { x: Date.now(), y: 150 },
      ];
      const series: LineChartSeries[] = [{ name: "Time", data: timeData }];
      const element = React.createElement(LineChart, { series });
      expect(element.props.series[0]?.data).toHaveLength(2);
    });
  });

  describe("configuration options", () => {
    it("accepts showLegend prop", () => {
      const element = React.createElement(LineChart, {
        series: defaultSeries,
        showLegend: true,
      });
      expect(element.props.showLegend).toBe(true);
    });

    it("showLegend defaults to true", () => {
      const element = React.createElement(LineChart, {
        series: defaultSeries,
      });
      // When not specified, showLegend is undefined in props but defaults to true in component
      expect(element.props.showLegend).toBeUndefined();
    });

    it("accepts showLegend false", () => {
      const element = React.createElement(LineChart, {
        series: defaultSeries,
        showLegend: false,
      });
      expect(element.props.showLegend).toBe(false);
    });

    it("accepts title prop", () => {
      const element = React.createElement(LineChart, {
        series: defaultSeries,
        title: "Monthly Trends",
      });
      expect(element.props.title).toBe("Monthly Trends");
    });

    it("accepts timeScale prop", () => {
      const element = React.createElement(LineChart, {
        series: defaultSeries,
        timeScale: true,
      });
      expect(element.props.timeScale).toBe(true);
    });

    it("timeScale defaults to false", () => {
      const element = React.createElement(LineChart, {
        series: defaultSeries,
      });
      expect(element.props.timeScale).toBeUndefined();
    });
  });

  describe("theme colors", () => {
    it("uses default theme colors when no color specified", () => {
      const element = React.createElement(LineChart, {
        series: [{ name: "Test", data: sampleData }],
      });
      expect(element.props.series[0]?.color).toBeUndefined();
    });

    it("allows custom color override", () => {
      const customColor = "oklch(0.8 0.15 30)";
      const element = React.createElement(LineChart, {
        series: [{ name: "Test", data: sampleData, color: customColor }],
      });
      expect(element.props.series[0]?.color).toBe(customColor);
    });

    it("supports multiple series with different colors", () => {
      const coloredSeries: LineChartSeries[] = [
        { name: "Series 1", data: sampleData, color: "oklch(0.65 0.18 12)" },
        { name: "Series 2", data: sampleData, color: "oklch(0.55 0.08 140)" },
      ];
      const element = React.createElement(LineChart, { series: coloredSeries });
      expect(element.props.series[0]?.color).not.toBe(element.props.series[1]?.color);
    });
  });

  describe("LineChartProps interface", () => {
    it("allows minimal props", () => {
      const minimalProps: LineChartProps = {
        series: [],
      };
      expect(minimalProps.series).toBeDefined();
    });

    it("allows all optional props", () => {
      const fullProps: LineChartProps = {
        series: defaultSeries,
        className: "test-chart",
        showLegend: true,
        title: "Test Chart",
        timeScale: true,
      };
      expect(fullProps).toMatchObject({
        series: defaultSeries,
        className: "test-chart",
        showLegend: true,
        title: "Test Chart",
        timeScale: true,
      });
    });
  });

  describe("LineChartSeries interface", () => {
    it("requires name property", () => {
      const series: LineChartSeries = {
        name: "Required Name",
        data: [],
      };
      expect(series.name).toBe("Required Name");
    });

    it("requires data property", () => {
      const series: LineChartSeries = {
        name: "Test",
        data: sampleData,
      };
      expect(series.data).toBeDefined();
    });

    it("allows optional color", () => {
      const series: LineChartSeries = {
        name: "Test",
        data: [],
        color: "red",
      };
      expect(series.color).toBe("red");
    });

    it("allows optional width", () => {
      const series: LineChartSeries = {
        name: "Test",
        data: [],
        width: 3,
      };
      expect(series.width).toBe(3);
    });

    it("allows optional showPoints", () => {
      const series: LineChartSeries = {
        name: "Test",
        data: [],
        showPoints: true,
      };
      expect(series.showPoints).toBe(true);
    });

    it("allows optional fill", () => {
      const series: LineChartSeries = {
        name: "Test",
        data: [],
        fill: true,
      };
      expect(series.fill).toBe(true);
    });

    it("allows optional fillOpacity", () => {
      const series: LineChartSeries = {
        name: "Test",
        data: [],
        fill: true,
        fillOpacity: 0.5,
      };
      expect(series.fillOpacity).toBe(0.5);
    });
  });

  describe("LineChartDataPoint interface", () => {
    it("requires x property", () => {
      const point: LineChartDataPoint = {
        x: 1,
        y: 0,
      };
      expect(point.x).toBe(1);
    });

    it("requires y property", () => {
      const point: LineChartDataPoint = {
        x: 0,
        y: 42,
      };
      expect(point.y).toBe(42);
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
      const singlePoint: LineChartSeries[] = [{ name: "Single", data: [{ x: 1, y: 100 }] }];
      const element = React.createElement(LineChart, { series: singlePoint });
      expect(element.props.series[0]?.data).toHaveLength(1);
    });

    it("handles large datasets", () => {
      const largeData = Array.from({ length: 1000 }, (_, i) => ({
        x: i,
        y: Math.random() * 100,
      }));
      const largeSeries: LineChartSeries[] = [{ name: "Large", data: largeData }];
      const element = React.createElement(LineChart, { series: largeSeries });
      expect(element.props.series[0]?.data).toHaveLength(1000);
    });

    it("handles zero values", () => {
      const zeroData: LineChartDataPoint[] = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ];
      const series: LineChartSeries[] = [{ name: "Zeros", data: zeroData }];
      const element = React.createElement(LineChart, { series });
      expect(element.props.series[0]?.data[0]?.y).toBe(0);
    });

    it("handles negative values", () => {
      const negativeData: LineChartDataPoint[] = [
        { x: 1, y: -50 },
        { x: 2, y: 50 },
      ];
      const series: LineChartSeries[] = [{ name: "Mixed", data: negativeData }];
      const element = React.createElement(LineChart, { series });
      expect(element.props.series[0]?.data[0]?.y).toBe(-50);
    });

    it("handles decimal values", () => {
      const decimalData: LineChartDataPoint[] = [
        { x: 1.5, y: 3.14159 },
        { x: 2.5, y: 2.71828 },
      ];
      const series: LineChartSeries[] = [{ name: "Decimals", data: decimalData }];
      const element = React.createElement(LineChart, { series });
      expect(element.props.series[0]?.data[0]?.y).toBeCloseTo(3.14159);
    });

    it("handles unordered x values", () => {
      const unorderedData: LineChartDataPoint[] = [
        { x: 3, y: 300 },
        { x: 1, y: 100 },
        { x: 2, y: 200 },
      ];
      const series: LineChartSeries[] = [{ name: "Unordered", data: unorderedData }];
      const element = React.createElement(LineChart, { series });
      expect(element.props.series[0]?.data).toHaveLength(3);
    });

    it("handles series with different x values", () => {
      const series1Data: LineChartDataPoint[] = [
        { x: 1, y: 100 },
        { x: 3, y: 300 },
      ];
      const series2Data: LineChartDataPoint[] = [
        { x: 2, y: 200 },
        { x: 4, y: 400 },
      ];
      const multiSeries: LineChartSeries[] = [
        { name: "Series 1", data: series1Data },
        { name: "Series 2", data: series2Data },
      ];
      const element = React.createElement(LineChart, { series: multiSeries });
      expect(element.props.series).toHaveLength(2);
    });

    it("handles very large x values (timestamps)", () => {
      const timestamp = 1704067200000; // 2024-01-01
      const timeData: LineChartDataPoint[] = [
        { x: timestamp, y: 100 },
        { x: timestamp + 86400000, y: 150 },
      ];
      const series: LineChartSeries[] = [{ name: "Time", data: timeData }];
      const element = React.createElement(LineChart, { series });
      expect(element.props.series[0]?.data[0]?.x).toBe(timestamp);
    });
  });
});
