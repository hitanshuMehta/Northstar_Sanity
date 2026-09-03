import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons/User";

export const teamMemberType = defineType({
  name: "teamMember",
  title: "Team Leadership Member",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "name", title: "Full Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", title: "Role / Job Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "bio", title: "Short Bio", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Portrait Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "websiteUrl", title: "Personal Website URL", type: "url" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn Profile URL", type: "url" }),
    defineField({ name: "order", title: "Display Order Priority", type: "number", initialValue: 0 }),
  ],
});
