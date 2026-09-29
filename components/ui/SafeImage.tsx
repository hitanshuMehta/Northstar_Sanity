"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Image as ImageIcon, User, Building2 } from "lucide-react";

interface SafeImageProps {
  src?: string | null;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fallbackTitle?: string;
  type?: "image" | "avatar" | "logo";
}

export function SafeImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  sizes,
  priority = false,
  fallbackTitle,
  type = "image",
}: SafeImageProps) {
  const [error, setError] = useState(false);
  const isValidSrc = typeof src === "string" && src.trim().length > 0;

  useEffect(() => {
    setError(false);
  }, [src]);

  if (!isValidSrc || error) {
    if (type === "avatar") {
      const initials = (alt || "Author")
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

      return (
        <div
          className={`relative flex items-center justify-center bg-north-surface border border-north-border rounded-full overflow-hidden text-north-primary shadow-inner ${className}`}
          style={{ width: fill ? "100%" : width, height: fill ? "100%" : height }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-north-surface via-north-bg to-north-surface opacity-80" />
          <span className="relative z-10 font-mono text-xs font-bold tracking-wider text-north-accent flex items-center justify-center gap-1">
            {initials || <User className="w-4 h-4 text-north-accent" />}
          </span>
        </div>
      );
    }

    if (type === "logo") {
      return (
        <div
          className={`relative flex items-center justify-center bg-north-surface/80 border border-north-border rounded-sm p-3 text-north-primary ${className}`}
          style={{ width: fill ? "100%" : width, height: fill ? "100%" : height }}
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-north-muted uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5 text-north-accent" />
            <span className="truncate">{alt || "Client"}</span>
          </div>
        </div>
      );
    }

    // Default Image Placeholder
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-north-surface border border-north-border rounded-sm overflow-hidden p-6 text-center shadow-inner group ${className}`}
        style={{ width: fill ? "100%" : width, height: fill ? "100%" : height }}
      >
        {/* Fine grid background pattern */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(var(--tw-gradient-stops, #C7FF3D 1px, transparent 1px))`,
            backgroundSize: "16px 16px",
          }}
        />

        {/* Ambient gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-north-bg/90 via-north-surface to-north-bg/60 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-2 max-w-[80%]">
          <div className="w-10 h-10 rounded-full bg-north-bg border border-north-border flex items-center justify-center text-north-accent mb-1 shadow-md group-hover:border-north-accent transition-colors">
            <ImageIcon className="w-5 h-5 text-north-accent" />
          </div>

          <span className="text-[11px] font-mono font-semibold tracking-widest text-north-accent uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-north-accent animate-pulse" />
            {fallbackTitle || alt || "NORTHSTAR ASSET"}
          </span>

          <span className="text-[10px] font-mono text-north-muted/70 uppercase tracking-wider">
            IMAGE PLACEHOLDER
          </span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src!}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}
