"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { MOCK_STATS } from "@/lib/mock-data";

function AnimatedCounter({ value }: { value: string }) {
  const numericMatch = value.match(/\d+/);
  const numericValue = numericMatch ? parseInt(numericMatch[0], 10) : NaN;
  const prefix = value.substring(0, value.indexOf(numericMatch?.[0] || ""));
  const suffix = value.substring(
    (value.indexOf(numericMatch?.[0] || "") || 0) + (numericMatch?.[0].length || 0)
  );

  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && !isNaN(numericValue)) {
      const controls = animate(0, numericValue, {
        duration: 2,
        ease: [0.21, 0.47, 0.32, 0.98],
        onUpdate(latest) {
          setDisplayValue(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, numericValue]);

  if (isNaN(numericValue)) {
    return <span>{value}</span>;
  }

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section className="py-8 sm:py-10 md:py-12 bg-north-surface border-y border-north-border transition-colors">
      <Container>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {MOCK_STATS.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 * idx, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="group relative flex flex-col p-4 sm:p-5 md:p-6 rounded-sm bg-north-bg/0 hover:bg-north-bg/60 border border-transparent hover:border-north-border/80 transition-all duration-500 overflow-hidden cursor-default shadow-none hover:shadow-xl"
            >
              {/* Left Vertical Accent Line: Animated Grow Top to Bottom on Hover */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-north-border/50 group-hover:bg-north-accent transition-colors duration-500">
                <div className="w-full h-full bg-north-accent origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
              </div>

              {/* Big Stat Value with Count-Up Entrance & Hover Lift */}
              <div className="flex items-baseline gap-1 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight mb-2 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105 origin-left">
                <span className="text-north-accent font-medium">
                  <AnimatedCounter value={stat.value} />
                </span>
              </div>

              {/* Label */}
              <h3 className="text-sm sm:text-base font-semibold text-north-primary mb-1.5 transition-colors duration-300">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-xs text-north-muted leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}


