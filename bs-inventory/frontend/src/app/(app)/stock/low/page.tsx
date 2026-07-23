"use client";

import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { getLowStock, type LowStockLevel } from "@/lib/apiClient";

export default function LowStockPage() {
  const [levels, setLevels] = useState<LowStockLevel[] | null>(null);

  useEffect(() => {
    getLowStock().then(setLevels);
  }, []);

  return (
    <Box sx={{ maxWidth: 640, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Low stock report
      </Typography>
      {levels && levels.length === 0 && (
        <Typography color="text.secondary">No products are currently low on stock.</Typography>
      )}
      {levels && levels.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SKU</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {levels.map((l) => (
              <TableRow key={l.productSku}>
                <TableCell>{l.productSku}</TableCell>
                <TableCell>{l.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}
