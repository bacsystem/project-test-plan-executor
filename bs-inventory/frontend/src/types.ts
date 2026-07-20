import { ButtonProps } from "@mui/material";

import { IconName } from "@/icons/nexture-icons";

export type Screens = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
};

export enum Viewer {
  VIEWER = "VIEWER",
  MODERATOR = "MODERATOR",
  ADMIN = "ADMIN",
}

export type MenuItem = {
  id: string;
  label: string;
  description?: string;
  listIcon?: IconName;
  icon?: IconName;
  href?: string;
  color?: ButtonProps["color"];
  children?: MenuItem[];
  canAccess?: Viewer[];
  isExternalLink?: boolean;
  content?: React.ReactNode;
  hideInMenu?: boolean;
};

export enum ContentType {
  Boxed = "boxed",
  Fluid = "fluid",
}

export enum BackgroundShape {
  Waves = "waves",
  Spheres = "spheres",
  None = "none",
}

export enum MenuType {
  Minimal = "minimal",
  Comfort = "comfort",
  SingleLayer = "single-layer",
}

export enum MenuShowState {
  Show = "SHOW",
  Hide = "HIDE",
  TemporaryShow = "TEMPORARY_SHOW",
}

export type MenuWidth = { primary: number; secondary: number };
export type MenuDefaultWidth = {
  [MenuType.Minimal]: MenuWidth;
  [MenuType.Comfort]: MenuWidth;
  [MenuType.SingleLayer]: MenuWidth;
};
