export const metadata = {
  title: "Sanity Studio | Northstar",
  description: "Sanity CMS Content Management Studio for Northstar Agency",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full m-0 p-0 overflow-hidden">{children}</body>
    </html>
  );
}
