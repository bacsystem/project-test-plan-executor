import { useTheme } from "@mui/material";
import { GaugeContainer, GaugeReferenceArc, GaugeValueArc, GaugeValueText, useGaugeState } from "@mui/x-charts";

export default function Pointer() {
  return (
    <GaugeContainer startAngle={-110} endAngle={110} value={30} width={300} height={300} cornerRadius={"50%"}>
      <GaugeReferenceArc className="fill-primary/10 stroke-primary" />
      <GaugeValueArc className="fill-primary" />
      <GaugeValueText text={({ value, valueMax }) => `${value} / ${valueMax}`} y={220} />
      <GaugePointer />
    </GaugeContainer>
  );
}

const GaugePointer = () => {
  const theme = useTheme();
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) return null;

  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill={theme.palette["accent-3"].main} />
      <path
        d={`M ${cx} ${cy} L ${cx + outerRadius * Math.sin(valueAngle)} ${cy - outerRadius * Math.cos(valueAngle)}`}
        stroke={theme.palette["accent-3"].main}
        strokeWidth={3}
      />
    </g>
  );
};
