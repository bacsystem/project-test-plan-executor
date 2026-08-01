"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/applications/ai-content/home");
  }, [router]);
  return <div></div>;
}
