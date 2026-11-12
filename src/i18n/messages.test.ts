import { describe, expect, it } from "vitest";
import tr from "../../messages/tr.json";
import en from "../../messages/en.json";

type Json = string | Json[] | { [key: string]: Json };

function paths(value: Json, path = "$"): string[] {
  if (typeof value === "string") {
    expect(value, `${path} must not be empty`).not.toBe("");
    return [path];
  }
  if (Array.isArray(value)) return value.flatMap((item, index) => paths(item, `${path}[${index}]`));
  return Object.keys(value).sort().flatMap((key) => paths(value[key]!, `${path}.${key}`));
}

describe("message catalogs", () => {
  it("has matching non-empty paths", () => {
    expect(paths(tr)).toEqual(paths(en));
  });
});
