"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const NAV_LINKS = [
  { href: "/warehouses", label: "Warehouses" },
  { href: "/products", label: "Products" },
  { href: "/stock/movements/new", label: "Record movement" },
  { href: "/stock/transfers/new", label: "Transfer stock" },
  { href: "/stock/low", label: "Low stock" },
  { href: "/reports/valuation", label: "Valuation" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <Box>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Toolbar sx={{ gap: 1, flexWrap: "wrap" }}>
          <Typography variant="h6" sx={{ mr: 3 }}>
            bs-inventory
          </Typography>
          {NAV_LINKS.map((link) => (
            <Button
              key={link.href}
              component={Link}
              href={link.href}
              size="small"
              color={pathname === link.href ? "primary" : "inherit"}
              variant={pathname === link.href ? "contained" : "text"}
            >
              {link.label}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>{children}</Box>
    </Box>
  );
}
