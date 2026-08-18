import { CaseStudy } from "../types";

export const MOCK_CASE_STUDIES: CaseStudy[] = [
  {
    id: "orbit-finance",
    slug: "orbit-finance",
    title: "Reimagining institutional wealth management for the modern web",
    client: "Orbit Finance",
    category: "Fintech Platform",
    year: "2024",
    summary: "A complete brand transformation and web application redesign that elevated Orbit's market perception and unlocked $1.2B in new assets under management.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    challenge: "Orbit Finance possessed market-leading algorithms and deep liquidity pools, but their digital footprint looked legacy. Enterprise asset managers hesitated during procurement due to an outdated user interface that failed to convey security, speed, and mathematical rigor.",
    approach: "We conducted 28 in-depth interviews with portfolio managers and quantitative analysts. We uncovered that speed of execution and data clarity were non-negotiable. We stripped away visual noise and designed an editorial, ultra-responsive dashboard framework built around real-time WebSocket feeds.",
    solution: "Northstar created a unified visual system across marketing touchpoints and web applications. Utilizing custom WebGL data visualizations, high-contrast typography, and a low-latency UI architecture, Orbit Finance transformed from a legacy platform into the benchmark for modern wealth tools.",
    results: {
      highlightMetric: "+84%",
      highlightLabel: "Conversion Rate Uplift",
      summary: "Within 90 days of rollout, Orbit Finance saw enterprise trial conversions double and institutional sign-ups surge.",
      stats: [
        { label: "New Assets Under Management", value: "$1.2B", description: "Attracted in Q1 post-launch" },
        { label: "User Task Completion Speed", value: "3.4x", description: "Reduction in workflow latency" },
        { label: "Enterprise Net Promoter Score", value: "78", description: "Up from 42 prior to redesign" }
      ]
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop"
    ],
    testimonial: {
      quote: "Northstar didn't just redesign our website. They helped us rethink how customers experience our entire product architecture.",
      author: "Sarah Müller",
      role: "VP Marketing & Communications",
      company: "Orbit Finance",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
    },
    relatedSlugs: ["noma-health", "aster-commerce"],
    liveUrl: "https://orbit-finance.example.com",
    featured: true
  },
  {
    id: "noma-health",
    slug: "noma-health",
    title: "Designing a human-centered digital care platform for preventative medicine",
    client: "Noma Health",
    category: "Digital Healthcare",
    year: "2024",
    summary: "Designing an intuitive, calming patient experience and clinical dashboard that reduced patient onboarding drop-offs by 62%.",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2000&auto=format&fit=crop",
    challenge: "Preventative health monitoring requires patients to complete complex biometrics intake forms. Noma's legacy funnel suffered a 58% abandonment rate prior to consultation booking.",
    approach: "We redesigned the intake workflow into micro-steps with ambient progressive disclosure, warm editorial typography, and reassuring feedback micro-animations.",
    solution: "A mobile-first web app paired with an efficient practitioner dashboard that streamlines patient review time from 15 minutes down to 4 minutes.",
    results: {
      highlightMetric: "62%",
      highlightLabel: "Reduction in Onboarding Drop-off",
      summary: "Patient completion rates increased significantly while maintaining strict HIPAA and GDPR compliance standards.",
      stats: [
        { label: "Active Monthly Patients", value: "140k+", description: "Grown across 18 countries" },
        { label: "Clinical Review Efficiency", value: "4 min", description: "Down from 15 minutes per case" },
        { label: "App Store & Web Rating", value: "4.9/5", description: "Based on 12k reviews" }
      ]
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1200&auto=format&fit=crop"
    ],
    testimonial: {
      quote: "The Northstar team possesses a rare balance: deep engineering discipline combined with world-class editorial aesthetic.",
      author: "Marcus Thorne",
      role: "Co-Founder & CEO",
      company: "Noma Health",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
    },
    relatedSlugs: ["orbit-finance", "form-studio"],
    liveUrl: "https://nomahealth.example.com",
    featured: true
  },
  {
    id: "aster-commerce",
    slug: "aster-commerce",
    title: "Scaling high-fashion luxury storefront for global multi-currency deployment",
    client: "Aster Commerce",
    category: "E-Commerce",
    year: "2023",
    summary: "Architecting a headless e-commerce store with sub-second page loads and bespoke editorial layout components.",
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2000&auto=format&fit=crop",
    challenge: "Aster needed to present luxury physical garments with high-resolution imagery and immersive video without sacrificing mobile performance or SEO rankings.",
    approach: "We built a custom Next.js storefront backed by Next.js Server Components, incremental static regeneration (ISR), and localized multi-currency routing.",
    solution: "An immersive e-commerce experience that feels like flipping through a physical fashion monograph while providing lightning-fast cart transitions.",
    results: {
      highlightMetric: "2.4x",
      highlightLabel: "Average Order Value Increase",
      summary: "Higher customer engagement drove longer session durations and bigger cart sizes across global markets.",
      stats: [
        { label: "Global Page Load Speed", value: "0.4s", description: "LCP performance worldwide" },
        { label: "Cart Conversion Rate", value: "+46%", description: "Year-over-year improvement" },
        { label: "Multi-Currency Markets", value: "32", description: "Fully localized experience" }
      ]
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"
    ],
    testimonial: {
      quote: "Our online storefront transformed from a generic online store into our flagship global flagship experience.",
      author: "Elena Rostova",
      role: "Head of Digital Experience",
      company: "Aster Global",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop"
    },
    relatedSlugs: ["orbit-finance", "luma-cloud"],
    liveUrl: "https://aster.example.com",
    featured: true
  },
  {
    id: "kin-os",
    slug: "kin-os",
    title: "Building the digital design system & developer hub for Kin OS",
    client: "Kin OS",
    category: "Developer Tools",
    year: "2023",
    summary: "Creating a comprehensive component library and interactive documentation experience for over 45,000 active developers.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop",
    challenge: "Kin OS had fragmented UI components across 4 different engineering repos, causing developer friction and brand inconsistency.",
    approach: "We audited 300+ existing components, unified token structures, and built an open-source documentation engine with live code previews.",
    solution: "A sleek, dark-mode first design system that accelerated internal feature shipment by 40% and improved third-party ecosystem adoption.",
    results: {
      highlightMetric: "45,000+",
      highlightLabel: "Active Developers Engaged",
      summary: "Developer adoption scaled rapidly following the launch of the new hub.",
      stats: [
        { label: "Development Velocity", value: "+40%", description: "Faster component assembly" },
        { label: "GitHub Stars", value: "18.4k", description: "Community stars gained" }
      ]
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"
    ],
    relatedSlugs: ["orbit-finance", "aster-commerce"],
    featured: false
  },
  {
    id: "form-studio",
    slug: "form-studio",
    title: "Bespoke digital monograph & interactive portfolio for Architectural Form",
    client: "Form Studio",
    category: "Architecture & Design",
    year: "2023",
    summary: "Creating an immersive WebGL architectural experience showcasing award-winning physical spaces across Tokyo, Zurich, and New York.",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
    challenge: "Form Studio needed a digital presence that matched the meticulous materiality and precision of their physical architecture.",
    approach: "We developed a spatial navigation concept with subtle micro-transitions, high-dynamic-range imagery, and clean architectural grid typography.",
    solution: "A award-winning site that won Site of the Day honors and secured 4 major museum commission pitches.",
    results: {
      highlightMetric: "3x",
      highlightLabel: "Inquiry Rate Increase",
      summary: "Inquiries from international museum boards tripled post-launch.",
      stats: [
        { label: "Design Awards", value: "7", description: "International honors won" },
        { label: "Average Time on Site", value: "5m 40s", description: "Unprecedented engagement" }
      ]
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
    ],
    relatedSlugs: ["aster-commerce", "noma-health"],
    featured: false
  },
  {
    id: "luma-cloud",
    slug: "luma-cloud",
    title: "Enterprise AI infrastructure management dashboard & platform branding",
    client: "Luma Cloud",
    category: "Cloud Infrastructure",
    year: "2024",
    summary: "Structuring complex telemetry data into intuitive visual controls for DevOps engineers managing multi-cloud Kubernetes clusters.",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
    challenge: "Engineers were suffering alert fatigue due to fragmented monitoring tools across AWS, GCP, and Azure.",
    approach: "We designed a unified telemetry canvas with intelligent alert grouping and zero-latency cluster search.",
    solution: "Luma Cloud's platform became the primary command center for fortune 500 DevOps teams.",
    results: {
      highlightMetric: "-75%",
      highlightLabel: "Incident Resolution Time",
      summary: "Clearer observability resulted in immediate mean-time-to-resolution improvements.",
      stats: [
        { label: "Clusters Managed", value: "25,000+", description: "Globally monitored" },
        { label: "Alert Noise Reduction", value: "82%", description: "Fewer false alarms" }
      ]
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
    ],
    relatedSlugs: ["orbit-finance", "kin-os"],
    featured: false
  }
];
