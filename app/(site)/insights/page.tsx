import { getInsightsPageData } from "@/sanity/lib/fetch";
import { InsightsPageClient } from "@/components/blog/InsightsPageClient";

export const dynamic = "force-dynamic";

export default async function InsightsPage() {
  const data = await getInsightsPageData();
  return <InsightsPageClient data={data} />;
}
