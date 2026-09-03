import { defineField, defineType } from "sanity";
import { SparklesIcon } from "@sanity/icons/Sparkles";
import { ComposeIcon } from "@sanity/icons/Compose";
import { BarChartIcon } from "@sanity/icons/BarChart";
import { UserIcon } from "@sanity/icons/User";
import { RocketIcon } from "@sanity/icons/Rocket";
import { BoltIcon } from "@sanity/icons/Bolt";
import { TabSearchInput } from "../../components/TabSearchInput";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  components: {
    input: TabSearchInput,
  },
  groups: [
    { name: "hero", title: "1. Hero Statement", icon: SparklesIcon },
    { name: "philosophy", title: "2. Philosophy & Story", icon: ComposeIcon },
    { name: "stats", title: "3. Statistics", icon: BarChartIcon },
    { name: "team", title: "4. Leadership Team", icon: UserIcon },
    { name: "process", title: "5. Working Process", icon: RocketIcon },
    { name: "cta", title: "6. CTA Banner", icon: BoltIcon },
  ],
  fields: [
    // 1. Hero Group
    defineField({
      name: "hero",
      title: "Hero Statement Section",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "label", title: "Eyebrow Tag", type: "string", initialValue: "ABOUT NORTHSTAR" }),
        defineField({
          name: "headline",
          title: "Main Hero Statement Headline",
          type: "string",
          initialValue: "We are an independent digital agency bridging editorial art direction & software precision.",
        }),
        defineField({
          name: "coverImage",
          title: "Studio Hero Banner Image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),

    // 2. Philosophy Group
    defineField({
      name: "philosophy",
      title: "Agency Philosophy & Narrative",
      type: "object",
      group: "philosophy",
      fields: [
        defineField({
          name: "headline",
          title: "Philosophy Sub-heading",
          type: "string",
          initialValue: "Built on conviction, restraint, and obsessive craft.",
        }),
        defineField({
          name: "paragraphs",
          title: "Narrative Paragraphs",
          type: "array",
          of: [{ type: "text", rows: 4 }],
        }),
      ],
    }),

    // 3. Stats Group (Common)
    defineField({
      name: "stats",
      title: "Statistics Section",
      type: "statsSection",
      group: "stats",
    }),

    // 4. Team Group
    defineField({
      name: "teamSection",
      title: "Leadership Team Section",
      type: "object",
      group: "team",
      fields: [
        defineField({ name: "label", title: "Section Tag", type: "string", initialValue: "LEADERSHIP" }),
        defineField({ name: "title", title: "Section Title", type: "string", initialValue: "The people behind the products." }),
        defineField({ name: "description", title: "Section Subtitle", type: "text", rows: 2 }),
        defineField({
          name: "members",
          title: "Featured Team Members",
          type: "array",
          of: [{ type: "reference", to: [{ type: "teamMember" }] }],
        }),
      ],
    }),

    // 5. Working Process Group (Common)
    defineField({
      name: "process",
      title: "Working Process Section",
      type: "processSection",
      group: "process",
    }),

    // 6. CTA Group (Common)
    defineField({
      name: "cta",
      title: "Call to Action Banner",
      type: "ctaSection",
      group: "cta",
    }),
  ],
});
