import React from "react";
import Image from "next/image";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { ImageTextData, DEFAULT_IMAGE_TEXT_DATA } from "@/sanity/lib/fetch";

interface ImageTextProps {
  data?: ImageTextData;
  imagePosition?: "left" | "right";
}

export function ImageText({
  data = DEFAULT_IMAGE_TEXT_DATA,
  imagePosition = "left",
}: ImageTextProps) {
  const content = data || DEFAULT_IMAGE_TEXT_DATA;
  const isImageLeft = imagePosition === "left";
  const hasImage = Boolean(content.featureImage && content.featureImage.trim() !== "");

  return (
    <Section className="bg-north-surface/50 border-y border-north-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Image Column */}
          <div
            className={`lg:col-span-6 ${
              isImageLeft ? "order-1" : "order-1 lg:order-2"
            }`}
          >
            <Reveal>
              <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[390px] rounded-sm overflow-hidden border border-north-border bg-north-surface group shadow-xl">
                {hasImage ? (
                  <Image
                    src={content.featureImage}
                    alt={content.title || "Northstar Philosophy"}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-north-surface via-north-bg to-north-surface flex items-center justify-center p-8 text-center">
                    <div className="max-w-sm space-y-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-north-accent animate-pulse inline-block mb-1" />
                      <h4 className="font-serif text-2xl text-north-primary italic">
                        {content.quote || "Northstar Digital Studio"}
                      </h4>
                      <p className="text-xs font-mono text-north-muted uppercase tracking-widest">
                        {content.label || "CRAFT PHILOSOPHY"}
                      </p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </Reveal>
          </div>

          {/* Text Column */}
          <div
            className={`lg:col-span-6 flex flex-col justify-center ${
              isImageLeft ? "order-2" : "order-2 lg:order-1"
            }`}
          >
            <Reveal delay={0.1}>
              <div className="flex flex-col items-start gap-5 sm:gap-6 py-2">
                {content.label && (
                  <span className="text-xs font-semibold tracking-widest uppercase text-north-muted">
                    {content.label}
                  </span>
                )}
                {content.quote ? (
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-north-primary leading-[1.08] tracking-tight">
                    &ldquo;{content.quote}&rdquo;
                  </h2>
                ) : content.title ? (
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-north-primary leading-[1.08] tracking-tight">
                    {content.title}
                  </h2>
                ) : null}

                {Array.isArray(content.paragraphs) && content.paragraphs.length > 0 ? (
                  content.paragraphs.map((p, idx) => (
                    <p key={idx} className="text-sm sm:text-base text-north-muted leading-relaxed max-w-xl">
                      {p}
                    </p>
                  ))
                ) : null}

                {content.ctaLabel && content.ctaLink && (
                  <div className="pt-2 sm:pt-3">
                    <Button href={content.ctaLink} variant="primary" size="md" showArrow>
                      {content.ctaLabel}
                    </Button>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
