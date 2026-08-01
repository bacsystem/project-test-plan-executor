"use client";

import { useLayoutContext } from "@/components/layout/layout-context";

export default function MenuBackdrop() {
  const { resetLeftMenu, leftShowBackdrop, resetRightMenu, rightShowBackdrop } = useLayoutContext();

  const handleOnClick = () => {
    if (leftShowBackdrop) {
      resetLeftMenu();
    }
    if (rightShowBackdrop) {
      resetRightMenu();
    }
  };

  return (
    <>
      {(leftShowBackdrop || rightShowBackdrop) && (
        <div className="absolute z-10 h-full w-full" onClick={() => handleOnClick()}></div>
      )}
    </>
  );
}
