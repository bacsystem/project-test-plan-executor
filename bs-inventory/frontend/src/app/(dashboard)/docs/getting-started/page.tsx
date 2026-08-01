"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DocsGettingStarted() {
  const router = useRouter();

  useEffect(() => {
    router.push("/docs/getting-started/installation");
  }, [router]);
  return <></>;
}
