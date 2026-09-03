import { defineField, defineType } from "sanity";

export const statsSectionType = defineType({
  name: "statsSection",
  title: "Key Statistics Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Heading (Optional)",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Section Description (Optional)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "stats",
      title: "Stat Cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "statCard",
          fields: [
            defineField({ name: "label", title: "Stat Label", type: "string" }),
            defineField({ name: "value", title: "Formatted Value (e.g. $1.2B+, 99.8%)", type: "string" }),
            defineField({ name: "numericValue", title: "Numeric Value for Animations", type: "number" }),
            defineField({ name: "prefix", title: "Prefix (e.g. $)", type: "string" }),
            defineField({ name: "suffix", title: "Suffix (e.g. %, +)", type: "string" }),
            defineField({ name: "description", title: "Supporting Text", type: "text", rows: 2 }),
          ],
        },
      ],
    }),
  ],
});
