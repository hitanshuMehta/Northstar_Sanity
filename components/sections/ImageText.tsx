import React from "react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SafeImage } from "../ui/SafeImage";
import { ImageTextData } from "@/sanity/lib/fetch";

interface ImageTextProps {
  data?: ImageTextData;
  imagePosition?: "left" | "right";
}

export function ImageText({
  data,
  imagePosition = "left",
}: ImageTextProps) {
  if (!data) return null;

  const isImageLeft = imagePosition === "left";
  const paragraphs = Array.isArray(data.paragraphs) ? data.paragraphs.filter(Boolean) : [];

  if (!data.title && !data.quote && paragraphs.length === 0 && !data.featureImage) {
    return null;
  }

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
                <SafeImage
                  src={data.featureImage}
                  alt={data.title || data.quote || "Editorial Philosophy"}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  fallbackTitle={data.title || data.label}
                />
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
                {data.label && data.label.trim() !== "" && (
                  <span className="text-xs font-semibold tracking-widest uppercase text-north-muted">
                    {data.label}
                  </span>
                )}

                {data.quote && data.quote.trim() !== "" ? (
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-north-primary leading-[1.08] tracking-tight">
                    &ldquo;{data.quote}&rdquo;
                  </h2>
                ) : data.title && data.title.trim() !== "" ? (
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-north-primary leading-[1.08] tracking-tight">
                    {data.title}
                  </h2>
                ) : null}

                {paragraphs.length > 0 &&
                  paragraphs.map((p, idx) => (
                    <p key={idx} className="text-sm sm:text-base text-north-muted leading-relaxed max-w-xl">
                      {p}
                    </p>
                  ))}

                {data.quoteAuthor && data.quoteAuthor.trim() !== "" && (
                  <p className="text-xs font-mono text-north-accent font-semibold uppercase tracking-wider">
                    — {data.quoteAuthor}
                  </p>
                )}

                {data.ctaLabel && data.ctaLink && (
                  <div className="pt-2 sm:pt-3">
                    <Button href={data.ctaLink} variant="primary" size="md" showArrow>
                      {data.ctaLabel}
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
