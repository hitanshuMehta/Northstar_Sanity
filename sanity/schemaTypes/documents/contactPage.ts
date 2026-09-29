import { defineField, defineType } from "sanity";
import { SparklesIcon } from "@sanity/icons/Sparkles";
import { PinIcon } from "@sanity/icons/Pin";
import { ComponentIcon } from "@sanity/icons/Component";
import { TabSearchInput } from "../../components/TabSearchInput";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  components: {
    input: TabSearchInput,
  },
  groups: [
    { name: "hero", title: "1. Hero Heading", icon: SparklesIcon },
    { name: "info", title: "2. Contact Info & Locations", icon: PinIcon },
    { name: "formOptions", title: "3. Form Options & Chips", icon: ComponentIcon },
  ],
  fields: [
    // 1. Hero Group
    defineField({
      name: "hero",
      title: "Hero Heading Section",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "label", title: "Eyebrow Tag", type: "string", initialValue: "START A CONVERSATION" }),
        defineField({
          name: "title",
          title: "Headline",
          type: "string",
          initialValue: "Let's build something worth talking about.",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          initialValue: "Have a project in mind or want to learn more about how Northstar can elevate your product? Tell us about your goals.",
        }),
      ],
    }),

    // 2. Info Group
    defineField({
      name: "contactInfo",
      title: "Studio Contact Details",
      type: "object",
      group: "info",
      fields: [
        defineField({ name: "email", title: "Contact Email Address", type: "string", initialValue: "hitanshumehta2004@gmail.com" }),
        defineField({ name: "address", title: "Headquarters Address", type: "string", initialValue: "100 Innovation Plaza, Suite 400, New York, NY (Demo Studio Address)" }),
        defineField({ name: "additionalLocations", title: "Additional Locations Subtitle", type: "string", initialValue: "Sample Virtual Offices in London & Berlin" }),
      ],
    }),

    // 3. Form Options Group
    defineField({
      name: "formOptions",
      title: "Interactive Inquiry Form Options",
      type: "object",
      group: "formOptions",
      fields: [
        defineField({
          name: "projectTypes",
          title: "Selectable Project Types",
          type: "array",
          of: [{ type: "string" }],
          initialValue: [
            "Digital Strategy",
            "Brand Experience",
            "Web Application",
            "E-Commerce Store",
            "Design System",
            "Growth & SEO",
          ],
        }),
        defineField({
          name: "budgetRanges",
          title: "Budget Range Selectors",
          type: "array",
          of: [{ type: "string" }],
          initialValue: [
            "$25k – $50k",
            "$50k – $100k",
            "$100k – $250k",
            "$250k+",
          ],
        }),
      ],
    }),
  ],
});
