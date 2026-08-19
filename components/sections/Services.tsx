"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { MOCK_SERVICES } from "@/lib/mock-data";

export function Services() {
  return (
    <Section id="services" className="relative py-24 sm:py-32 bg-north-bg border-y border-north-border">
      <Container>
        <SectionHeading
          label="CAPABILITIES"
          title="Bespoke expertise across the digital product lifecycle."
          description="We combine strategic clarity, editorial aesthetics, and high-performance engineering to build market-defining experiences."
        />

        {/* 4 Distinct 2-Column Card Boxes */}
        <div className="flex flex-col gap-8 sm:gap-12 mt-12 sm:mt-16">
          {MOCK_SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 * idx, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="w-full bg-north-surface border border-north-border rounded-sm p-6 sm:p-10 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-north-primary/60 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
                {/* Left Side Content */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-sm sm:text-base font-bold text-north-accent flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-north-accent animate-pulse" />
                        CAPABILITY / {service.number}
                      </span>
                      <span className="text-xs font-mono text-north-muted uppercase tracking-widest hidden sm:inline-block">
                        {service.subtitle}
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-north-primary font-normal leading-tight mb-4 group-hover:text-north-muted transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-base sm:text-lg text-north-muted leading-relaxed max-w-xl">
                      {service.description}
                    </p>
                  </div>

                  {/* Capability Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.capabilities.map((cap) => (
                      <span
                        key={cap.title}
                        className="text-xs font-medium px-3 py-1.5 rounded-full border border-north-border/80 text-north-primary bg-north-bg/60 backdrop-blur-sm"
                      >
                        {cap.title}
                      </span>
                    ))}
                  </div>

                  {/* Explore CTA Button */}
                  <div className="pt-4">
                    <Link
                      href={`/services#${service.id}`}
                      className="inline-flex items-center gap-3 px-6 py-3 rounded-sm bg-[#C7FF3D] text-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-[#b5f228] hover:shadow-lg hover:shadow-[#C7FF3D]/25 border border-[#C7FF3D] transition-all duration-300 group/btn shadow-md"
                    >
                      <span>Explore {service.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#111111] transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>

                {/* Right Side Image integrated inside each Card Box */}
                <div className="lg:col-span-5 relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-sm overflow-hidden border border-north-border bg-north-bg group-hover:border-north-accent/40 transition-colors">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                    <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md rounded-full border border-white/20">
                      {service.number} — {service.title}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
