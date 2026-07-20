import { ElementType } from "react";

import { Box, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { ChartsTooltipContainerProps } from "@mui/x-charts";

import CustomChartMark from "@/components/charts/mark/custom-chart-mark";

interface ITitle {
  color?: string;
  label?: string | null;
  showMark?: boolean;
}

interface IValue extends ITitle {
  id: string;
  value?: string | null;
}

export interface IDataset {
  id: string;
  title?: ITitle;
  values?: IValue[];
}

interface CustomChartTooltipContentProps extends ChartsTooltipContainerProps {
  data: IDataset[] | null;
  ContentContainer: ElementType;
  ContentPaper: ElementType;
  hideTitle?: boolean;
}

export default function CustomChartTooltipContent({
  data,
  ContentContainer,
  ContentPaper,
  hideTitle,
  ...containerProps
}: Readonly<CustomChartTooltipContentProps>) {
  return (
    <ContentContainer {...containerProps}>
      {!!data?.length && (
        <ContentPaper className="bg-background-paper shadow-darker-sm rounded-lg border-gray-50 p-4">
          {data.map(({ id, title, values }) => (
            <Box key={id}>
              {title && !hideTitle && (
                <Box className="mb-1 flex items-center gap-2">
                  {title.showMark && <CustomChartMark color={title.color} />}
                  <Typography variant="subtitle1">{title.label}</Typography>
                </Box>
              )}
              <Table className="-mb-1.5 border-separate" style={{ borderSpacing: "0 6px" }}>
                <TableBody>
                  {values?.map(({ id: valueId, color, label, showMark, value }) => (
                    <TableRow key={valueId}>
                      {showMark && (
                        <TableCell className="p-0 pe-2">
                          <CustomChartMark color={color} />
                        </TableCell>
                      )}
                      <TableCell
                        className={`text-text-secondary p-0 pe-4 ${["string", "number"].includes(typeof label) ? "min-w-24" : ""}`}
                      >
                        {label ?? ""}
                      </TableCell>
                      <TableCell className="text-text-primary p-0">{value ?? "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          ))}
        </ContentPaper>
      )}
    </ContentContainer>
  );
}
