import { defineArrayMember, defineField, defineType } from "sanity";
import { Icon } from "@sanity/icons";
import React from "react";

export const serviceType = defineType({
  name: "service",
  title: "Service Offered",
  type: "document",
  icon: () => React.createElement(Icon, { symbol: "cog" }),
  fields: [
    defineField({
      name: "number",
      title: "Service Index Number (e.g. 01)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Service Tagline / Subtitle",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Full Service Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Service Feature Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageUrl",
      title: "Image Fallback Static URL (Optional)",
      type: "string",
    }),
    defineField({
      name: "capabilities",
      title: "Core Capabilities",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "capability",
          title: "Capability Item",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "description", type: "text", title: "Description", rows: 2 }),
          ],
        }),
      ],
    }),
    defineField({
      name: "deliverables",
      title: "Service Deliverables List",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "deliverableGroup",
          title: "Deliverable Group",
          fields: [
            defineField({ name: "title", type: "string", title: "Group Title" }),
            defineField({
              name: "items",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "relatedCaseStudies",
      title: "Related Case Study Slugs",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "number",
      media: "image",
    },
  },
});
