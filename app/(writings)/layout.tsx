export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-12">
      <div className="flex-1">{children}</div>
      <footer className="mt-16 py-8 text-center text-[14px] text-text-faded">
        Created with ❤️ by Novian Rizky
      </footer>
    </div>
  );
}
