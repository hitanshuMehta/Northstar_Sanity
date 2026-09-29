import { defineField, defineType } from "sanity";
import { SparklesIcon } from "@sanity/icons/Sparkles";
import { CogIcon } from "@sanity/icons/Cog";
import { RocketIcon } from "@sanity/icons/Rocket";
import { BoltIcon } from "@sanity/icons/Bolt";
import { TabSearchInput } from "../../components/TabSearchInput";

export const servicesPageType = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  components: {
    input: TabSearchInput,
  },
  preview: {
    prepare() {
      return {
        title: "Services Page Content Settings",
        subtitle: "Manage hero heading, capabilities & methodology",
      };
    },
  },
  groups: [
    { name: "hero", title: "Hero Heading", icon: SparklesIcon },
    { name: "servicesList", title: "Services Showcase", icon: CogIcon },
    { name: "process", title: "Our Methodology", icon: RocketIcon },
    { name: "cta", title: "Call to Action Banner", icon: BoltIcon },
  ],
  fields: [
    // 1. Hero Group
    defineField({
      name: "hero",
      title: "Hero Heading Section",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "label", title: "Eyebrow Tag", type: "string", initialValue: "SERVICES & CAPABILITIES" }),
        defineField({
          name: "title",
          title: "Headline",
          type: "string",
          initialValue: "End-to-end digital product design & engineering.",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          initialValue: "We partner with ambitious teams to turn bold visions into market-defining digital reality. Here is how we help brands design, build, and scale.",
        }),
      ],
    }),

    // 2. Services List Group
    defineField({
      name: "servicesSection",
      title: "Detailed Services Selection",
      type: "object",
      group: "servicesList",
      fields: [
        defineField({
          name: "services",
          title: "Featured Services List",
          type: "array",
          of: [{ type: "reference", to: [{ type: "service" }] }],
        }),
      ],
    }),

    // 3. Methodology Process Group (Common)
    defineField({
      name: "process",
      title: "Methodology Process Section",
      type: "processSection",
      group: "process",
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
