import type { InquiryType, QuoteLine } from "@/core/types";

type ProductInfo = { name: string; code?: string };
type DraftLabels = {
  hello: string;
  thanks: string;
  subject: Record<InquiryType, string>;
  intro: Record<InquiryType, string>;
  countSuffix: string;
};

type BuildInquiryDraftInput = {
  type: InquiryType | null;
  lines: QuoteLine[];
  products: Map<string, ProductInfo>;
  legacyProduct: string | null;
  labels: DraftLabels;
};

export function buildInquiryDraft(input: BuildInquiryDraftInput): { subject: string; message: string } | null {
  const { type, lines, products, legacyProduct, labels } = input;
  if (!type) return null;
  const described = lines.map((line) => {
    const product = products.get(line.productSlug);
    const name = product?.name ?? line.productSlug;
    const code = product?.code ? ` (Ref: ${product.code})` : "";
    return type === "siparis" ? `- ${name}${code} – ${line.qty} ${line.unit}` : `- ${name}${code}`;
  });
  if (!described.length && legacyProduct) described.push(`- ${legacyProduct}`);
  if (!described.length) return null;
  const single = lines.length === 1 ? products.get(lines[0].productSlug) : undefined;
  const count = `${lines.length} ${labels.countSuffix}`;
  const suffix = single ? ` – ${single.code ?? single.name}` : lines.length > 1 ? ` – ${count}` : "";
  return {
    subject: `${labels.subject[type]}${suffix}`,
    message: [labels.hello, "", labels.intro[type], "", ...described, "", labels.thanks].join("\n"),
  };
}
