"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SafeImage } from "../ui/SafeImage";
import { LogoCloudData } from "@/sanity/lib/fetch";

interface LogoCloudProps {
  data?: LogoCloudData;
}

export function LogoCloud({ data }: LogoCloudProps) {
  if (!data) return null;

  const logos = Array.isArray(data.logos) ? data.logos.filter((l) => l.name || l.logoImage) : [];

  if (logos.length === 0 && (!data.heading || data.heading.trim() === "")) {
    return null;
  }

  const marqueeBrands = logos.length > 0
    ? (logos.length < 5 ? [...logos, ...logos, ...logos, ...logos] : [...logos, ...logos, ...logos])
    : [];

  return (
    <div className="w-full border-y border-north-border bg-north-surface py-8 sm:py-10 md:py-12 overflow-hidden transition-colors">
      {data.heading && data.heading.trim() !== "" && (
        <Container>
          <Reveal>
            <div className="flex flex-col items-center justify-center text-center mb-6 sm:mb-8">
              <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-[0.2em] uppercase text-north-muted flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-north-accent animate-pulse" />
                {data.heading}
              </span>
            </div>
          </Reveal>
        </Container>
      )}

      {marqueeBrands.length > 0 && (
        <Reveal delay={0.1}>
          <div className="w-full max-w-6xl mx-auto px-4">
            <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,_transparent_0%,_black_15%,_black_85%,_transparent_100%)]">
              <motion.div
                className="flex items-center gap-12 sm:gap-16 lg:gap-20 w-max py-2 cursor-pointer"
                animate={{ x: ["0%", "-33.333%"] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 26,
                }}
                whileHover={{ transition: { duration: 60 } }}
              >
                {marqueeBrands.map((brand, idx) => (
                  <motion.div
                    key={`${brand.name}-${idx}`}
                    whileHover={{ y: -3, scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="group flex flex-col items-center justify-center px-4 py-1 select-none flex-shrink-0"
                  >
                    {brand.logoImage ? (
                      <div className="relative h-8 sm:h-10 w-28 sm:w-36 grayscale group-hover:grayscale-0 transition-all duration-300">
                        <SafeImage
                          src={brand.logoImage}
                          alt={brand.name}
                          fill
                          className="object-contain"
                          sizes="144px"
                          type="logo"
                        />
                      </div>
                    ) : (
                      <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-north-primary opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:text-north-accent">
                        {brand.name}
                      </span>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
}
