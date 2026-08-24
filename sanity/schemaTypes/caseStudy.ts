import { defineArrayMember, defineField, defineType } from "sanity";
import { Icon } from "@sanity/icons";
import React from "react";

export const caseStudyType = defineType({
  name: "caseStudy",
  title: "Case Study / Work Project",
  type: "document",
  icon: () => React.createElement(Icon, { symbol: "case" }),
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL identifier)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      initialValue: "2024",
    }),
    defineField({
      name: "summary",
      title: "Summary / Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "featured",
      title: "Feature on Landing Page",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "coverImage",
      title: "Card Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "coverImageUrl",
      title: "Cover Image Static Fallback URL (Optional)",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Banner Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImageUrl",
      title: "Hero Image Static Fallback URL (Optional)",
      type: "string",
    }),
    defineField({
      name: "videoUrl",
      title: "Autoplay Showcase Video URL (Optional)",
      type: "url",
    }),
    defineField({
      name: "challenge",
      title: "The Challenge",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "approach",
      title: "Our Approach",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "solution",
      title: "The Solution",
      type: "text",
      rows: 4,
    }),

    // Results block
    defineField({
      name: "resultsSummary",
      title: "Results Summary Text",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "stats",
      title: "Metrics & Statistics",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "caseStat",
          title: "Metric Item",
          fields: [
            defineField({ name: "label", type: "string", title: "Label" }),
            defineField({ name: "value", type: "string", title: "Value (e.g. +340%)" }),
            defineField({ name: "description", type: "string", title: "Description" }),
          ],
        }),
      ],
    }),

    // Gallery images
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),

    // Testimonial
    defineField({
      name: "testimonialQuote",
      title: "Client Quote",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "testimonialAuthor",
      title: "Testimonial Author Name",
      type: "string",
    }),
    defineField({
      name: "testimonialRole",
      title: "Testimonial Author Role",
      type: "string",
    }),
    defineField({
      name: "testimonialCompany",
      title: "Testimonial Company",
      type: "string",
    }),

    // Related Slugs
    defineField({
      name: "relatedSlugs",
      title: "Related Case Study Slugs",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "liveUrl",
      title: "Live Website URL",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "client",
      media: "coverImage",
    },
  },
});
