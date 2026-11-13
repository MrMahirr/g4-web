import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowSwap } from "./ArrowSwap";

/** Tasarım D düğmesi: köşeli, ok kutulu; üzerine gelince zıt renk alttan dolar. */
const buttonVariants = cva(
  [
    "group/bt relative isolate inline-flex max-w-full cursor-pointer items-stretch overflow-hidden rounded-btn",
    "text-[0.9375rem] font-semibold no-underline transition-colors duration-300",
    "before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:content-['']",
    "before:transition-transform before:duration-500 before:ease-soft hover:before:scale-y-100",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        ember: "bg-ember-d text-white before:bg-ink",
        coal: "bg-ink text-white before:bg-ember-d",
        ivory: "bg-ivory text-ink before:bg-ember hover:text-white",
        ghost: "bg-transparent text-ink inset-ring inset-ring-ink before:bg-ink hover:text-white",
      },
      size: {
        md: "min-h-14",
        sm: "min-h-12",
      },
    },
    defaultVariants: { variant: "ember", size: "md" },
  },
);

const arrowBoxVariants = cva("relative flex items-center justify-center overflow-hidden border-l", {
  variants: {
    variant: {
      ember: "border-white/20",
      coal: "border-white/20",
      ivory: "border-ink/15",
      ghost: "border-ink/20",
    },
    size: { md: "w-14", sm: "w-12" },
  },
  defaultVariants: { variant: "ember", size: "md" },
});

export type ButtonArrow = "right" | "up-right" | "none";

type CommonProps = VariantProps<typeof buttonVariants> & {
  /** Ok kutusu: birincil eylemlerde var, ikincil (ghost) düğmelerde çoğunlukla yok. */
  arrow?: ButtonArrow;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant, size, arrow = "right", className, children, ...rest } = props;
  const classes = cn(buttonVariants({ variant, size }), className);
  const content = (
    <>
      <span className="flex min-w-0 items-center px-6 whitespace-nowrap max-sm:py-3 max-sm:whitespace-normal">
        {children}
      </span>
      {arrow !== "none" ? (
        <span className={arrowBoxVariants({ variant, size })}>
          <ArrowSwap trigger="bt" direction={arrow} size={arrow === "right" ? 18 : 16} />
        </span>
      ) : null}
    </>
  );

  if (typeof rest.href === "string") {
    return (
      <Link {...(rest as Omit<LinkButtonProps, keyof CommonProps>)} className={classes}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonRest } = rest as Omit<NativeButtonProps, keyof CommonProps>;
  return (
    <button type={type} {...buttonRest} className={classes}>
      {content}
    </button>
  );
}
