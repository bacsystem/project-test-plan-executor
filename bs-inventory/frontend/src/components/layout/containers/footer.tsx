"use client";

import Link from "next/link";
import { useTranslations } from "use-intl";

import { Box, Button } from "@mui/material";

export default function Footer() {
  const t = useTranslations("dashboard");

  return (
    <Box component="footer" className="flex h-10 items-center justify-center">
      <Button
        size="tiny"
        color="text-secondary"
        variant="text"
        className="hover:text-primary !bg-transparent font-normal"
        component={Link}
        href="/"
      >
        {t("footer-about")}
      </Button>
      <Button
        size="tiny"
        color="text-secondary"
        variant="text"
        className="hover:text-primary !bg-transparent font-normal"
        component={Link}
        href="/docs"
      >
        {t("footer-docs")}
      </Button>
      <Button
        size="tiny"
        color="text-secondary"
        variant="text"
        className="hover:text-primary !bg-transparent font-normal"
        component={Link}
        href="https://mui.com"
        target="_blank"
      >
        {t("footer-purchase")}
      </Button>
    </Box>
  );
}
