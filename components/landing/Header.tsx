"use client";

import React, { useEffect, useState } from "react";

const Header = () => {
  const [dateTime, setDateTime] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateDateTime = () => {
      const today = new Date();
      const formatted =
        today.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        }) +
        " " +
        today.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      setDateTime(formatted);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`bg-background bg-page-bg z-50 mb-8 flex w-full items-center justify-between py-3 md:static md:mb-14 md:bg-transparent md:py-0 ${
        isScrolled ? "sticky top-0" : ""
      }`}
    >
      <span className="text-text-faded text-[14px]">
        Sugeng Rawuh! It&apos;s NRizky!
      </span>
      <span className="text-text-faded text-[14px]">{dateTime}</span>
    </header>
  );
};

export default Header;
