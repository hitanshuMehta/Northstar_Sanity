"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PostCard } from "@/components/blog/PostCard";
import { Reveal } from "@/components/ui/Reveal";
import { MOCK_BLOG_POSTS } from "@/lib/mock-data";
import { CTA } from "@/components/sections/CTA";

const CATEGORIES = [
  "All",
  "Design Insights",
  "Engineering Architecture",
  "Strategy",
  "Product Growth",
];

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const featuredPost = MOCK_BLOG_POSTS[0];

  const filteredPosts =
    selectedCategory === "All"
      ? MOCK_BLOG_POSTS
      : MOCK_BLOG_POSTS.filter((post) => post.category === selectedCategory);

  return (
    <>
      <Section className="pt-32 sm:pt-40 md:pt-48 pb-12">
        <Container>
          <SectionHeading
            label="INSIGHTS & ESSAYS"
            title="Perspectives on digital craft, code and scale."
            description="In-depth articles from our design and engineering team on building products that stand out."
            titleSize="hero"
          />

          {/* Lead Featured Post */}
          {selectedCategory === "All" && (
            <Reveal className="mb-16">
              <PostCard post={featuredPost} featured />
            </Reveal>
          )}

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2.5 border-b border-north-border pb-6 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-north-primary text-north-bg font-bold shadow-md"
                    : "bg-north-surface text-north-muted hover:text-north-primary border border-north-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <Reveal key={post.id} delay={0.05 * idx}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
