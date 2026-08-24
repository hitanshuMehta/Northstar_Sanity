import { defineArrayMember, defineField, defineType } from "sanity";
import { Icon } from "@sanity/icons";
import React from "react";

export const navigationType = defineType({
  name: "navigation",
  title: "Header Navigation",
  type: "document",
  icon: () => React.createElement(Icon, { symbol: "component" }),
  fields: [
    defineField({
      name: "logoText",
      title: "Logo Brand Name",
      type: "string",
      initialValue: "NORTHSTAR",
      description: "Brand name displayed in the header logo.",
    }),
    defineField({
      name: "logoLink",
      title: "Logo Redirect Link",
      type: "string",
      initialValue: "/",
    }),
    defineField({
      name: "links",
      title: "Navigation Menu Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "navItem",
          title: "Navigation Item",
          fields: [
            defineField({
              name: "label",
              title: "Link Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link Target URL",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      initialValue: [
        { label: "Work", href: "/work" },
        { label: "Services", href: "/services" },
        { label: "About", href: "/about" },
        { label: "Insights", href: "/insights" },
      ],
      description: "List of links displayed in the desktop and mobile navigation menu.",
    }),
    defineField({
      name: "ctaLabel",
      title: "Header CTA Button Text",
      type: "string",
      initialValue: "Let's talk",
    }),
    defineField({
      name: "ctaLink",
      title: "Header CTA Button Link",
      type: "string",
      initialValue: "/contact",
    }),
  ],
});
