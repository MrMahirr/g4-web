import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";

export default function HomePage() {
  return (
    <Container as="main" className="flex min-h-dvh flex-col items-start justify-center gap-6 py-24">
      <Tag>Yapım aşamasında</Tag>
      <h1 className="font-display text-d2">G4 Yatırım · İnşaat · Medikal</h1>
      <p className="max-w-[560px] text-lead text-muted">Anasayfa Faz 5&apos;te yapılacak. Tasarım sistemi hazır.</p>
      {process.env.NODE_ENV !== "production" ? (
        <Button href="/stil" variant="coal">
          Stil kılavuzunu aç
        </Button>
      ) : null}
    </Container>
  );
}
