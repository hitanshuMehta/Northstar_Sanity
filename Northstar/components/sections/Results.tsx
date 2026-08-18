import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { ArrowUpRight } from "lucide-react";

export function Results() {
  return (
    <Section className="py-0">
      <Container>
        <Reveal>
          <div className="relative w-full rounded-sm overflow-hidden border border-north-border bg-north-surface text-white p-8 sm:p-12 md:p-16 lg:p-20">
            {/* Background Texture & Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
                alt="Orbit Finance Case Study Result Background"
                fill
                className="object-cover opacity-25 filter grayscale mix-blend-overlay"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 flex flex-col items-start gap-4">
                <span className="text-xs font-semibold tracking-widest uppercase text-[#C7FF3D]">
                  FEATURED RESULT / ORBIT FINANCE
                </span>

                <div className="font-serif text-7xl sm:text-8xl md:text-9xl font-normal tracking-tight text-white leading-none my-2">
                  +84%
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white font-normal leading-tight max-w-2xl">
                  Conversion rate uplift after redesigning the entire institutional customer journey.
                </h3>

                <p className="text-sm sm:text-base text-gray-400 max-w-xl leading-relaxed mt-2">
                  By pairing real-time WebGL data visualizations with an editorial visual identity, Orbit unlocked $1.2B in new assets under management within 90 days.
                </p>
              </div>

              <div className="lg:col-span-4 flex lg:justify-end">
                <Link
                  href="/work/orbit-finance"
                  className="group inline-flex items-center gap-3 px-8 py-5 rounded-sm bg-[#C7FF3D] text-[#111111] font-semibold text-sm hover:bg-[#b5f228] transition-all shadow-xl hover:shadow-[#C7FF3D]/20"
                >
                  <span>Read Orbit Case Study</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
