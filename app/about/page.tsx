import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Stats } from "@/components/sections/Stats";
import { CTA } from "@/components/sections/CTA";
import { getAboutPageData } from "@/sanity/lib/fetch";
import { Globe, Share2, Compass, Target, Palette, Code2, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const { hero, philosophy, teamMembers, processSteps, ctaData } = await getAboutPageData();

  return (
    <>
      {/* Hero Statement */}
      <Section className="pt-32 sm:pt-40 md:pt-48 pb-16">
        <Container>
          <Reveal>
            <span className="text-xs font-semibold tracking-widest uppercase text-north-accent mb-4 block">
              {hero.label}
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-north-primary font-normal leading-[1.02] tracking-tight max-w-5xl mb-12">
              {hero.headline}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative w-full aspect-[21/9] rounded-sm overflow-hidden border border-north-border bg-north-surface mb-16">
              <Image
                src={hero.coverImage}
                alt="Northstar Agency Team Studio"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          </Reveal>

          {/* Agency Philosophy & Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-3xl sm:text-4xl text-north-primary font-normal leading-tight">
                {philosophy.headline}
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-north-muted leading-relaxed">
              {philosophy.paragraphs.map((p: string, idx: number) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Stats Block */}
      <Stats />

      {/* Team Grid */}
      <Section id="team">
        <Container>
          <SectionHeading
            label="LEADERSHIP"
            title="The people behind the products."
            description="Our multidisciplinary team unites design directors, full-stack engineers, and product strategists."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member: any, idx: number) => (
              <Reveal key={member.id} delay={0.1 * idx}>
                <div className="group flex flex-col bg-north-surface border border-north-border rounded-sm overflow-hidden p-4 transition-all duration-300 hover:border-north-primary">
                  <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden bg-north-bg mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>

                  <h3 className="font-serif text-2xl text-north-primary font-normal">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono text-north-accent font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-xs text-north-muted leading-relaxed line-clamp-3 mb-4">
                    {member.bio}
                  </p>

                  <div className="flex items-center gap-2 pt-3 border-t border-north-border text-north-muted">
                    <a
                      href={member.websiteUrl || "https://google.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full hover:bg-north-bg hover:text-north-accent transition-all duration-200"
                      title="Website"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                    <a
                      href={member.linkedinUrl || "https://linkedin.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full hover:bg-north-bg hover:text-north-accent transition-all duration-200"
                      title="Share / Connect on LinkedIn"
                    >
                      <Share2 className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Working Process 01-05 */}
      <Section className="bg-north-surface border-y border-north-border py-24 sm:py-32">
        <Container>
          <SectionHeading
            label="WORKING PROCESS"
            title="How we partner with clients."
            description="Transparent, collaborative, and structured for maximum momentum from Day 1."
          />

          <div className="space-y-6 sm:space-y-8 mt-12 sm:mt-16">
            {processSteps.map((step: any, idx: number) => {
              const stepIcons = [Compass, Target, Palette, Code2, TrendingUp];
              const IconComponent = stepIcons[idx] || Compass;

              return (
                <Reveal key={step.number} delay={0.1 * idx}>
                  <div className="group relative w-full bg-north-bg/60 border border-north-border rounded-sm p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-north-accent/60 hover:bg-north-surface shadow-xl hover:shadow-2xl">
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-north-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-sm" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                      <div className="lg:col-span-3 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-north-surface border border-north-border text-north-accent flex items-center justify-center group-hover:border-north-accent group-hover:bg-north-accent/10 transition-all duration-300 shadow-md flex-shrink-0">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="font-mono text-xs font-bold uppercase tracking-widest text-north-accent block">
                            STEP / {step.number}
                          </span>
                          <h3 className="font-serif text-3xl sm:text-4xl text-north-primary font-normal leading-tight group-hover:text-north-accent transition-colors">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      <div className="lg:col-span-5 space-y-2">
                        <p className="text-sm font-semibold uppercase tracking-wider text-north-primary">
                          {step.subtitle}
                        </p>
                        <p className="text-sm sm:text-base text-north-muted leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-north-border pt-4 lg:pt-0 lg:pl-6">
                        <span className="text-[11px] font-mono font-semibold tracking-widest uppercase text-north-muted block mb-3">
                          KEY DELIVERABLES
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {step.deliverables.map((item: string) => (
                            <span
                              key={item}
                              className="text-xs font-mono px-3 py-1.5 rounded-full border border-north-border/80 text-north-primary bg-north-surface group-hover:border-north-accent/40 transition-colors"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <CTA data={ctaData} />
    </>
  );
}
