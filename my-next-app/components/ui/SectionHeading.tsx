import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleSize?: "default" | "large" | "hero";
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className,
  titleSize = "default",
}: SectionHeadingProps) {
  return (
    <div
      className={twMerge(
        clsx(
          "flex flex-col mb-12 md:mb-16 lg:mb-20",
          {
            "items-start text-left": align === "left",
            "items-center text-center mx-auto max-w-3xl": align === "center",
          },
          className
        )
      )}
    >
      {label && (
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-north-accent" />
          <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-north-muted">
            {label}
          </span>
        </div>
      )}
      <h2
        className={clsx(
          "font-serif font-normal tracking-tight text-north-primary leading-[1.1]",
          {
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl": titleSize === "default",
            "text-4xl sm:text-5xl md:text-6xl lg:text-7xl": titleSize === "large",
            "text-5xl sm:text-6xl md:text-7xl lg:text-8xl": titleSize === "hero",
          }
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-north-muted font-normal max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
