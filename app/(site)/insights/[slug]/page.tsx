import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { PostCard } from "@/components/blog/PostCard";
import { SafeImage } from "@/components/ui/SafeImage";
import { CTA } from "@/components/sections/CTA";
import {
  getSanityBlogPostBySlug,
  getSanityBlogPosts,
  getCtaData,
} from "@/sanity/lib/fetch";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateStaticParams() {
  const posts = await getSanityBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getSanityBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getSanityBlogPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const ctaData = await getCtaData();

  return (
    <>
      <article className="w-full pt-32 sm:pt-40 md:pt-48 pb-20">
        <Container size="narrow">
          {/* Back Link & Category */}
          <Reveal>
            <div className="flex items-center justify-between mb-8">
              <Link href="/insights" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-north-muted hover:text-north-primary">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Insights</span>
              </Link>
              {post.category && <Badge variant="accent">{post.category}</Badge>}
            </div>
          </Reveal>

          {/* Article Title & Excerpt */}
          <Reveal delay={0.1}>
            {post.title && (
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-north-primary font-normal leading-[1.08] tracking-tight mb-6">
                {post.title}
              </h1>
            )}
            {post.excerpt && (
              <p className="text-lg sm:text-xl text-north-muted leading-relaxed font-normal mb-8">
                {post.excerpt}
              </p>
            )}

            {/* Author Bar */}
            {(post.author?.name || post.publishedAt || post.readTime) && (
              <div className="flex items-center justify-between py-6 border-y border-north-border mb-10">
                {post.author?.name && (
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-north-border bg-north-surface">
                      <SafeImage
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                        type="avatar"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-north-primary text-sm">
                        {post.author.name}
                      </h4>
                      {post.author.role && (
                        <p className="text-xs text-north-muted">
                          {post.author.role}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-6 text-xs text-north-muted font-mono ml-auto">
                  {post.publishedAt && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.publishedAt}
                    </span>
                  )}
                  {post.readTime && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  )}
                </div>
              </div>
            )}
          </Reveal>

          {/* Hero Cover Image */}
          {post.coverImage && (
            <Reveal delay={0.2}>
              <div className="relative w-full aspect-[16/9] rounded-sm overflow-hidden border border-north-border bg-north-surface mb-16">
                <SafeImage
                  src={post.coverImage}
                  alt={post.title || "Blog cover"}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 960px) 100vw, 960px"
                  fallbackTitle={post.title}
                />
              </div>
            </Reveal>
          )}

          {/* Article Content Body */}
          <div className="space-y-12 text-base sm:text-lg text-north-primary leading-relaxed font-normal">
            {post.content?.introduction && (
              <Reveal>
                <p className="text-xl sm:text-2xl font-serif leading-relaxed text-north-primary border-l-2 border-north-accent pl-6 italic">
                  {post.content.introduction}
                </p>
              </Reveal>
            )}

            {Array.isArray(post.content?.headings) &&
              post.content.headings.map((h: any, idx: number) => (
                <Reveal key={h.id || idx}>
                  <div className="space-y-4 pt-6 border-t border-north-border/40">
                    {h.title && (
                      <h2 className="font-serif text-2xl sm:text-3xl font-normal text-north-primary tracking-tight">
                        {h.title}
                      </h2>
                    )}
                    {h.content && (
                      <p className="text-north-muted leading-relaxed">
                        {h.content}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}

            {post.content?.keyTakeaway && (
              <Reveal>
                <div className="bg-north-surface border border-north-border rounded-sm p-6 sm:p-8 my-8">
                  <span className="text-xs font-semibold tracking-widest uppercase text-north-accent block mb-2">
                    KEY TAKEAWAY
                  </span>
                  <p className="font-serif text-xl text-north-primary">
                    &ldquo;{post.content.keyTakeaway}&rdquo;
                  </p>
                </div>
              </Reveal>
            )}

            {post.content?.conclusion && (
              <Reveal>
                <div className="pt-6 border-t border-north-border text-north-muted leading-relaxed">
                  <p>{post.content.conclusion}</p>
                </div>
              </Reveal>
            )}
          </div>

          {/* Author Bio Footer Block */}
          {post.author?.name && (
            <Reveal>
              <div className="bg-north-surface border border-north-border rounded-sm p-8 mt-16 flex flex-col sm:flex-row items-start gap-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-north-border flex-shrink-0 bg-north-bg">
                  <SafeImage
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                    type="avatar"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-north-primary text-base mb-1">
                    Written by {post.author.name}
                  </h4>
                  {post.author.role && (
                    <p className="text-xs font-mono text-north-accent mb-3">
                      {post.author.role}
                    </p>
                  )}
                  {post.author.bio && (
                    <p className="text-xs text-north-muted leading-relaxed">
                      {post.author.bio}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          )}

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="mt-20 border-t border-north-border pt-16">
              <h3 className="font-serif text-3xl text-north-primary font-normal mb-8">
                Related Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rel) => (
                  <PostCard key={rel.id} post={rel} />
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
