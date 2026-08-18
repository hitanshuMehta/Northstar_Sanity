"use client";

import React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export function Reveal({
  children,
  width = "100%",
  delay = 0,
  duration = 0.6,
  yOffset = 24,
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ width }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: yOffset },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{
          duration,
          delay,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
