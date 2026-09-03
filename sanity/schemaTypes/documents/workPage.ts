import { defineField, defineType } from "sanity";
import { SparklesIcon } from "@sanity/icons/Sparkles";
import { TagIcon } from "@sanity/icons/Tag";
import { BoltIcon } from "@sanity/icons/Bolt";
import { TabSearchInput } from "../../components/TabSearchInput";

export const workPageType = defineType({
  name: "workPage",
  title: "Work Page",
  type: "document",
  components: {
    input: TabSearchInput,
  },
  groups: [
    { name: "hero", title: "1. Hero Heading", icon: SparklesIcon },
    { name: "categories", title: "2. Portfolio Filter Tabs", icon: TagIcon },
    { name: "cta", title: "3. CTA Banner", icon: BoltIcon },
  ],
  fields: [
    // 1. Hero Group
    defineField({
      name: "hero",
      title: "Hero Heading Section",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "label", title: "Eyebrow Tag", type: "string", initialValue: "PORTFOLIO OF WORK" }),
        defineField({
          name: "title",
          title: "Headline",
          type: "string",
          initialValue: "Selected case studies & digital product transformations.",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          initialValue: "Explore how we have partnered with ambitious companies across industries to solve complex problems and build products people actually want to use.",
        }),
      ],
    }),

    // 2. Categories Group
    defineField({
      name: "categoriesSection",
      title: "Portfolio Categories",
      type: "object",
      group: "categories",
      fields: [
        defineField({
          name: "categories",
          title: "Category Filter Chips",
          type: "array",
          of: [{ type: "string" }],
          initialValue: [
            "All",
            "Fintech Platform",
            "Digital Healthcare",
            "E-Commerce",
            "Developer Tools",
            "Architecture & Design",
            "Cloud Infrastructure",
          ],
        }),
      ],
    }),

    // 3. CTA Group (Common)
    defineField({
      name: "cta",
      title: "Call to Action Banner",
      type: "ctaSection",
      group: "cta",
    }),
  ],
});
