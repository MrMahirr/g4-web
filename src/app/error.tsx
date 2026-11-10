"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Uygulama hatası:", error);
  }, [error]);

  return <Container as="section" className="flex min-h-[60vh] flex-col justify-center py-24">
    <p className="font-mono text-xs uppercase tracking-[.14em] text-ember-d">Bir sorun oluştu</p>
    <h1 className="mt-5 max-w-3xl font-display text-d2">Sayfa şu anda yüklenemiyor.</h1>
    <p className="mt-5 max-w-xl text-lead text-muted">Biraz sonra yeniden deneyebilirsiniz.</p>
    <Button onClick={reset} className="mt-8 self-start">Yeniden Dene</Button>
  </Container>;
}
