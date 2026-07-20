import { colorWithOpacity } from "./chart-helper";
import { ComponentType } from "react";

import { BarElementProps, PieArcProps, ScatterMarkerProps } from "@mui/x-charts";

type ChartElementType = BarElementProps | PieArcProps | ScatterMarkerProps;

export const withChartElementStyle = <T extends ChartElementType>(
  Component: ComponentType<T>,
  additionalProps: Partial<T> = {},
) =>
  function ChartElement(props: T) {
    const { color, ...other } = props;
    const fillColor = colorWithOpacity(color);

    const componentProps = {
      ...other,
      ...additionalProps,
      style: {
        ...("style" in props ? props.style : {}),
        stroke: color,
        strokeWidth: 2,
        transform: Component.name === "BarElement" && "translateY(-1px)",
        fill: fillColor,
      },
      color,
    } as T;

    return <Component {...componentProps} />;
  };
