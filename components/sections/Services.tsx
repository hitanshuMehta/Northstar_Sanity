"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { SafeImage } from "../ui/SafeImage";
import { Service } from "@/lib/types";
import { ServicesSectionData } from "@/sanity/lib/fetch";

interface ServicesProps {
  data?: ServicesSectionData | Service[];
}

export function Services({ data }: ServicesProps) {
  let servicesList: Service[] = [];
  let label = "CAPABILITIES";
  let title = "Bespoke expertise across the digital product lifecycle.";
  let description = "We combine strategic clarity, editorial aesthetics, and high-performance engineering to build market-defining experiences.";

  if (Array.isArray(data)) {
    servicesList = data;
  } else if (data && typeof data === "object") {
    servicesList = data.services || [];
    if (data.label) label = data.label;
    if (data.title) title = data.title;
    if (data.description) description = data.description;
  }

  if (servicesList.length === 0 && !title) {
    return null;
  }

  return (
    <Section id="services" className="relative py-24 sm:py-32 bg-north-bg border-y border-north-border">
      <Container>
        {(label || title || description) && (
          <SectionHeading
            label={label}
            title={title}
            description={description}
          />
        )}

        {servicesList.length > 0 ? (
          <div className="flex flex-col gap-8 sm:gap-12 mt-12 sm:mt-16">
            {servicesList.map((service, idx) => (
              <motion.div
                key={service.id || idx}
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
                          CAPABILITY / {service.number || `0${idx + 1}`}
                        </span>
                        {service.subtitle && (
                          <span className="text-xs font-mono text-north-muted uppercase tracking-widest hidden sm:inline-block">
                            {service.subtitle}
                          </span>
                        )}
                      </div>

                      {service.title && (
                        <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-north-primary font-normal leading-tight mb-4 group-hover:text-north-muted transition-colors">
                          {service.title}
                        </h3>
                      )}

                      {service.description && (
                        <p className="text-base sm:text-lg text-north-muted leading-relaxed max-w-xl">
                          {service.description}
                        </p>
                      )}
                    </div>

                    {/* Capability Tags */}
                    {Array.isArray(service.capabilities) && service.capabilities.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {service.capabilities.map((cap, capIdx) => (
                          <span
                            key={cap.title || capIdx}
                            className="text-xs font-medium px-3 py-1.5 rounded-full border border-north-border/80 text-north-primary bg-north-bg/60 backdrop-blur-sm"
                          >
                            {cap.title}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Explore CTA Button */}
                    <div className="pt-4">
                      <Link
                        href={`/services#${service.id}`}
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-sm bg-[#C7FF3D] text-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-[#b5f228] hover:shadow-lg hover:shadow-[#C7FF3D]/25 border border-[#C7FF3D] transition-all duration-300 group/btn shadow-md"
                      >
                        <span>Explore {service.title || "Capability"}</span>
                        <ArrowUpRight className="w-4 h-4 text-[#111111] transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Side Image */}
                  <div className="lg:col-span-5 relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-sm overflow-hidden border border-north-border bg-north-bg group-hover:border-north-accent/40 transition-colors">
                    <SafeImage
                      src={service.image}
                      alt={service.title || "Service image"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      fallbackTitle={service.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {service.title && (
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                        <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md rounded-full border border-white/20">
                          {service.number || `0${idx + 1}`} — {service.title}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center border border-north-border rounded-sm bg-north-surface mt-12">
            <p className="text-sm font-mono text-north-muted">No services published yet.</p>
          </div>
        )}
      </Container>
    </Section>
  );
}
