"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import { createProduct, listProducts, type Product } from "@/lib/apiClient";

const columns: GridColDef<Product>[] = [
  {
    field: "sku",
    headerName: "SKU",
    flex: 1,
    renderCell: (params) => <Link href={`/products/${params.value}`}>{params.value}</Link>,
  },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "category", headerName: "Category", flex: 1 },
  { field: "unitOfMeasureCode", headerName: "Unit", width: 100 },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");

  async function refresh() {
    setProducts(await listProducts());
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    await createProduct({ sku, name, category, unitOfMeasureCode: unit });
    setSku("");
    setName("");
    setCategory("");
    setUnit("");
    setOpen(false);
    await refresh();
  }

  return (
    <Box sx={{ maxWidth: 960, mx: "auto", mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5">Products</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          New product
        </Button>
      </Box>

      <Box sx={{ height: 480 }}>
        <DataGrid<Product> rows={products} getRowId={(row) => row.sku} columns={columns} />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box component="form" onSubmit={handleCreate}>
          <DialogTitle>New product</DialogTitle>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <TextField label="SKU" value={sku} onChange={(e) => setSku(e.target.value)} required />
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <TextField label="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <TextField label="Unit of measure code" value={unit} onChange={(e) => setUnit(e.target.value)} required />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Create
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
