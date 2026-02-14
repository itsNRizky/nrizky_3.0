"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArticleMeta } from "@/lib/articles";

interface CaseStudyCardProps {
  study: ArticleMeta;
  featured?: boolean;
}

const CaseStudyCard = ({ study, featured = false }: CaseStudyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  const primaryTag = study.tags[0] || "";

  const handleMouseEnter = (e: React.MouseEvent) => {
    // Set initial position immediately to cursor location (centered above cursor)
    const pos = { x: e.clientX - 160, y: e.clientY - 220 };
    targetPos.current = pos;
    currentPos.current = pos;
    setIsHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    targetPos.current = { x: e.clientX - 160, y: e.clientY - 220 };
  };

  // Smooth animation loop for modal position
  useEffect(() => {
    const animate = () => {
      // Lerp factor - lower = smoother but slower
      const lerp = 0.15;

      currentPos.current.x +=
        (targetPos.current.x - currentPos.current.x) * lerp;
      currentPos.current.y +=
        (targetPos.current.y - currentPos.current.y) * lerp;

      if (modalRef.current) {
        modalRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    if (isHovered && study.thumbnail) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, study.thumbnail]);

  // Check if preview is a video/gif URL
  const isVideo =
    study.thumbnail?.endsWith(".mp4") ||
    study.thumbnail?.endsWith(".webm") ||
    study.thumbnail?.includes("video");

  const isGif = study.thumbnail?.endsWith(".gif");

  // Keep video playing when hovered
  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play();
    }
  }, [isHovered]);

  // Render the preview content (video, gif, or gradient)
  const renderPreviewContent = () => {
    if (isVideo) {
      return (
        <video
          ref={videoRef}
          src={study.thumbnail}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
      );
    }

    if (isGif) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={study.thumbnail}
          alt="Preview"
          className="h-full w-full object-cover"
        />
      );
    }

    // Gradient or image background
    return (
      <div
        className="flex h-full w-full items-center justify-center"
        style={{ background: study.thumbnail }}
      >
        <div className="flex items-center gap-2 text-[12px] font-medium text-white">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/25 text-[10px]">
            ▶
          </span>
          Preview
        </div>
      </div>
    );
  };

  if (!study.thumbnail) {
    // No preview - render cards without modal
    if (featured) {
      return (
        <Link
          href={`/writings/${study.slug}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`group bg-background col-span-full block rounded-xl p-8 transition-all duration-300 ease-out ${
            isHovered
              ? "-translate-y-0.5 shadow-[0_1px_4px_rgba(0,0,0,0.02),0_4px_16px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.05)]"
              : "shadow-[0_1px_2px_rgba(0,0,0,0.01),0_2px_8px_rgba(0,0,0,0.02)]"
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="bg-accent/10 text-accent mb-4 inline-block rounded px-2.5 py-1 text-[11px] font-medium tracking-wider uppercase">
                {primaryTag}
              </span>
              <h3 className="text-text-primary font-(family-name:--font-fraunces) text-[24px] mb-3 leading-tight font-semibold">
                {study.title}
              </h3>
              <p className="text-text-subtle max-w-[500px] text-[15px] leading-relaxed">
                {study.description}
              </p>
            </div>
            <span
              className={`text-accent mt-2 text-[20px] transition-all duration-200 ${
                isHovered
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-1 opacity-0"
              }`}
            >
              →
            </span>
          </div>
        </Link>
      );
    }

    return (
      <Link
        href={`/writings/${study.slug}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group bg-background flex h-full flex-col rounded-xl p-6 transition-all duration-300 ease-out ${
          isHovered
            ? "-translate-y-0.5 shadow-[0_1px_4px_rgba(0,0,0,0.02),0_4px_16px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.05)]"
            : "shadow-[0_1px_2px_rgba(0,0,0,0.01),0_2px_8px_rgba(0,0,0,0.02)]"
        }`}
      >
        <span className="bg-accent/10 text-accent mb-3.5 inline-block self-start rounded px-2 py-0.5 text-[11px] font-medium tracking-wider uppercase">
          {primaryTag}
        </span>
        <h3 className="text-text-primary mb-2 flex-1 font-(family-name:--font-fraunces) text-[18px] leading-snug font-semibold">
          {study.title}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-text-faded text-[13px]">Read more</p>
          <span
            className={`text-accent text-[16px] transition-all duration-200 ${
              isHovered
                ? "translate-x-0 opacity-100"
                : "-translate-x-1 opacity-0"
            }`}
          >
            →
          </span>
        </div>
      </Link>
    );
  }

  // Preview modal element
  const previewModal = (
    <div
      ref={modalRef}
      className={`pointer-events-none fixed top-0 left-0 z-50 overflow-hidden rounded-xl ${
        isHovered ? "opacity-100" : "opacity-0"
      }`}
      style={{
        width: 320,
        height: 200,
        background: isVideo || isGif ? "#000" : undefined,
        boxShadow: "0 4px 16px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.08)",
        willChange: "transform",
        transition: "opacity 0.2s ease-out",
      }}
    >
      {renderPreviewContent()}
    </div>
  );

  if (featured) {
    return (
      <>
        <Link
          href={`/writings/${study.slug}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
          className={`group bg-background col-span-full block rounded-xl p-8 transition-all duration-300 ease-out ${
            isHovered
              ? "-translate-y-0.5 shadow-[0_1px_4px_rgba(0,0,0,0.02),0_4px_16px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.05)]"
              : "shadow-[0_1px_2px_rgba(0,0,0,0.01),0_2px_8px_rgba(0,0,0,0.02)]"
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="bg-accent/10 text-accent mb-4 inline-block rounded px-2.5 py-1 text-[11px] font-medium tracking-wider uppercase">
                {primaryTag}
              </span>

              <h3 className="text-text-primary mb-3 font-(family-name:--font-fraunces) text-[24px] leading-tight font-semibold">
                {study.title}
              </h3>

              <p className="text-text-subtle max-w-[500px] text-[15px] leading-relaxed">
                {study.description}
              </p>
            </div>

            <span
              className={`text-accent mt-2 text-[20px] transition-all duration-200 ${
                isHovered
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-1 opacity-0"
              }`}
            >
              →
            </span>
          </div>
        </Link>
        {previewModal}
      </>
    );
  }

  return (
    <>
      <Link
        href={`/writings/${study.slug}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className={`group bg-background flex h-full flex-col rounded-xl p-6 transition-all duration-300 ease-out ${
          isHovered
            ? "-translate-y-0.5 shadow-[0_1px_4px_rgba(0,0,0,0.02),0_4px_16px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.05)]"
            : "shadow-[0_1px_2px_rgba(0,0,0,0.01),0_2px_8px_rgba(0,0,0,0.02)]"
        }`}
      >
        <span className="bg-accent/10 text-accent mb-3.5 inline-block self-start rounded px-2 py-0.5 text-[11px] font-medium tracking-wider uppercase">
          {primaryTag}
        </span>

        <h3 className="text-text-primary mb-2 flex-1 font-(family-name:--font-fraunces) text-[18px] leading-snug font-semibold">
          {study.title}
        </h3>

        <div className="flex items-center justify-between">
          <p className="text-text-faded text-[13px]">Read more</p>

          <span
            className={`text-accent text-[16px] transition-all duration-200 ${
              isHovered
                ? "translate-x-0 opacity-100"
                : "-translate-x-1 opacity-0"
            }`}
          >
            →
          </span>
        </div>
      </Link>
      {previewModal}
    </>
  );
};

export default CaseStudyCard;
