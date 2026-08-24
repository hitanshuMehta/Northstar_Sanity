import { defineArrayMember, defineField, defineType } from "sanity";
import { Icon } from "@sanity/icons";
import React from "react";

export const blogPostType = defineType({
  name: "blogPost",
  title: "Insight / Blog Article",
  type: "document",
  icon: () => React.createElement(Icon, { symbol: "document-text" }),
  fields: [
    defineField({
      name: "title",
      title: "Article Title",
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
      name: "category",
      title: "Category",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Publish Date (e.g. Oct 14, 2024)",
      type: "string",
      initialValue: "Oct 14, 2024",
    }),
    defineField({
      name: "readTime",
      title: "Reading Time (e.g. 5 min read)",
      type: "string",
      initialValue: "5 min read",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt / Summary Copy",
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
      title: "Article Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "coverImageUrl",
      title: "Cover Image Static Fallback URL (Optional)",
      type: "string",
    }),

    // Author
    defineField({
      name: "authorName",
      title: "Author Name",
      type: "string",
      initialValue: "Alex Morgan",
    }),
    defineField({
      name: "authorRole",
      title: "Author Role",
      type: "string",
      initialValue: "Design Director",
    }),
    defineField({
      name: "authorAvatar",
      title: "Author Avatar Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "authorAvatarUrl",
      title: "Author Avatar Fallback URL (Optional)",
      type: "string",
    }),
    defineField({
      name: "authorBio",
      title: "Author Bio Text",
      type: "text",
      rows: 2,
    }),

    // Content Body Structure
    defineField({
      name: "introduction",
      title: "Article Introduction Text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "headings",
      title: "Content Sections / Headings",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "sectionBlock",
          title: "Section Block",
          fields: [
            defineField({ name: "id", type: "string", title: "Section ID" }),
            defineField({ name: "title", type: "string", title: "Heading Title" }),
            defineField({ name: "content", type: "text", title: "Section Content Text", rows: 4 }),
          ],
        }),
      ],
    }),
    defineField({
      name: "keyTakeaway",
      title: "Key Takeaway Callout (Optional)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "conclusion",
      title: "Article Conclusion Text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "relatedSlugs",
      title: "Related Article Slugs",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
});
