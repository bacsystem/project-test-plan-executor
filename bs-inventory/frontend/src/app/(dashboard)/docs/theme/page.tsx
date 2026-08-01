"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DocsTheme() {
  const router = useRouter();

  useEffect(() => {
    router.push("/docs/theme/settings");
  }, [router]);
  return <></>;
}
