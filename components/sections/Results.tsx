import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { ArrowUpRight } from "lucide-react";

export function Results() {
  return (
    <Section className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <div className="relative w-full rounded-sm overflow-hidden border border-north-border bg-north-surface text-white p-8 sm:p-12 lg:p-16 shadow-2xl group">
            {/* High-Resolution Fintech Platform Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/hero-studio.jpg"
                alt="Orbit Finance Institutional Trading Platform Showcase"
                fill
                className="object-cover opacity-35 transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40 pointer-events-none" />
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col justify-between space-y-8">
              {/* Top/Middle Editorial Result Text */}
              <div className="flex flex-col items-start gap-4 max-w-3xl">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-north-accent flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-north-accent animate-pulse" />
                  FEATURED RESULT / ORBIT FINANCE
                </span>

                <div className="font-serif text-6xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-none my-1">
                  +84%
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white font-normal leading-tight max-w-2xl">
                  Conversion rate uplift after redesigning the entire institutional customer journey.
                </h3>

                <p className="text-sm sm:text-base text-north-muted max-w-xl leading-relaxed">
                  By pairing real-time WebGL data visualizations with an editorial visual identity, Orbit unlocked $1.2B in new assets under management within 90 days.
                </p>
              </div>

              {/* Bottom Corner Button Placement */}
              <div className="flex justify-end pt-6 border-t border-white/10">
                <Link
                  href="/work/orbit-finance"
                  className="group/btn inline-flex items-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 rounded-sm bg-[#C7FF3D] text-[#111111] font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#b5f228] transition-all shadow-xl hover:shadow-[#C7FF3D]/25 cursor-pointer"
                >
                  <span>Read Orbit Case Study</span>
                  <ArrowUpRight className="w-4 h-4 text-[#111111] transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
