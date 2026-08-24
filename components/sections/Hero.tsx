"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { HeroData, DEFAULT_HERO_DATA } from "@/sanity/lib/fetch";

interface HeroProps {
  data?: HeroData;
}

export function Hero({ data = DEFAULT_HERO_DATA }: HeroProps) {
  const content = data || DEFAULT_HERO_DATA;

  return (
    <section className="relative w-full pt-32 sm:pt-40 md:pt-48 pb-16 md:pb-24 overflow-hidden">
      <Container>
        <div className="flex flex-col w-full max-w-6xl mx-auto">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 mb-6 sm:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-north-accent animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-north-muted">
              {content.label}
            </span>
          </motion.div>

          {/* Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[100px] leading-[0.95] tracking-tight text-north-primary font-normal mb-8 sm:mb-10"
          >
            {content.title}
          </motion.h1>

          {/* Supporting copy & CTAs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12 sm:mb-16">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:col-span-7 text-lg sm:text-xl md:text-2xl text-north-muted font-normal leading-relaxed"
            >
              {content.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="md:col-span-5 flex flex-col sm:flex-row gap-3.5 sm:gap-4 items-stretch sm:items-center justify-start lg:justify-end w-full"
            >
              <Button href={content.primaryCtaLink} variant="primary" size="lg" showArrow className="w-full sm:w-auto">
                {content.primaryCtaLabel}
              </Button>
              <Button href={content.secondaryCtaLink} variant="secondary" size="lg" className="w-full sm:w-auto">
                {content.secondaryCtaLabel}
              </Button>
            </motion.div>
          </div>

          {/* Editorial Hero Autoplay Video Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-sm overflow-hidden border border-north-border bg-north-surface group shadow-2xl"
          >
            {/* Base Image Fallback */}
            {content.fallbackImage && (
              <Image
                src={content.fallbackImage}
                alt={content.title || "Northstar Studio Showcase"}
                fill
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            )}

            {/* Seamless Autoplay Video Showcase */}
            {content.videoUrl && (
              <video
                src={content.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

            {/* Stage Bottom Corner Label */}
            <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center text-xs text-white/90 uppercase tracking-widest font-mono pointer-events-none z-10">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-north-accent animate-ping" />
                {content.locationLabel}
              </span>
              <span>{content.establishedLabel}</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

