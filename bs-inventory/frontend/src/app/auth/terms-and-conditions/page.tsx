"use client";

import { Box, Paper, Typography } from "@mui/material";

import Logo from "@/components/logo/logo";

export default function Page() {
  return (
    <Box className="flex h-dvh min-h-screen w-full items-center justify-center p-4">
      <Paper
        elevation={3}
        className="bg-foreground outline-line max-h-full w-240 max-w-full rounded-4xl py-14 outline -outline-offset-1 backdrop-blur-sm"
      >
        <Box className="flex max-h-[calc(100dvh-9rem)] flex-col gap-4 overflow-y-auto px-8 sm:px-14">
          <Box className="flex flex-col">
            <Box className="mb-14 flex justify-start">
              <Logo classNameMobile="hidden" />
            </Box>

            <Box className="flex flex-col gap-10">
              <Box className="flex flex-col">
                <Typography variant="h1" component="h1" className="mb-2">
                  Terms and Conditions
                </Typography>
                <Typography variant="body1" className="text-text-primary">
                  Welcome to Acorn! These terms and conditions outline the rules and regulations for the use of
                  Acorn.dev. By accessing this website we assume you accept these terms and conditions. Do not continue
                  to use Acorn.dev if you do not agree to all of the terms and conditions stated on this page.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" className="mb-2">
                  1. Introduction
                </Typography>
                <Typography variant="body1">
                  This document is a placeholder intended to simulate the structure and language of a standard terms and
                  conditions agreement. The full legal content is to be inserted by authorized personnel or legal
                  representatives.
                </Typography>
                <br />

                <Typography variant="h6" className="mb-2">
                  2. Intellectual Property Rights
                </Typography>
                <Typography variant="body1">
                  Other than the content you own, under these Terms, Acorn and/or its licensors own all the intellectual
                  property rights and materials contained in this Website.
                </Typography>
                <br />

                <Typography variant="h6" className="mb-2">
                  3. Restrictions
                </Typography>
                <Typography variant="body1">
                  You are specifically restricted from all of the following: — Publishing any Website material in any
                  other media — Selling, sublicensing and/or otherwise commercializing any Website material — Publicly
                  performing and/or showing any Website material — Using this Website in any way that is or may be
                  damaging to this Website — Engaging in any data mining, data harvesting, data extracting or any other
                  similar activity
                </Typography>
                <br />

                <Typography variant="h6" className="mb-2">
                  4. Your Content
                </Typography>
                <Typography variant="body1">
                  In these Website Standard Terms and Conditions, “Your Content” shall mean any audio, video text,
                  images or other material you choose to display on this Website. Your Content must be your own and must
                  not be infringing on any third partys rights. You agree to use this site responsibly. By accessing
                  this platform, you shall not:
                </Typography>
                <ul className="list-inside list-disc [&>li]:ms-2 [&>li:first-of-type]:mt-1">
                  <li>Use the service for unlawful purposes</li>
                  <li>Attempt to compromise the functionality, security, or integrity of the platform</li>
                  <li>Violate any applicable local, national, or international law or regulation</li>
                  <li>Post or transmit any unlawful, harassing, abusive, or otherwise objectionable material</li>
                </ul>
                <br />

                <Typography variant="h6" className="mb-2">
                  5. No warranties
                </Typography>
                <Typography variant="body1">
                  This Website is provided “as is,” with all faults, and Acorn expresses no representations or
                  warranties.
                </Typography>
                <br />

                <Typography variant="h6" className="mb-2">
                  6. Limitation of liability
                </Typography>
                <Typography variant="body1">
                  In no event shall Acorn, nor any of its officers, directors and employees, be held liable for anything
                  arising out of or in any way connected with your use of this Website.
                </Typography>
                <br />

                <Typography variant="h6" className="mb-2">
                  7. Indemnification
                </Typography>
                <Typography variant="body1">
                  You hereby indemnify to the fullest extent Acorn from and against any and all liabilities, costs,
                  demands, causes of action, damages and expenses.
                </Typography>
                <br />

                <Typography variant="h6" className="mb-2">
                  8. Severability
                </Typography>
                <Typography variant="body1">
                  If any provision of these Terms is found to be invalid under any applicable law, such provisions shall
                  be deleted without affecting the remaining provisions.
                </Typography>
                <br />

                <Typography variant="h6" className="mb-2">
                  9. Variation of Terms
                </Typography>
                <Typography variant="body1">
                  Acorn is permitted to revise these Terms at any time as it sees fit.
                </Typography>
                <br />

                <Typography variant="h6" className="mb-2">
                  10. Assignment
                </Typography>
                <Typography variant="body1">
                  The Company is allowed to assign, transfer, and subcontract its rights and/or obligations under these
                  Terms without any notification.
                </Typography>
                <br />

                <Typography variant="h6" className="mb-2">
                  11. Entire Agreement
                </Typography>
                <Typography variant="body1">
                  These Terms constitute the entire agreement between Acorn and you.
                </Typography>
                <br />

                <Typography variant="h6" className="mb-2">
                  12. Governing Law & Jurisdiction
                </Typography>
                <Typography variant="body1">
                  These Terms will be governed by and interpreted in accordance with the laws of Germany, and you submit
                  to the non-exclusive jurisdiction of the state and federal courts.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
