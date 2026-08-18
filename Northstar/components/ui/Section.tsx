import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
  spacing?: "default" | "tight" | "loose" | "none";
}

export function Section({
  children,
  className,
  id,
  spacing = "default",
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={twMerge(
        clsx(
          "w-full relative overflow-hidden",
          {
            "py-16 md:py-28 lg:py-36": spacing === "default",
            "py-12 md:py-16 lg:py-24": spacing === "tight",
            "py-24 md:py-36 lg:py-48": spacing === "loose",
            "py-0": spacing === "none",
          },
          className
        )
      )}
      {...props}
    >
      {children}
    </section>
  );
}
