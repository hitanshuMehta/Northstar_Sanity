import createImageUrlBuilder from "@sanity/image-url";
import { stegaClean } from "@sanity/client/stega";
import { projectId, dataset } from "./client";

const imageBuilder = projectId
  ? createImageUrlBuilder({
      projectId: projectId || "dummy",
      dataset: dataset || "production",
    })
  : null;

export const urlForImage = (source: unknown, width?: number): string | null => {
  if (!imageBuilder || !source) return null;
  const cleanSource = stegaClean(source);
  if (!cleanSource) return null;

  try {
    let img = imageBuilder.image(cleanSource as any).auto("format");
    if (width) img = img.width(width);
    const url = img.url();
    if (url && (url.includes("/null-") || url.includes("-null."))) return null;
    return url;
  } catch {
    return null;
  }
};
