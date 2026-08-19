"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CaseStudy } from "@/lib/types";

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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const aspectClasses = {
    video: "aspect-[16/10]",
    square: "aspect-square",
    portrait: "aspect-[4/5]",
  }[aspectRatio];

  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group flex flex-col w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsVideoPlaying(false);
      }}
    >
      <article className="flex flex-col justify-between h-full gap-5 w-full">
        {/* Cover Image Container with Safe Motion Video Overlay */}
        <div
          className={`relative w-full ${aspectClasses} rounded-sm overflow-hidden bg-north-surface border border-north-border`}
        >
          {/* Base Image is ALWAYS rendered to prevent black boxes */}
          <Image
            src={caseStudy.coverImage}
            alt={caseStudy.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Video Overlay on top - Fades in ONLY when video is actually playing */}
          {caseStudy.videoUrl && !videoError && isHovered && (
            <video
              src={caseStudy.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              onPlaying={() => setIsVideoPlaying(true)}
              onError={() => setVideoError(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${isVideoPlaying ? "opacity-100 scale-105" : "opacity-0"
                }`}
            />
          )}

          {/* Dark Overlay Gradient on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Subtle sheen highlight animation on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          {/* Top Info overlay - High Contrast Glassmorphic Badges for 100% Legibility on ANY Image */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none gap-2">
            <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-wider uppercase px-3 py-1 bg-black/85 backdrop-blur-md text-white border border-white/20 rounded-full flex items-center gap-1.5 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-north-accent flex-shrink-0" />
              <span className="truncate">{caseStudy.category}</span>
            </span>

            <div className="flex items-center gap-2 flex-shrink-0">
              {caseStudy.videoUrl && (
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 bg-black/85 backdrop-blur-md text-white border border-white/20 rounded-full flex items-center gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-north-accent animate-pulse" />
                  REEL
                </span>
              )}
              <span className="text-[10px] font-mono font-semibold px-2.5 py-1 bg-black/85 backdrop-blur-md text-white border border-white/20 rounded-full shadow-md">
                {caseStudy.year}
              </span>
            </div>
          </div>

          {/* Floating Arrow Badge - White Circle by Default, Electric Lime #C7FF3D on Hover */}
          <div className="absolute bottom-4 right-4 z-10 w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#C7FF3D] group-hover:shadow-2xl">
            <ArrowUpRight className="w-5 h-5 text-black transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.5]" />
          </div>
        </div>

        {/* Content Details with Fixed Alignment */}
        <div className="flex flex-col flex-1 justify-between gap-2.5">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-north-muted">
              <span>{caseStudy.client}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-north-primary font-normal leading-snug group-hover:text-north-muted transition-colors line-clamp-2 min-h-[3.5rem] sm:min-h-[4rem]">
              {caseStudy.title}
            </h3>
          </div>
          <p className="text-sm text-north-muted line-clamp-2 leading-relaxed">
            {caseStudy.summary}
          </p>
        </div>
      </article>
    </Link>
  );
}

