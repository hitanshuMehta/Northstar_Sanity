import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/sections/CTA";
import { getServicesPageData } from "@/sanity/lib/fetch";
import { Check, Compass, Target, Palette, Code2, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const { hero, services, processSteps, ctaData } = await getServicesPageData();

  return (
    <>
      <Section className="pt-32 sm:pt-40 md:pt-48 pb-12">
        <Container>
          <SectionHeading
            label={hero.label}
            title={hero.title}
            description={hero.description}
            titleSize="hero"
          />

          {/* Detailed Service Cards List */}
          <div className="space-y-16 lg:space-y-24 mt-16">
            {services.map((service: any, idx: number) => (
              <Reveal key={service.id} delay={0.1 * idx}>
                <div
                  id={service.id}
                  className="scroll-mt-32 sm:scroll-mt-36 md:scroll-mt-40 bg-north-surface border border-north-border rounded-sm p-8 sm:p-12 lg:p-16 transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column: Number & Title */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-sm text-north-accent font-bold block mb-4">
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
                          {service.capabilities.map((cap: any) => (
                            <div key={cap.title} className="flex flex-col gap-1">
                              <h4 className="text-sm font-semibold text-north-primary flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-north-accent" />
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
                        {service.deliverables.map((del: any) => (
                          <div key={del.title} className="flex flex-wrap gap-2 mb-2">
                            {del.items.map((item: string) => (
                              <span
                                key={item}
                                className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full bg-north-bg border border-north-border text-north-primary"
                              >
                                <Check className="w-3 h-3 text-north-accent" />
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

      {/* Methodology Process Section 01-05 */}
      <Section className="bg-north-surface/50 border-y border-north-border py-24 sm:py-32">
        <Container>
          <SectionHeading
            label="OUR METHODOLOGY"
            title="A disciplined process for predictable momentum."
            description="How we move from initial strategic alignment to launch and continuous optimization."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-14 sm:mt-20">
            {processSteps.map((step: any, idx: number) => {
              const stepIcons = [Compass, Target, Palette, Code2, TrendingUp];
              const IconComponent = stepIcons[idx] || Compass;

              return (
                <div
                  key={step.number}
                  className="group relative flex flex-col justify-between h-full bg-north-surface border border-north-border rounded-sm p-6 sm:p-7 transition-all duration-500 hover:border-north-accent/70 hover:shadow-2xl shadow-xl overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-north-accent w-full" />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 rounded-full bg-north-bg border border-north-border text-north-accent flex items-center justify-center group-hover:border-north-accent group-hover:bg-north-accent/10 transition-all duration-300 shadow-sm">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-north-accent tracking-widest">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-north-primary font-normal mb-2 group-hover:text-north-accent transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-north-muted leading-relaxed mb-6 font-medium">
                      {step.subtitle}
                    </p>
                  </div>

                  <div className="border-t border-north-border/70 pt-4 mt-auto">
                    <span className="text-[10px] font-mono font-semibold tracking-widest uppercase text-north-muted block mb-3">
                      DELIVERABLES
                    </span>
                    <ul className="space-y-2 text-xs text-north-muted">
                      {step.deliverables.slice(0, 3).map((d: string) => (
                        <li key={d} className="flex items-center gap-2 group/item">
                          <span className="w-1.5 h-1.5 rounded-full bg-north-accent opacity-50 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all flex-shrink-0" />
                          <span className="truncate group-hover/item:text-north-primary transition-colors">
                            {d}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <CTA data={ctaData} />
    </>
  );
}
