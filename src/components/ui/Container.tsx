import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

type Props<T extends ElementType> = { as?: T } & Omit<ComponentPropsWithoutRef<T>, "as">;

/** 1320px konteyner, 32px yan boşluk. */
export function Container<T extends ElementType = "div">({ as, className, ...rest }: Props<T>) {
  const Component: ElementType = as ?? "div";
  return <Component {...rest} className={cn("mx-auto w-full max-w-site px-8", className)} />;
}
