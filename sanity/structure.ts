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
import { ComponentIcon } from "@sanity/icons/Component";
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
            .id("homepageSectionList")
            .title("Homepage Sections")
            .items([
              S.listItem()
                .id("homepage-all")
                .title("All Fields")
                .icon(HomeIcon)
                .child(createSingletonView("homepage", "homepage", "Homepage (All Sections)")),
              S.divider(),
              S.listItem()
                .id("homepage-hero")
                .title("Hero Section")
                .icon(SparklesIcon)
                .child(createSingletonView("homepage", "homepage", "Hero Section")),
              S.listItem()
                .id("homepage-logocloud")
                .title("Logo Cloud")
                .icon(EarthGlobeIcon)
                .child(createSingletonView("homepage", "homepage", "Logo Cloud")),
              S.listItem()
                .id("homepage-featuredwork")
                .title("Featured Work")
                .icon(CaseIcon)
                .child(createSingletonView("homepage", "homepage", "Featured Work")),
              S.listItem()
                .id("homepage-stats")
                .title("Key Statistics")
                .icon(BarChartIcon)
                .child(createSingletonView("homepage", "homepage", "Key Statistics")),
              S.listItem()
                .id("homepage-services")
                .title("Services Showcase")
                .icon(CogIcon)
                .child(createSingletonView("homepage", "homepage", "Services Showcase")),
              S.listItem()
                .id("homepage-imagetext")
                .title("Editorial Philosophy")
                .icon(ComposeIcon)
                .child(createSingletonView("homepage", "homepage", "Editorial Philosophy")),
              S.listItem()
                .id("homepage-testimonials")
                .title("Client Testimonials")
                .icon(CommentIcon)
                .child(createSingletonView("homepage", "homepage", "Client Testimonials")),
              S.listItem()
                .id("homepage-results")
                .title("Results & Impact")
                .icon(CheckmarkCircleIcon)
                .child(createSingletonView("homepage", "homepage", "Results & Impact")),
              S.listItem()
                .id("homepage-insights")
                .title("Insights & Articles")
                .icon(DocumentTextIcon)
                .child(createSingletonView("homepage", "homepage", "Insights & Articles")),
              S.listItem()
                .id("homepage-cta")
                .title("Call to Action Banner")
                .icon(BoltIcon)
                .child(createSingletonView("homepage", "homepage", "Call to Action Banner")),
            ])
        ),

      // 2. About Page Module
      S.listItem()
        .id("aboutModule")
        .title("2. About Page")
        .icon(InfoOutlineIcon)
        .child(
          S.list()
            .id("aboutSectionList")
            .title("About Page Sections")
            .items([
              S.listItem()
                .id("aboutPage-all")
                .title("All Fields")
                .icon(InfoOutlineIcon)
                .child(createSingletonView("aboutPage", "aboutPage", "About Page (All Sections)")),
              S.divider(),
              S.listItem()
                .id("aboutPage-hero")
                .title("Hero Statement")
                .icon(SparklesIcon)
                .child(createSingletonView("aboutPage", "aboutPage", "Hero Statement")),
              S.listItem()
                .id("aboutPage-philosophy")
                .title("Philosophy & Narrative")
                .icon(ComposeIcon)
                .child(createSingletonView("aboutPage", "aboutPage", "Philosophy & Narrative")),
              S.listItem()
                .id("aboutPage-stats")
                .title("Key Statistics")
                .icon(BarChartIcon)
                .child(createSingletonView("aboutPage", "aboutPage", "Key Statistics")),
              S.listItem()
                .id("aboutPage-team")
                .title("Leadership Team Grid")
                .icon(UserIcon)
                .child(createSingletonView("aboutPage", "aboutPage", "Leadership Team Grid")),
              S.listItem()
                .id("aboutPage-process")
                .title("Working Process")
                .icon(RocketIcon)
                .child(createSingletonView("aboutPage", "aboutPage", "Working Process")),
              S.listItem()
                .id("aboutPage-cta")
                .title("Call to Action Banner")
                .icon(BoltIcon)
                .child(createSingletonView("aboutPage", "aboutPage", "Call to Action Banner")),
            ])
        ),

      // 3. Services Page Module
      S.listItem()
        .id("servicesModule")
        .title("3. Services Page")
        .icon(CogIcon)
        .child(
          S.list()
            .id("servicesSectionList")
            .title("Services Page Sections")
            .items([
              S.listItem()
                .id("servicesPage-all")
                .title("All Fields")
                .icon(CogIcon)
                .child(createSingletonView("servicesPage", "servicesPage", "Services Page (All Sections)")),
              S.divider(),
              S.listItem()
                .id("servicesPage-hero")
                .title("Hero Heading")
                .icon(SparklesIcon)
                .child(createSingletonView("servicesPage", "servicesPage", "Hero Heading")),
              S.listItem()
                .id("servicesPage-serviceslist")
                .title("Services Showcase")
                .icon(CogIcon)
                .child(createSingletonView("servicesPage", "servicesPage", "Services Showcase")),
              S.listItem()
                .id("servicesPage-process")
                .title("Our Methodology")
                .icon(RocketIcon)
                .child(createSingletonView("servicesPage", "servicesPage", "Our Methodology")),
              S.listItem()
                .id("servicesPage-cta")
                .title("Call to Action Banner")
                .icon(BoltIcon)
                .child(createSingletonView("servicesPage", "servicesPage", "Call to Action Banner")),
            ])
        ),

      // 4. Work Portfolio Module
      S.listItem()
        .id("workModule")
        .title("4. Work / Portfolio Page")
        .icon(CaseIcon)
        .child(
          S.list()
            .id("workSectionList")
            .title("Work Page Sections")
            .items([
              S.listItem()
                .id("workPage-all")
                .title("All Fields")
                .icon(CaseIcon)
                .child(createSingletonView("workPage", "workPage", "Work Page (All Sections)")),
              S.divider(),
              S.listItem()
                .id("workPage-hero")
                .title("Hero Heading")
                .icon(SparklesIcon)
                .child(createSingletonView("workPage", "workPage", "Hero Heading")),
              S.listItem()
                .id("workPage-categories")
                .title("Portfolio Filter Tabs")
                .icon(TagIcon)
                .child(createSingletonView("workPage", "workPage", "Portfolio Filter Tabs")),
              S.listItem()
                .id("workPage-cta")
                .title("Call to Action Banner")
                .icon(BoltIcon)
                .child(createSingletonView("workPage", "workPage", "Call to Action Banner")),
            ])
        ),

      // 5. Insights Page Module
      S.listItem()
        .id("insightsModule")
        .title("5. Insights Page")
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .id("insightsSectionList")
            .title("Insights Page Sections")
            .items([
              S.listItem()
                .id("insightsPage-all")
                .title("All Fields")
                .icon(DocumentTextIcon)
                .child(createSingletonView("insightsPage", "insightsPage", "Insights Page (All Sections)")),
              S.divider(),
              S.listItem()
                .id("insightsPage-hero")
                .title("Hero Heading")
                .icon(SparklesIcon)
                .child(createSingletonView("insightsPage", "insightsPage", "Hero Heading")),
              S.listItem()
                .id("insightsPage-featured")
                .title("Featured Article")
                .icon(DocumentTextIcon)
                .child(createSingletonView("insightsPage", "insightsPage", "Featured Article")),
              S.listItem()
                .id("insightsPage-categories")
                .title("Category Filter Tabs")
                .icon(TagIcon)
                .child(createSingletonView("insightsPage", "insightsPage", "Category Filter Tabs")),
              S.listItem()
                .id("insightsPage-cta")
                .title("Call to Action Banner")
                .icon(BoltIcon)
                .child(createSingletonView("insightsPage", "insightsPage", "Call to Action Banner")),
            ])
        ),

      // 6. Contact Page Module
      S.listItem()
        .id("contactModule")
        .title("6. Contact Page")
        .icon(PinIcon)
        .child(
          S.list()
            .id("contactSectionList")
            .title("Contact Page Sections")
            .items([
              S.listItem()
                .id("contactPage-all")
                .title("All Fields")
                .icon(PinIcon)
                .child(createSingletonView("contactPage", "contactPage", "Contact Page (All Sections)")),
              S.divider(),
              S.listItem()
                .id("contactPage-hero")
                .title("Hero Heading")
                .icon(SparklesIcon)
                .child(createSingletonView("contactPage", "contactPage", "Hero Heading")),
              S.listItem()
                .id("contactPage-info")
                .title("Contact Info & Locations")
                .icon(PinIcon)
                .child(createSingletonView("contactPage", "contactPage", "Contact Info & Locations")),
              S.listItem()
                .id("contactPage-formoptions")
                .title("Form Options & Chips")
                .icon(ComponentIcon)
                .child(createSingletonView("contactPage", "contactPage", "Form Options & Chips")),
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
