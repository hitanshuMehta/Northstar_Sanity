import { groq } from "next-sanity";

// ==========================================
// Page-wise Singleton Documents Queries
// ==========================================

// Homepage Singleton Query
export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    _id,
    hero {
      label,
      title,
      description,
      primaryCtaLabel,
      primaryCtaLink,
      secondaryCtaLabel,
      secondaryCtaLink,
      image,
      videoUrl
    },
    logoCloud {
      heading,
      logos[] {
        name,
        logoImage,
        svgCode,
        link
      }
    },
    featuredWork {
      label,
      title,
      description,
      selectedCaseStudies[]-> {
        _id,
        "id": _id,
        "slug": slug.current,
        title,
        client,
        category,
        year,
        summary,
        coverImage,
        coverImageUrl
      }
    },
    stats {
      title,
      description,
      stats[] {
        label,
        value,
        numericValue,
        prefix,
        suffix,
        description
      }
    },
    servicesSection {
      label,
      title,
      description,
      featuredServices[]-> {
        _id,
        "id": _id,
        number,
        title,
        subtitle,
        description
      }
    },
    imageText {
      label,
      title,
      paragraphs,
      featureImage,
      quote,
      quoteAuthor,
      ctaLabel,
      ctaLink
    },
    testimonialsSection {
      label,
      title,
      selectedTestimonials[]-> {
        _id,
        "id": _id,
        quote,
        author,
        role,
        company,
        avatar,
        metric
      }
    },
    resultsSection {
      label,
      title,
      description,
      highlightMetric,
      highlightLabel,
      metrics[] {
        value,
        label,
        description
      }
    },
    insightsSection {
      label,
      title,
      selectedPosts[]-> {
        _id,
        "id": _id,
        "slug": slug.current,
        title,
        category,
        publishedAt,
        readTime,
        excerpt,
        coverImage
      }
    },
    cta {
      label,
      title,
      description,
      primaryButtonLabel,
      primaryButtonLink,
      secondaryButtonLabel,
      secondaryButtonLink
    }
  }
`;

// About Page Singleton Query
export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    _id,
    hero {
      label,
      headline,
      coverImage
    },
    philosophy {
      headline,
      paragraphs
    },
    stats {
      title,
      description,
      stats[] {
        label,
        value,
        numericValue,
        prefix,
        suffix,
        description
      }
    },
    teamSection {
      label,
      title,
      description,
      members[]-> {
        _id,
        "id": _id,
        name,
        role,
        bio,
        image,
        websiteUrl,
        linkedinUrl
      }
    },
    process {
      label,
      title,
      description,
      steps[] {
        number,
        title,
        subtitle,
        description,
        deliverables
      }
    },
    cta {
      label,
      title,
      description,
      primaryButtonLabel,
      primaryButtonLink,
      secondaryButtonLabel,
      secondaryButtonLink
    }
  }
`;

// Services Page Singleton Query
export const servicesPageQuery = groq`
  *[_type == "servicesPage"][0] {
    _id,
    hero {
      label,
      title,
      description
    },
    servicesSection {
      services[]-> {
        _id,
        "id": _id,
        number,
        title,
        subtitle,
        description,
        capabilities[] {
          title,
          description
        },
        deliverables[] {
          title,
          items
        }
      }
    },
    process {
      label,
      title,
      description,
      steps[] {
        number,
        title,
        subtitle,
        description,
        deliverables
      }
    },
    cta {
      label,
      title,
      description,
      primaryButtonLabel,
      primaryButtonLink,
      secondaryButtonLabel,
      secondaryButtonLink
    }
  }
`;

// Work Page Singleton Query
export const workPageQuery = groq`
  *[_type == "workPage"][0] {
    _id,
    hero {
      label,
      title,
      description
    },
    categoriesSection {
      categories
    },
    cta {
      label,
      title,
      description,
      primaryButtonLabel,
      primaryButtonLink,
      secondaryButtonLabel,
      secondaryButtonLink
    }
  }
`;

// Insights Page Singleton Query
export const insightsPageQuery = groq`
  *[_type == "insightsPage"][0] {
    _id,
    hero {
      label,
      title,
      description
    },
    featuredArticle-> {
      _id,
      "id": _id,
      "slug": slug.current,
      title,
      category,
      publishedAt,
      readTime,
      excerpt,
      coverImage
    },
    categoriesSection {
      categories
    },
    cta {
      label,
      title,
      description,
      primaryButtonLabel,
      primaryButtonLink,
      secondaryButtonLabel,
      secondaryButtonLink
    }
  }
`;

// Contact Page Singleton Query
export const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    _id,
    hero {
      label,
      title,
      description
    },
    contactInfo {
      email,
      address,
      additionalLocations
    },
    formOptions {
      projectTypes,
      budgetRanges
    }
  }
`;

// Global Site Settings Query
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    siteTitle,
    logoText,
    contactEmail,
    navLinks[] {
      label,
      href
    },
    headerCtaLabel,
    headerCtaLink,
    footerCopyright
  }
`;

// Team Members List Query
export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc, _createdAt asc) {
    _id,
    "id": _id,
    name,
    role,
    bio,
    image,
    websiteUrl,
    linkedinUrl
  }
`;

// ==========================================
// Collections & Legacy Queries
// ==========================================

// Header Navigation
export const navbarQuery = groq`
  *[_type == "navigation"][0] {
    _id,
    logoText,
    logoLink,
    links[] {
      label,
      href
    },
    ctaLabel,
    ctaLink
  }
