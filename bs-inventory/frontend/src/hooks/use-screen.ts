import config from "../../tailwind.config";
import { create } from "tw-screens";

import type { Screens } from "@/types";

export const { useScreen, useScreenReverse, useScreenValue, useScreenEffect } = create(
  (config.theme?.extend?.screens as Screens) || undefined,
);
