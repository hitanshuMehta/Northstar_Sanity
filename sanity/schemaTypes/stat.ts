import { defineField, defineType } from "sanity";
import { Icon } from "@sanity/icons";
import React from "react";

export const statType = defineType({
  name: "stat",
  title: "Statistic & Metric Item",
  type: "document",
  icon: () => React.createElement(Icon, { symbol: "chart-upward" }),
  fields: [
    defineField({
      name: "label",
      title: "Metric Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "value",
      title: "Display Value (e.g. $2.4B+)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "numericValue",
      title: "Numeric Target Value for Counter (e.g. 2.4)",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "prefix",
      title: "Prefix (e.g. $)",
      type: "string",
    }),
    defineField({
      name: "suffix",
      title: "Suffix (e.g. B+)",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Detailed Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "value",
    },
  },
});
