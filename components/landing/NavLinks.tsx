"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Writings", href: "writings" },
];

const NavLinks = () => {
  const [activeHash, setActiveHash] = useState("#about");

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || "#about");
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleClick = (href: string) => {
    setActiveHash(href);
  };

  return (
    <nav className="my-8 flex flex-col gap-4">
      {navItems.map((item) => {
        const isActive = activeHash === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => handleClick(item.href)}
            className={`group flex items-center text-[14px] transition-all duration-300 ease-out ${
              isActive
                ? "text-accent font-medium"
                : "text-text-muted hover:text-text-primary font-normal"
            }`}
          >
            <span
              className={`mr-4 h-px transition-all duration-300 ease-out ${
                isActive
                  ? "bg-accent w-8"
                  : "bg-border group-hover:bg-text-muted w-8 group-hover:mr-6 group-hover:w-16"
              }`}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavLinks;
