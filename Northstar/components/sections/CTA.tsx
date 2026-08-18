import React from "react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

export function CTA() {
  return (
    <Section className="border-t border-north-border bg-north-bg py-24 md:py-36 transition-colors">
      <Container size="narrow">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-north-muted mb-6">
              WORK WITH NORTHSTAR
            </span>

            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-north-primary font-normal tracking-tight leading-[1.02] mb-6">
              Have a difficult problem worth solving?
            </h2>

            <p className="text-lg sm:text-xl text-north-muted max-w-xl font-normal leading-relaxed mb-10">
              Let&apos;s build something meaningful together. We are currently accepting select partnerships for Q3 and Q4.
            </p>

            <Button href="/contact" variant="primary" size="lg" showArrow>
              Start a conversation
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
