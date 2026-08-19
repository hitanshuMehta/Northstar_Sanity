import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center font-medium tracking-wide uppercase rounded-full transition-colors",
          {
            "bg-north-surface text-north-primary border border-north-border":
              variant === "default",
            "bg-north-accent/10 text-north-accent border border-north-accent/30 font-semibold":
              variant === "accent",
            "bg-transparent text-north-muted border border-north-border":
              variant === "outline",
            "text-[10px] px-2.5 py-0.5": size === "sm",
            "text-xs px-3.5 py-1": size === "md",
          },
          className
        )
      )}
    >
      {children}
    </span>
  );
}
