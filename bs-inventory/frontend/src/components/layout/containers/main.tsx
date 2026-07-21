"use client";
import { PropsWithChildren, useMemo } from "react";

import { useLayoutContext } from "@/components/layout/layout-context";
import { DEFAULTS } from "@/config";
import { MenuShowState } from "@/types";

export default function Main({ children }: PropsWithChildren) {
  const {
    leftPrimaryCurrent,
    leftSecondaryCurrent,
    leftMenuWidth,
    rightMenuWidth,
    rightSecondaryCurrent,
    rightPrimaryCurrent,
  } = useLayoutContext();

  const showingLeft = leftPrimaryCurrent !== MenuShowState.Hide || leftSecondaryCurrent !== MenuShowState.Hide;
  const showingRight = rightPrimaryCurrent !== MenuShowState.Hide || rightSecondaryCurrent !== MenuShowState.Hide;

  const [mainExtraWidth, marginLeft] = useMemo(() => {
    let extraWidth = 0;
    let marginLeft = 0;

    if (leftPrimaryCurrent === MenuShowState.TemporaryShow) {
      extraWidth += leftMenuWidth.primary;
    }
    if (leftSecondaryCurrent === MenuShowState.TemporaryShow) {
      extraWidth += leftMenuWidth.secondary;
    }

    if (rightPrimaryCurrent === MenuShowState.TemporaryShow) {
      extraWidth += rightMenuWidth.primary;
      marginLeft += rightMenuWidth.primary;
    }
    if (rightSecondaryCurrent === MenuShowState.TemporaryShow) {
      extraWidth += rightMenuWidth.secondary;
      marginLeft += rightMenuWidth.secondary;
    }

    return [extraWidth, marginLeft];
  }, [
    leftPrimaryCurrent,
    leftSecondaryCurrent,
    leftMenuWidth,
    rightMenuWidth,
    rightPrimaryCurrent,
    rightSecondaryCurrent,
  ]);

  const styles = useMemo(
    () => ({
      width: mainExtraWidth === 0 ? "100%" : `calc(100% + ${mainExtraWidth}px + (var(--main-padding)*2))`,
      paddingInlineStart: showingLeft ? "0px" : "var(--main-padding)",
      paddingInlineEnd: DEFAULTS.rightMenuAlwaysHidden
        ? "var(--main-padding)"
        : showingRight
          ? "0px"
          : "var(--main-padding)",
      marginInlineStart:
        showingRight && marginLeft > 0 ? `calc((${marginLeft}px + (var(--main-padding)*2))*-1)` : "0px",
    }),
    [mainExtraWidth, showingLeft, showingRight, marginLeft],
  );

  return (
    <main className="flex h-full min-h-0 w-full flex-row duration-(--layout-duration)" style={styles}>
      {children}
    </main>
  );
}
