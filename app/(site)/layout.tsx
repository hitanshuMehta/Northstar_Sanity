import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SanityLive } from "@/sanity/lib/live";
import { getSiteSettingsData } from "@/sanity/lib/fetch";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await getSiteSettingsData();

  return (
    <Providers>
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer
        email={siteSettings?.contactEmail}
        copyrightNotice={siteSettings?.footerCopyright}
      />
      <SanityLive />
    </Providers>
  );
}
