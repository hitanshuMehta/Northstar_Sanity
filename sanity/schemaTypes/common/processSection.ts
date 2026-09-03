import { defineField, defineType } from "sanity";

export const processSectionType = defineType({
  name: "processSection",
  title: "Working Process Section",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Section Tag",
      type: "string",
      initialValue: "WORKING PROCESS",
    }),
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "How we partner with clients.",
    }),
    defineField({
      name: "description",
      title: "Section Description",
      type: "text",
      rows: 2,
      initialValue: "Transparent, collaborative, and structured for maximum momentum from Day 1.",
    }),
    defineField({
      name: "steps",
      title: "Process Steps (01-05)",
      type: "array",
      of: [
        {
          type: "object",
          name: "processStep",
          fields: [
            defineField({ name: "number", title: "Step Number (e.g. 01)", type: "string" }),
            defineField({ name: "title", title: "Step Title", type: "string" }),
            defineField({ name: "subtitle", title: "Step Subtitle", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            defineField({
              name: "deliverables",
              title: "Key Deliverables Tags",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        },
      ],
    }),
  ],
});
