import { defineArrayMember, defineField, defineType } from "sanity";
import { Icon } from "@sanity/icons";
import React from "react";

export const logoCloudType = defineType({
  name: "logoCloud",
  title: "Logo Cloud / Client Logos",
  type: "document",
  icon: () => React.createElement(Icon, { symbol: "earth-americas" }),
  fields: [
    defineField({
      name: "heading",
      title: "Section Heading Label",
      type: "string",
      initialValue: "TRUSTED BY INNOVATIVE TEAMS AT LEADING COMPANIES",
    }),
    defineField({
      name: "logos",
      title: "Client Brand Logos",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "clientLogo",
          title: "Client Logo",
          fields: [
            defineField({
              name: "name",
              title: "Client / Company Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "logoImage",
              title: "Logo Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "svgCode",
              title: "Custom SVG Icon Name / Code (Optional)",
              type: "string",
              description: "Optional fallback icon identifier.",
            }),
            defineField({
              name: "link",
              title: "Client Website Link (Optional)",
              type: "url",
            }),
          ],
        }),
      ],
      initialValue: [
        { name: "Vercel" },
        { name: "Stripe" },
        { name: "Linear" },
        { name: "Figma" },
        { name: "Raycast" },
        { name: "Supabase" },
      ],
    }),
  ],
});
