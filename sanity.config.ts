import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "01e2vw0l";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  basePath: "/studio",
  name: "Northstar_Studio",
  title: "Northstar Studio CMS",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure,
    }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: {
        mainDocuments: [
          { route: "/", filter: `_type == "homepage"` },
          { route: "/about", filter: `_type == "aboutPage"` },
          { route: "/services", filter: `_type == "servicesPage"` },
          { route: "/work", filter: `_type == "workPage"` },
          { route: "/insights", filter: `_type == "insightsPage"` },
          { route: "/contact", filter: `_type == "contactPage"` },
          { route: "/work/:slug", filter: `_type == "caseStudy" && slug.current == $slug` },
          { route: "/insights/:slug", filter: `_type == "blogPost" && slug.current == $slug` },
        ],
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
