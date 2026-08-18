import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}

export function Container({
  children,
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={twMerge(
        clsx(
          "w-full mx-auto px-5 sm:px-8 lg:px-12",
          {
            "max-w-[1280px]": size === "default",
            "max-w-[960px]": size === "narrow",
            "max-w-[1440px]": size === "wide",
          },
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}
