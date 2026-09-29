import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons/Home";
import { SparklesIcon } from "@sanity/icons/Sparkles";
import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { CaseIcon } from "@sanity/icons/Case";
import { BarChartIcon } from "@sanity/icons/BarChart";
import { CogIcon } from "@sanity/icons/Cog";
import { ComposeIcon } from "@sanity/icons/Compose";
import { CommentIcon } from "@sanity/icons/Comment";
import { CheckmarkCircleIcon } from "@sanity/icons/CheckmarkCircle";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { BoltIcon } from "@sanity/icons/Bolt";
import { TabSearchInput } from "../../components/TabSearchInput";

export const homepageType = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: HomeIcon,
  components: {
    input: TabSearchInput,
  },
  preview: {
    prepare() {
      return {
        title: "Homepage Content Settings",
        subtitle: "Manage all homepage sections & fields",
      };
    },
  },
  groups: [
    { name: "hero", title: "Hero Section", icon: SparklesIcon },
    { name: "logoCloud", title: "Logo Cloud", icon: EarthGlobeIcon },
    { name: "featuredWork", title: "Featured Work", icon: CaseIcon },
    { name: "stats", title: "Key Statistics", icon: BarChartIcon },
    { name: "services", title: "Services Showcase", icon: CogIcon },
    { name: "imageText", title: "Editorial Philosophy", icon: ComposeIcon },
    { name: "testimonials", title: "Client Testimonials", icon: CommentIcon },
    { name: "results", title: "Results & Impact", icon: CheckmarkCircleIcon },
    { name: "insights", title: "Insights & Articles", icon: DocumentTextIcon },
    { name: "cta", title: "Call to Action Banner", icon: BoltIcon },
  ],
  fields: [
    // 1. Hero Section
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "heroSection",
      group: "hero",
    }),

    // 2. Logo Cloud Section
    defineField({
      name: "logoCloud",
      title: "Logo Cloud Section",
      type: "object",
      group: "logoCloud",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "logos",
          title: "Client Logos",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "name", title: "Company Name", type: "string" }),
                defineField({ name: "logoImage", title: "Logo Image Asset", type: "image" }),
                defineField({ name: "svgCode", title: "Inline SVG Code", type: "text", rows: 3 }),
                defineField({ name: "link", title: "Client Link URL", type: "url" }),
              ],
            },
          ],
        }),
      ],
    }),

    // 3. Featured Work Section
    defineField({
      name: "featuredWork",
      title: "Featured Work Section Settings",
      type: "object",
      group: "featuredWork",
      fields: [
        defineField({ name: "label", title: "Section Tag", type: "string", initialValue: "FEATURED WORK" }),
        defineField({ name: "title", title: "Section Heading", type: "string", initialValue: "Selected digital product transformations." }),
        defineField({ name: "description", title: "Section Subtitle", type: "text", rows: 2 }),
        defineField({
          name: "selectedCaseStudies",
          title: "Select Featured Case Studies",
          type: "array",
          of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
        }),
      ],
    }),

    // 4. Key Statistics Section (Common)
    defineField({
      name: "stats",
      title: "Key Statistics Section",
      type: "statsSection",
      group: "stats",
    }),

    // 5. Services Showcase Section
    defineField({
      name: "servicesSection",
      title: "Services Showcase Section",
      type: "object",
      group: "services",
      fields: [
        defineField({ name: "label", title: "Section Tag", type: "string", initialValue: "SERVICES & CAPABILITIES" }),
        defineField({ name: "title", title: "Section Heading", type: "string", initialValue: "End-to-end digital product design & engineering." }),
        defineField({ name: "description", title: "Section Subtitle", type: "text", rows: 2 }),
        defineField({
          name: "featuredServices",
          title: "Selected Services to Highlight",
          type: "array",
          of: [{ type: "reference", to: [{ type: "service" }] }],
        }),
      ],
    }),

    // 6. Editorial Philosophy Section
    defineField({
      name: "imageText",
      title: "Editorial Philosophy Section",
      type: "object",
      group: "imageText",
      fields: [
        defineField({ name: "label", title: "Eyebrow Tag", type: "string", initialValue: "OUR PHILOSOPHY" }),
        defineField({ name: "title", title: "Headline", type: "string", initialValue: "Bridging editorial art direction & software precision." }),
        defineField({ name: "paragraphs", title: "Paragraphs", type: "array", of: [{ type: "text", rows: 3 }] }),
        defineField({ name: "featureImage", title: "Feature Image", type: "image", options: { hotspot: true } }),
        defineField({ name: "quote", title: "Highlighted Quote", type: "text", rows: 2 }),
        defineField({ name: "quoteAuthor", title: "Quote Author / Attribution", type: "string" }),
        defineField({ name: "ctaLabel", title: "Button Label", type: "string" }),
        defineField({ name: "ctaLink", title: "Button Target Link", type: "string" }),
      ],
    }),

    // 7. Client Testimonials Section
    defineField({
      name: "testimonialsSection",
      title: "Client Testimonials Section",
      type: "object",
      group: "testimonials",
      fields: [
        defineField({ name: "label", title: "Section Tag", type: "string", initialValue: "CLIENT FEEDBACK" }),
        defineField({ name: "title", title: "Section Heading", type: "string", initialValue: "Trusted by founders and product leaders." }),
        defineField({
          name: "selectedTestimonials",
          title: "Featured Testimonials",
          type: "array",
          of: [{ type: "reference", to: [{ type: "testimonial" }] }],
        }),
      ],
    }),

    // 8. Results & Impact Section
    defineField({
      name: "resultsSection",
      title: "Results & Impact Section",
      type: "object",
      group: "results",
      fields: [
        defineField({ name: "label", title: "Section Tag", type: "string", initialValue: "PROVEN IMPACT" }),
        defineField({ name: "title", title: "Section Heading", type: "string", initialValue: "Measurable outcomes for ambitious brands." }),
        defineField({ name: "description", title: "Section Subtitle", type: "text", rows: 2 }),
        defineField({ name: "highlightMetric", title: "Highlight Big Metric (e.g. +340%)", type: "string" }),
        defineField({ name: "highlightLabel", title: "Highlight Metric Label", type: "string" }),
        defineField({
          name: "metrics",
          title: "Impact Metric Cards",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "value", title: "Metric Value", type: "string" }),
                defineField({ name: "label", title: "Metric Label", type: "string" }),
                defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
              ],
            },
          ],
        }),
      ],
    }),

    // 9. Insights & Articles Section
    defineField({
      name: "insightsSection",
      title: "Insights & Articles Section",
      type: "object",
      group: "insights",
      fields: [
        defineField({ name: "label", title: "Section Tag", type: "string", initialValue: "INSIGHTS & ESSAYS" }),
        defineField({ name: "title", title: "Section Heading", type: "string", initialValue: "Perspectives on digital craft, code and scale." }),
        defineField({
          name: "selectedPosts",
          title: "Featured Blog Posts",
          type: "array",
          of: [{ type: "reference", to: [{ type: "blogPost" }] }],
        }),
      ],
    }),

    // 10. CTA Banner Section (Common)
    defineField({
      name: "cta",
      title: "Call To Action Banner Section",
      type: "ctaSection",
      group: "cta",
    }),
  ],
});
