import { defineArrayMember, defineField, defineType } from "sanity";
import { Icon } from "@sanity/icons";
import React from "react";

export const resultType = defineType({
  name: "resultSection",
  title: "Results & Impact Section",
  type: "document",
  icon: () => React.createElement(Icon, { symbol: "checkmark-circle" }),
  fields: [
    defineField({
      name: "label",
      title: "Section Category Label",
      type: "string",
      initialValue: "MEASURABLE IMPACT",
    }),
    defineField({
      name: "title",
      title: "Section Main Title",
      type: "string",
      initialValue: "Proven results across high-growth product transformations.",
    }),
    defineField({
      name: "description",
      title: "Section Subtitle / Description",
      type: "text",
      rows: 2,
      initialValue:
        "We track tangible outcome metrics across user engagement, conversion rates, and engineering velocity.",
    }),
    defineField({
      name: "highlightMetric",
      title: "Large Highlight Metric Value",
      type: "string",
      initialValue: "3.4x",
    }),
    defineField({
      name: "highlightLabel",
      title: "Large Highlight Metric Label",
      type: "string",
      initialValue: "Average Revenue Growth in 12 Months",
    }),
    defineField({
      name: "metrics",
      title: "Key Result Metrics Grid",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "resultMetric",
          title: "Metric Item",
          fields: [
            defineField({ name: "value", type: "string", title: "Metric Value (e.g. +180%)" }),
            defineField({ name: "label", type: "string", title: "Metric Title Label" }),
            defineField({ name: "description", type: "text", title: "Description Text", rows: 2 }),
          ],
        }),
      ],
      initialValue: [
        {
          value: "99.99%",
          label: "Uptime Reliability",
          description: "Architected on cloud-native infrastructure for zero downtime.",
        },
        {
          value: "+210%",
          label: "User Engagement",
          description: "Editorial UI polish that increases session duration and adoption.",
        },
        {
          value: "60%",
          label: "Faster Time to Market",
          description: "Structured design systems and clean React architecture.",
        },
      ],
    }),
  ],
});
