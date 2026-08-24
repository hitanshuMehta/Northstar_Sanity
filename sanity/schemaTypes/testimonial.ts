import { defineField, defineType } from "sanity";
import { Icon } from "@sanity/icons";
import React from "react";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Client Testimonial",
  type: "document",
  icon: () => React.createElement(Icon, { symbol: "comment" }),
  fields: [
    defineField({
      name: "quote",
      title: "Quote Statement",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Author Role",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Company Name",
      type: "string",
    }),
    defineField({
      name: "avatar",
      title: "Author Avatar Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "avatarUrl",
      title: "Avatar Static URL (Optional)",
      type: "string",
    }),
    defineField({
      name: "metric",
      title: "Highlight Metric (Optional, e.g. 4.2x ROI)",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Feature on Landing Page",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "author",
      subtitle: "company",
      media: "avatar",
    },
  },
});
