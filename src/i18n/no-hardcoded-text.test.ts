import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";

/*
  Kaynakta elle yazılmış arayüz metni kalmasın diye koruma testleri. Metinler messages/{tr,en}.json
  (arayüz) veya content/{base,tr,en}/*.json (kayıtlar) içinde durur; kodda yalnız anahtar geçer.
*/

const sourceRoot = join(process.cwd(), "src");

/** Çevrilmeyen, dile bağlı olmayan değerler. */
const allowedText = [
  "G4", // Marka adı.
  "g4.com.tr", // Kanonik alan adı, arayüz metni değil.
  "Ctrl K", // Klavye kısayolu gösterimi.
  "ESC", // Klavye kısayolu gösterimi.
  "REF:", // Ürün referans kodu öneki, sektör tanımlayıcısı.
  "WhatsApp", // Tescilli ürün adı.
];

/** Metin taşıyan JSX özellikleri (bileşen etiketleri dahil). */
const textProps = new Set([
  "aria-label",
  "alt",
  "title",
  "placeholder",
  "label",
  "description",
  "placeholderLabel",
  "ghost",
  "tag",
  "subject",
]);

/**
 * Metin taşıyan nesne alanları (kırıntı, meta veri). `ghost`/`tag` burada yok: cva varyant
 * nesnelerinde aynı adlar sınıf listesi taşır.
 */
const textObjectKeys = new Set(["label", "title", "description", "alt", "placeholder"]);

/**
 * Türkçe harf içerebilen ama arayüzde gösterilmeyen değerler (dosya → gerekçe).
 * Yeni bir istisna eklemeden önce metnin gerçekten kullanıcıya gösterilmediğinden emin ol.
 */
const turkishAllowedFiles: Record<string, string> = {
  [join("core", "container.ts")]: "geliştiriciye yönelik hata mesajı",
  [join("hooks", "useCatalogSummary.ts")]: "geliştiriciye yönelik hata mesajı",
  [join("lib", "structured-data.ts")]: "schema.org adres değerleri (ülke adı)",
};

function files(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  });
}

function isExcluded(path: string): boolean {
  return path.includes(join("src", "app", "stil")) || path.includes(".test.");
}

function hasLetters(value: string): boolean {
  return /\p{L}/u.test(value);
}

/** Düz metin veya şablonun sabit parçaları (ifadeler hariç). */
function literalText(node: ts.Node | undefined): string | undefined {
  if (!node) return undefined;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isTemplateExpression(node)) {
    return [node.head.text, ...node.templateSpans.map((span) => span.literal.text)].join(" ").trim();
  }
  if (ts.isJsxExpression(node)) return literalText(node.expression);
  return undefined;
}

function propName(name: ts.Node): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name)) return name.text;
  return undefined;
}

function parse(path: string): ts.SourceFile {
  const kind = path.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  return ts.createSourceFile(path, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true, kind);
}

const sourceFiles = files(sourceRoot).filter((path) => /\.tsx?$/.test(path) && !isExcluded(path));

describe("i18n source guards", () => {
  it("does not contain hard-coded JSX text or text props", () => {
    const violations: string[] = [];
    for (const path of sourceFiles.filter((file) => file.endsWith(".tsx"))) {
      const visit = (node: ts.Node) => {
        if (ts.isJsxText(node)) {
          const value = node.text.trim();
          if (value && hasLetters(value) && !allowedText.includes(value)) violations.push(`${path}: ${value}`);
        }

        const isTextAttribute = ts.isJsxAttribute(node) && textProps.has(propName(node.name) ?? "");
        const isTextProperty = ts.isPropertyAssignment(node) && textObjectKeys.has(propName(node.name) ?? "");
        if (isTextAttribute || isTextProperty) {
          const value = literalText(node.initializer);
          if (value && hasLetters(value) && !allowedText.includes(value)) {
            violations.push(`${path}: ${propName(node.name)}=${value}`);
          }
        }
        ts.forEachChild(node, visit);
      };
      visit(parse(path));
    }
    expect(violations).toEqual([]);
  });

  it("does not contain Turkish string literals outside messages/content", () => {
    // Türkçe harf, metnin JSON yerine koda yazıldığının en güvenilir işaretidir (meta veri, toast,
    // e-posta gövdesi, varsayılan prop değeri gibi yukarıdaki kuralın görmediği yerler dahil).
    const violations: string[] = [];
    for (const path of sourceFiles) {
      const rel = relative(sourceRoot, path);
      if (rel in turkishAllowedFiles) continue;
      const visit = (node: ts.Node) => {
        const value = ts.isJsxText(node) ? node.text : literalText(node);
        if (value && /[çğıöşüÇĞİÖŞÜ]/.test(value)) violations.push(`${rel.split(sep).join("/")}: ${value.trim()}`);
        ts.forEachChild(node, visit);
      };
      visit(parse(path));
    }
    expect(violations).toEqual([]);
  });

  it("does not use px arbitrary breakpoint variants", () => {
    // Tailwind 4 sorts px arbitrary breakpoints separately from rem theme breakpoints
    // (--breakpoint-stack: 60rem etc.), so max-[600px]: rules were emitted before max-stack:
    // rules and got overridden; use rem instead (for example, max-[37.5rem]:).
    const violations = sourceFiles.filter((path) => /\b(max|min)-\[\d+px\]:/.test(readFileSync(path, "utf8")));
    expect(violations).toEqual([]);
  });
});
