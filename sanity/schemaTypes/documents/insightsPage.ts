import { defineField, defineType } from "sanity";
import { SparklesIcon } from "@sanity/icons/Sparkles";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { TagIcon } from "@sanity/icons/Tag";
import { BoltIcon } from "@sanity/icons/Bolt";
import { TabSearchInput } from "../../components/TabSearchInput";

export const insightsPageType = defineType({
  name: "insightsPage",
  title: "Insights Page",
  type: "document",
  components: {
    input: TabSearchInput,
  },
  groups: [
    { name: "hero", title: "1. Hero Heading", icon: SparklesIcon },
    { name: "featured", title: "2. Featured Article", icon: DocumentTextIcon },
    { name: "categories", title: "3. Category Filter Tabs", icon: TagIcon },
    { name: "cta", title: "4. CTA Banner", icon: BoltIcon },
  ],
  fields: [
    // 1. Hero Group
    defineField({
      name: "hero",
      title: "Hero Heading Section",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "label", title: "Eyebrow Tag", type: "string", initialValue: "INSIGHTS & ESSAYS" }),
        defineField({
          name: "title",
          title: "Headline",
          type: "string",
          initialValue: "Perspectives on digital craft, code and scale.",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          initialValue: "In-depth articles from our design and engineering team on building products that stand out.",
        }),
      ],
    }),

    // 2. Featured Article Group
    defineField({
      name: "featuredArticle",
      title: "Lead Featured Article Selection",
      type: "reference",
      to: [{ type: "blogPost" }],
      group: "featured",
    }),

    // 3. Categories Group
    defineField({
      name: "categoriesSection",
      title: "Insights Categories",
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
            "Design Insights",
            "Engineering Architecture",
            "Strategy",
            "Product Growth",
          ],
        }),
      ],
    }),

    // 4. CTA Group (Common)
    defineField({
      name: "cta",
      title: "Call to Action Banner",
      type: "ctaSection",
      group: "cta",
    }),
  ],
});
