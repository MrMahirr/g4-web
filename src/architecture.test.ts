import { readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

type Rule = {
  directory: string;
  forbidden: string[];
};

const sourceRoot = resolve(process.cwd(), "src");
const importPattern = /(?:import|export)\s+(?:type\s+)?(?:[\s\S]*?\s+from\s+)?["']([^"']+)["']/g;

const rules: Rule[] = [
  { directory: "core", forbidden: ["@/data", "@/components", "@/app", "@/hooks", "@/store"] },
  { directory: "lib", forbidden: ["@/components", "@/app"] },
  { directory: "hooks", forbidden: ["@/components", "@/app"] },
  { directory: "store", forbidden: ["@/components", "@/app"] },
  {
    directory: "components",
    forbidden: ["@/core/container", "@/core/services", "@/core/repositories", "@/content/load", "@/store/slices"],
  },
];

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    if (!/\.tsx?$/.test(entry.name) || /\.test\.ts$/.test(entry.name)) return [];
    return [path];
  });
}

function importsIn(file: string): { path: string; line: number }[] {
  const content = readFileSync(file, "utf8");
  return Array.from(content.matchAll(importPattern)).map((match) => ({
    path: match[1],
    line: content.slice(0, match.index).split("\n").length,
  }));
}

function aliasPath(file: string, importPath: string): string {
  if (importPath.startsWith("@/")) return importPath;
  if (!importPath.startsWith(".")) return importPath;
  const target = relative(sourceRoot, resolve(file, "..", importPath)).replaceAll("\\", "/");
  return `@/${target}`;
}

function violationsFor(rule: Rule): string[] {
  return sourceFiles(join(sourceRoot, rule.directory)).flatMap((file) =>
    importsIn(file)
      .map(({ path, line }) => ({ path: aliasPath(file, path), line }))
      .filter(({ path }) => rule.forbidden.some((forbidden) => path === forbidden || path.startsWith(`${forbidden}/`)))
      .map(({ path, line }) => `${relative(sourceRoot, file)}:${line} → ${path}`),
  );
}

function expectNoViolations(rule: Rule): void {
  const violations = violationsFor(rule);
  expect(violations, `${rule.directory} bağımlılık ihlalleri:\n${violations.join("\n")}`).toEqual([]);
}

describe("katman bağımlılıkları", () => {
  it("core dış katmanları içe aktaramaz", () => {
    expectNoViolations(rules[0]);
  });

  it("lib bileşen veya app katmanını içe aktaramaz", () => {
    expectNoViolations(rules[1]);
  });

  it("hooks bileşen veya app katmanını içe aktaramaz", () => {
    expectNoViolations(rules[2]);
  });

  it("store bileşen veya app katmanını içe aktaramaz", () => {
    expectNoViolations(rules[3]);
  });

  it("components altyapı uygulamalarını içe aktaramaz", () => {
    expectNoViolations(rules[4]);
  });

  it("types yalnız core tiplerini içe aktarır", () => {
    const violations = sourceFiles(join(sourceRoot, "types")).flatMap((file) =>
      importsIn(file)
        .map(({ path, line }) => ({ path: aliasPath(file, path), line }))
        .filter(({ path }) => path !== "@/core/types")
        .map(({ path, line }) => `${relative(sourceRoot, file)}:${line} → ${path}`),
    );
    expect(violations, `types bağımlılık ihlalleri:\n${violations.join("\n")}`).toEqual([]);
  });
});
