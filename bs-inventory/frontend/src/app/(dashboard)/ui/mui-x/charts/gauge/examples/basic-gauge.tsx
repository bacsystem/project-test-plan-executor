import { Grid } from "@mui/material";
import { Gauge } from "@mui/x-charts";

export default function BasicGauge() {
  return (
    <Grid container spacing={4}>
      <Grid size={3}>
        <Gauge
          value={60}
          width={150}
          height={150}
          cornerRadius={"50%"}
          classes={{ valueArc: "fill-primary", referenceArc: "fill-primary/10 stroke-primary" }}
        />
      </Grid>
      <Grid size={3}>
        <Gauge
          value={60}
          startAngle={-90}
          endAngle={90}
          width={150}
          height={150}
          cornerRadius={"50%"}
          classes={{ valueArc: "fill-primary", referenceArc: "fill-primary/10 stroke-primary" }}
        />
      </Grid>
      <Grid size={3}>
        <Gauge
          value={60}
          valueMax={70}
          width={150}
          height={150}
          cornerRadius={"50%"}
          classes={{ valueArc: "fill-primary", referenceArc: "fill-primary/10 stroke-primary" }}
        />
      </Grid>
      <Grid size={3}>
        <Gauge
          value={60}
          startAngle={-110}
          endAngle={110}
          valueMax={70}
          text={({ value, valueMax }) => `${value} / ${valueMax}`}
          width={150}
          height={150}
          cornerRadius={"50%"}
          classes={{ valueArc: "fill-primary", referenceArc: "fill-primary/10 stroke-primary" }}
        />
      </Grid>
    </Grid>
  );
}
