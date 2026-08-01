"use client";

import Link from "next/link";

import { Card, CardContent, Grid, Typography } from "@mui/material";

export default function ExtensionConversations() {
  return (
    <Card className="mb-5">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Conversation Starters
        </Typography>
        <Grid container size={12} className="w-full" spacing={2.5}>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Link
              href={"/applications/ai-chat/new-chat"}
              className="border-grey-50 group flex flex-col rounded-lg border p-7"
            >
              <Typography variant="subtitle2" className="group-hover:text-primary mb-2 transition-colors">
                Brand Identity Boost
              </Typography>
              <Typography
                variant="body1"
                className="text-text-secondary group-hover:text-text-primary line-clamp-2 transition-colors"
              >
                I'm building a wellness brand focused on calm and trust. What color palette would best communicate
                serenity and reliability...
              </Typography>
            </Link>
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Link
              href={"/applications/ai-chat/new-chat"}
              className="border-grey-50 group flex flex-col rounded-lg border p-7"
            >
              <Typography variant="subtitle2" className="group-hover:text-primary mb-2 transition-colors">
                Palette Harmony Check
              </Typography>
              <Typography
                variant="body1"
                className="text-text-secondary group-hover:text-text-primary line-clamp-2 transition-colors"
              >
                Here's a set of five colors I'm using for a website redesign. Can you analyze their harmony and suggest
                adjustments for better...
              </Typography>
            </Link>
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Link
              href={"/applications/ai-chat/new-chat"}
              className="border-grey-50 group flex flex-col rounded-lg border p-7"
            >
              <Typography variant="subtitle2" className="group-hover:text-primary mb-2 transition-colors">
                Luxury Without Coldness
              </Typography>
              <Typography
                variant="body1"
                className="text-text-secondary group-hover:text-text-primary line-clamp-2 transition-colors"
              >
                I want my product packaging to feel luxurious but still warm and approachable. Which color combinations
                strike that balance?
              </Typography>
            </Link>
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Link
              href={"/applications/ai-chat/new-chat"}
              className="border-grey-50 group flex flex-col rounded-lg border p-7"
            >
              <Typography variant="subtitle2" className="group-hover:text-primary mb-2 transition-colors">
                Cultural Color Meanings
              </Typography>
              <Typography
                variant="body1"
                className="text-text-secondary group-hover:text-text-primary line-clamp-2 transition-colors"
              >
                I'm designing a global campaign. How is the color red perceived differently in Western, Eastern, and
                Middle Eastern cultures?
              </Typography>
            </Link>
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Link
              href={"/applications/ai-chat/new-chat"}
              className="border-grey-50 group flex flex-col rounded-lg border p-7"
            >
              <Typography variant="subtitle2" className="group-hover:text-primary mb-2 transition-colors">
                Minimalist Fashion Vibes
              </Typography>
              <Typography
                variant="body1"
                className="text-text-secondary group-hover:text-text-primary line-clamp-2 transition-colors"
              >
                I'm curating a minimalist fashion line. Which tones and shades convey elegance, simplicity, and
                timelessness without feelin...
              </Typography>
            </Link>
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Link
              href={"/applications/ai-chat/new-chat"}
              className="border-grey-50 group flex flex-col rounded-lg border p-7"
            >
              <Typography variant="subtitle2" className="group-hover:text-primary mb-2 transition-colors">
                Interior Space Illusions
              </Typography>
              <Typography
                variant="body1"
                className="text-text-secondary group-hover:text-text-primary line-clamp-2 transition-colors"
              >
                I'm redecorating a small apartment. Which wall and accent colors can make the space feel larger and more
                open?
              </Typography>
            </Link>
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Link
              href={"/applications/ai-chat/new-chat"}
              className="border-grey-50 group flex flex-col rounded-lg border p-7"
            >
              <Typography variant="subtitle2" className="group-hover:text-primary mb-2 transition-colors">
                Startup Palette Strategy
              </Typography>
              <Typography
                variant="body1"
                className="text-text-secondary group-hover:text-text-primary line-clamp-2 transition-colors"
              >
                We're launching a tech startup focused on innovation and trust. Can you suggest a modern color palette
                that feels fresh but...
              </Typography>
            </Link>
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Link
              href={"/applications/ai-chat/new-chat"}
              className="border-grey-50 group flex flex-col rounded-lg border p-7"
            >
              <Typography variant="subtitle2" className="group-hover:text-primary mb-2 transition-colors">
                Muted vs. Vibrant Psychology
              </Typography>
              <Typography
                variant="body1"
                className="text-text-secondary group-hover:text-text-primary line-clamp-2 transition-colors"
              >
                I'm torn between muted and vibrant tones for a campaign. Can you explain the psychological impact of
                each and when they...
              </Typography>
            </Link>
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Link
              href={"/applications/ai-chat/new-chat"}
              className="border-grey-50 group flex flex-col rounded-lg border p-7"
            >
              <Typography variant="subtitle2" className="group-hover:text-primary mb-2 transition-colors">
                Image Color Breakdown
              </Typography>
              <Typography
                variant="body1"
                className="text-text-secondary group-hover:text-text-primary line-clamp-2 transition-colors"
              >
                Here's an image I'm using for a landing page. Can you break down its color psychology and suggest tweaks
                to better mat...
              </Typography>
            </Link>
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Link
              href={"/applications/ai-chat/new-chat"}
              className="border-grey-50 group flex flex-col rounded-lg border p-7"
            >
              <Typography variant="subtitle2" className="group-hover:text-primary mb-2 transition-colors">
                Seasonal Trend Insights
              </Typography>
              <Typography
                variant="body1"
                className="text-text-secondary group-hover:text-text-primary line-clamp-2 transition-colors"
              >
                I want to stay ahead of the curve. What are the trending color palettes this season in fashion and
                digital design?
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
