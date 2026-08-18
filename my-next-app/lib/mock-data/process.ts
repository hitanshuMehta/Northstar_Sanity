import { ProcessStep } from "../types";

export const MOCK_PROCESS: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    subtitle: "Understanding business goals, market context, and user friction",
    description: "We dive deep into your organization's mechanics, conducting stakeholder interviews, analytics teardowns, and user research to pinpoint high-value opportunities.",
    deliverables: ["Stakeholder Interviews", "UX Friction Audit", "Market Positioning Analysis", "Project Scope Brief"]
  },
  {
    number: "02",
    title: "Define",
    subtitle: "Establishing strategy, content architecture, and core system goals",
    description: "We map out the user journey, define key conversion milestones, craft editorial messaging frameworks, and establish strict technical success metrics.",
    deliverables: ["Product Strategy Roadmap", "Editorial Messaging Guide", "UX Wireframes & Flows", "Content Schema Architecture"]
  },
  {
    number: "03",
    title: "Design",
    subtitle: "Crafting bespoke UI, editorial typography, and fluid interaction systems",
    description: "We explore visual concepts, establish design tokens, build interactive prototypes, and iterate rapidly to create a premium, differentiated visual language.",
    deliverables: ["Figma Component Library", "High-Fidelity UI Screens", "Interactive Prototypes", "Motion & Transition Tokens"]
  },
  {
    number: "04",
    title: "Build",
    subtitle: "Engineering clean, accessible, sub-second web applications",
    description: "Our engineering team brings the design to life using Next.js App Router, TypeScript, Framer Motion, and scalable headless CMS content structures.",
    deliverables: ["Production Next.js Codebase", "Headless CMS Setup", "Automated CI/CD Pipelines", "Accessibility & Core Web Vitals Audit"]
  },
  {
    number: "05",
    title: "Grow",
    subtitle: "Launching, measuring impact, and continuous product evolution",
    description: "We ensure a flawless rollout, monitor real-world performance telemetry, conduct A/B testing, and partner with your team for continuous long-term growth.",
    deliverables: ["Launch QA & Telemetry Setup", "Post-Launch Conversion Analytics", "A/B Testing Roadmap", "Ongoing Iteration Sprints"]
  }
];
