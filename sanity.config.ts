import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { Icon } from "@sanity/icons";
import React from "react";
import { schemaTypes } from "./sanity/schemaTypes";

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
      structure: (S) =>
        S.list()
          .title("Northstar CMS Studio")
          .items([
            // Main "Landing Page" Tab
            S.listItem()
              .title("Landing Page")
              .icon(() => React.createElement(Icon, { symbol: "dashboard" }))
              .child(
                S.list()
                  .title("Landing Page Sections")
                  .items([
                    S.listItem()
                      .title("01. Hero Section")
                      .icon(() => React.createElement(Icon, { symbol: "rocket" }))
                      .child(
                        S.document()
                          .schemaType("hero")
                          .documentId("landing-page-hero")
                      ),

                    S.listItem()
                      .title("02. Logo Cloud")
                      .icon(() => React.createElement(Icon, { symbol: "earth-americas" }))
                      .child(
                        S.document()
                          .schemaType("logoCloud")
                          .documentId("landing-logo-cloud")
                      ),

                    S.listItem()
                      .title("03. Featured Case Studies")
                      .icon(() => React.createElement(Icon, { symbol: "case" }))
                      .child(
                        S.documentTypeList("caseStudy")
                          .title("Featured Case Studies")
                          .filter('_type == "caseStudy" && featured == true')
                      ),

                    S.listItem()
                      .title("04. Key Statistics")
                      .icon(() => React.createElement(Icon, { symbol: "chart-upward" }))
                      .child(
                        S.documentTypeList("stat").title("Key Statistics")
                      ),

                    S.listItem()
                      .title("05. Services Showcase")
                      .icon(() => React.createElement(Icon, { symbol: "cog" }))
                      .child(
                        S.documentTypeList("service").title("Services Showcase")
                      ),

                    S.listItem()
                      .title("06. Editorial Philosophy")
                      .icon(() => React.createElement(Icon, { symbol: "compose" }))
                      .child(
                        S.document()
                          .schemaType("imageText")
                          .documentId("landing-image-text")
                      ),

                    S.listItem()
                      .title("07. Client Testimonials")
                      .icon(() => React.createElement(Icon, { symbol: "comment" }))
                      .child(
                        S.documentTypeList("testimonial").title("Client Testimonials")
                      ),

                    S.listItem()
                      .title("08. Results & Impact")
                      .icon(() => React.createElement(Icon, { symbol: "checkmark-circle" }))
                      .child(
                        S.document()
                          .schemaType("resultSection")
                          .documentId("landing-results")
                      ),

                    S.listItem()
                      .title("09. Insights & Articles")
                      .icon(() => React.createElement(Icon, { symbol: "document-text" }))
                      .child(
                        S.documentTypeList("blogPost").title("Insights & Articles")
                      ),

                    S.listItem()
                      .title("10. Call to Action Banner")
                      .icon(() => React.createElement(Icon, { symbol: "bolt" }))
                      .child(
                        S.document()
                          .schemaType("ctaBanner")
                          .documentId("landing-cta-banner")
                      ),
                  ])
              ),

            S.divider(),

            // Content Collections / Full Libraries
            S.listItem()
              .title("All Case Studies")
              .icon(() => React.createElement(Icon, { symbol: "case" }))
              .child(S.documentTypeList("caseStudy").title("All Case Studies")),

            S.listItem()
              .title("All Insights / Articles")
              .icon(() => React.createElement(Icon, { symbol: "document-text" }))
              .child(S.documentTypeList("blogPost").title("All Insights")),

            S.listItem()
              .title("All Services")
              .icon(() => React.createElement(Icon, { symbol: "cog" }))
              .child(S.documentTypeList("service").title("All Services")),

            S.listItem()
              .title("Header Navigation")
              .icon(() => React.createElement(Icon, { symbol: "component" }))
              .child(
                S.document()
                  .schemaType("navigation")
                  .documentId("header-navigation")
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
