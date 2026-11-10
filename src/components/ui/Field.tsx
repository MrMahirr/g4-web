import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type FieldProps = {
  /** Alanın id'si; etiket ve hata mesajı bununla bağlanır. */
  id: string;
  label: ReactNode;
  /** Doğrulama hatası (varsa alanın altında gösterilir). */
  error?: string;
  className?: string;
  children: ReactNode;
};

/** Mono etiket + alt çizgili giriş; odaklanınca kor rengi çizgi soldan dolar. */
export function Field({ id, label, error, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="font-mono text-xs tracking-[0.06em] text-muted uppercase">
        {label}
      </label>
      <div
        className={cn(
          "relative after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-ember after:content-['']",
          "after:transition-transform after:duration-500 after:ease-soft focus-within:after:scale-x-100",
        )}
      >
        {children}
      </div>
      {error ? (
        <p id={`${id}-hata`} role="alert" className="text-[13px] text-ember-d">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type SharedInputProps = {
  /** Otomatik doldurulmuş (ürün talebinden gelen) alan görünümü. */
  auto?: boolean;
  invalid?: boolean;
};

function inputClass(auto: boolean | undefined, className: string | undefined) {
  return cn(
    "block min-h-14 w-full rounded-none border-0 border-b-[1.5px] border-line bg-transparent py-3.5 text-[17px] text-ink",
    "transition-colors duration-300 outline-none focus:border-ember focus-visible:outline-none",
    "aria-invalid:border-ember-d",
    auto && "border-ember bg-linear-to-r from-ember/8 to-transparent to-70%",
    className,
  );
}

function describedBy(id: string | undefined, invalid: boolean | undefined) {
  return invalid && id ? `${id}-hata` : undefined;
}

export function TextInput({
  auto,
  invalid,
  className,
  type = "text",
  ...rest
}: SharedInputProps & ComponentPropsWithoutRef<"input">) {
  return (
    <input
      type={type}
      {...rest}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy(rest.id, invalid)}
      className={inputClass(auto, className)}
    />
  );
}

export function Textarea({ auto, invalid, className, ...rest }: SharedInputProps & ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea
      {...rest}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy(rest.id, invalid)}
      className={inputClass(auto, cn("min-h-[130px] resize-y", className))}
    />
  );
}
