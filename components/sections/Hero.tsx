"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { SafeImage } from "../ui/SafeImage";
import { HeroData, HeroButton } from "@/sanity/lib/fetch";

interface HeroProps {
  data?: HeroData;
}

export function Hero({ data }: HeroProps) {
  if (!data) return null;

  const buttonsList: HeroButton[] = Array.isArray(data.buttons) && data.buttons.length > 0
    ? data.buttons
    : [
        ...(data.primaryCtaLabel
          ? [{ label: data.primaryCtaLabel, link: data.primaryCtaLink || "/work", variant: "primary" as const, showArrow: true }]
          : []),
        ...(data.secondaryCtaLabel
          ? [{ label: data.secondaryCtaLabel, link: data.secondaryCtaLink || "/contact", variant: "secondary" as const, showArrow: false }]
          : []),
      ];

  const hasMediaContent = Boolean(
    data.videoUrl ||
    data.fallbackImage ||
    data.locationLabel ||
    data.establishedLabel
  );

  if (!data.title && !data.description && !hasMediaContent && buttonsList.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full pt-32 sm:pt-40 md:pt-48 pb-16 md:pb-24 overflow-hidden">
      <Container>
        <div className="flex flex-col w-full max-w-6xl mx-auto">
          {/* Label / Tagline */}
          {data.label && data.label.trim() !== "" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 mb-6 sm:mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-north-accent animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-north-muted">
                {data.label}
              </span>
            </motion.div>
          )}

          {/* Editorial Headline */}
          {data.title && data.title.trim() !== "" && (
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[100px] leading-[0.95] tracking-tight text-north-primary font-normal mb-8 sm:mb-10"
            >
              {data.title}
            </motion.h1>
          )}

          {/* Supporting Copy & Dynamic CTAs */}
          {(data.description || buttonsList.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12 sm:mb-16">
              {data.description && data.description.trim() !== "" && (
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className={`${
                    buttonsList.length > 0 ? "md:col-span-7" : "md:col-span-12"
                  } text-lg sm:text-xl md:text-2xl text-north-muted font-normal leading-relaxed`}
                >
                  {data.description}
                </motion.p>
              )}

              {buttonsList.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className={`${
                    data.description ? "md:col-span-5" : "md:col-span-12"
                  } flex flex-wrap gap-3.5 sm:gap-4 items-stretch sm:items-center justify-start ${
                    data.description ? "lg:justify-end" : "lg:justify-start"
                  } w-full`}
                >
                  {buttonsList.map((btn, idx) => (
                    <Button
                      key={`${btn.link}-${idx}`}
                      href={btn.link}
                      variant={btn.variant === "secondary" ? "secondary" : "primary"}
                      size="lg"
                      showArrow={btn.showArrow !== false}
                      className="w-full sm:w-auto"
                    >
                      {btn.label}
                    </Button>
                  ))}
                </motion.div>
              )}
            </div>
          )}

          {/* Editorial Hero Showcase Stage */}
          {hasMediaContent && (
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-sm overflow-hidden border border-north-border bg-north-surface group shadow-2xl"
            >
              {data.fallbackImage ? (
                <SafeImage
                  src={data.fallbackImage}
                  alt={data.title || "Northstar Showcase"}
                  fill
                  priority
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  fallbackTitle={data.title}
                />
              ) : null}

              {data.videoUrl ? (
                <video
                  src={data.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
                />
              ) : null}

              {!data.fallbackImage && !data.videoUrl && (
                <SafeImage
                  src=""
                  alt={data.title || "Northstar Studio"}
                  fill
                  fallbackTitle={data.title || "NORTHSTAR STUDIO"}
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              {(data.locationLabel || data.establishedLabel) && (
                <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center text-xs text-white/90 uppercase tracking-widest font-mono pointer-events-none z-10">
                  {data.locationLabel ? (
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-north-accent animate-ping" />
                      {data.locationLabel}
                    </span>
                  ) : <span />}
                  {data.establishedLabel ? (
                    <span>{data.establishedLabel}</span>
                  ) : null}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
