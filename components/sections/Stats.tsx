"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { MOCK_STATS } from "@/lib/mock-data";

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section className="bg-north-surface border-y border-north-border transition-colors">
      <Container>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {MOCK_STATS.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className="flex flex-col border-l border-north-border pl-6 sm:pl-8 py-2"
            >
              <div className="flex items-baseline gap-1 font-serif text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight mb-3">
                <span className="text-north-accent font-medium">{stat.value}</span>
              </div>
              <h3 className="text-base sm:text-lg font-medium text-north-primary mb-2">
                {stat.label}
              </h3>
              <p className="text-xs sm:text-sm text-north-muted leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
