import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

// Simple helper to load .env.local if present
if (fs.existsSync(".env.local")) {
  const envConfig = fs.readFileSync(".env.local", "utf8");
  envConfig.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [key, ...valParts] = trimmed.split("=");
      const val = valParts.join("=").replace(/^["']|["']$/g, "").trim();
      if (key && !process.env[key.trim()]) {
        process.env[key.trim()] = val;
      }
    }
  });
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "❌ Error: Please ensure NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN are set in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-03-01",
  token,
  useCdn: false,
});

async function seedHero() {
  console.log("🚀 Seeding Landing Page Hero section into Sanity...");

  const heroDocument = {
    _type: "hero",
    _id: "landing-page-hero",
    label: "DIGITAL PRODUCTS / STRATEGY / EXPERIENCE",
    title: "We build digital experiences that move businesses forward.",
    description:
      "Northstar partners with ambitious companies to design, build and scale digital products that people actually want to use.",
    primaryCtaLabel: "View our work",
    primaryCtaLink: "/work",
    secondaryCtaLabel: "Start a conversation",
    secondaryCtaLink: "/contact",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-data-41539-large.mp4",
    locationLabel: "DESIGN STUDIO / NEW YORK",
    establishedLabel: "EST. 2014",
  };

  try {
    const result = await client.createOrReplace(heroDocument);
    console.log("✅ Successfully seeded Hero document into Sanity!");
    console.log("Document ID:", result._id);
  } catch (error) {
    console.error("❌ Failed to seed hero document:", error.message);
  }
}

seedHero();
