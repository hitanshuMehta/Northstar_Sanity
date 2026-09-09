import { getContactPageData } from "@/sanity/lib/fetch";
import { ContactPageClient } from "@/components/contact/ContactPageClient";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const data = await getContactPageData();
  return <ContactPageClient data={data} />;
}
