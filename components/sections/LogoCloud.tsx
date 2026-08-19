"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

const BRANDS = [
  { name: "LUMA", label: "CLOUD INFRASTRUCTURE" },
  { name: "ORBIT", label: "FINANCIAL LABS" },
  { name: "NOVA", label: "SYSTEMS" },
  { name: "ASTER", label: "LUXURY COMMERCE" },
  { name: "KIN", label: "OPERATING SYSTEM" },
  { name: "FORM", label: "ARCHITECTURE" },
];

export function LogoCloud() {
  // Duplicating array to create a seamless 100% infinite marquee loop
  const marqueeBrands = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <div className="w-full border-y border-north-border bg-north-surface py-12 md:py-16 overflow-hidden transition-colors">
      <Container>
        <Reveal>
          <p className="text-center text-xs font-bold tracking-widest uppercase text-north-muted mb-10">
            Trusted by teams building what comes next.
          </p>
        </Reveal>
      </Container>

      {/* Infinite Scrolling Ticker with Left & Right Gradient Fades */}
      <Reveal delay={0.1}>
        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,_transparent_0%,_black_10%,_black_90%,_transparent_100%)]">
          <motion.div
            className="flex items-center gap-12 sm:gap-16 w-max py-2 cursor-pointer"
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25,
            }}
            whileHover={{ transition: { duration: 60 } }}
          >
            {marqueeBrands.map((brand, idx) => (
              <motion.div
                key={`${brand.name}-${idx}`}
                whileHover={{ y: -4, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group flex flex-col items-center justify-center px-6 py-2 select-none flex-shrink-0"
              >
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-north-primary transition-colors duration-300 group-hover:text-north-accent">
                  {brand.name}
                </span>
                <span className="text-[9px] tracking-widest font-mono text-north-muted uppercase mt-1 transition-colors duration-300 group-hover:text-north-primary font-semibold">
                  {brand.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Reveal>
    </div>
  );
}

