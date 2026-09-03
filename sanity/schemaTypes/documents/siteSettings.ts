import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({ name: "siteTitle", title: "Global Site Title", type: "string", initialValue: "Northstar Agency" }),
    defineField({ name: "logoText", title: "Navbar Brand Logo Text", type: "string", initialValue: "NORTHSTAR" }),
    defineField({
      name: "navLinks",
      title: "Header Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Link Label", type: "string" }),
            defineField({ name: "href", title: "Target Path / URL", type: "string" }),
          ],
        },
      ],
    }),
    defineField({ name: "headerCtaLabel", title: "Header CTA Button Label", type: "string", initialValue: "Start a project" }),
    defineField({ name: "headerCtaLink", title: "Header CTA Button Target URL", type: "string", initialValue: "/contact" }),
    defineField({ name: "footerCopyright", title: "Footer Copyright Notice", type: "string", initialValue: "© 2026 Northstar Digital Agency. All rights reserved." }),
  ],
});
