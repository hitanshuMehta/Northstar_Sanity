"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PostCard } from "@/components/blog/PostCard";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/sections/CTA";
import { BlogPost } from "@/lib/types";

interface InsightsPageClientProps {
  data: {
    hero?: { label?: string; title?: string; description?: string };
    categories?: string[];
    blogPosts?: BlogPost[];
    ctaData?: any;
  };
}

export function InsightsPageClient({ data }: InsightsPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogPosts = Array.isArray(data.blogPosts) ? data.blogPosts : [];
  const categories = Array.isArray(data.categories) && data.categories.length > 0 ? data.categories : ["All"];

  const featuredPost = blogPosts[0];

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <>
      <Section className="pt-32 sm:pt-40 md:pt-48 pb-12">
        <Container>
          {(data.hero?.title || data.hero?.description) && (
            <SectionHeading
              label={data.hero?.label || "INSIGHTS & ESSAYS"}
              title={data.hero?.title || "Perspectives on digital craft, code and scale."}
              description={data.hero?.description || ""}
              titleSize="hero"
            />
          )}

          {/* Lead Featured Post */}
          {selectedCategory === "All" && featuredPost && (
            <Reveal className="mb-16">
              <PostCard post={featuredPost} featured />
            </Reveal>
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
                      : "bg-north-surface text-north-muted hover:text-north-primary border border-north-border"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Article Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, idx) => (
                <Reveal key={post.id || idx} delay={0.05 * idx}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-north-muted border border-north-border rounded-sm bg-north-surface">
              <p className="text-sm font-mono">No articles found in this category.</p>
            </div>
          )}
        </Container>
      </Section>

      <CTA data={data.ctaData} />
    </>
  );
}
