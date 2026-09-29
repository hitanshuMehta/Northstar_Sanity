import React from "react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { CaseStudyCard } from "../case-studies/CaseStudyCard";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { FeaturedWorkSectionData, getSanityFeaturedCaseStudies } from "@/sanity/lib/fetch";

interface FeaturedWorkProps {
  data?: FeaturedWorkSectionData;
}

export async function FeaturedWork({ data }: FeaturedWorkProps) {
  const caseStudies = data?.caseStudies ?? (await getSanityFeaturedCaseStudies());

  const label = data?.label ?? "SELECTED WORK";
  const title = data?.title ?? "Selected digital product transformations.";
  const description = data?.description ?? "A showcase of recent digital product transformations across fintech, healthcare, and e-commerce.";

  if (!caseStudies || (caseStudies.length === 0 && !title)) {
    return null;
  }

  return (
    <Section id="work">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <SectionHeading
            label={label}
            title={title}
            description={description}
            className="mb-0"
          />
          <div className="mt-6 md:mt-0">
            <Button href="/work" variant="secondary" size="md" showArrow>
              View all case studies
            </Button>
          </div>
        </div>

        {caseStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {caseStudies.map((study, idx) => (
              <Reveal key={study.id || idx} delay={0.1 * idx} className="h-full">
                <CaseStudyCard caseStudy={study} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center border border-north-border rounded-sm bg-north-surface">
            <p className="text-sm font-mono text-north-muted">No case studies published yet.</p>
          </div>
        )}
      </Container>
    </Section>
  );
}
