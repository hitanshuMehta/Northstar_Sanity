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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black">
      {children}
    </div>
  );
}
