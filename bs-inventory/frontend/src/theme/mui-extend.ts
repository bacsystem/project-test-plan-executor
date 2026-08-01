import { PaletteColor, PaletteColorOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface Color {
    25: string;
  }

  interface Palette {
    "accent-1": PaletteColor;
    "accent-2": PaletteColor;
    "accent-3": PaletteColor;
    "accent-4": PaletteColor;
    "accent-5": PaletteColor;
    "accent-6": PaletteColor;
    "text-primary": PaletteColor;
    "text-secondary": PaletteColor;
    "text-disabled": PaletteColor;
    "text-muted": PaletteColor;
  }

  interface PaletteOptions {
    "accent-1": PaletteColorOptions;
    "accent-2": PaletteColorOptions;
    "accent-3": PaletteColorOptions;
    "accent-4": PaletteColorOptions;
    "accent-5": PaletteColorOptions;
    "accent-6": PaletteColorOptions;
    "text-primary": PaletteColorOptions;
    "text-secondary": PaletteColorOptions;
    "text-disabled": PaletteColorOptions;
    "text-muted": PaletteColorOptions;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    "accent-1": true;
    "accent-2": true;
    "accent-3": true;
    "accent-4": true;
    "accent-5": true;
    "accent-6": true;
    "text-primary": true;
    "text-secondary": true;
    "text-disabled": true;
    grey: true;
  }

  interface ChipClasses {
    colorPrimary: string;
    colorSecondary: string;
    "colorAccent-1": string;
    "colorAccent-2": string;
    "colorAccent-3": string;
    "colorAccent-4": string;
    "colorAccent-5": string;
    "colorAccent-6": string;
    "colorText-primary": string;
    "colorText-secondary": string;
    "colorText-disabled": string;
    colorSuccess: string;
    colorError: string;
    colorWarning: string;
    colorInfo: string;
    colorGrey: string;
    outlinedPrimary: string;
    outlinedSecondary: string;
    "outlinedGrey-500": string;
    "outlinedAccent-1": string;
    "outlinedAccent-2": string;
    "outlinedAccent-3": string;
    "outlinedAccent-4": string;
    "outlinedAccent-5": string;
    "outlinedAccent-6": string;
    "outlinedText-primary": string;
    "outlinedText-secondary": string;
    "outlinedText-disabled": string;
    outlinedSuccess: string;
    outlinedError: string;
    outlinedWarning: string;
    outlinedInfo: string;
    outlinedGrey: string;
  }

  interface ChipOwnProps {
    disableRipple?: boolean;
    disableElevation?: boolean;
  }
}

declare module "@mui/material/CircularProgress" {
  interface CircularProgressPropsColorOverrides {
    "accent-1": true;
    "accent-2": true;
    "accent-3": true;
    "accent-4": true;
    "accent-5": true;
    "accent-6": true;
    "text-primary": true;
    "text-secondary": true;
    "text-disabled": true;
    grey: true;
  }
}

declare module "@mui/material/LinearProgress" {
  interface LinearProgressPropsColorOverrides {
    "accent-1": true;
    "accent-2": true;
    "accent-3": true;
    "accent-4": true;
    "accent-5": true;
    "accent-6": true;
    "text-primary": true;
    "text-secondary": true;
    "text-disabled": true;
    grey: true;
  }
}

declare module "@mui/material/Badge" {
  interface BadgePropsColorOverrides {
    "accent-1": true;
    "accent-2": true;
    "accent-3": true;
    "accent-4": true;
    "accent-5": true;
    "accent-6": true;
    "text-primary": true;
    "text-secondary": true;
    "text-disabled": true;
    grey: true;
  }
}

declare module "@mui/material/ToggleButton" {
  interface ToggleButtonPropsColorOverrides {
    "accent-1": true;
    "accent-2": true;
    "accent-3": true;
    "accent-4": true;
    "accent-5": true;
    "accent-6": true;
    "text-primary": true;
    "text-secondary": true;
    "text-disabled": true;
    grey: true;
  }

  interface ToggleButtonPropsSizeOverrides {
    tiny: true;
  }
}

declare module "@mui/material/ToggleButtonGroup" {
  interface ToggleButtonGroupPropsColorOverrides {
    "accent-1": true;
    "accent-2": true;
    "accent-3": true;
    "accent-4": true;
    "accent-5": true;
    "accent-6": true;
    "text-primary": true;
    "text-secondary": true;
    "text-disabled": true;
    grey: true;
  }

