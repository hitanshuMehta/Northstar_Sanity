import { defineArrayMember, defineField, defineType } from "sanity";
import { Icon } from "@sanity/icons";
import React from "react";

export const imageTextType = defineType({
  name: "imageText",
  title: "Editorial Image Text Feature",
  type: "document",
  icon: () => React.createElement(Icon, { symbol: "compose" }),
  fields: [
    defineField({
      name: "label",
      title: "Section Tagline / Category Label",
      type: "string",
      initialValue: "OUR PHILOSOPHY",
    }),
    defineField({
      name: "title",
      title: "Main Editorial Headline",
      type: "string",
      initialValue: "Bridging strategic vision and technical craftsmanship.",
    }),
    defineField({
      name: "paragraphs",
      title: "Paragraph Copy Blocks",
      type: "array",
      of: [defineArrayMember({ type: "text" })],
      initialValue: [
        "We believe that exceptional digital products require both editorial restraint and robust software architecture.",
        "Our multidisciplinary teams partner closely with founders and executive leaders from initial product strategy through post-launch scale.",
      ],
    }),
    defineField({
      name: "featureImage",
      title: "Feature Showcase Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featureImageUrl",
      title: "Feature Image Fallback Static URL (Optional)",
      type: "string",
      initialValue: "/images/hero-studio.jpg",
    }),
    defineField({
      name: "quote",
      title: "Highlight Quote Text",
      type: "text",
      rows: 2,
      initialValue: "Design is not just what it looks like. Design is how it works.",
    }),
    defineField({
      name: "quoteAuthor",
      title: "Quote Author Name",
      type: "string",
      initialValue: "Northstar Design Philosophy",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Text",
      type: "string",
      initialValue: "Learn more about us",
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Button Target Link",
      type: "string",
      initialValue: "/about",
    }),
  ],
});
