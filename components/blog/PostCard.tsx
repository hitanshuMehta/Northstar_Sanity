"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlogPost } from "@/lib/types";
import { Badge } from "../ui/Badge";

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  if (featured) {
    return (
      <Link href={`/insights/${post.slug}`} className="group block w-full">
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-north-surface border border-north-border rounded-sm p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-north-primary">
          <div className="lg:col-span-7 relative aspect-[16/10] w-full rounded-sm overflow-hidden border border-north-border">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <Badge variant="accent">{post.category}</Badge>
              <span className="text-xs text-north-muted font-mono">{post.readTime}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-north-primary font-normal leading-tight group-hover:text-north-muted transition-colors">
              {post.title}
            </h2>

            <p className="text-sm sm:text-base text-north-muted leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-north-border w-full mt-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-north-border">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col text-xs">
                <span className="font-semibold text-north-primary">{post.author.name}</span>
                <span className="text-north-muted">{post.publishedAt}</span>
              </div>
              <ArrowUpRight className="w-5 h-5 ml-auto text-north-primary group-hover:text-north-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/insights/${post.slug}`} className="group block w-full h-full">
      <article className="flex flex-col justify-between h-full bg-north-surface/50 border border-north-border rounded-sm p-6 transition-all duration-300 hover:border-north-primary hover:bg-north-surface">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden border border-north-border bg-north-bg">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-north-muted">
            <Badge variant="outline">{post.category}</Badge>
            <span className="font-mono">{post.readTime}</span>
          </div>

          <h3 className="font-serif text-2xl text-north-primary font-normal leading-snug group-hover:text-north-muted transition-colors">
            {post.title}
          </h3>

          <p className="text-sm text-north-muted leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between pt-6 mt-6 border-t border-north-border text-xs text-north-muted">
          <span>{post.publishedAt}</span>
          <span className="inline-flex items-center gap-1 font-medium text-north-primary group-hover:text-north-accent">
            Read article
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}
