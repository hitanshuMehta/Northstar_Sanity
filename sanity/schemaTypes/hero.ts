import { defineField, defineType } from "sanity";

export const heroType = defineType({
  name: "hero",
  title: "Landing Page Hero",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Hero Tagline Label",
      type: "string",
      initialValue: "DIGITAL PRODUCTS / STRATEGY / EXPERIENCE",
      description: "Small uppercase tag displayed above the headline.",
    }),
    defineField({
      name: "title",
      title: "Main Editorial Headline",
      type: "string",
      initialValue: "We build digital experiences that move businesses forward.",
      description: "Primary large heading for the hero section.",
    }),
    defineField({
      name: "description",
      title: "Supporting Description Copy",
      type: "text",
      rows: 3,
      initialValue:
        "Northstar partners with ambitious companies to design, build and scale digital products that people actually want to use.",
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Primary Button Text",
      type: "string",
      initialValue: "View our work",
    }),
    defineField({
      name: "primaryCtaLink",
      title: "Primary Button Link URL",
      type: "string",
      initialValue: "/work",
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Secondary Button Text",
      type: "string",
      initialValue: "Start a conversation",
    }),
    defineField({
      name: "secondaryCtaLink",
      title: "Secondary Button Link URL",
      type: "string",
      initialValue: "/contact",
    }),
    defineField({
      name: "videoUrl",
      title: "Autoplay Showcase Video URL",
      type: "url",
      initialValue:
        "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-data-41539-large.mp4",
      description: "Direct URL to MP4/WebM showcase video.",
    }),
    defineField({
      name: "fallbackImage",
      title: "Hero Showcase Fallback Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Fallback image if video fails to load or on mobile.",
    }),
    defineField({
      name: "locationLabel",
      title: "Location Tag",
      type: "string",
      initialValue: "DESIGN STUDIO / NEW YORK",
    }),
    defineField({
      name: "establishedLabel",
      title: "Established Tag",
      type: "string",
      initialValue: "EST. 2014",
    }),
  ],
});
