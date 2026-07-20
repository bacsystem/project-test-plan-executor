import { ChartsTooltipContainer, ChartsTooltipPaper, ChartsTooltipProps } from "@mui/x-charts-pro";

import CustomChartTooltipContent from "@/components/charts/tooltip/custom-chart-tooltip-content";
import useChartTooltipDataPro from "@/hooks/use-chart-tooltip-data-pro";

export default function CustomChartTooltipPro(props: Readonly<ChartsTooltipProps>) {
  const { trigger } = props;
  const tooltipData = useChartTooltipDataPro(trigger);

  return (
    <CustomChartTooltipContent
      data={tooltipData}
      ContentContainer={ChartsTooltipContainer}
      ContentPaper={ChartsTooltipPaper}
      {...props}
    />
  );
}
