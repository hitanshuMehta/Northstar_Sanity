import React from "react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { PostCard } from "../blog/PostCard";
import { InsightsSectionData, getSanityFeaturedBlogPosts } from "@/sanity/lib/fetch";

interface InsightsProps {
  data?: InsightsSectionData;
}

export async function Insights({ data }: InsightsProps) {
  const posts = data?.posts ?? (await getSanityFeaturedBlogPosts());

  const label = data?.label ?? "INSIGHTS & THOUGHTS";
  const title = data?.title ?? "Perspectives on craft, code and scale.";
  const description = data?.description ?? "Editorial analysis on modern web development, headless architecture, and design strategy.";

  if (!posts || (posts.length === 0 && !title)) {
    return null;
  }

  return (
    <Section id="insights">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <SectionHeading
            label={label}
            title={title}
            description={description}
            className="mb-0"
          />
          <div className="mt-6 md:mt-0">
            <Button href="/insights" variant="secondary" size="md" showArrow>
              View all insights
            </Button>
          </div>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post, idx) => (
              <Reveal key={post.id || idx} delay={0.1 * idx}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center border border-north-border rounded-sm bg-north-surface">
            <p className="text-sm font-mono text-north-muted">No insights published yet.</p>
          </div>
        )}
      </Container>
    </Section>
  );
}
