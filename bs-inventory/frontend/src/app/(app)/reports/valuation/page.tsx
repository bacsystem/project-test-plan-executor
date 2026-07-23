"use client";

import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { getValuation, type ValuationReport } from "@/lib/apiClient";

export default function ValuationReportPage() {
  const [report, setReport] = useState<ValuationReport | null>(null);

  useEffect(() => {
    getValuation().then(setReport);
  }, []);

  if (!report) {
    return <Typography sx={{ mt: 4, textAlign: "center" }}>Loading...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 480, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Inventory valuation
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Warehouse</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(report.byWarehouse).map(([warehouseId, value]) => (
            <TableRow key={warehouseId}>
              <TableCell>{warehouseId}</TableCell>
              <TableCell align="right">{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>
              <strong>Total</strong>
            </TableCell>
            <TableCell align="right">
              <strong>{report.total}</strong>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Box>
  );
}
