"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Docs() {
  const router = useRouter();

  useEffect(() => {
    router.push("/docs/welcome/introduction");
  }, [router]);
  return <></>;
}
