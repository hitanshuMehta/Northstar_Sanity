import React from "react";
import Image from "next/image";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

interface ImageTextProps {
  imageSrc?: string;
  imageAlt?: string;
  videoSrc?: string;
  quote?: string;
  supportingText?: string;
  ctaText?: string;
  ctaHref?: string;
  imagePosition?: "left" | "right";
}

export function ImageText({
  imageSrc = "/images/craft-philosophy.jpg",
  imageAlt = "Editorial craft at Northstar",
  videoSrc,
  quote = "Good digital products are felt before they're understood.",
  supportingText = "Behind every seamless transition and effortless interaction lies an obsession with nuance. We align human intuition with software precision to craft digital products that resonate on a deeper level.",
  ctaText = "Learn about our approach",
  ctaHref = "/about",
  imagePosition = "left",
}: ImageTextProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <Section className="bg-north-surface/50 border-y border-north-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image/Video Column */}
          <div
            className={`lg:col-span-6 ${
              isImageLeft ? "order-1" : "order-1 lg:order-2"
            }`}
          >
            <Reveal>
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-sm overflow-hidden border border-north-border bg-north-surface group shadow-xl">
                {videoSrc ? (
                  <video
                    src={videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </Reveal>
          </div>

          {/* Text Column */}
          <div
            className={`lg:col-span-6 ${
              isImageLeft ? "order-2" : "order-2 lg:order-1"
            }`}
          >
            <Reveal delay={0.1}>
              <div className="flex flex-col items-start gap-6">
                <span className="text-xs font-semibold tracking-widest uppercase text-north-muted">
                  PHILOSOPHY
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-north-primary leading-[1.1] tracking-tight">
                  &ldquo;{quote}&rdquo;
                </h2>
                <p className="text-base sm:text-lg text-north-muted leading-relaxed max-w-xl">
                  {supportingText}
                </p>
                <div className="pt-4">
                  <Button href={ctaHref} variant="primary" size="md" showArrow>
                    {ctaText}
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
