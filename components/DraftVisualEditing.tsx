"use client";

import { useEffect, useState } from "react";
import { VisualEditing } from "next-sanity/visual-editing";

export function DraftVisualEditing() {
  const [inIframe, setInIframe] = useState(false);

  useEffect(() => {
    // Only render visual editing overlays when inside Sanity Studio Presentation iframe
    if (typeof window !== "undefined" && window.self !== window.top) {
      setInIframe(true);
    }
  }, []);

  if (!inIframe) return null;

  return <VisualEditing />;
}
