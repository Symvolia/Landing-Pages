import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-6 md:px-10", className)}>{children}</div>;
}

export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[0.72rem] font-medium uppercase tracking-[0.28em] text-copper", className)}>
      {children}
    </p>
  );
}

export function Section({
  id,
  children,
  className,
  tone = "light",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "paper" | "dark";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-28",
        tone === "dark" && "bg-ink text-cream",
        tone === "paper" && "bg-paper text-text",
        tone === "light" && "bg-cream text-text",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
