import Sidebar from "@/components/landing/Sidebar";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto min-h-screen max-w-[1400px] md:grid md:grid-cols-[280px_1fr]">
      <Sidebar />
      {children}
    </div>
  );
}
