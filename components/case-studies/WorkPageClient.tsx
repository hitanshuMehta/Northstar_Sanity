"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/sections/CTA";
import { CaseStudy } from "@/lib/types";

interface WorkPageClientProps {
  data: {
    hero?: { label?: string; title?: string; description?: string };
    categories?: string[];
    caseStudies?: CaseStudy[];
    ctaData?: any;
  };
}

export function WorkPageClient({ data }: WorkPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const caseStudies = Array.isArray(data.caseStudies) ? data.caseStudies : [];
  const categories = Array.isArray(data.categories) && data.categories.length > 0 ? data.categories : ["All"];

  const filteredStudies =
    selectedCategory === "All"
      ? caseStudies
      : caseStudies.filter((cs) => cs.category === selectedCategory);

  return (
    <>
      <Section className="pt-32 sm:pt-40 md:pt-48 pb-12">
        <Container>
          {(data.hero?.title || data.hero?.description) && (
            <SectionHeading
              label={data.hero?.label || "PORTFOLIO OF WORK"}
              title={data.hero?.title || "Selected case studies & digital product transformations."}
              description={data.hero?.description || ""}
              titleSize="hero"
            />
          )}

          {/* Category Filter Tabs */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2.5 border-b border-north-border pb-6 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-north-primary text-north-bg font-bold shadow-md"
                      : "bg-north-surface text-north-muted hover:text-north-primary hover:bg-north-border/50 border border-north-border"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Case Studies Grid */}
          {filteredStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
              {filteredStudies.map((study, idx) => (
                <Reveal key={study.id || idx} delay={0.05 * idx} className="h-full">
                  <CaseStudyCard caseStudy={study} aspectRatio="video" />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-north-muted border border-north-border rounded-sm bg-north-surface">
              <p className="text-sm font-mono">No case studies found in this category.</p>
            </div>
          )}
        </Container>
      </Section>

      <CTA data={data.ctaData} />
    </>
  );
}