  interface ToggleButtonGroupPropsSizeOverrides {
    tiny: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    "accent-1": true;
    "accent-2": true;
    "accent-3": true;
    "accent-4": true;
    "accent-5": true;
    "accent-6": true;
    "text-primary": true;
    "text-secondary": true;
    "text-disabled": true;
    grey: true;
  }

  interface ButtonPropsVariantOverrides {
    pastel: true;
    surface: true;
    paper: true;
  }

  interface ButtonPropsSizeOverrides {
    tiny: true;
  }

  interface ButtonClasses {
    sizeTiny: string;
    pastel: string;
    surface: string;
    paper: string;
    containedPrimary: string;
    containedSecondary: string;
    "containedAccent-1": string;
    "containedAccent-2": string;
    "containedAccent-3": string;
    "containedAccent-4": string;
    "containedAccent-5": string;
    "containedAccent-6": string;
    "containedText-primary": string;
    "containedText-secondary": string;
    "containedText-disabled": string;
    containedSuccess: string;
    containedError: string;
    containedWarning: string;
    containedInfo: string;
    containedGrey: string;
    outlinedPrimary: string;
    outlinedSecondary: string;
    "outlinedGrey-500": string;
    "outlinedAccent-1": string;
    "outlinedAccent-2": string;
    "outlinedAccent-3": string;
    "outlinedAccent-4": string;
    "outlinedAccent-5": string;
    "outlinedAccent-6": string;
    "outlinedText-primary": string;
    "outlinedText-secondary": string;
    "outlinedText-disabled": string;
    outlinedSuccess: string;
    outlinedError: string;
    outlinedWarning: string;
    outlinedInfo: string;
    outlinedGrey: string;
    textPrimary: string;
    textSecondary: string;
    "textAccent-1": string;
    "textAccent-2": string;
    "textAccent-3": string;
    "textAccent-4": string;
    "textAccent-5": string;
    "textAccent-6": string;
    "textText-primary": string;
    "textText-secondary": string;
    "textText-disabled": string;
    textSuccess: string;
    textError: string;
    textWarning: string;
    textInfo: string;
    textGrey: string;
    pastelPrimary: string;
    pastelSecondary: string;
    "pastelAccent-1": string;
    "pastelAccent-2": string;
    "pastelAccent-3": string;
    "pastelAccent-4": string;
    "pastelAccent-5": string;
    "pastelAccent-6": string;
    "pastelText-primary": string;
    "pastelText-secondary": string;
    "pastelText-disabled": string;
    pastelSuccess: string;
    pastelError: string;
    pastelWarning: string;
    pastelInfo: string;
    pastelGrey: string;
    surfacePrimary: string;
    surfaceSecondary: string;
    "surfaceAccent-1": string;
    "surfaceAccent-2": string;
    "surfaceAccent-3": string;
    "surfaceAccent-4": string;
    "surfaceAccent-5": string;
    "surfaceAccent-6": string;
    "surfaceText-primary": string;
    "surfaceText-secondary": string;
    "surfaceText-disabled": string;
    surfaceSuccess: string;
    surfaceError: string;
    surfaceWarning: string;
    surfaceInfo: string;
    surfaceGrey: string;
  }
}

declare module "@mui/material/ButtonGroup" {
  interface ButtonGroupPropsColorOverrides {
    "accent-1": true;
    "accent-2": true;
    "accent-3": true;
    "accent-4": true;
    "accent-5": true;
    "accent-6": true;
    "text-primary": true;
    "text-secondary": true;
    "text-disabled": true;
    grey: true;
  }

  interface ButtonGroupPropsVariantOverrides {
    pastel: true;
    surface: true;
  }

  interface ButtonGroupPropsSizeOverrides {
    tiny: true;
  }

