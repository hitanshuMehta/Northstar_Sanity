import React from "react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { PostCard } from "../blog/PostCard";
import { getFeaturedBlogPosts } from "@/lib/mock-data";

export async function Insights() {
  const posts = await getFeaturedBlogPosts();

  return (
    <Section id="insights">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <SectionHeading
            label="INSIGHTS & THOUGHTS"
            title="Perspectives on craft, code and scale."
            description="Editorial analysis on modern web development, headless architecture, and design strategy."
            className="mb-0"
          />
          <div className="mt-6 md:mt-0">
            <Button href="/insights" variant="secondary" size="md" showArrow>
              View all insights
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post, idx) => (
            <Reveal key={post.id} delay={0.1 * idx}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
