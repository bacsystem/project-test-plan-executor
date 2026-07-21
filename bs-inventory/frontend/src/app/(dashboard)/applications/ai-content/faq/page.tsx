"use client";

import Link from "next/link";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiCoin from "@/icons/nexture/ni-coin";
import NiInbox from "@/icons/nexture/ni-inbox";
import NiPaintRoller from "@/icons/nexture/ni-paint-roller";
import NiPenSquare from "@/icons/nexture/ni-pen-square";
import NiRocket from "@/icons/nexture/ni-rocket";

const FaqDetail = () => {
  return (
    <Box>
      <Typography variant="body1" component="p">
        This app is designed to help anyone—from casual users to creative professionals—generate stunning, customized
        images using artificial intelligence. Whether you're visualizing a concept, prototyping a design, or simply
        exploring your imagination, the app transforms text prompts into high-quality visuals in seconds.
      </Typography>
      <br />

      <Typography variant="subtitle1" className="mb-2">
        At Its Core: Text-to-Image Creation
      </Typography>
      <Typography variant="body1" component="p">
        You type a description—anything from “a cat wearing sunglasses in a 1980s disco” to “a minimalist poster of
        Mount Fuji at dawn”—and the AI interprets your words to create a unique image. It’s like having a visual artist
        who instantly understands your vision and brings it to life.
      </Typography>
      <br />

      <Typography variant="subtitle1" className="mb-2">
        Who Is It For?
      </Typography>
      <Typography variant="body1" component="ul" className="list-inside list-disc">
        <Typography variant="body1" component="li">
          <Typography variant="body1" component="span" className="text-primary">
            Designers
          </Typography>{" "}
          looking to brainstorm layouts, mood boards, or style references.
        </Typography>
        <Typography variant="body1" component="li">
          <Typography variant="body1" component="span" className="text-primary">
            Marketers
          </Typography>{" "}
          creating quick mockups, social media visuals, or ad concepts.
        </Typography>
        <Typography variant="body1" component="li">
          <Typography variant="body1" component="span" className="text-primary">
            Writers and storytellers
          </Typography>{" "}
          visualizing characters, scenes, or cover art.
        </Typography>
        <Typography variant="body1" component="li">
          <Typography variant="body1" component="span" className="text-primary">
            Educators and students
          </Typography>{" "}
          generating illustrations for presentations or learning materials.
        </Typography>
        <Typography variant="body1" component="li">
          <Typography variant="body1" component="span" className="text-primary">
            Hobbyists and explorers
          </Typography>{" "}
          just having fun with surreal, artistic, or photorealistic creations.
        </Typography>
      </Typography>
      <br />

      <Typography variant="subtitle1" className="mb-2">
        What Can You Do With It?
      </Typography>
      <Typography variant="body1" component="ul" className="list-inside list-disc">
        <Typography variant="body1" component="li">
          Generate images from scratch using detailed prompts.
        </Typography>
        <Typography variant="body1" component="li">
          Choose from curated styles like watercolor, anime, 3D render, or photorealism.
        </Typography>
        <Typography variant="body1" component="li">
          Upload reference images to guide the AI's interpretation (in supported tiers).
        </Typography>
        <Typography variant="body1" component="li">
          Refine outputs with advanced controls for lighting, composition, and mood
        </Typography>
        <Typography variant="body1" component="li">
          Export and share your creations in multiple formats for web, print, or social use
        </Typography>
      </Typography>
      <br />

      <Typography variant="subtitle1" className="mb-2">
        Why Use AI for Image Creation?
      </Typography>
      <Typography variant="body1" component="p">
        Traditional design tools require time, skill, and software. This app removes those barriers. It's fast,
        intuitive, and endlessly flexible—perfect for rapid ideation, visual storytelling, and creative experimentation.
      </Typography>
      <br />
      <Typography variant="body1" component="p">
        Whether you're building a brand, crafting a portfolio, or just playing with ideas, this app gives you a powerful
        visual engine at your fingertips.
      </Typography>
    </Box>
  );
};

