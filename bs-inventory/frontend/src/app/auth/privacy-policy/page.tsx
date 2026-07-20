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
                  Privacy Policy
                </Typography>
                <Typography variant="body1" className="text-text-primary">
                  At Acorn, we take your privacy seriously. This Privacy Policy outlines the types of personal
                  information we collect, how we use it, and the steps we take to safeguard it.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" className="mb-2">
                  1. Information We Collect
                </Typography>
                <Typography variant="body1">We may collect and process the following types of information:</Typography>
                <ul className="list-inside list-disc [&>li]:ms-2 [&>li:first-of-type]:mt-1">
                  <li>Personal Identification Information: Name, email address, phone number, etc.</li>
                  <li>Usage Data: Pages visited, time spent, clicks, and other analytic information</li>
                  <li>Cookies and Tracking Technologies: Data from cookies, beacons, tags, and similar technologies</li>
                </ul>
                <br />

                <Typography variant="h6" className="mb-2">
                  2. How We Use Your Information
                </Typography>
                <Typography variant="body1">We use the information we collect to:</Typography>
                <ul className="list-inside list-disc [&>li]:ms-2 [&>li:first-of-type]:mt-1">
                  <li>Provide, operate, and maintain our services</li>
                  <li>Improve user experience and develop new features</li>
                  <li>Communicate with you about updates, promotions, or service-related notices</li>
                  <li>Ensure compliance with legal obligations</li>
                </ul>
                <br />

                <Typography variant="h6" className="mb-2">
                  3. Sharing Your Information
                </Typography>
                <Typography variant="body1">
                  We do not sell or rent your personal data. We may share your data with:
                </Typography>
                <ul className="list-inside list-disc [&>li]:ms-2 [&>li:first-of-type]:mt-1">
                  <li>Trusted third-party service providers assisting in operations</li>
                  <li>Legal authorities if required by law or in response to valid requests</li>
                  <li>Affiliates and subsidiaries for operational purposes</li>
                </ul>
                <br />

                <Typography variant="h6" className="mb-2">
                  4. Cookies and Tracking Technologies
                </Typography>
                <Typography variant="body1">
                  We use cookies to personalize your experience and analyze traffic. You can adjust your browser
                  settings to refuse cookies or alert you when cookies are being sent.
                </Typography>
                <br />

                <Typography variant="h6" className="mb-2">
                  5. Data Security
                </Typography>
                <Typography variant="body1">
                  We implement industry-standard security measures to protect your information from unauthorized access,
                  disclosure, or destruction. However, no method of electronic transmission or storage is 100% secure.
                </Typography>
                <br />

                <Typography variant="h6" className="mb-2">
                  6. Your Rights and Choices
                </Typography>
                <Typography variant="body1">Depending on your location, you may have rights such as:</Typography>
                <ul className="list-inside list-disc [&>li]:ms-2 [&>li:first-of-type]:mt-1">
                  <li>Accessing the personal data we hold about you</li>
                  <li>Requesting corrections or deletion</li>
                  <li>Withdrawing consent where applicable</li>
                </ul>
                <br />

                <Typography variant="h6" className="mb-2">
                  7. Children&apos;s Privacy
                </Typography>
                <Typography variant="body1">
                  Our services are not directed to individuals under the age of [Insert Age, e.g., 13 or 16]. We do not
                  knowingly collect personal data from children.
                </Typography>
                <br />

                <Typography variant="h6" className="mb-2">
                  8. Third-Party Links
                </Typography>
                <Typography variant="body1">
                  Our site may contain links to third-party websites. We are not responsible for the privacy practices
                  or content of these sites.
                </Typography>
                <br />

                <Typography variant="h6" className="mb-2">
                  9. Policy Updates
                </Typography>
                <Typography variant="body1">
                  We may update this Privacy Policy from time to time. Changes will be posted on this page, and where
                  appropriate, you may be notified by email or through the website.
                </Typography>
                <br />

                <Typography variant="h6" className="mb-2">
                  10. Contact Us
                </Typography>
                <Typography variant="body1">
                  If you have any questions about this Privacy Policy or how we handle your data, you can reach out to
                  us at: info@acorn.dev
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
