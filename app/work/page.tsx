"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { Reveal } from "@/components/ui/Reveal";
import { MOCK_CASE_STUDIES } from "@/lib/mock-data";
import { CTA } from "@/components/sections/CTA";

const CATEGORIES = [
  "All",
  "Fintech Platform",
  "Digital Healthcare",
  "E-Commerce",
  "Developer Tools",
  "Architecture & Design",
  "Cloud Infrastructure",
];

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredStudies =
    selectedCategory === "All"
      ? MOCK_CASE_STUDIES
      : MOCK_CASE_STUDIES.filter((cs) => cs.category === selectedCategory);

  return (
    <>
      <Section className="pt-32 sm:pt-40 md:pt-48 pb-12">
        <Container>
          <SectionHeading
            label="PORTFOLIO OF WORK"
            title="Selected case studies & digital product transformations."
            description="Explore how we have partnered with ambitious companies across industries to solve complex problems and build products people actually want to use."
            titleSize="hero"
          />

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2.5 border-b border-north-border pb-6 mb-12">
            {CATEGORIES.map((cat) => (
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

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
            {filteredStudies.map((study, idx) => (
              <Reveal key={study.id} delay={0.05 * idx}>
                <CaseStudyCard caseStudy={study} aspectRatio="video" />
              </Reveal>
            ))}
          </div>

          {filteredStudies.length === 0 && (
            <div className="py-20 text-center text-north-muted">
              <p>No case studies found in this category.</p>
            </div>
          )}
        </Container>
      </Section>

      <CTA />
    </>
  );
}
