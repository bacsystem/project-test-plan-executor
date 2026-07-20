import { ChartsTooltipProps, useAxesTooltip, useItemTooltip } from "@mui/x-charts-pro";

import { tooltipHooksToDataset } from "@/lib/chart-helper";

export default function useChartTooltipDataPro(trigger: ChartsTooltipProps["trigger"] = "axis") {
  const axesTooltip = useAxesTooltip();
  const itemTooltip = useItemTooltip();

  return tooltipHooksToDataset({ axesTooltip, itemTooltip, trigger });
}
