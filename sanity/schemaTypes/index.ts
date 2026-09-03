import { heroType } from "./hero";
import { logoCloudType } from "./logoCloud";
import { caseStudyType } from "./caseStudy";
import { statType } from "./stat";
import { serviceType } from "./service";
import { imageTextType } from "./imageText";
import { testimonialType } from "./testimonial";
import { resultType } from "./result";
import { blogPostType } from "./blogPost";
import { ctaType } from "./cta";
import { navigationType } from "./navigation";

// Common Section Objects
import { ctaSectionType } from "./common/ctaSection";
import { statsSectionType } from "./common/statsSection";
import { processSectionType } from "./common/processSection";
import { heroSectionType } from "./common/heroSection";

// Collections
import { teamMemberType } from "./collections/teamMember";

// Page Documents (Singletons)
import { homepageType } from "./documents/homepage";
import { aboutPageType } from "./documents/aboutPage";
import { servicesPageType } from "./documents/servicesPage";
import { workPageType } from "./documents/workPage";
import { insightsPageType } from "./documents/insightsPage";
import { contactPageType } from "./documents/contactPage";
import { siteSettingsType } from "./documents/siteSettings";

export const schemaTypes = [
  // Page Singletons
  homepageType,
  aboutPageType,
  servicesPageType,
  workPageType,
  insightsPageType,
  contactPageType,
  siteSettingsType,

  // Common Section Objects
  ctaSectionType,
  statsSectionType,
  processSectionType,
  heroSectionType,

  // Collections
  caseStudyType,
  blogPostType,
  serviceType,
  testimonialType,
  teamMemberType,
  statType,

  // Legacy singletons maintained for compatibility
  heroType,
  logoCloudType,
  imageTextType,
  resultType,
  ctaType,
  navigationType,
];
