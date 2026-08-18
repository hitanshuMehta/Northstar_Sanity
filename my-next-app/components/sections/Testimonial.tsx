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

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % MOCK_TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + MOCK_TESTIMONIALS.length) % MOCK_TESTIMONIALS.length);
  };

  return (
    <Section className="relative overflow-hidden">
      <Container size="narrow">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-north-surface border border-north-border flex items-center justify-center mb-8">
              <Quote className="w-5 h-5 text-north-primary" />
            </div>

            <div className="min-h-[220px] sm:min-h-[200px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <blockquote className="font-serif text-3xl sm:text-4xl lg:text-5xl text-north-primary leading-[1.25] tracking-tight mb-8 max-w-3xl">
                    &ldquo;{current.quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-north-border bg-north-surface">
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

            {/* Carousel Controls */}
            <div className="flex items-center gap-4 mt-12">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full border border-north-border hover:border-north-primary text-north-primary transition-colors focus:outline-none focus:ring-2 focus:ring-[#C7FF3D]"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {MOCK_TESTIMONIALS.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? "w-8 bg-[#C7FF3D]"
                        : "w-2 bg-north-border hover:bg-north-muted"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-3 rounded-full border border-north-border hover:border-north-primary text-north-primary transition-colors focus:outline-none focus:ring-2 focus:ring-[#C7FF3D]"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
