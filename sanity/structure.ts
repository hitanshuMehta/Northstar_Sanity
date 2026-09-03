import type { StructureResolver } from "sanity/structure";
import { HomeIcon } from "@sanity/icons/Home";
import { InfoOutlineIcon } from "@sanity/icons/InfoOutline";
import { CogIcon } from "@sanity/icons/Cog";
import { CaseIcon } from "@sanity/icons/Case";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { PinIcon } from "@sanity/icons/Pin";
import { EditIcon } from "@sanity/icons/Edit";
import { EyeOpenIcon } from "@sanity/icons/EyeOpen";
import { SparklesIcon } from "@sanity/icons/Sparkles";
import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { BarChartIcon } from "@sanity/icons/BarChart";
import { ComposeIcon } from "@sanity/icons/Compose";
import { CommentIcon } from "@sanity/icons/Comment";
import { CheckmarkCircleIcon } from "@sanity/icons/CheckmarkCircle";
import { BoltIcon } from "@sanity/icons/Bolt";
import { RocketIcon } from "@sanity/icons/Rocket";
import { UserIcon } from "@sanity/icons/User";
import { TagIcon } from "@sanity/icons/Tag";
import { LivePreview } from "./components/LivePreview";

export const structure: StructureResolver = (S) => {
  // Helper function to build singleton view with split views (Editor Form + Live Preview)
  const createSingletonView = (schemaType: string, documentId: string, title: string) => {
    return S.document()
      .schemaType(schemaType)
      .documentId(documentId)
      .title(title)
      .views([
        S.view.form().title("Editor Form").icon(EditIcon),
        S.view.component(LivePreview).title("Live Web Preview").icon(EyeOpenIcon),
      ]);
  };

  return S.list()
    .title("Northstar CMS Studio")
    .items([
      // 1. Homepage Module
      S.listItem()
        .id("homepageModule")
        .title("1. Homepage")
        .icon(HomeIcon)
        .child(
          S.list()
            .id("homepageList")
            .title("Homepage Module")
            .items([
              S.listItem()
                .id("homepageContent")
                .title("Homepage Content")
                .icon(HomeIcon)
                .child(createSingletonView("homepage", "homepage", "Homepage Content")),

              S.divider(),

              // Quick-Links to direct section tabs
              S.listItem()
                .title("Section 01: Hero Section")
                .icon(SparklesIcon)
                .child(createSingletonView("homepage", "homepage", "Hero Section")),
              S.listItem()
                .title("Section 02: Logo Cloud")
                .icon(EarthGlobeIcon)
                .child(createSingletonView("homepage", "homepage", "Logo Cloud")),
              S.listItem()
                .title("Section 03: Featured Work")
                .icon(CaseIcon)
                .child(createSingletonView("homepage", "homepage", "Featured Work")),
              S.listItem()
                .title("Section 04: Key Statistics")
                .icon(BarChartIcon)
                .child(createSingletonView("homepage", "homepage", "Key Statistics")),
              S.listItem()
                .title("Section 05: Services Showcase")
                .icon(CogIcon)
                .child(createSingletonView("homepage", "homepage", "Services Showcase")),
              S.listItem()
                .title("Section 06: Editorial Philosophy")
                .icon(ComposeIcon)
                .child(createSingletonView("homepage", "homepage", "Editorial Philosophy")),
              S.listItem()
                .title("Section 07: Client Testimonials")
                .icon(CommentIcon)
                .child(createSingletonView("homepage", "homepage", "Client Testimonials")),
              S.listItem()
                .title("Section 08: Results & Impact")
                .icon(CheckmarkCircleIcon)
                .child(createSingletonView("homepage", "homepage", "Results & Impact")),
              S.listItem()
                .title("Section 09: Insights & Articles")
                .icon(DocumentTextIcon)
                .child(createSingletonView("homepage", "homepage", "Insights & Articles")),
              S.listItem()
                .title("Section 10: Call to Action Banner")
                .icon(BoltIcon)
                .child(createSingletonView("homepage", "homepage", "CTA Banner")),
            ])
        ),

      // 2. About Page Module
      S.listItem()
        .id("aboutModule")
        .title("2. About Page")
        .icon(InfoOutlineIcon)
        .child(
          S.list()
            .id("aboutList")
            .title("About Page Module")
            .items([
              S.listItem()
                .id("aboutContent")
                .title("About Page Content")
                .icon(InfoOutlineIcon)
                .child(createSingletonView("aboutPage", "aboutPage", "About Page Content")),

              S.divider(),

              S.listItem()
                .title("Section 01: Hero Statement")
                .icon(SparklesIcon)
                .child(createSingletonView("aboutPage", "aboutPage", "Hero Statement")),
              S.listItem()
                .title("Section 02: Agency Philosophy")
                .icon(ComposeIcon)
                .child(createSingletonView("aboutPage", "aboutPage", "Agency Philosophy")),
              S.listItem()
                .title("Section 03: Statistics")
                .icon(BarChartIcon)
                .child(createSingletonView("aboutPage", "aboutPage", "Statistics")),
              S.listItem()
                .title("Section 04: Leadership Team Grid")
                .icon(UserIcon)
                .child(createSingletonView("aboutPage", "aboutPage", "Leadership Team Grid")),
              S.listItem()
                .title("Section 05: Working Process")
                .icon(RocketIcon)
                .child(createSingletonView("aboutPage", "aboutPage", "Working Process")),
              S.listItem()
                .title("Section 06: CTA Banner")
                .icon(BoltIcon)
                .child(createSingletonView("aboutPage", "aboutPage", "CTA Banner")),
            ])
        ),

      // 3. Services Page Module
      S.listItem()
        .id("servicesModule")
        .title("3. Services Page")
        .icon(CogIcon)
        .child(
          S.list()
            .id("servicesListModule")
            .title("Services Page Module")
            .items([
              S.listItem()
                .id("servicesContent")
                .title("Services Page Content")
                .icon(CogIcon)
                .child(createSingletonView("servicesPage", "servicesPage", "Services Page Content")),

              S.divider(),

              S.listItem()
                .title("Section 01: Hero Heading")
                .icon(SparklesIcon)
                .child(createSingletonView("servicesPage", "servicesPage", "Hero Heading")),
              S.listItem()
                .title("Section 02: Detailed Services Capabilities")
                .icon(CogIcon)
                .child(createSingletonView("servicesPage", "servicesPage", "Detailed Services Capabilities")),
              S.listItem()
                .title("Section 03: Our Methodology")
                .icon(RocketIcon)
                .child(createSingletonView("servicesPage", "servicesPage", "Our Methodology")),
              S.listItem()
                .title("Section 04: CTA Banner")
                .icon(BoltIcon)
                .child(createSingletonView("servicesPage", "servicesPage", "CTA Banner")),
            ])
        ),

      // 4. Work Portfolio Module
      S.listItem()
        .id("workModule")
        .title("4. Work / Portfolio Page")
        .icon(CaseIcon)
        .child(
          S.list()
            .id("workListModule")
            .title("Work Page Module")
            .items([
              S.listItem()
                .id("workContent")
                .title("Work Page Content")
                .icon(CaseIcon)
                .child(createSingletonView("workPage", "workPage", "Work Page Content")),

              S.divider(),

              S.listItem()
                .title("Section 01: Hero Heading")
                .icon(SparklesIcon)
                .child(createSingletonView("workPage", "workPage", "Hero Heading")),
              S.listItem()
                .title("Section 02: Category Filter Tabs")
                .icon(TagIcon)
                .child(createSingletonView("workPage", "workPage", "Category Filter Tabs")),
              S.listItem()
                .title("Section 03: CTA Banner")
                .icon(BoltIcon)
                .child(createSingletonView("workPage", "workPage", "CTA Banner")),
            ])
        ),

      // 5. Insights & Articles Module
      S.listItem()
        .id("insightsModule")
        .title("5. Insights Page")
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .id("insightsListModule")
            .title("Insights Page Module")
            .items([
              S.listItem()
                .id("insightsContent")
                .title("Insights Page Content")
                .icon(DocumentTextIcon)
                .child(createSingletonView("insightsPage", "insightsPage", "Insights Page Content")),

              S.divider(),

              S.listItem()
                .title("Section 01: Hero Heading")
                .icon(SparklesIcon)
                .child(createSingletonView("insightsPage", "insightsPage", "Hero Heading")),
              S.listItem()
                .title("Section 02: Featured Lead Article")
                .icon(DocumentTextIcon)
                .child(createSingletonView("insightsPage", "insightsPage", "Featured Lead Article")),
              S.listItem()
                .title("Section 03: Category Filter Tabs")
                .icon(TagIcon)
                .child(createSingletonView("insightsPage", "insightsPage", "Category Filter Tabs")),
              S.listItem()
                .title("Section 04: CTA Banner")
                .icon(BoltIcon)
                .child(createSingletonView("insightsPage", "insightsPage", "CTA Banner")),
            ])
        ),

      // 6. Contact Page Module
      S.listItem()
        .id("contactModule")
        .title("6. Contact Page")
        .icon(PinIcon)
        .child(
          S.list()
            .id("contactListModule")
            .title("Contact Page Module")
            .items([
              S.listItem()
                .id("contactContent")
                .title("Contact Page Content")
                .icon(PinIcon)
                .child(createSingletonView("contactPage", "contactPage", "Contact Page Content")),

              S.divider(),

              S.listItem()
                .title("Section 01: Hero Heading")
                .icon(SparklesIcon)
                .child(createSingletonView("contactPage", "contactPage", "Hero Heading")),
              S.listItem()
                .title("Section 02: Studio Contact Info & Locations")
                .icon(PinIcon)
                .child(createSingletonView("contactPage", "contactPage", "Studio Contact Info")),
              S.listItem()
                .title("Section 03: Form Options & Chips")
                .icon(TagIcon)
                .child(createSingletonView("contactPage", "contactPage", "Form Options")),
            ])
        ),

      S.divider(),

      // Content Collections / Full Libraries
      S.listItem()
        .title("All Case Studies")
        .icon(CaseIcon)
        .child(S.documentTypeList("caseStudy").title("All Case Studies")),

      S.listItem()
        .title("All Insights / Articles")
        .icon(DocumentTextIcon)
        .child(S.documentTypeList("blogPost").title("All Insights")),

      S.listItem()
        .title("All Services")
        .icon(CogIcon)
        .child(S.documentTypeList("service").title("All Services")),

      S.listItem()
        .title("All Testimonials")
        .icon(CommentIcon)
        .child(S.documentTypeList("testimonial").title("All Testimonials")),

      S.listItem()
        .title("Team Leadership Members")
        .icon(UserIcon)
        .child(S.documentTypeList("teamMember").title("Team Leadership Members")),

      S.divider(),

      // Global Site Settings Singleton
      S.listItem()
        .title("⚙️ Site Settings")
        .icon(CogIcon)
        .child(createSingletonView("siteSettings", "siteSettings", "Global Site Settings")),
    ]);
};
