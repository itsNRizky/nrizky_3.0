import Header from "@/components/landing/Header";
import MobileHero from "@/components/landing/MobileHero";
import About from "@/components/landing/About";
import Experiences from "@/components/landing/Experiences";
import CaseStudies from "@/components/landing/CaseStudies";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-[800px] flex-col px-4 py-8 md:px-16 md:py-12">
      <div className="flex-1">
        <Header />
        <MobileHero />
        <About />
        <Experiences />
        <CaseStudies />
      </div>
      <footer className="py-8 text-center text-[14px] text-text-faded">
        Created with ❤️ by Novian Rizky
      </footer>
    </main>
  );
}
