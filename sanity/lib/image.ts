import createImageUrlBuilder from "@sanity/image-url";
import { projectId, dataset } from "./client";

const imageBuilder = projectId
  ? createImageUrlBuilder({
      projectId: projectId || "dummy",
      dataset: dataset || "production",
    })
  : null;

export const urlForImage = (source: any) => {
  if (!imageBuilder || !source) return null;
  return imageBuilder.image(source);
};


