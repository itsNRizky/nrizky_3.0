import { Noto_Sans_Javanese } from "next/font/google";
import NavLinks from "./NavLinks";

const javanese = Noto_Sans_Javanese({
  variable: "--font-javanese",
  subsets: ["latin"],
});

const Sidebar = () => {
  return (
    <aside className="border-border sticky top-0 hidden h-screen w-[280px] flex-col justify-between border-r px-8 py-12 md:flex">
      <div className="pt-20">
        <div className="space-y-2">
          {/* Logo area */}
          <div className="w-fit">
            <h1
              className={`relative p-3 pr-28 pb-6 pl-0 text-3xl font-bold tracking-tight ${javanese.className}`}
            >
              ꦤ꧀ꦫꦶ
              <span className="absolute text-5xl font-medium tracking-tighter">
                ꦗ꦳ꦏꦶ
              </span>
            </h1>
          </div>

          {/* Title & Description */}
          <h2 className="text-text-primary text-[15px] font-semibold">
            Software Engineer (FE)
          </h2>
          <p className="text-text-subtle text-[14px] leading-normal">
            I build reliable, high-performance frontend systems.
          </p>

          {/* Navigation */}
          <NavLinks />
        </div>
      </div>

      {/* Footer */}
      <div>
        {/* Social Links */}
        <div className="mb-4 flex gap-4">
          <a
            href="https://github.com/itsNRizky"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-faded hover:text-accent text-[13px] transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/nrizky"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-faded hover:text-accent text-[13px] transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/nrizky"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-faded hover:text-accent text-[13px] transition-colors duration-200"
          >
            Twitter
          </a>
        </div>
        <div className="text-text-ghost text-[12px]">© 2025 NRizky</div>
      </div>
    </aside>
  );
};

export default Sidebar;
