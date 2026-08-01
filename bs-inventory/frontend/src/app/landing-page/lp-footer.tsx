"use client";
import { useRef } from "react";
import { useInViewport } from "react-in-viewport";
import { useTranslations } from "use-intl";

import { Box, Button, Link } from "@mui/material";

import { LINKS } from "@/constants";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function LPFooter({ className }: Props) {
  const t = useTranslations("dashboard");
  const scrollRef = useRef(null);
  const { inViewport } = useInViewport(scrollRef, { threshold: 0.2 });

  return (
    <Box
      className={cn(
        className,
        "lp-contained-container flex h-15 items-start justify-center gap-0.5 opacity-0 transition-opacity duration-700 sm:gap-2.5",
        inViewport && "opacity-100",
      )}
      ref={scrollRef}
    >
      <Button
        variant="text"
        color="grey"
        className="hover:text-primary px-2 sm:px-3"
        size="tiny"
        href={LINKS.dashboard}
        target="_blank"
        component={Link}
      >
        View Live
      </Button>
      <Button
        variant="text"
        color="grey"
        className="hover:text-primary px-2 sm:px-3"
        size="tiny"
        href={LINKS.figma}
        target="_blank"
        component={Link}
      >
        Figma
      </Button>
      <Button
        variant="text"
        color="grey"
        className="hover:text-primary px-2 sm:px-3"
        size="tiny"
        href={LINKS.docs}
        target="_blank"
        component={Link}
      >
        {t("footer-docs")}
      </Button>
      <Button
        variant="text"
        color="grey"
        className="hover:text-primary px-2 sm:px-3"
        size="tiny"
        target="_blank"
        href={LINKS.purchase}
        component={Link}
      >
        {t("footer-purchase")}
      </Button>
    </Box>
  );
}
