import type { Thing, WithContext } from "schema-dts";

type JsonLdData = WithContext<Thing> | { "@context": "https://schema.org"; "@graph": Thing[] };

/**
 * Yapılandırılmış veri (schema.org JSON-LD). `<` karakteri kaçırılır; metinden gelen
 * "</script>" etiketi betiği kapatamaz (Next JSON-LD kılavuzu).
 */
export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  );
}
