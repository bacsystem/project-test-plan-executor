"use client";

import { useState, type FormEvent } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { createTransfer } from "@/lib/apiClient";

export default function NewTransferPage() {
  const [productSku, setProductSku] = useState("");
  const [fromWarehouseId, setFromWarehouseId] = useState("");
  const [fromSectionId, setFromSectionId] = useState("");
  const [toWarehouseId, setToWarehouseId] = useState("");
  const [toSectionId, setToSectionId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [guideNumber, setGuideNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await createTransfer({
        productSku,
        fromWarehouseId,
        fromSectionId,
        toWarehouseId,
        toSectionId,
        quantity: Number(quantity),
        guideNumber,
      });
      setSuccess(true);
      setProductSku("");
      setFromWarehouseId("");
      setFromSectionId("");
      setToWarehouseId("");
      setToSectionId("");
      setQuantity("");
      setGuideNumber("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "failed to create transfer");
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 480, mx: "auto", mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h5">New stock transfer</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Transfer recorded.</Alert>}
      <TextField label="Product SKU" value={productSku} onChange={(e) => setProductSku(e.target.value)} required />
      <TextField
        label="From warehouse ID"
        value={fromWarehouseId}
        onChange={(e) => setFromWarehouseId(e.target.value)}
        required
      />
      <TextField
        label="From section ID"
        value={fromSectionId}
        onChange={(e) => setFromSectionId(e.target.value)}
        required
      />
      <TextField
        label="To warehouse ID"
        value={toWarehouseId}
        onChange={(e) => setToWarehouseId(e.target.value)}
        required
      />
      <TextField
        label="To section ID"
        value={toSectionId}
        onChange={(e) => setToSectionId(e.target.value)}
        required
      />
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <TextField
        label="Guide number"
        value={guideNumber}
        onChange={(e) => setGuideNumber(e.target.value)}
        helperText="Guía de Remisión reference (optional, entered manually)"
      />
      <Button type="submit" variant="contained">
        Record transfer
      </Button>
    </Box>
  );
}
