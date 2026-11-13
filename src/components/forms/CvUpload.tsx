"use client";

import { FileText, Paperclip, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";

/** Kabul edilen uzantılar ve MIME türleri (bazı tarayıcılar .doc için boş tür verir; uzantı da kontrol edilir). */
const ACCEPT = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const EXTENSIONS = [".pdf", ".doc", ".docx"];
const CV_MAX_BYTES = 5 * 1024 * 1024;

type Props = {
  id: string;
  file: File | null;
  onChange: (file: File | null) => void;
  className?: string;
};

function isAllowed(file: File) {
  const name = file.name.toLowerCase();
  return EXTENSIONS.some((extension) => name.endsWith(extension));
}

/** CV dosyası seçme alanı: gizli dosya girişi + stilli düğme, seçilen dosya adı ve boyutu, kaldırma. */
export function CvUpload({ id, file, onChange, className }: Props) {
  const t = useTranslations("form");
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const errorId = `${id}-hata`;
  const hintId = `${id}-ipucu`;

  const clearInput = () => {
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.files?.[0] ?? null;
    if (!next) return;
    if (!isAllowed(next)) {
      setError(t("errors.cvType"));
      clearInput();
      return;
    }
    if (next.size > CV_MAX_BYTES) {
      setError(t("errors.cvSize"));
      clearInput();
      return;
    }
    setError(null);
    onChange(next);
  };

  const remove = () => {
    clearInput();
    setError(null);
    onChange(null);
    inputRef.current?.focus();
  };

  const sizeMb = file ? (file.size / (1024 * 1024)).toFixed(1) : "";

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="font-mono text-xs tracking-[0.06em] text-muted uppercase">{t("cv")}</span>
      <div
        className={cn(
          "flex min-h-14 items-center gap-4 border-b-[1.5px] py-2 transition-colors duration-300",
          error ? "border-ember-d" : file ? "border-ember" : "border-line",
        )}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={ACCEPT}
          onChange={handleChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${errorId} ${hintId}` : hintId}
          className="peer sr-only"
        />
        <label
          htmlFor={id}
          className={cn(
            "inline-flex min-h-10 flex-none cursor-pointer items-center gap-2 rounded-btn border border-ink/20 px-4",
            "text-[0.875rem] font-semibold text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white",
            "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ember",
          )}
        >
          <Paperclip size={16} aria-hidden="true" />
          {t("cvChoose")}
        </label>
        <span className={cn("flex min-w-0 flex-1 items-center gap-2 text-[0.9375rem]", file ? "text-ink" : "text-muted")}>
          {file ? <FileText size={16} aria-hidden="true" className="flex-none text-ember-d" /> : null}
          <span className="truncate" aria-live="polite">
            {file ? t("cvSelected", { name: file.name, size: sizeMb }) : t("cvEmpty")}
          </span>
        </span>
        {file ? (
          <button
            type="button"
            onClick={remove}
            aria-label={t("cvRemove")}
            className="grid size-10 flex-none cursor-pointer place-items-center rounded-full text-muted transition-colors duration-300 hover:bg-ink/7 hover:text-ink"
          >
            <X size={18} aria-hidden="true" />
          </button>
        ) : null}
      </div>
      <p id={hintId} className="font-mono text-[0.6875rem] tracking-[0.04em] text-muted uppercase">
        {t("cvHint")}
      </p>
      {error ? (
        <p id={errorId} role="alert" className="text-[0.8125rem] text-ember-d">
          {error}
        </p>
      ) : null}
    </div>
  );
}
