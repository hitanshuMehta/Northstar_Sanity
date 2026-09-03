import { defineField, defineType } from "sanity";

export const ctaSectionType = defineType({
  name: "ctaSection",
  title: "CTA Section",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Section Tag / Eyebrow",
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
      title: "Primary Button Text",
      type: "string",
      initialValue: "Start a conversation",
    }),
    defineField({
      name: "primaryButtonLink",
      title: "Primary Button URL",
      type: "string",
      initialValue: "/contact",
    }),
    defineField({
      name: "secondaryButtonLabel",
      title: "Secondary Button Text",
      type: "string",
      initialValue: "Explore our work",
    }),
    defineField({
      name: "secondaryButtonLink",
      title: "Secondary Button URL",
      type: "string",
      initialValue: "/work",
    }),
  ],
});
