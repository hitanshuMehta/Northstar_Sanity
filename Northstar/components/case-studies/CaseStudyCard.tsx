"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { CaseStudy } from "@/lib/types";
import { Badge } from "../ui/Badge";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  aspectRatio?: "video" | "square" | "portrait";
  index?: number;
}

export function CaseStudyCard({
  caseStudy,
  aspectRatio = "video",
}: CaseStudyCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const aspectClasses = {
    video: "aspect-[16/10]",
    square: "aspect-square",
    portrait: "aspect-[4/5]",
  }[aspectRatio];

  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group block w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article className="flex flex-col gap-6 w-full">
        {/* Cover Image Container with Motion Video Preview */}
        <div
          className={`relative w-full ${aspectClasses} rounded-sm overflow-hidden bg-north-surface border border-north-border`}
        >
          {caseStudy.videoUrl && isHovered ? (
            <video
              src={caseStudy.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 ease-out scale-105"
            />
          ) : (
            <Image
              src={caseStudy.coverImage}
              alt={caseStudy.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          {/* Top Info overlay */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
            <Badge variant="accent">{caseStudy.category}</Badge>
            <div className="flex items-center gap-2">
              {caseStudy.videoUrl && (
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-[#C7FF3D] text-black rounded-full flex items-center gap-1">
                  <Play className="w-2.5 h-2.5 fill-black" /> MOTION
                </span>
              )}
              <span className="text-xs font-mono font-medium px-2.5 py-1 bg-black/60 backdrop-blur-md text-white rounded-full">
                {caseStudy.year}
              </span>
            </div>
          </div>

          {/* Floating Arrow Badge */}
          <div className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-white dark:bg-black text-black dark:text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#C7FF3D] group-hover:text-black">
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Content Details */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-north-muted">
            <span>{caseStudy.client}</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-north-primary font-normal leading-snug group-hover:text-north-muted transition-colors">
            {caseStudy.title}
          </h3>
          <p className="text-sm text-north-muted line-clamp-2 leading-relaxed">
            {caseStudy.summary}
          </p>
        </div>
      </article>
    </Link>
  );
}
