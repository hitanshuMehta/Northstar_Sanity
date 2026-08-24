import React from "react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { CtaData, DEFAULT_CTA_DATA } from "@/sanity/lib/fetch";

interface CTAProps {
  data?: CtaData;
}

export function CTA({ data = DEFAULT_CTA_DATA }: CTAProps) {
  const content = data || DEFAULT_CTA_DATA;

  return (
    <Section className="border-t border-north-border bg-north-bg py-24 md:py-36 transition-colors">
      <Container size="narrow">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            {content.label && (
              <span className="text-xs font-semibold tracking-widest uppercase text-north-muted mb-6">
                {content.label}
              </span>
            )}

            {content.title && (
              <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-north-primary font-normal tracking-tight leading-[1.02] mb-6">
                {content.title}
              </h2>
            )}

            {content.description && (
              <p className="text-lg sm:text-xl text-north-muted max-w-xl font-normal leading-relaxed mb-10">
                {content.description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
              {content.primaryButtonLabel && (
                <Button
                  href={content.primaryButtonLink || "/contact"}
                  variant="primary"
                  size="lg"
                  showArrow
                  className="w-full sm:w-auto"
                >
                  {content.primaryButtonLabel}
                </Button>
              )}
              {content.secondaryButtonLabel && (
                <Button
                  href={content.secondaryButtonLink || "/work"}
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {content.secondaryButtonLabel}
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
