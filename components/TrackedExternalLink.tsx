"use client";

import { AnchorHTMLAttributes, MouseEvent } from "react";
import { sendClientEvent } from "@/lib/clientEvents";

interface TrackedExternalLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  linkLabel?: string;
}

const TrackedExternalLink = ({
  href,
  linkLabel,
  onClick,
  children,
  ...rest
}: TrackedExternalLinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    sendClientEvent({
      eventType: "external_link.clicked",
      resource: { type: "url", id: href },
      metadata: {
        linkLabel:
          linkLabel ?? (typeof children === "string" ? children : undefined),
        sourcePath:
          typeof window !== "undefined" ? window.location.pathname : undefined,
      },
    });
    onClick?.(e);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

export default TrackedExternalLink;