export default function Page() {
  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ md: "grow", xs: 12 }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Faq
          </Typography>
          <Breadcrumbs>
            <Link color="inherit" href="/dashboards/default">
              Home
            </Link>
            <Link color="inherit" href="/applications">
              Applications
            </Link>
            <Link color="inherit" href="/applications/ai-content">
              AI Content
            </Link>
            <Typography variant="body2">Faq</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid size={12}>
        <Box className="flex flex-row gap-2">
          <NiRocket className="text-primary mt-0.5" variant="contained" />
          <Typography variant="h6" component="h6" className="text-primary mb-3">
            Getting Started
          </Typography>
        </Box>
        <Box className="flex flex-col gap-2.5">
          <Box className="bg-background-paper outline-grey-50 rounded-3xl outline">
            <Accordion className="bg-transparent" defaultExpanded>
              <AccordionSummary className="group">
                <Card className="w-full shadow-none outline-none">
                  <CardContent className="flex flex-row justify-between">
                    <Typography variant="h6" component="h6" className="group-hover:text-primary mb-0 transition-colors">
                      What is this app for?
                    </Typography>
                    <NiChevronRightSmall
                      size={20}
                      className="accordion-rotate group-hover:text-primary transition-all"
                    />
                  </CardContent>
                </Card>
              </AccordionSummary>
              <AccordionDetails className="bg-transparent px-7 py-6 pt-0">
                <FaqDetail />
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box className="bg-background-paper outline-grey-50 rounded-3xl outline">
            <Accordion className="bg-transparent">
              <AccordionSummary className="group">
                <Card className="w-full shadow-none outline-none">
                  <CardContent className="flex flex-row justify-between">
                    <Typography variant="h6" component="h6" className="group-hover:text-primary mb-0 transition-colors">
                      Do I need an account to use it?
                    </Typography>
                    <NiChevronRightSmall
                      size={20}
                      className="accordion-rotate group-hover:text-primary transition-all"
                    />
                  </CardContent>
                </Card>
              </AccordionSummary>
              <AccordionDetails className="bg-transparent px-7 py-6 pt-0">
                <FaqDetail />
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box className="bg-background-paper outline-grey-50 rounded-3xl outline">
            <Accordion className="bg-transparent">
              <AccordionSummary className="group">
                <Card className="w-full shadow-none outline-none">
                  <CardContent className="flex flex-row justify-between">
                    <Typography variant="h6" component="h6" className="group-hover:text-primary mb-0 transition-colors">
                      Is there a free version?
                    </Typography>
                    <NiChevronRightSmall
                      size={20}
                      className="accordion-rotate group-hover:text-primary transition-all"
                    />
                  </CardContent>
                </Card>
              </AccordionSummary>
              <AccordionDetails className="bg-transparent px-7 py-6 pt-0">
                <FaqDetail />
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box className="bg-background-paper outline-grey-50 rounded-3xl outline">
            <Accordion className="bg-transparent">
              <AccordionSummary className="group">
                <Card className="w-full shadow-none outline-none">
                  <CardContent className="flex flex-row justify-between">
                    <Typography variant="h6" component="h6" className="group-hover:text-primary mb-0 transition-colors">
                      Is my data used for training?
                    </Typography>
                    <NiChevronRightSmall
                      size={20}
                      className="accordion-rotate group-hover:text-primary transition-all"
                    />
                  </CardContent>
                </Card>
              </AccordionSummary>
              <AccordionDetails className="bg-transparent px-7 py-6 pt-0">
                <FaqDetail />
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box className="bg-background-paper outline-grey-50 rounded-3xl outline">
            <Accordion className="bg-transparent">
              <AccordionSummary className="group">
                <Card className="w-full shadow-none outline-none">
                  <CardContent className="flex flex-row justify-between">
                    <Typography variant="h6" component="h6" className="group-hover:text-primary mb-0 transition-colors">
                      Can I generate images of real people?
                    </Typography>
                    <NiChevronRightSmall
                      size={20}
                      className="accordion-rotate group-hover:text-primary transition-all"
                    />
                  </CardContent>
                </Card>
              </AccordionSummary>
              <AccordionDetails className="bg-transparent px-7 py-6 pt-0">
                <FaqDetail />
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Grid>

      <Grid size={12}>
        <Box className="mt-2 flex flex-row gap-2">
          <NiPenSquare className="text-secondary mt-0.5" variant="contained" />
          <Typography variant="h6" component="h6" className="text-secondary mb-3">
            Prompt Writing & Input
          </Typography>
        </Box>
        <Box className="flex flex-col gap-2.5">
          <Box className="bg-background-paper outline-grey-50 rounded-3xl outline">
            <Accordion className="bg-transparent">
              <AccordionSummary className="group">
                <Card className="w-full shadow-none outline-none">
                  <CardContent className="flex flex-row justify-between">
                    <Typography
                      variant="h6"
                      component="h6"
                      className="group-hover:text-secondary mb-0 transition-colors"
                    >
                      How do I write a good prompt?
                    </Typography>
                    <NiChevronRightSmall
                      size={20}
                      className="accordion-rotate group-hover:text-secondary transition-all"
                    />
                  </CardContent>
                </Card>
              </AccordionSummary>
              <AccordionDetails className="bg-transparent px-7 py-6 pt-0">
                <FaqDetail />
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box className="bg-background-paper outline-grey-50 rounded-3xl outline">
            <Accordion className="bg-transparent">
              <AccordionSummary className="group">
                <Card className="w-full shadow-none outline-none">
                  <CardContent className="flex flex-row justify-between">
                    <Typography
                      variant="h6"
                      component="h6"
                      className="group-hover:text-secondary mb-0 transition-colors"
                    >
                      Can I use prompts in different languages?
                    </Typography>
                    <NiChevronRightSmall
                      size={20}
                      className="accordion-rotate group-hover:text-secondary transition-all"
                    />
                  </CardContent>
                </Card>
              </AccordionSummary>
              <AccordionDetails className="bg-transparent px-7 py-6 pt-0">
                <FaqDetail />
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box className="bg-background-paper outline-grey-50 rounded-3xl outline">
            <Accordion className="bg-transparent">
              <AccordionSummary className="group">
                <Card className="w-full shadow-none outline-none">
                  <CardContent className="flex flex-row justify-between">
                    <Typography
                      variant="h6"
                      component="h6"
                      className="group-hover:text-secondary mb-0 transition-colors"
                    >
                      Are there prompt templates?
                    </Typography>
                    <NiChevronRightSmall
                      size={20}
                      className="accordion-rotate group-hover:text-secondary transition-all"
                    />
                  </CardContent>
                </Card>
              </AccordionSummary>
              <AccordionDetails className="bg-transparent px-7 py-6 pt-0">
                <FaqDetail />
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Grid>

      <Grid size={12}>
        <Box className="mt-2 flex flex-row gap-2">
          <NiPaintRoller className="text-accent-1 mt-0.5" variant="contained" />
          <Typography variant="h6" component="h6" className="text-accent-1 mb-3">
            Styles & Customization
          </Typography>
        </Box>
        <Box className="flex flex-col gap-2.5">
          <Box className="bg-background-paper outline-grey-50 rounded-3xl outline">
            <Accordion className="bg-transparent">
              <AccordionSummary className="group">
                <Card className="w-full shadow-none outline-none">
                  <CardContent className="flex flex-row justify-between">
                    <Typography
                      variant="h6"
                      component="h6"
                      className="group-hover:text-accent-1 mb-0 transition-colors"
                    >
                      What styles are supported?
                    </Typography>
                    <NiChevronRightSmall
                      size={20}
                      className="accordion-rotate group-hover:text-accent-1 transition-all"
                    />
                  </CardContent>
                </Card>
              </AccordionSummary>
              <AccordionDetails className="bg-transparent px-7 py-6 pt-0">
                <FaqDetail />
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box className="bg-background-paper outline-grey-50 rounded-3xl outline">
            <Accordion className="bg-transparent">
              <AccordionSummary className="group">
                <Card className="w-full shadow-none outline-none">
                  <CardContent className="flex flex-row justify-between">
                    <Typography
                      variant="h6"
                      component="h6"
                      className="group-hover:text-accent-1 mb-0 transition-colors"
                    >
                      Can I upload reference images?
                    </Typography>
                    <NiChevronRightSmall
                      size={20}
                      className="accordion-rotate group-hover:text-accent-1 transition-all"
                    />
                  </CardContent>
                </Card>
              </AccordionSummary>
              <AccordionDetails className="bg-transparent px-7 py-6 pt-0">
                <FaqDetail />
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box className="bg-background-paper outline-grey-50 rounded-3xl outline">
            <Accordion className="bg-transparent">
              <AccordionSummary className="group">
                <Card className="w-full shadow-none outline-none">
                  <CardContent className="flex flex-row justify-between">
                    <Typography
                      variant="h6"
                      component="h6"
                      className="group-hover:text-accent-1 mb-0 transition-colors"
                    >
                      Can I adjust lighting, color, or composition?
                    </Typography>
                    <NiChevronRightSmall
                      size={20}
                      className="accordion-rotate group-hover:text-accent-1 transition-all"
                    />
                  </CardContent>
                </Card>
              </AccordionSummary>
              <AccordionDetails className="bg-transparent px-7 py-6 pt-0">
                <FaqDetail />
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Grid>

      <Grid size={12}>
        <Box className="mt-2 flex flex-row gap-2">
          <NiInbox className="text-accent-2 mt-0.5" variant="contained" />
          <Typography variant="h6" component="h6" className="text-accent-2 mb-3">
            Output & Export
          </Typography>
        </Box>
        <Box className="flex flex-col gap-2.5">
          <Box className="bg-background-paper outline-grey-50 rounded-3xl outline">
            <Accordion className="bg-transparent">
              <AccordionSummary className="group">
                <Card className="w-full shadow-none outline-none">
                  <CardContent className="flex flex-row justify-between">
                    <Typography
                      variant="h6"
                      component="h6"
                      className="group-hover:text-accent-2 mb-0 transition-colors"
                    >
                      What formats can I export to?
                    </Typography>
                    <NiChevronRightSmall
                      size={20}
                      className="accordion-rotate group-hover:text-accent-2 transition-all"
                    />
                  </CardContent>
                </Card>
              </AccordionSummary>
              <AccordionDetails className="bg-transparent px-7 py-6 pt-0">
                <FaqDetail />
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box className="bg-background-paper outline-grey-50 rounded-3xl outline">
            <Accordion className="bg-transparent">
              <AccordionSummary className="group">
                <Card className="w-full shadow-none outline-none">
                  <CardContent className="flex flex-row justify-between">
                    <Typography
                      variant="h6"
                      component="h6"
                      className="group-hover:text-accent-2 mb-0 transition-colors"
                    >
                      Is commercial use allowed?
                    </Typography>
                    <NiChevronRightSmall
                      size={20}
                      className="accordion-rotate group-hover:text-accent-2 transition-all"
                    />
                  </CardContent>
                </Card>
              </AccordionSummary>
              <AccordionDetails className="bg-transparent px-7 py-6 pt-0">
                <FaqDetail />
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Grid>

      <Grid size={12}>
        <Box className="mt-2 flex flex-row gap-2">
          <NiCoin className="text-accent-3 mt-0.5" variant="contained" />
          <Typography variant="h6" component="h6" className="text-accent-3 mb-3">
            Subscription & Pricing
          </Typography>
        </Box>
        <Box className="flex flex-col gap-2.5">
          <Box className="bg-background-paper outline-grey-50 rounded-3xl outline">
            <Accordion className="bg-transparent">
              <AccordionSummary className="group">
                <Card className="w-full shadow-none outline-none">
                  <CardContent className="flex flex-row justify-between">
                    <Typography
                      variant="h6"
                      component="h6"
                      className="group-hover:text-accent-3 mb-0 transition-colors"
                    >
                      What are the subscription tiers?
                    </Typography>
                    <NiChevronRightSmall
                      size={20}
                      className="accordion-rotate group-hover:text-accent-3 transition-all"
                    />
                  </CardContent>
                </Card>
              </AccordionSummary>
              <AccordionDetails className="bg-transparent px-7 py-6 pt-0">
                <FaqDetail />
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box className="bg-background-paper outline-grey-50 rounded-3xl outline">
            <Accordion className="bg-transparent">
              <AccordionSummary className="group">
                <Card className="w-full shadow-none outline-none">
                  <CardContent className="flex flex-row justify-between">
                    <Typography
                      variant="h6"
                      component="h6"
                      className="group-hover:text-accent-3 mb-0 transition-colors"
                    >
                      Can I cancel anytime?
                    </Typography>
                    <NiChevronRightSmall
                      size={20}
                      className="accordion-rotate group-hover:text-accent-3 transition-all"
                    />
                  </CardContent>
                </Card>
              </AccordionSummary>
              <AccordionDetails className="bg-transparent px-7 py-6 pt-0">
                <FaqDetail />
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box className="bg-background-paper outline-grey-50 rounded-3xl outline">
            <Accordion className="bg-transparent">
              <AccordionSummary className="group">
                <Card className="w-full shadow-none outline-none">
                  <CardContent className="flex flex-row justify-between">
                    <Typography
                      variant="h6"
                      component="h6"
                      className="group-hover:text-accent-3 mb-0 transition-colors"
                    >
                      Are there discounts for teams or educators?
                    </Typography>
                    <NiChevronRightSmall
                      size={20}
                      className="accordion-rotate group-hover:text-accent-3 transition-all"
                    />
                  </CardContent>
                </Card>
              </AccordionSummary>
              <AccordionDetails className="bg-transparent px-7 py-6 pt-0">
                <FaqDetail />
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
