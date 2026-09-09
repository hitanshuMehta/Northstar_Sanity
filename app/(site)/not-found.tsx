import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section className="min-h-[80vh] flex items-center justify-center pt-32">
      <Container size="narrow">
        <div className="flex flex-col items-center text-center">
          <span className="font-mono text-sm font-bold text-[#C7FF3D] tracking-widest uppercase mb-4">
            404 / PAGE NOT FOUND
          </span>

          <h1 className="font-serif text-6xl sm:text-8xl text-north-primary font-normal tracking-tight mb-6">
            Lost in space.
          </h1>

          <p className="text-base sm:text-lg text-north-muted max-w-md mb-10 leading-relaxed">
            The route or resource you are looking for has been moved, renamed, or does not exist.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/" variant="primary" size="md" showArrow>
              Return to Homepage
            </Button>
            <Button href="/work" variant="secondary" size="md">
              View Work
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
