import { getWorkPageData } from "@/sanity/lib/fetch";
import { WorkPageClient } from "@/components/case-studies/WorkPageClient";

export const dynamic = "force-dynamic";

export default async function WorkPage() {
  const data = await getWorkPageData();
  return <WorkPageClient data={data} />;
}
