import { hslToRgb } from "@mui/material";
import { ChartsTooltipProps, UseAxesTooltipReturnValue, UseItemTooltipReturnValue } from "@mui/x-charts";
import { ChartSeriesType } from "@mui/x-charts/internals";

import { IDataset } from "@/components/charts/tooltip/custom-chart-tooltip-content";

export const colorWithOpacity = (color?: string, alpha: number = 0.1) => {
  if (!color) return color;

  // Handles hex colors in formats: #RGB, #RRGGBB, #RRGGBBAA
  if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3,8})$/.test(color)) {
    const hex = color.replace("#", "");
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6 || hex.length === 8) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
    return `rgba(${r},${g},${b},${alpha})`;
  }

  // Handles RGB colors in format: rgb(r, g, b)
  if (/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(color)) {
    const rgb = color.match(/\d+/g);
    if (rgb && rgb.length === 3) {
      const [r, g, b] = rgb.map(Number);
      return `rgba(${r},${g},${b},${alpha})`;
    }
  }

  // If hsl(var(--something))
  if (/^hsl\(var\(.+\)\)$/.test(color)) {
    return color.replace(/\)$/, ` / ${alpha})`);
  }

  // Otherwise, return as it is
  return color;
};

export const tooltipHooksToDataset = ({
  axesTooltip,
  itemTooltip,
  trigger = "axis",
}: {
  axesTooltip: UseAxesTooltipReturnValue[] | null;
  itemTooltip: UseItemTooltipReturnValue<ChartSeriesType> | null;
  trigger: ChartsTooltipProps["trigger"];
}): IDataset[] | null => {
  if (trigger === "item") {
    if (!itemTooltip) return null;

    if ("values" in itemTooltip && Array.isArray(itemTooltip.values)) {
      return [
        {
          id: crypto.randomUUID(),
          title: {
            showMark: true,
            color: itemTooltip.color,
            label: (itemTooltip.formattedValue as string) ?? (itemTooltip.label as string),
          },
          values: itemTooltip.values.map(({ label, formattedValue, value }) => ({
            id: crypto.randomUUID(),
            label,
            value: formattedValue ?? value,
          })),
        },
      ];
    }

    return [
      {
        id: crypto.randomUUID(),
        values: [
          {
            id: crypto.randomUUID(),
            showMark: true,
            color: itemTooltip.color,
            label: itemTooltip.label,
            value: itemTooltip.formattedValue as string,
          },
        ],
      },
    ];
  }

  if (!trigger || trigger === "axis") {
    if (!axesTooltip) return null;

    return axesTooltip.map(({ seriesItems, axisFormattedValue, axisValue }) => ({
      id: crypto.randomUUID(),
      title: {
        label: axisFormattedValue ?? axisValue,
      },
      values: seriesItems.map(({ color, formattedLabel, formattedValue, value }) => ({
        id: crypto.randomUUID(),
        showMark: true,
        color,
        label: formattedLabel,
        value: formattedValue ?? value,
      })),
    }));
  }

  return null;
};

const resolveCssVarColor = (cssVarColor: string) => {
  // Extract variable name from the string, e.g., "--primary"
  const match = cssVarColor.match(/var\((--[a-zA-Z0-9-_]+)\)/);
  if (!match) return cssVarColor; // fallback if not a var()
  const varName = match[1];
  // Get value from the root element
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  // Compose final hsl string (if needed)
  return cssVarColor.startsWith("hsl(") ? `hsl(${value})` : value;
};

export const cssVariableColorToRgb = (color: string) => {
  const hsl = resolveCssVarColor(color);
  // If it already contains commas, return as-is
  if (hsl.includes(",")) return hslToRgb(hsl);
  // Convert space-separated to comma-separated
  return hslToRgb(hsl.replace(/hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*\)/i, "hsl($1, $2%, $3%)"));
};
