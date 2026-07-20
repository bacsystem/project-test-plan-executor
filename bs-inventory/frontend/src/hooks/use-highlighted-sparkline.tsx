import { useEffect, useMemo, useState } from "react";

import { BarElement, SparkLineChartProps, useAxesTooltip } from "@mui/x-charts";

import { withChartElementStyle } from "@/lib/chart-element-hoc";

type HighlightedData = ReturnType<typeof useAxesTooltip>;

// Note: This hook is used to handle the onHighlightChange event.
// Due to a library shortcoming, the event is not triggering as expected,
// so this intermediate component is used to read events.
const useHighlightedSparkline = ({
  data,
  plotType,
  color,
}: Pick<SparkLineChartProps, "data" | "plotType" | "color">) => {
  const [highlightedItem, setHighlightedItem] = useState<HighlightedData | null>(null);

  const lineConfig: Partial<SparkLineChartProps> = useMemo(
    () => ({
      plotType: "line",
      curve: "bumpX",
      slots: { tooltip: () => <Tooltip onItemChange={setHighlightedItem} /> },
    }),
    [],
  );

  const barConfig: Partial<SparkLineChartProps> = useMemo(
    () => ({
      plotType: "bar",
      axisHighlight: { x: "line" },
      slots: {
        bar: withChartElementStyle(BarElement, { rx: 5, ry: 5 }),
        tooltip: () => <Tooltip onItemChange={setHighlightedItem} />,
      },
      xAxis: { categoryGapRatio: 0.5 },
      yAxis: { min: 0, max: Math.max(...data) + 5 },
    }),
    [data],
  );

  const item = useMemo(() => {
    const index = highlightedItem?.[0]?.dataIndex ?? data.length - 1;
    const value = data[index];
    const prevValue = index > 0 ? data[index - 1] : null;
    const change = prevValue !== null && prevValue !== 0 ? (((value - prevValue) / prevValue) * 100).toFixed(1) : 0;
    return { value, change, index };
  }, [data, highlightedItem]);

  return useMemo(
    () => ({
      props: {
        height: 50,
        showHighlight: true,
        showTooltip: true,
        data,
        color,
        ...(plotType === "line" ? lineConfig : barConfig),
      } satisfies SparkLineChartProps,
      item,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [barConfig, color, data, lineConfig, plotType, item.value, item.change],
  );
};

const Tooltip = ({ onItemChange }: { onItemChange: (i: HighlightedData) => void }) => {
  const axesTooltip = useAxesTooltip();
  useEffect(() => {
    onItemChange?.(axesTooltip);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axesTooltip?.[0]?.dataIndex]);
  return <></>;
};

export default useHighlightedSparkline;
