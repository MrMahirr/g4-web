import Link from "next/link";
import type { UseFormRegisterReturn } from "react-hook-form";
import { routes } from "@/data/navigation.data";

type Props = { id: string; error?: string; registration: UseFormRegisterReturn };

/** KVKK onay kutusu — tüm formlarda zorunlu (tasarımda yoktu; plan 7.4). */
export function KvkkConsent({ id, error, registration }: Props) {
  return (
    <div className="col-span-full flex flex-col gap-2">
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-[1.6] text-muted">
        <input
          type="checkbox"
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${id}-hata` : undefined}
          className="mt-1 size-4 flex-none cursor-pointer accent-ember-d"
          {...registration}
        />
        <span>
          <Link href={routes.kvkk} className="font-semibold text-ink">
            KVKK Aydınlatma Metni
          </Link>
          &apos;ni okudum; kişisel verilerimin talebimin yanıtlanması amacıyla işlenmesini kabul ediyorum.
        </span>
      </label>
      {error ? (
        <p id={`${id}-hata`} role="alert" className="text-[13px] text-ember-d">
          {error}
        </p>
      ) : null}
    </div>
  );
}
