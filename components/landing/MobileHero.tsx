import { Noto_Sans_Javanese } from "next/font/google";

const javanese = Noto_Sans_Javanese({
  variable: "--font-javanese",
  subsets: ["latin"],
});

const MobileHero = () => {
  return (
    <section className="bg-background sticky top-[calc(-15vh)] flex min-h-[calc(80vh-6rem)] flex-col justify-center md:relative md:top-0 md:hidden">
      {/* Logo */}
      <div className="mb-5">
        <h1
          className={`text-text-primary text-5xl font-bold tracking-tight ${javanese.className}`}
        >
          ꦤ꧀ꦫꦶꦗ꦳ꦏꦶ
        </h1>
      </div>

      {/* Role */}
      <h2 className="text-text-primary mb-3 text-[17px] font-semibold">
        Software Engineer (FE)
      </h2>

      {/* Description */}
      <p className="text-text-subtle mb-8 text-[15px] leading-relaxed">
        I build reliable, high-performance frontend systems.
      </p>

      {/* Social Links */}
      <div className="flex gap-5">
        <a
          href="https://github.com/itsNRizky"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-faded hover:text-accent text-[14px] transition-colors duration-200"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/nrizky"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-faded hover:text-accent text-[14px] transition-colors duration-200"
        >
          LinkedIn
        </a>
        <a
          href="https://twitter.com/nrizky"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-faded hover:text-accent text-[14px] transition-colors duration-200"
        >
          Twitter
        </a>
      </div>
    </section>
  );
};

export default MobileHero;
