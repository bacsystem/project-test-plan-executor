import { Suspense } from "react";

import Loading from "@/app/loading";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
