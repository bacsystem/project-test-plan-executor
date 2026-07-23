"use client";

import { useState, type FormEvent } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { createMovement } from "@/lib/apiClient";

export default function NewMovementPage() {
  const [productSku, setProductSku] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitCost, setUnitCost] = useState("");
  const [type, setType] = useState<"IN" | "OUT">("IN");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await createMovement({
        productSku,
        warehouseId,
        sectionId,
        quantity: Number(quantity),
        unitCost: unitCost ? Number(unitCost) : undefined,
        type,
      });
      setSuccess(true);
      setProductSku("");
      setWarehouseId("");
      setSectionId("");
      setQuantity("");
      setUnitCost("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "failed to create movement");
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 480, mx: "auto", mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h5">New stock movement</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Movement recorded.</Alert>}
      <TextField label="Product SKU" value={productSku} onChange={(e) => setProductSku(e.target.value)} required />
      <TextField
        label="Warehouse ID"
        value={warehouseId}
        onChange={(e) => setWarehouseId(e.target.value)}
        required
      />
      <TextField label="Section ID" value={sectionId} onChange={(e) => setSectionId(e.target.value)} required />
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <TextField
        label="Unit cost"
        type="number"
        value={unitCost}
        onChange={(e) => setUnitCost(e.target.value)}
        helperText="Required for IN movements"
      />
      <TextField select label="Type" value={type} onChange={(e) => setType(e.target.value as "IN" | "OUT")}>
        <MenuItem value="IN">IN</MenuItem>
        <MenuItem value="OUT">OUT</MenuItem>
      </TextField>
      <Button type="submit" variant="contained">
        Record movement
      </Button>
    </Box>
  );
}
