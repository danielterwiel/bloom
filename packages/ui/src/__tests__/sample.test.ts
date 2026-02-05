import { describe, expect, it } from "vitest";

describe("sample test", () => {
  it("should pass basic assertion", () => {
    expect(1 + 1).toBe(2);
  });

  it("should handle truthy/falsy values", () => {
    expect(true).toBe(true);
    expect(false).toBe(false);
  });
});
