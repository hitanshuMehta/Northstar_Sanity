"use client";

import React from "react";
import Link from "next/link";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ArrowRight } from "lucide-react";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  href?: string;
  showArrow?: boolean;
  className?: string;
  target?: string;
  rel?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  showArrow = false,
  className,
  target,
  rel,
  ...props
}: ButtonProps) {
  const baseClasses = twMerge(
    clsx(
      "inline-flex items-center justify-center font-medium whitespace-nowrap transition-all duration-300 rounded-sm cursor-pointer select-none",
      {
        // Variants
        "bg-[#C7FF3D] text-[#111111] hover:bg-[#b5f228] hover:shadow-lg hover:shadow-[#C7FF3D]/20 border border-[#C7FF3D]":
          variant === "primary",
        "bg-transparent text-north-primary border border-north-border hover:border-north-primary hover:bg-north-surface":
          variant === "secondary",
        "bg-transparent text-north-primary hover:bg-north-surface":
          variant === "ghost",
        "bg-transparent text-north-primary hover:text-north-accent p-0 border-none":
          variant === "link",

        // Sizes
        "text-xs px-4 py-2 gap-1.5": size === "sm" && variant !== "link",
        "text-sm px-6 py-3.5 gap-2": size === "md" && variant !== "link",
        "text-base px-8 py-4 gap-2.5": size === "lg" && variant !== "link",
        "text-sm gap-2": variant === "link",
      },
      className
    )
  );

  const content = (
    <>
      <span className="whitespace-nowrap">{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
      )}
    </>
  );

  if (href) {
    const isWFull = className?.includes("w-full");
    const isSmAuto = className?.includes("sm:w-auto");
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={twMerge(
          "inline-block group",
          isWFull && "w-full",
          isSmAuto && "sm:w-auto"
        )}
      >
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={baseClasses}
        >
          {content}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={clsx("group", baseClasses)}
      {...props}
    >
      {content}
    </motion.button>
  );
}
