"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { MOCK_SERVICES } from "@/lib/mock-data";

export function Services() {
  const [activeImage, setActiveImage] = useState<string | null>(MOCK_SERVICES[0].image);

  return (
    <Section id="services">
      <Container>
        <SectionHeading
          label="CAPABILITIES"
          title="Bespoke expertise across the digital product lifecycle."
          description="We combine strategic clarity, editorial aesthetics, and high-performance engineering to build market-defining experiences."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Numbered Editorial List */}
          <div className="lg:col-span-7 flex flex-col border-t border-north-border">
            {MOCK_SERVICES.map((service, idx) => (
              <Reveal key={service.id} delay={0.1 * idx}>
                <div
                  onMouseEnter={() => setActiveImage(service.image)}
                  className="group relative border-b border-north-border py-8 sm:py-10 transition-all duration-300 hover:bg-north-surface/50 px-2 sm:px-4 cursor-pointer"
                >
                  <Link href="/services" className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-6 sm:gap-10">
                      <span className="font-mono text-sm sm:text-base text-north-accent font-bold group-hover:text-north-primary transition-colors">
                        {service.number}
                      </span>
                      <div>
                        <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-north-primary font-normal group-hover:text-north-muted transition-colors">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-sm sm:text-base text-north-muted max-w-lg leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="self-end sm:self-center flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-north-primary group-hover:text-north-accent">
                      <span>Explore</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </Link>

                  {/* Capabilities Tags */}
                  <div className="mt-6 flex flex-wrap gap-2 pl-12 sm:pl-16">
                    {service.capabilities.map((cap) => (
                      <span
                        key={cap.title}
                        className="text-xs px-2.5 py-1 rounded-full border border-north-border text-north-muted bg-north-bg"
                      >
                        {cap.title}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Sticky Image Preview Container */}
          <div className="hidden lg:block lg:col-span-5 sticky top-32">
            <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden border border-north-border bg-north-surface shadow-2xl">
              <AnimatePresence mode="wait">
                {activeImage && (
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeImage}
                      alt="Service Capability Preview"
                      fill
                      className="object-cover"
                      sizes="500px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
