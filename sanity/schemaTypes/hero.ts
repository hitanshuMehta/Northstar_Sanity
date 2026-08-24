import { defineArrayMember, defineField, defineType } from "sanity";
import { Icon } from "@sanity/icons";
import React from "react";

export const heroType = defineType({
  name: "hero",
  title: "Landing Section (Hero)",
  type: "document",
  icon: () => React.createElement(Icon, { symbol: "rocket" }),


  fieldsets: [
    { name: "copy", title: "Header Copy & Text", options: { collapsible: true, collapsed: false } },
    { name: "cta", title: "Call To Action Buttons", options: { collapsible: true, collapsed: false } },
    { name: "media", title: "Showcase Media & Badges", options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    defineField({
      name: "label",
      title: "Hero Tagline / Category Label",
      type: "string",
      fieldset: "copy",
      initialValue: "DIGITAL PRODUCTS / STRATEGY / EXPERIENCE",
      description: "Small uppercase tag displayed above the headline.",
    }),
    defineField({
      name: "title",
      title: "Main Editorial Headline",
      type: "string",
      fieldset: "copy",
      initialValue: "We build digital experiences that move businesses forward.",
      description: "Primary large heading for the hero section.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Supporting Subtitle / Paragraph",
      type: "text",
      fieldset: "copy",
      rows: 3,
      initialValue:
        "Northstar partners with ambitious companies to design, build and scale digital products that people actually want to use.",
    }),

    // CTA Buttons Array for flexible add / remove / reorder
    defineField({
      name: "buttons",
      title: "Call To Action Buttons List",
      type: "array",
      fieldset: "cta",
      description: "Add, edit, reorder, or remove call to action buttons dynamically.",
      of: [
        defineArrayMember({
          type: "object",
          name: "ctaButton",
          title: "Button Item",
          fields: [
            defineField({
              name: "label",
              title: "Button Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "link",
              title: "Button Target Link / URL",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "variant",
              title: "Visual Variant",
              type: "string",
              options: {
                list: [
                  { title: "Primary (Accent Button)", value: "primary" },
                  { title: "Secondary (Outline Button)", value: "secondary" },
                ],
                layout: "radio",
              },
              initialValue: "primary",
            }),
            defineField({
              name: "showArrow",
              title: "Show Arrow Icon",
              type: "boolean",
              initialValue: false,
            }),
          ],
        }),
      ],
      initialValue: [
        { label: "View our work", link: "/work", variant: "primary", showArrow: true },
        { label: "Start a conversation", link: "/contact", variant: "secondary", showArrow: false },
      ],
    }),

    // Fallback Legacy CTA fields for backwards compatibility
    defineField({
      name: "primaryCtaLabel",
      title: "Primary Button Text (Legacy)",
      type: "string",
      fieldset: "cta",
      hidden: true,
    }),
    defineField({
      name: "primaryCtaLink",
      title: "Primary Button Link (Legacy)",
      type: "string",
      fieldset: "cta",
      hidden: true,
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Secondary Button Text (Legacy)",
      type: "string",
      fieldset: "cta",
      hidden: true,
    }),
    defineField({
      name: "secondaryCtaLink",
      title: "Secondary Button Link (Legacy)",
      type: "string",
      fieldset: "cta",
      hidden: true,
    }),

    // Media
    defineField({
      name: "videoUrl",
      title: "Autoplay Showcase Video URL",
      type: "url",
      fieldset: "media",
      initialValue:
        "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-data-41539-large.mp4",
      description: "Direct URL to MP4/WebM video. Leave empty if using an image or gradient background.",
    }),
    defineField({
      name: "fallbackImage",
      title: "Hero Showcase Image",
      type: "image",
      fieldset: "media",
      options: {
        hotspot: true,
      },
      description: "Upload an image from Sanity. Displayed if video is omitted or fails to load.",
    }),
    defineField({
      name: "locationLabel",
      title: "Bottom Left Corner Label",
      type: "string",
      fieldset: "media",
      initialValue: "DESIGN STUDIO / NEW YORK",
      description: "Badge text in bottom left corner of hero media frame.",
    }),
    defineField({
      name: "establishedLabel",
      title: "Bottom Right Corner Label",
      type: "string",
      fieldset: "media",
      initialValue: "EST. 2014",
      description: "Badge text in bottom right corner of hero media frame.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "label",
      media: "fallbackImage",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title || "Landing Section (Hero)",
        subtitle: subtitle || "Hero Section Content",
        media: media || (() => React.createElement(Icon, { symbol: "rocket" })),
      };
    },
  },
});


