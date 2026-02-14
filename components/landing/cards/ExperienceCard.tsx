"use client";

import { useState } from "react";

export interface CaseStudy {
  title: string;
  slug?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  type: string;
  summary: string;
  details: string[];
  caseStudies: CaseStudy[];
}

interface ExperienceCardProps {
  experience: Experience;
  isExpanded: boolean;
  onToggle: () => void;
}

const ExperienceCard = ({
  experience,
  isExpanded,
  onToggle,
}: ExperienceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex cursor-pointer flex-col gap-0 rounded-xl p-4 transition-all duration-300 ease-out md:flex-row md:p-6 ${
        isExpanded
          ? "bg-background/80 translate-x-1 border border-black/3 shadow-[0_1px_3px_rgba(0,0,0,0.03),0_4px_12px_rgba(0,0,0,0.04),0_12px_32px_rgba(0,0,0,0.05)] backdrop-blur-sm"
          : isHovered
            ? "bg-background/60 translate-x-1 border border-black/2 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_4px_12px_rgba(0,0,0,0.03)]"
            : "border border-transparent bg-transparent"
      }`}
    >
      {/* Accent line */}
      <div
        className={`bg-accent absolute top-1/2 left-0 h-[60%] -translate-y-1/2 rounded-r-sm transition-all duration-300 ease-out ${
          isExpanded || isHovered ? "w-0.5" : "w-0"
        }`}
      />

      {/* Date - shows on top for mobile, side column for desktop */}
      <div className="mb-2 shrink-0 md:mb-0 md:w-[140px] md:pt-0.5">
        <span className="text-[12px] text-text-faded md:text-[13px]">{experience.period}</span>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="mb-1 flex flex-col gap-0.5 md:flex-row md:items-baseline md:gap-2">
          <h3 className="text-[15px] font-semibold text-text-primary md:text-[16px]">
            {experience.role}
          </h3>
          <span className="text-[13px] font-medium text-accent md:text-[14px]">
            @ {experience.company}
          </span>
        </div>

        <span className="text-text-faded mb-3 inline-block rounded-md bg-black/[0.04] px-2.5 py-1 text-[12px]">
          {experience.type}
        </span>

        <p className="text-text-muted text-[14px] leading-relaxed">
          {experience.summary}
        </p>

        {/* Expanded content with smooth animation */}
        <div
          className={`grid transition-all duration-300 ease-out ${
            isExpanded
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="mt-5 border-t border-black/[0.06] pt-5">
              <ul className="flex list-disc flex-col gap-2 pl-4">
                {experience.details.map((detail, i) => (
                  <li
                    key={i}
                    className="text-text-subtle text-[14px] leading-normal"
                  >
                    {detail}
                  </li>
                ))}
              </ul>

              {experience.caseStudies.length > 0 && (
                <div className="mt-5 flex flex-col gap-2">
                  {experience.caseStudies.map((caseStudy, i) => (
                    <a
                      key={i}
                      href={caseStudy.slug ? `/writings/${caseStudy.slug}` : "#"}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-between gap-2 rounded-lg bg-accent/[0.08] px-3 py-2 text-[12px] font-medium text-accent transition-all duration-200 hover:bg-accent/[0.12] md:px-4 md:text-[14px]"
                    >
                      <span className="line-clamp-2">Read: {caseStudy.title}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="shrink-0"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expand indicator */}
      <div className="absolute right-4 top-4 flex w-6 items-start pt-1 md:static md:right-auto md:top-auto">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#999"
          strokeWidth="2"
          className={`transition-transform duration-200 ease-out ${
            isExpanded ? "rotate-180" : "rotate-0"
          }`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  );
};

export default ExperienceCard;
