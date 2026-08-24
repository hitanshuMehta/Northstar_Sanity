import { defineField, defineType } from "sanity";
import { Icon } from "@sanity/icons";
import React from "react";

export const ctaType = defineType({
  name: "ctaBanner",
  title: "CTA Call To Action Banner",
  type: "document",
  icon: () => React.createElement(Icon, { symbol: "bolt" }),
  fields: [
    defineField({
      name: "label",
      title: "Category Label Tag",
      type: "string",
      initialValue: "START A PROJECT",
    }),
    defineField({
      name: "title",
      title: "Main CTA Headline",
      type: "string",
      initialValue: "Ready to build something extraordinary?",
    }),
    defineField({
      name: "description",
      title: "Supporting Subtitle",
      type: "text",
      rows: 2,
      initialValue:
        "Let's partner to transform your product vision into a world-class digital experience.",
    }),
    defineField({
      name: "primaryButtonLabel",
      title: "Primary Button Label",
      type: "string",
      initialValue: "Start a conversation",
    }),
    defineField({
      name: "primaryButtonLink",
      title: "Primary Button Target URL",
      type: "string",
      initialValue: "/contact",
    }),
    defineField({
      name: "secondaryButtonLabel",
      title: "Secondary Button Label",
      type: "string",
      initialValue: "Explore our work",
    }),
    defineField({
      name: "secondaryButtonLink",
      title: "Secondary Button Target URL",
      type: "string",
      initialValue: "/work",
    }),
  ],
});
