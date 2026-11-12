"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("i18n.error");
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container as="section" className="flex min-h-[60vh] flex-col justify-center py-24">
      <p className="font-mono text-xs tracking-[.14em] text-ember-d uppercase">{t("eyebrow")}</p>
      <h1 className="mt-5 max-w-3xl font-display text-d2">{t("title")}</h1>
      <p className="mt-5 max-w-xl text-lead text-muted">{t("text")}</p>
      <Button onClick={reset} className="mt-8 self-start">
        {t("retry")}
      </Button>
    </Container>
  );
}
