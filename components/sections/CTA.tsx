import React from "react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { CtaData } from "@/sanity/lib/fetch";

interface CTAProps {
  data?: CtaData;
}

export function CTA({ data }: CTAProps) {
  if (!data) return null;

  if (!data.title && !data.description && !data.primaryButtonLabel && !data.secondaryButtonLabel) {
    return null;
  }

  return (
    <Section className="border-t border-north-border bg-north-bg py-24 md:py-36 transition-colors">
      <Container size="narrow">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            {data.label && data.label.trim() !== "" && (
              <span className="text-xs font-semibold tracking-widest uppercase text-north-muted mb-6">
                {data.label}
              </span>
            )}

            {data.title && data.title.trim() !== "" && (
              <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-north-primary font-normal tracking-tight leading-[1.02] mb-6">
                {data.title}
              </h2>
            )}

            {data.description && data.description.trim() !== "" && (
              <p className="text-lg sm:text-xl text-north-muted max-w-xl font-normal leading-relaxed mb-10">
                {data.description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
              {data.primaryButtonLabel && data.primaryButtonLabel.trim() !== "" && (
                <Button
                  href={data.primaryButtonLink || "/contact"}
                  variant="primary"
                  size="lg"
                  showArrow
                  className="w-full sm:w-auto"
                >
                  {data.primaryButtonLabel}
                </Button>
              )}
              {data.secondaryButtonLabel && data.secondaryButtonLabel.trim() !== "" && (
                <Button
                  href={data.secondaryButtonLink || "/work"}
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {data.secondaryButtonLabel}
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
