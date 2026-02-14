"use client";

import { useState } from "react";
import ExperienceCard, {
  Experience,
} from "@/components/landing/cards/ExperienceCard";

const experiences: Experience[] = [
  {
    company: "Sera Global",
    role: "Software Engineer",
    period: "February 2025 — Present",
    type: "Full-time",
    summary:
      "Worked on production web systems for Japan-based clients, focusing on performance-critical and transaction-related features.",
    details: [
      "Built buyer-facing purchase and reward flows integrated with Stripe and PayPay, supporting 2,400+ monthly transactions",
      "Improved React table rendering performance by 190% (20 FPS → 58 FPS on iOS) using hybrid virtualization (TanStack Virtual) and optimized MobX state subscriptions",
      "Optimized end-to-end search performance by 84%, reducing query time from 12s to 1.89s.",
    ],
    caseStudies: [
      {
        title: "How I optimized React rendering",
        slug: "sera-react-table-virtualization",
      },
      {
        title:
          "How I improve search speed by 84%, reducing query time from 12s to 1.89s",
        slug: "sera-search-query-optimization",
      },
    ],
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "Jan 2024 - Nov 2024",
    type: "Project Based",
    summary: "I spent this year working on some project based freelance",
    details: [
      "[Web Developer] Developed hotel management app for high school student's simulation",
      "[Webdev Tutor] Performed online tutorial of web development course based on the syllabus via 110 video content with total duration 40 hour.",
      "[Webdev Tutor] Developed web development syllabus with over 30 modules for online tutorials focusing on popular framework such as HTML, CSS, Tailwinds, Javascript, NextJS, and MySQL",
    ],
    caseStudies: [],
  },
  {
    company: "IoTanic",
    role: "Frontend Engineer",
    period: "Jul 2022 - Jun 2023",
    type: "Early-stage Startup Project",
    summary:
      "IoTanic is an early-stage startup originating from a university project, focused on building farms IoT-based solutions.",
    details: [
      "Co-founded and developed frontend features for a PWA, translating 50+ Figma-designed components into accessible React components using Next.js, and integrating APIs for MVP delivery.",
      "Secured startup incubation and funding support from UNS Innovation Hub and Pertamuda, gaining experience in early-stage product development and iteration.",
    ],
    caseStudies: [],
  },
  {
    company: "GoTo Impact Foundation",
    role: "GIGIH 3.0 Fullstack Developer Apprentice",
    period: "Jun 2023 - Dec 2023",
    type: "Bootcamp",
    summary: "GoTo is one of biggest unicorn in Indonesia.",
    details: [
      "Selected for GoTo Impact Foundation’s GIGIH 3.0 program, contributing to an industry capstone project by building 6+ dashboard pages and 10+ reusable React components in a collaborative, agile team environment.",
    ],
    caseStudies: [],
  },
];

const Experiences = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <section id="experience" className="mb-20">
      {/* Section header */}
      <div className="mb-8 flex items-center gap-3">
        <h2 className="text-text-faded text-[12px] font-semibold tracking-widest uppercase">
          Experience
        </h2>
        <div className="bg-border h-px flex-1" />
      </div>

      {/* Experience cards */}
      <div className="flex flex-col gap-3">
        {experiences.map((exp, index) => (
          <ExperienceCard
            key={index}
            experience={exp}
            isExpanded={expandedIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Experiences;
