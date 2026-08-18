import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MOCK_SERVICES, MOCK_PROCESS } from "@/lib/mock-data";
import { CTA } from "@/components/sections/CTA";
import { Check } from "lucide-react";

export default function ServicesPage() {
  return (
    <>
      <Section className="pt-32 sm:pt-40 md:pt-48 pb-12">
        <Container>
          <SectionHeading
            label="SERVICES & CAPABILITIES"
            title="End-to-end digital product design & engineering."
            description="We partner with ambitious teams to turn bold visions into market-defining digital reality. Here is how we help brands design, build, and scale."
            titleSize="hero"
          />

          {/* Detailed Service Cards List */}
          <div className="space-y-16 lg:space-y-24 mt-16">
            {MOCK_SERVICES.map((service, idx) => (
              <Reveal key={service.id} delay={0.1 * idx}>
                <div
                  id={service.id}
                  className="bg-north-surface border border-north-border rounded-sm p-8 sm:p-12 lg:p-16 transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column: Number & Title */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-sm text-[#C7FF3D] font-bold block mb-4">
                          SERVICES / {service.number}
                        </span>
                        <h2 className="font-serif text-4xl sm:text-5xl text-north-primary font-normal leading-tight mb-4">
                          {service.title}
                        </h2>
                        <p className="text-sm font-semibold uppercase tracking-wider text-north-muted mb-6">
                          {service.subtitle}
                        </p>
                        <p className="text-base text-north-muted leading-relaxed max-w-md">
                          {service.description}
                        </p>
                      </div>

                      <div className="mt-8">
                        <Button href="/contact" variant="primary" size="sm" showArrow>
                          Inquire about {service.title}
                        </Button>
                      </div>
                    </div>

                    {/* Right Column: Capabilities & Deliverables */}
                    <div className="lg:col-span-7 space-y-10 border-t lg:border-t-0 lg:border-l border-north-border pt-8 lg:pt-0 lg:pl-12">
                      {/* Capabilities */}
                      <div>
                        <h3 className="text-xs font-semibold tracking-widest uppercase text-north-primary mb-6">
                          Core Capabilities
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {service.capabilities.map((cap) => (
                            <div key={cap.title} className="flex flex-col gap-1">
                              <h4 className="text-sm font-semibold text-north-primary flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF3D]" />
                                {cap.title}
                              </h4>
                              <p className="text-xs text-north-muted leading-relaxed">
                                {cap.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Deliverables */}
                      <div className="border-t border-north-border pt-8">
                        <h3 className="text-xs font-semibold tracking-widest uppercase text-north-primary mb-4">
                          Key Deliverables
                        </h3>
                        {service.deliverables.map((del) => (
                          <div key={del.title} className="flex flex-wrap gap-2">
                            {del.items.map((item) => (
                              <span
                                key={item}
                                className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full bg-north-bg border border-north-border text-north-primary"
                              >
                                <Check className="w-3 h-3 text-[#C7FF3D]" />
                                {item}
                              </span>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process Section 01-05 */}
      <Section className="bg-north-surface border-y border-north-border">
        <Container>
          <SectionHeading
            label="OUR METHODOLOGY"
            title="A disciplined process for predictable momentum."
            description="How we move from initial strategic alignment to launch and continuous optimization."
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-12">
            {MOCK_PROCESS.map((step, idx) => (
              <Reveal key={step.number} delay={0.1 * idx}>
                <div className="flex flex-col border-t border-north-border pt-6">
                  <span className="font-mono text-xs font-bold text-[#C7FF3D] mb-3">
                    {step.number}
                  </span>
                  <h3 className="font-serif text-2xl text-north-primary font-normal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-north-muted leading-relaxed mb-4">
                    {step.subtitle}
                  </p>
                  <ul className="space-y-1.5 text-[11px] text-north-muted font-mono border-t border-north-border/50 pt-3">
                    {step.deliverables.slice(0, 3).map((d) => (
                      <li key={d} className="flex items-center gap-1">
                        <span>•</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
