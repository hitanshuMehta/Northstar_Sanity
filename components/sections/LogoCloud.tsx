import React from "react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

const BRANDS = [
  { name: "LUMA", label: "CLOUD INFRASTRUCTURE" },
  { name: "ORBIT", label: "FINANCIAL LABS" },
  { name: "NOVA", label: "SYSTEMS" },
  { name: "ASTER", label: "LUXURY COMMERCE" },
  { name: "KIN", label: "OPERATING SYSTEM" },
  { name: "FORM", label: "ARCHITECTURE" },
];

export function LogoCloud() {
  return (
    <div className="w-full border-y border-north-border bg-north-surface py-12 md:py-16 transition-colors">
      <Container>
        <Reveal>
          <p className="text-center text-xs font-semibold tracking-widest uppercase text-north-muted mb-10">
            Trusted by teams building what comes next.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-80">
            {BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="group flex flex-col items-center justify-center p-4 transition-all duration-300 hover:opacity-100 hover:scale-105 cursor-default"
              >
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-north-primary transition-colors group-hover:text-north-accent">
                  {brand.name}
                </span>
                <span className="text-[9px] tracking-widest font-mono text-north-muted uppercase mt-1">
                  {brand.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
