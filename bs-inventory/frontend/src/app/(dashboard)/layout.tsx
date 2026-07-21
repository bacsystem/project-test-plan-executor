"use client";
import "@/style/global.css";

import { Suspense, useEffect, useState } from "react";

import Loading from "@/app/loading";
import ContentWrapper from "@/components/layout/containers/content-wrapper";
import Footer from "@/components/layout/containers/footer";
import Header from "@/components/layout/containers/header";
import Main from "@/components/layout/containers/main";
import LeftMenu from "@/components/layout/menu/left-menu";
import MenuBackdrop from "@/components/layout/menu/menu-backdrop";
import RightMenu from "@/components/layout/menu/right-menu";
import { DEFAULTS } from "@/config";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <Header />
      <Main>
        <LeftMenu />
        <ContentWrapper>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ContentWrapper>
        {!DEFAULTS.rightMenuAlwaysHidden && <RightMenu />}
      </Main>
      <Footer />
      <MenuBackdrop />
    </>
  );
}
