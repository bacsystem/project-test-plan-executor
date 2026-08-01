import "@/style/global.css";

import { Metadata } from "next";
import { Mulish, Urbanist } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Suspense } from "react";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import Loading from "@/app/loading";
import BackgroundWrapper from "@/components/layout/containers/background-wrapper";
import LayoutWrapper from "@/components/layout/containers/layout-wrapper";
import SnackbarWrapper from "@/components/layout/containers/snackbar-wrapper";
import LayoutContextProvider from "@/components/layout/layout-context";
import ThemeProvider from "@/theme/theme-provider";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap", // Use 'swap' to ensure text remains visible during font loading
  preload: true,
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Acorn Admin Template",
  description: "Acorn MUI-Nextjs-Tailwind Admin Template",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      style={{ "--inner-shadow-opacity": "0.6", "--foreground-opacity": "0.6" } as React.CSSProperties}
      className={`${mulish.variable} ${urbanist.variable}`}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <head>
        {/* We need to include the loader CSS directly to avoid flash of unstyled content */}
        <link rel="stylesheet" href="/initial-loader.css" />

        {/* Load the loader script directly for fastest execution */}
        <Script id="loader-script" src="/initial-loader.js" strategy="beforeInteractive" />
      </head>
      <body className="antialiased">
        {/* Initial loader */}
        <div id="initial-loader">
          <div className="spinner"></div>
        </div>
        {/* Initial loader end */}
        <AppRouterCacheProvider
          options={{
            key: "css",
            prepend: false,
            enableCssLayer: true,
          }}
        >
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider>
              <LayoutContextProvider>
                <LayoutWrapper>
                  <BackgroundWrapper />
                  <SnackbarWrapper>
                    <Suspense fallback={<Loading />}>{children}</Suspense>
                  </SnackbarWrapper>
                </LayoutWrapper>
              </LayoutContextProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
