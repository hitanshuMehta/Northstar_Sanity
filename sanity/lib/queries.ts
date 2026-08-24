import { groq } from "next-sanity";

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
