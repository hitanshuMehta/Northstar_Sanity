"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { MOCK_TESTIMONIALS } from "@/lib/mock-data";

export function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = MOCK_TESTIMONIALS[currentIndex];
  const total = MOCK_TESTIMONIALS.length;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <Section className="relative overflow-hidden py-24 sm:py-32">
      <Container size="narrow">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            {/* Top Testimonials Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-north-accent/10 border border-north-accent/30 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-north-accent animate-pulse" />
              <span className="text-xs font-mono font-semibold tracking-widest uppercase text-north-accent">
                CLIENT TESTIMONIALS
              </span>
            </div>

            {/* Quote Icon */}
            <div className="w-12 h-12 rounded-full bg-north-surface border border-north-border flex items-center justify-center mb-8 shadow-sm">
              <Quote className="w-5 h-5 text-north-primary" />
            </div>

            {/* Quote & Author Carousel Stage */}
            <div className="min-h-[240px] sm:min-h-[220px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="flex flex-col items-center"
                >
                  <blockquote className="font-serif text-2xl sm:text-4xl lg:text-5xl text-north-primary leading-[1.25] tracking-tight mb-8 max-w-3xl">
                    &ldquo;{current.quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-north-border bg-north-surface shadow-md">
                      <Image
                        src={current.avatar}
                        alt={current.author}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="text-left">
                      <h4 className="text-base font-semibold text-north-primary">
                        {current.author}
                      </h4>
                      <p className="text-xs text-north-muted">
                        {current.role}, <span className="text-north-primary font-medium">{current.company}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 5 High-Contrast Numbered Slider Controls */}
            <div className="flex items-center gap-3 sm:gap-5 mt-12 sm:mt-16">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="p-3 rounded-full border border-north-border hover:border-north-accent bg-north-surface text-north-primary hover:text-north-accent transition-all duration-300 focus:outline-none cursor-pointer group shadow-sm"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
              </button>

              {/* 5 Numbered Slide Pills */}
              <div className="flex items-center gap-2">
                {MOCK_TESTIMONIALS.map((t, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`transition-all duration-300 cursor-pointer font-mono text-xs font-bold rounded-full ${
                        isActive
                          ? "px-3.5 py-1.5 bg-[#C7FF3D] text-[#111111] border border-[#C7FF3D] shadow-md shadow-[#C7FF3D]/30 scale-105"
                          : "px-2.5 py-1.5 bg-north-surface text-north-muted hover:text-north-primary border border-north-border hover:border-north-muted"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    >
                      0{idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="p-3 rounded-full border border-north-border hover:border-north-accent bg-north-surface text-north-primary hover:text-north-accent transition-all duration-300 focus:outline-none cursor-pointer group shadow-sm"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
