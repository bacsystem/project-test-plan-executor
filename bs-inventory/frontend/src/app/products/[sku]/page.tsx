"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { getProduct, getProductMovements, type Product, type StockMovement } from "@/lib/apiClient";

export default function ProductDetailPage() {
  const params = useParams<{ sku: string }>();
  const sku = params.sku;
  const [product, setProduct] = useState<Product | null>(null);
  const [movements, setMovements] = useState<StockMovement[]>([]);

  useEffect(() => {
    if (!sku) return;
    getProduct(sku).then(setProduct);
    getProductMovements(sku).then(setMovements);
  }, [sku]);

  if (!product) {
    return <Typography sx={{ mt: 4, textAlign: "center" }}>Loading...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {product.name} ({product.sku})
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        {product.category} · {product.unitOfMeasureCode}
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Movement history
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Unit cost</TableCell>
            <TableCell>Occurred at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movements.map((m) => (
            <TableRow key={m.id}>
              <TableCell>{m.type}</TableCell>
              <TableCell>{m.quantity}</TableCell>
              <TableCell>{m.unitCost}</TableCell>
              <TableCell>{new Date(m.occurredAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