`;

// Landing Hero Section
export const heroQuery = groq`
  *[_type == "hero"][0] {
    _id,
    label,
    title,
    description,
    buttons[] {
      label,
      link,
      variant,
      showArrow
    },
    primaryCtaLabel,
    primaryCtaLink,
    secondaryCtaLabel,
    secondaryCtaLink,
    videoUrl,
    fallbackImage,
    locationLabel,
    establishedLabel
  }
`;

// Logo Cloud Section
export const logoCloudQuery = groq`
  *[_type == "logoCloud"][0] {
    _id,
    heading,
    logos[] {
      name,
      logoImage,
      svgCode,
      link
    }
  }
`;

// Case Studies
export const caseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(_createdAt desc) {
    _id,
    "id": _id,
    "slug": slug.current,
    title,
    client,
    category,
    year,
    summary,
    coverImage,
    coverImageUrl,
    heroImage,
    heroImageUrl,
    videoUrl,
    challenge,
    approach,
    solution,
    resultsSummary,
    stats[] {
      label,
      value,
      description
    },
    galleryImages,
    testimonialQuote,
    testimonialAuthor,
    testimonialRole,
    testimonialCompany,
    relatedSlugs,
    liveUrl,
    featured
  }
`;

export const featuredCaseStudiesQuery = groq`
  *[_type == "caseStudy" && featured == true] | order(_createdAt desc) {
    _id,
    "id": _id,
    "slug": slug.current,
    title,
    client,
    category,
    year,
    summary,
    coverImage,
    coverImageUrl,
    heroImage,
    heroImageUrl,
    videoUrl,
    challenge,
    approach,
    solution,
    resultsSummary,
    stats[] {
      label,
      value,
      description
    },
    galleryImages,
    testimonialQuote,
    testimonialAuthor,
    testimonialRole,
    testimonialCompany,
    relatedSlugs,
    liveUrl,
    featured
  }
`;

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    "id": _id,
    "slug": slug.current,
    title,
    client,
    category,
    year,
    summary,
    coverImage,
    coverImageUrl,
    heroImage,
    heroImageUrl,
    videoUrl,
    challenge,
    approach,
    solution,
    resultsSummary,
    stats[] {
      label,
      value,
      description
    },
    galleryImages,
    testimonialQuote,
    testimonialAuthor,
    testimonialRole,
    testimonialCompany,
    relatedSlugs,
    liveUrl,
    featured
  }
`;

// Statistics
export const statsQuery = groq`
  *[_type == "stat"] | order(order asc) {
    _id,
    "id": _id,
    label,
    value,
    numericValue,
    prefix,
    suffix,
    description
  }
`;

// Services
export const servicesQuery = groq`
  *[_type == "service"] | order(number asc) {
    _id,
    "id": _id,
    number,
    title,
    subtitle,
    description,
    image,
    imageUrl,
    capabilities[] {
      title,
      description
    },
    deliverables[] {
      title,
      items
    },
    relatedCaseStudies
  }
`;

// Editorial Image Text Section
export const imageTextQuery = groq`
  *[_type == "imageText"][0] {
    _id,
    label,
    title,
    paragraphs,
    featureImage,
    featureImageUrl,
    quote,
    quoteAuthor,
    ctaLabel,
    ctaLink
  }
`;

// Testimonials
export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    "id": _id,
    quote,
    author,
    role,
    company,
    avatar,
    avatarUrl,
    metric,
    featured
  }
`;

// Results & Impact Section
export const resultsQuery = groq`
  *[_type == "resultSection"][0] {
    _id,
    label,
    title,
    description,
    highlightMetric,
    highlightLabel,
    metrics[] {
      value,
      label,
      description
    }
  }
`;

// Blog Posts / Insights
export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(_createdAt desc) {
    _id,
    "id": _id,
    "slug": slug.current,
    title,
    category,
    publishedAt,
    readTime,
    excerpt,
    coverImage,
    coverImageUrl,
    authorName,
    authorRole,
    authorAvatar,
    authorAvatarUrl,
    authorBio,
    introduction,
    headings[] {
      id,
      title,
      content
    },
    keyTakeaway,
    conclusion,
    relatedSlugs,
    featured
  }
`;

export const featuredBlogPostsQuery = groq`
  *[_type == "blogPost" && featured == true] | order(_createdAt desc) {
    _id,
    "id": _id,
    "slug": slug.current,
    title,
    category,
    publishedAt,
    readTime,
    excerpt,
    coverImage,
    coverImageUrl,
    authorName,
    authorRole,
    authorAvatar,
    authorAvatarUrl,
    authorBio,
    introduction,
    headings[] {
      id,
      title,
      content
    },
    keyTakeaway,
    conclusion,
    relatedSlugs,
    featured
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    "id": _id,
    "slug": slug.current,
    title,
    category,
    publishedAt,
    readTime,
    excerpt,
    coverImage,
    coverImageUrl,
    authorName,
    authorRole,
    authorAvatar,
    authorAvatarUrl,
    authorBio,
    introduction,
    headings[] {
      id,
      title,
      content
    },
    keyTakeaway,
    conclusion,
    relatedSlugs,
    featured
  }
`;

// CTA Banner
export const ctaQuery = groq`
  *[_type == "ctaBanner"][0] {
    _id,
    label,
    title,
    description,
    primaryButtonLabel,
    primaryButtonLink,
    secondaryButtonLabel,
    secondaryButtonLink
  }
`;