  interface ButtonGroupClasses {
    sizeTiny: string;
    pastel: string;
    surface: string;
    containedPrimary: string;
    containedSecondary: string;
    "containedAccent-1": string;
    "containedAccent-2": string;
    "containedAccent-3": string;
    "containedAccent-4": string;
    "containedAccent-5": string;
    "containedAccent-6": string;
    "containedText-primary": string;
    "containedText-secondary": string;
    "containedText-disabled": string;
    containedSuccess: string;
    containedError: string;
    containedWarning: string;
    containedInfo: string;
    containedGrey: string;
    outlinedPrimary: string;
    outlinedSecondary: string;
    "outlinedGrey-500": string;
    "outlinedAccent-1": string;
    "outlinedAccent-2": string;
    "outlinedAccent-3": string;
    "outlinedAccent-4": string;
    "outlinedAccent-5": string;
    "outlinedAccent-6": string;
    "outlinedText-primary": string;
    "outlinedText-secondary": string;
    "outlinedText-disabled": string;
    outlinedSuccess: string;
    outlinedError: string;
    outlinedWarning: string;
    outlinedInfo: string;
    outlinedGrey: string;
    textPrimary: string;
    textSecondary: string;
    "textAccent-1": string;
    "textAccent-2": string;
    "textAccent-3": string;
    "textAccent-4": string;
    "textAccent-5": string;
    "textAccent-6": string;
    "textText-primary": string;
    "textText-secondary": string;
    "textText-disabled": string;
    textSuccess: string;
    textError: string;
    textWarning: string;
    textInfo: string;
    textGrey: string;
    pastelPrimary: string;
    pastelSecondary: string;
    "pastelAccent-1": string;
    "pastelAccent-2": string;
    "pastelAccent-3": string;
    "pastelAccent-4": string;
    "pastelAccent-5": string;
    "pastelAccent-6": string;
    "pastelText-primary": string;
    "pastelText-secondary": string;
    "pastelText-disabled": string;
    pastelSuccess: string;
    pastelError: string;
    pastelWarning: string;
    pastelInfo: string;
    pastelGrey: string;
    paperPrimary: string;
    surfacePrimary: string;
    surfaceSecondary: string;
    "surfaceAccent-1": string;
    "surfaceAccent-2": string;
    "surfaceAccent-3": string;
    "surfaceAccent-4": string;
    "surfaceAccent-5": string;
    "surfaceAccent-6": string;
    "surfaceText-primary": string;
    "surfaceText-secondary": string;
    "surfaceText-disabled": string;
    surfaceSuccess: string;
    surfaceError: string;
    surfaceWarning: string;
    surfaceInfo: string;
    surfaceGrey: string;
  }
}

declare module "@mui/material/Checkbox" {
  interface CheckboxPropsColorOverrides {
    "accent-1": true;
    "accent-2": true;
    "accent-3": true;
    "accent-4": true;
    "accent-5": true;
    "accent-6": true;
    "text-primary": true;
    "text-secondary": true;
    "text-disabled": true;
    grey: true;
  }
}

declare module "@mui/material/Switch" {
  interface SwitchPropsColorOverrides {
    "accent-1": true;
    "accent-2": true;
    "accent-3": true;
    "accent-4": true;
    "accent-5": true;
    "accent-6": true;
    "text-primary": true;
    "text-secondary": true;
    "text-disabled": true;
    grey: true;
  }
}

declare module "@mui/material/Slider" {
  interface SliderPropsColorOverrides {
    "accent-1": true;
    "accent-2": true;
    "accent-3": true;
    "accent-4": true;
    "accent-5": true;
    "accent-6": true;
    "text-primary": true;
    "text-secondary": true;
    "text-disabled": true;
    grey: true;
  }
}

declare module "@mui/material/Fab" {
  interface FabPropsSizeOverrides {
    xlarge: true;
  }

  interface FabGroupClasses {
    sizeXlarge: string;
  }

  interface FabPropsColorOverrides {
    "accent-1": true;
    "accent-2": true;
    "accent-3": true;
    "accent-4": true;
    "accent-5": true;
    "accent-6": true;
    "text-primary": true;
    "text-secondary": true;
    "text-disabled": true;
    grey: true;
  }
}

declare module "@mui/material/Radio" {
  interface RadioPropsColorOverrides {
    "accent-1": true;
    "accent-2": true;
    "accent-3": true;
    "accent-4": true;
    "accent-5": true;
    "accent-6": true;
    "text-primary": true;
    "text-secondary": true;
    "text-disabled": true;
    grey: true;
  }
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    "2xl": true;
    "3xl": true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    "accent-1": true;
    "accent-2": true;
    "accent-3": true;
    "accent-4": true;
    "accent-5": true;
    "accent-6": true;
    "text-primary": true;
    "text-secondary": true;
    "text-disabled": true;
    grey: true;
  }

  interface IconButtonPropsSizeOverrides {
    tiny: true;
  }

  interface IconButtonClasses {
    sizeTiny: string;
  }
}

declare module "@mui/x-charts" {
  interface ChartsTooltipContainerProps {
    hideTitle?: boolean;
  }
}
