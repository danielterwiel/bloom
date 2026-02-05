import { describe, expect, it } from "vitest";
import { serializeFilters, deserializeFilters } from "../url-state";
import type { CompanyFilters } from "../filters";

describe("serializeFilters", () => {
  it("returns empty string for empty filters", () => {
    expect(serializeFilters({})).toBe("");
  });

  it("serializes text filter", () => {
    const result = serializeFilters({ text: "rose" });
    expect(result).toBe("q=rose");
  });

  it("serializes categories", () => {
    const result = serializeFilters({ categories: ["Florist", "Nursery"] });
    expect(result).toBe("cat=Florist%2CNursery");
  });

  it("serializes specialties", () => {
    const result = serializeFilters({ specialties: ["Roses", "Tulips"] });
    expect(result).toBe("spec=Roses%2CTulips");
  });

  it("serializes certifications", () => {
    const result = serializeFilters({ certifications: ["Organic Certified"] });
    expect(result).toBe("cert=Organic+Certified");
  });

  it("serializes countries", () => {
    const result = serializeFilters({ countries: ["USA", "Netherlands"] });
    expect(result).toBe("country=USA%2CNetherlands");
  });

  it("serializes employees", () => {
    const result = serializeFilters({ employees: ["1-10"] });
    expect(result).toBe("emp=1-10");
  });

  it("serializes businessTypes", () => {
    const result = serializeFilters({ businessTypes: ["B2B"] });
    expect(result).toBe("biz=B2B");
  });

  it("serializes revenues", () => {
    const result = serializeFilters({ revenues: ["$1M-$5M"] });
    expect(result).toBe("rev=%241M-%245M");
  });

  it("serializes foundedMin", () => {
    const result = serializeFilters({ foundedMin: 2000 });
    expect(result).toContain("fmin=2000");
  });

  it("serializes foundedMax", () => {
    const result = serializeFilters({ foundedMax: 2020 });
    expect(result).toContain("fmax=2020");
  });

  it("serializes both founded min and max", () => {
    const result = serializeFilters({ foundedMin: 2000, foundedMax: 2020 });
    expect(result).toContain("fmin=2000");
    expect(result).toContain("fmax=2020");
  });

  it("omits undefined and empty array values", () => {
    const filters: CompanyFilters = {
      text: undefined,
      categories: [],
      specialties: undefined,
      foundedMin: undefined,
    };
    expect(serializeFilters(filters)).toBe("");
  });

  it("serializes multiple filters together", () => {
    const result = serializeFilters({
      text: "rose",
      categories: ["Florist"],
      foundedMin: 2000,
    });
    const params = new URLSearchParams(result);
    expect(params.get("q")).toBe("rose");
    expect(params.get("cat")).toBe("Florist");
    expect(params.get("fmin")).toBe("2000");
  });
});

describe("deserializeFilters", () => {
  it("returns empty object for empty string", () => {
    expect(deserializeFilters("")).toEqual({});
  });

  it("returns empty object for empty URLSearchParams", () => {
    expect(deserializeFilters(new URLSearchParams())).toEqual({});
  });

  it("deserializes text filter", () => {
    expect(deserializeFilters("q=rose")).toEqual({ text: "rose" });
  });

  it("deserializes categories", () => {
    const result = deserializeFilters("cat=Florist%2CNursery");
    expect(result.categories).toEqual(["Florist", "Nursery"]);
  });

  it("deserializes specialties", () => {
    const result = deserializeFilters("spec=Roses%2CTulips");
    expect(result.specialties).toEqual(["Roses", "Tulips"]);
  });

  it("deserializes certifications", () => {
    const result = deserializeFilters("cert=Organic+Certified");
    expect(result.certifications).toEqual(["Organic Certified"]);
  });

  it("deserializes countries", () => {
    const result = deserializeFilters("country=USA%2CNetherlands");
    expect(result.countries).toEqual(["USA", "Netherlands"]);
  });

  it("deserializes employees", () => {
    const result = deserializeFilters("emp=1-10");
    expect(result.employees).toEqual(["1-10"]);
  });

  it("deserializes businessTypes", () => {
    const result = deserializeFilters("biz=B2B");
    expect(result.businessTypes).toEqual(["B2B"]);
  });

  it("deserializes revenues", () => {
    const result = deserializeFilters("rev=%241M-%245M");
    expect(result.revenues).toEqual(["$1M-$5M"]);
  });

  it("deserializes foundedMin", () => {
    const result = deserializeFilters("fmin=2000");
    expect(result.foundedMin).toBe(2000);
  });

  it("deserializes foundedMax", () => {
    const result = deserializeFilters("fmax=2020");
    expect(result.foundedMax).toBe(2020);
  });

  it("ignores invalid number for foundedMin", () => {
    const result = deserializeFilters("fmin=abc");
    expect(result.foundedMin).toBeUndefined();
  });

  it("ignores invalid number for foundedMax", () => {
    const result = deserializeFilters("fmax=xyz");
    expect(result.foundedMax).toBeUndefined();
  });

  it("deserializes multiple filters together", () => {
    const result = deserializeFilters("q=rose&cat=Florist&fmin=2000");
    expect(result).toEqual({
      text: "rose",
      categories: ["Florist"],
      foundedMin: 2000,
    });
  });

  it("accepts URLSearchParams object", () => {
    const params = new URLSearchParams();
    params.set("q", "test");
    params.set("cat", "Nursery");
    const result = deserializeFilters(params);
    expect(result).toEqual({
      text: "test",
      categories: ["Nursery"],
    });
  });

  it("ignores unknown params", () => {
    const result = deserializeFilters("q=rose&unknown=value&foo=bar");
    expect(result).toEqual({ text: "rose" });
  });
});

describe("roundtrip", () => {
  it("serialize then deserialize preserves all filters", () => {
    const original: CompanyFilters = {
      text: "rose garden",
      categories: ["Florist", "Nursery"],
      specialties: ["Roses", "Tulips"],
      certifications: ["Organic Certified", "Fair Trade"],
      countries: ["USA", "Netherlands"],
      employees: ["1-10", "11-50"],
      businessTypes: ["B2B", "B2C"],
      revenues: ["$1M-$5M"],
      foundedMin: 2000,
      foundedMax: 2020,
    };

    const serialized = serializeFilters(original);
    const deserialized = deserializeFilters(serialized);
    expect(deserialized).toEqual(original);
  });

  it("roundtrip empty filters", () => {
    const serialized = serializeFilters({});
    const deserialized = deserializeFilters(serialized);
    expect(deserialized).toEqual({});
  });

  it("roundtrip single category", () => {
    const original: CompanyFilters = { categories: ["Florist"] };
    const serialized = serializeFilters(original);
    const deserialized = deserializeFilters(serialized);
    expect(deserialized).toEqual(original);
  });
});
