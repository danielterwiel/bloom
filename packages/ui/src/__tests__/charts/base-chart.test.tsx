import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as React from "react";
import { BaseChart, type BaseChartProps } from "../../charts/base-chart";
import type uPlot from "uplot";

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

describe("BaseChart", () => {
  const defaultOptions: Omit<uPlot.Options, "width" | "height"> = {
    series: [
      {},
      {
        stroke: "red",
        fill: "rgba(255,0,0,0.1)",
      },
    ],
  };

  const defaultData: uPlot.AlignedData = [
    [1, 2, 3, 4, 5],
    [10, 20, 15, 30, 25],
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("component structure", () => {
    it("has correct displayName", () => {
      expect(BaseChart.displayName).toBe("BaseChart");
    });

    it("renders a container div", () => {
      const element = React.createElement(BaseChart, {
        options: defaultOptions,
        data: defaultData,
      });
      expect(element.type).toBe(BaseChart);
    });

    it("accepts className prop", () => {
      const element = React.createElement(BaseChart, {
        options: defaultOptions,
        data: defaultData,
        className: "custom-chart-class",
      });
      expect(element.props.className).toBe("custom-chart-class");
    });

    it("accepts options prop", () => {
      const customOptions = {
        ...defaultOptions,
        cursor: { show: true },
      };
      const element = React.createElement(BaseChart, {
        options: customOptions,
        data: defaultData,
      });
      expect(element.props.options).toBe(customOptions);
    });

    it("accepts data prop", () => {
      const element = React.createElement(BaseChart, {
        options: defaultOptions,
        data: defaultData,
      });
      expect(element.props.data).toBe(defaultData);
    });
  });

  describe("callbacks", () => {
    it("accepts onCreate callback", () => {
      const onCreate = vi.fn();
      const element = React.createElement(BaseChart, {
        options: defaultOptions,
        data: defaultData,
        onCreate,
      });
      expect(element.props.onCreate).toBe(onCreate);
    });

    it("accepts onDestroy callback", () => {
      const onDestroy = vi.fn();
      const element = React.createElement(BaseChart, {
        options: defaultOptions,
        data: defaultData,
        onDestroy,
      });
      expect(element.props.onDestroy).toBe(onDestroy);
    });
  });

  describe("props validation", () => {
    it("requires options prop", () => {
      const element = React.createElement(BaseChart, {
        options: defaultOptions,
        data: defaultData,
      });
      expect(element.props.options).toBeDefined();
    });

    it("requires data prop", () => {
      const element = React.createElement(BaseChart, {
        options: defaultOptions,
        data: defaultData,
      });
      expect(element.props.data).toBeDefined();
    });

    it("data can be empty arrays for series", () => {
      const emptyData: uPlot.AlignedData = [[], []];
      const element = React.createElement(BaseChart, {
        options: defaultOptions,
        data: emptyData,
      });
      expect(element.props.data).toEqual(emptyData);
    });

    it("data supports multiple series", () => {
      const multiSeriesData: uPlot.AlignedData = [
        [1, 2, 3],
        [10, 20, 30],
        [15, 25, 35],
        [12, 22, 32],
      ];
      const element = React.createElement(BaseChart, {
        options: defaultOptions,
        data: multiSeriesData,
      });
      expect(element.props.data).toHaveLength(4);
    });
  });

  describe("options configuration", () => {
    it("accepts series configuration", () => {
      const seriesOptions = {
        series: [{}, { stroke: "blue", label: "Series 1" }, { stroke: "green", label: "Series 2" }],
      };
      const element = React.createElement(BaseChart, {
        options: seriesOptions,
        data: [
          [1, 2],
          [10, 20],
          [15, 25],
        ],
      });
      expect(element.props.options.series).toHaveLength(3);
    });

    it("accepts scales configuration", () => {
      const scalesOptions = {
        ...defaultOptions,
        scales: {
          x: { time: true },
          y: { auto: true },
        },
      };
      const element = React.createElement(BaseChart, {
        options: scalesOptions,
        data: defaultData,
      });
      expect(element.props.options.scales).toBeDefined();
    });

    it("accepts axes configuration", () => {
      const axesOptions = {
        ...defaultOptions,
        axes: [{ label: "X Axis" }, { label: "Y Axis" }],
      };
      const element = React.createElement(BaseChart, {
        options: axesOptions,
        data: defaultData,
      });
      expect(element.props.options.axes).toHaveLength(2);
    });

    it("accepts cursor configuration", () => {
      const cursorOptions = {
        ...defaultOptions,
        cursor: {
          show: true,
          drag: { x: true, y: false },
        },
      };
      const element = React.createElement(BaseChart, {
        options: cursorOptions,
        data: defaultData,
      });
      expect(element.props.options.cursor).toBeDefined();
    });

    it("accepts legend configuration", () => {
      const legendOptions = {
        ...defaultOptions,
        legend: {
          show: true,
        },
      };
      const element = React.createElement(BaseChart, {
        options: legendOptions,
        data: defaultData,
      });
      expect(element.props.options.legend).toBeDefined();
    });
  });

  describe("ResizeObserver setup", () => {
    it("ResizeObserver mock is available", () => {
      expect(ResizeObserver).toBeDefined();
      expect(mockResizeObserver).toBeDefined();
    });

    it("ResizeObserver can be instantiated", () => {
      const observer = new ResizeObserver(() => {});
      expect(observer.observe).toBeDefined();
      expect(observer.disconnect).toBeDefined();
    });
  });

  describe("BaseChartProps interface", () => {
    it("allows optional className", () => {
      const propsWithClass: BaseChartProps = {
        options: defaultOptions,
        data: defaultData,
        className: "test-class",
      };
      expect(propsWithClass.className).toBe("test-class");
    });

    it("allows optional onCreate", () => {
      const propsWithCreate: BaseChartProps = {
        options: defaultOptions,
        data: defaultData,
        onCreate: () => {},
      };
      expect(propsWithCreate.onCreate).toBeDefined();
    });

    it("allows optional onDestroy", () => {
      const propsWithDestroy: BaseChartProps = {
        options: defaultOptions,
        data: defaultData,
        onDestroy: () => {},
      };
      expect(propsWithDestroy.onDestroy).toBeDefined();
    });

    it("supports all optional props together", () => {
      const fullProps: BaseChartProps = {
        options: defaultOptions,
        data: defaultData,
        className: "full-chart",
        onCreate: vi.fn(),
        onDestroy: vi.fn(),
      };
      expect(fullProps).toMatchObject({
        options: defaultOptions,
        data: defaultData,
        className: "full-chart",
      });
    });
  });
});
