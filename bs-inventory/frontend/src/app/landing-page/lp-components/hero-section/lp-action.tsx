"use client";

import Link from "next/link";

import { Box, Card, CardContent, Typography } from "@mui/material";

import NiChartLine from "@/icons/nexture/ni-chart-line";

export default function LPAction() {
  return (
    <Card component={Link} href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
      <Box className="bg-secondary-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
        <NiChartLine className="text-secondary" size={"large"} />
      </Box>
      <CardContent className="flex w-full flex-row justify-between gap-2.5">
        <Box>
          <Typography variant="subtitle2" className="leading-5 transition-colors">
            Track Metrics
          </Typography>
          <Typography variant="body1" className="text-text-secondary line-clamp-1 leading-5">
            Analytics tool for products
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
