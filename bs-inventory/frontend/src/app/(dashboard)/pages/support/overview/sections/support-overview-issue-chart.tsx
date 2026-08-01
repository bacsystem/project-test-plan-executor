import { Card, CardContent, Typography, useMediaQuery, useTheme } from "@mui/material";
import { BarChart, BarElement, ChartsText, ChartsTextProps } from "@mui/x-charts";

import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";
import NiDashboard from "@/icons/nexture/ni-dashboard";
import NiDevops from "@/icons/nexture/ni-devops";
import NiScreen from "@/icons/nexture/ni-screen";
import NiServer from "@/icons/nexture/ni-server";
import NiShield from "@/icons/nexture/ni-shield";
import NiShuffle from "@/icons/nexture/ni-shuffle";
import { withChartElementStyle } from "@/lib/chart-element-hoc";

const category = ["Performance", "Security", "Interface", "Functional", "Compatibility ", "Database "] as const;

export default function SupportOverviewIssueChart() {
  const { palette } = useTheme();

  return (
    <Card className="h-96">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Issues by Category
        </Typography>

        <BarChart
          series={[
            { data: [20, 25, 20, 15, 10, 35], label: "Low Priority", stack: "all", color: palette.success.main },
            { data: [20, 20, 15, 15, 15, 15], label: "Medium Priority", stack: "all", color: palette.warning.main },
            { data: [20, 20, 15, 15, 20, 20], label: "High Priority", stack: "all", color: palette.error.main },
          ]}
          xAxis={[{ disableLine: true, disableTicks: true, data: category, scaleType: "band", categoryGapRatio: 0.7 }]}
          yAxis={[{ max: 110, disableLine: true, disableTicks: true, width: 30 }]}
          slots={{
            tooltip: CustomChartTooltip,
            bar: withChartElementStyle(BarElement, { rx: 10, ry: 10 }),
            axisTickLabel: AxisTickLabelWithIcon,
          }}
          height={300}
          hideLegend
          grid={{ horizontal: true }}
          axisHighlight={{ x: "line" }}
          margin={{ left: 0, right: 0, bottom: 10, top: 0 }}
        />
      </CardContent>
    </Card>
  );
}

const getCategoryIcon = (item: string) => {
  switch (item.trim()) {
    case "Performance":
      return <NiDashboard size="tiny" className="text-primary" />;
    case "Security":
      return <NiShield size="tiny" className="text-secondary" />;
    case "Interface":
      return <NiScreen size="tiny" className="text-accent-1" />;
    case "Functional":
      return <NiShuffle size="tiny" className="text-accent-2" />;
    case "Compatibility":
      return <NiDevops size="tiny" className="text-accent-3" />;
    case "Database":
      return <NiServer size="tiny" className="text-accent-4" />;
    default:
      return <></>;
  }
};

const AxisTickLabelWithIcon = (props: ChartsTextProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile || !category.some((i) => i === props.text)) return <ChartsText {...props} />;

  const { className, text, x, y } = props;

  const charWidth = 6;
  const iconX = 20;
  const textWidth = text.length * charWidth;
  const totalWidth = iconX + textWidth;

  return (
    <g transform={`translate(${Number(x) - totalWidth / 2},${y})`}>
      {getCategoryIcon(text)}
      <text className={className} x={iconX} y={10} textAnchor="start" dominantBaseline="middle">
        {text}
      </text>
    </g>
  );
};
