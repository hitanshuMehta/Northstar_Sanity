import { defineField, defineType } from "sanity";

export const heroSectionType = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Eyebrow / Category Tag",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Main Hero Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Hero Paragraph / Subtitle",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Primary Button Label",
      type: "string",
    }),
    defineField({
      name: "primaryCtaLink",
      title: "Primary Button Link",
      type: "string",
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Secondary Button Label",
      type: "string",
    }),
    defineField({
      name: "secondaryCtaLink",
      title: "Secondary Button Link",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Hero Background / Feature Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "videoUrl",
      title: "Hero Video Stream URL (Optional MP4)",
      type: "url",
    }),
  ],
});
