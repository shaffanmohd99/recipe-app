import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TypographyProps = { children: ReactNode; className?: string };

export function TypographyH2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH4({ children, className }: TypographyProps) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  );
}
export function TypographyP({ children, className }: TypographyProps) {
  return (
    <p className={cn("leading-7 ", className)}>
      {children}
    </p>
  );
}
