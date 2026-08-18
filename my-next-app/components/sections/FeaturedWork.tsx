import React from "react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { CaseStudyCard } from "../case-studies/CaseStudyCard";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { getFeaturedCaseStudies } from "@/lib/mock-data";

export async function FeaturedWork() {
  const caseStudies = await getFeaturedCaseStudies();

  return (
    <Section id="work">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <SectionHeading
            label="SELECTED WORK"
            title="Work that creates momentum."
            description="A showcase of recent digital product transformations across fintech, healthcare, and e-commerce."
            className="mb-0"
          />
          <div className="mt-6 md:mt-0">
            <Button href="/work" variant="secondary" size="md" showArrow>
              View all case studies
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {caseStudies.map((study, idx) => (
            <Reveal key={study.id} delay={0.1 * idx}>
              <CaseStudyCard caseStudy={study} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
