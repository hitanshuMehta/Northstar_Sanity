import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { SafeImage } from "@/components/ui/SafeImage";
import { CTA } from "@/components/sections/CTA";
import {
  getSanityCaseStudyBySlug,
  getSanityCaseStudies,
  getCtaData,
} from "@/sanity/lib/fetch";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateStaticParams() {
  const studies = await getSanityCaseStudies();
  return studies.map((study) => ({
    slug: study.slug,
  }));
}

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = await getSanityCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const allStudies = await getSanityCaseStudies();
  const relatedStudies = allStudies
    .filter((cs) => (study.relatedSlugs && study.relatedSlugs.includes(cs.slug)) || cs.slug !== study.slug)
    .slice(0, 2);

  const ctaData = await getCtaData();

  return (
    <>
      <article className="w-full pt-32 sm:pt-40 md:pt-48 pb-20">
        <Container>
          {/* Breadcrumb Navigation */}
          <Reveal>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-north-muted mb-8">
              <Link href="/work" className="hover:text-north-primary flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Work</span>
              </Link>
              <span>/</span>
              <span className="text-north-primary">{study.client || study.title}</span>
            </div>
          </Reveal>

          {/* Title & Overview Grid */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-12">
              <div className="lg:col-span-8">
                {study.title && (
                  <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-north-primary font-normal leading-[1.05] tracking-tight mb-6">
                    {study.title}
                  </h1>
                )}
                {study.summary && (
                  <p className="text-lg sm:text-xl text-north-muted leading-relaxed font-normal">
                    {study.summary}
                  </p>
                )}
              </div>

              {/* Metadata Sidebar */}
              <div className="lg:col-span-4 bg-north-surface border border-north-border rounded-sm p-6 sm:p-8 space-y-6">
                {study.client && (
                  <div>
                    <span className="text-xs font-mono uppercase text-north-muted block mb-1">CLIENT</span>
                    <span className="font-medium text-north-primary text-base">{study.client}</span>
                  </div>
                )}
                {study.category && (
                  <div>
                    <span className="text-xs font-mono uppercase text-north-muted block mb-1">CATEGORY</span>
                    <Badge variant="accent">{study.category}</Badge>
                  </div>
                )}
                {study.year && (
                  <div>
                    <span className="text-xs font-mono uppercase text-north-muted block mb-1">YEAR</span>
                    <span className="font-medium text-north-primary text-base">{study.year}</span>
                  </div>
                )}
                {study.liveUrl && (
                  <div className="pt-4 border-t border-north-border">
                    <a
                      href={study.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center justify-between w-full px-5 py-3.5 rounded-sm bg-[#C7FF3D] text-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-[#b5f228] hover:shadow-lg hover:shadow-[#C7FF3D]/25 border border-[#C7FF3D] transition-all duration-300 shadow-md cursor-pointer"
                    >
                      <span>Visit Live Website</span>
                      <ArrowUpRight className="w-4 h-4 text-[#111111] transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          {/* Large Hero Media */}
          <Reveal delay={0.2}>
            <div className="relative w-full aspect-[16/9] rounded-sm overflow-hidden border border-north-border bg-north-surface mb-20 group shadow-2xl">
              <SafeImage
                src={study.heroImage || study.coverImage}
                alt={study.title || "Case Study Hero"}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
                fallbackTitle={study.title}
              />
              {study.videoUrl && (
                <video
                  src={study.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-700 hover:opacity-100"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </Reveal>

          {/* Deep Content Grid */}
          {(study.challenge || study.approach || study.solution) && (
            <Container size="narrow" className="px-0">
              <div className="space-y-16">
                {study.challenge && (
                  <Reveal>
                    <div className="border-t border-north-border pt-10">
                      <span className="text-xs font-semibold tracking-widest uppercase text-north-accent mb-4 block">
                        01 / THE CHALLENGE
                      </span>
                      <p className="text-base sm:text-lg text-north-muted leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>
                  </Reveal>
                )}

                {study.approach && (
                  <Reveal>
                    <div className="border-t border-north-border pt-10">
                      <span className="text-xs font-semibold tracking-widest uppercase text-north-accent mb-4 block">
                        02 / OUR APPROACH
                      </span>
                      <p className="text-base sm:text-lg text-north-muted leading-relaxed">
                        {study.approach}
                      </p>
                    </div>
                  </Reveal>
                )}

                {study.solution && (
                  <Reveal>
                    <div className="border-t border-north-border pt-10">
                      <span className="text-xs font-semibold tracking-widest uppercase text-north-accent mb-4 block">
                        03 / THE SOLUTION
                      </span>
                      <p className="text-base sm:text-lg text-north-muted leading-relaxed">
                        {study.solution}
                      </p>
                    </div>
                  </Reveal>
                )}
              </div>
            </Container>
          )}

          {/* Impact & Key Statistics Section */}
          {study.results && (study.results.summary || (Array.isArray(study.results.stats) && study.results.stats.length > 0)) && (
            <Section className="my-20 bg-north-surface border border-north-border rounded-sm p-8 sm:p-12 lg:p-16">
              <Reveal>
                <div className="flex flex-col items-start gap-4 mb-12">
                  <span className="text-xs font-semibold tracking-widest uppercase text-north-accent">
                    MEASURABLE IMPACT
                  </span>
                  <h2 className="font-serif text-4xl sm:text-5xl text-north-primary font-normal">
                    The Results
                  </h2>
                  {study.results.summary && (
                    <p className="text-lg text-north-muted max-w-2xl">
                      {study.results.summary}
                    </p>
                  )}
                </div>

                {Array.isArray(study.results.stats) && study.results.stats.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-north-border pt-8">
                    {study.results.stats.map((stat, idx) => (
                      <div key={idx} className="flex flex-col">
                        {stat.value && (
                          <span className="font-serif text-5xl sm:text-6xl text-north-accent font-normal mb-2">
                            {stat.value}
                          </span>
                        )}
                        {stat.label && (
                          <span className="text-base font-semibold text-north-primary mb-1">
                            {stat.label}
                          </span>
                        )}
                        {stat.description && (
                          <span className="text-xs text-north-muted">
                            {stat.description}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Reveal>
            </Section>
          )}

          {/* Photo Gallery */}
          {Array.isArray(study.galleryImages) && study.galleryImages.length > 0 && (
            <div className="mb-20 space-y-8">
              <Reveal>
                <h3 className="text-xs font-semibold tracking-widest uppercase text-north-muted">
                  VISUAL GALLERY
                </h3>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {study.galleryImages.map((img, idx) => (
                  <Reveal key={idx} delay={0.1 * idx}>
                    <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden border border-north-border bg-north-surface">
                      <SafeImage
                        src={img}
                        alt={`${study.client || study.title} gallery image ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        fallbackTitle={`Gallery image ${idx + 1}`}
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* Client Testimonial */}
          {study.testimonial && study.testimonial.quote && (
            <Reveal>
              <div className="bg-north-bg border border-north-border rounded-sm p-8 sm:p-12 mb-20 text-center flex flex-col items-center">
                <blockquote className="font-serif text-2xl sm:text-4xl text-north-primary leading-snug mb-8 max-w-2xl">
                  &ldquo;{study.testimonial.quote}&rdquo;
                </blockquote>
                <div className="text-center">
                  {study.testimonial.author && (
                    <h4 className="font-semibold text-north-primary text-base">
                      {study.testimonial.author}
                    </h4>
                  )}
                  {(study.testimonial.role || study.testimonial.company) && (
                    <p className="text-xs text-north-muted">
                      {study.testimonial.role}
                      {study.testimonial.role && study.testimonial.company ? ", " : ""}
                      {study.testimonial.company}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          )}

          {/* Related Case Studies */}
          {relatedStudies.length > 0 && (
            <div className="border-t border-north-border pt-16">
              <Reveal>
                <div className="flex items-center justify-between mb-10">
                  <h3 className="font-serif text-3xl text-north-primary font-normal">
                    Related Work
                  </h3>
                  <Link
                    href="/work"
                    className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#C7FF3D] text-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-[#b5f228] hover:shadow-md hover:shadow-[#C7FF3D]/20 border border-[#C7FF3D] transition-all duration-300 shadow-sm"
                  >
                    <span>View all projects</span>
                    <ArrowUpRight className="w-4 h-4 text-[#111111] transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </Link>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedStudies.map((rel) => (
                  <CaseStudyCard key={rel.id} caseStudy={rel} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </article>

      <CTA data={ctaData} />
    </>
  );
}
