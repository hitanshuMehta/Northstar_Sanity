import React from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { ArrowUpRight } from "lucide-react";
import { ResultsData } from "@/sanity/lib/fetch";

interface ResultsProps {
  data?: ResultsData;
}

export function Results({ data }: ResultsProps) {
  if (!data) return null;

  const metrics = Array.isArray(data.metrics) ? data.metrics : [];

  if (!data.title && !data.highlightMetric && !data.description && metrics.length === 0) {
    return null;
  }

  return (
    <Section className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <div className="relative w-full rounded-sm overflow-hidden border border-north-border bg-north-surface text-white p-8 sm:p-12 lg:p-16 shadow-2xl group">
            {/* Background Gradient Stage */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-north-surface via-north-bg to-north-surface">
              <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#C7FF3D 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40 pointer-events-none" />
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col justify-between space-y-8">
              <div className="flex flex-col items-start gap-4 max-w-3xl">
                {data.label && data.label.trim() !== "" && (
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-north-accent flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-north-accent animate-pulse" />
                    {data.label}
                  </span>
                )}

                {data.highlightMetric && data.highlightMetric.trim() !== "" && (
                  <div className="font-serif text-6xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-none my-1">
                    {data.highlightMetric}
                  </div>
                )}

                {data.title && data.title.trim() !== "" && (
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white font-normal leading-tight max-w-2xl">
                    {data.title}
                  </h3>
                )}

                {data.description && data.description.trim() !== "" && (
                  <p className="text-sm sm:text-base text-north-muted max-w-xl leading-relaxed">
                    {data.description}
                  </p>
                )}
              </div>

              {/* Metrics Grid */}
              {metrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                  {metrics.map((m, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      {m.value && (
                        <span className="font-serif text-3xl sm:text-4xl text-north-accent font-normal">
                          {m.value}
                        </span>
                      )}
                      {m.label && (
                        <span className="text-xs font-bold uppercase tracking-wider text-white">
                          {m.label}
                        </span>
                      )}
                      {m.description && (
                        <span className="text-xs text-north-muted leading-relaxed">
                          {m.description}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom Corner Action */}
              <div className="flex justify-end pt-6 border-t border-white/10">
                <Link
                  href="/work"
                  className="group/btn inline-flex items-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 rounded-sm bg-[#C7FF3D] text-[#111111] font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#b5f228] transition-all shadow-xl hover:shadow-[#C7FF3D]/25 cursor-pointer"
                >
                  <span>Explore Case Studies</span>
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
