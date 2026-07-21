import { useState } from "react";

import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  Switch,
  Typography,
} from "@mui/material";

interface InventoryData {
  sku: string;
  barcode: string;
  quantity: string;
  "out-of-stock-purchase": boolean;
  "notify-low-stock": boolean;
  "display-quantity": boolean;
}

export default function ProductDetailInventory() {
  const [inventory, setInventory] = useState<InventoryData>({
    sku: "TOY-WOOD-ANIM-005",
    barcode: "9781234567890",
    quantity: "342",
    "out-of-stock-purchase": true,
    "notify-low-stock": false,
    "display-quantity": false,
  });

  const handleSkuChange = (event: any) => {
    setInventory({ ...inventory, sku: event.target.value });
  };

  const handleBarcodeChange = (event: any) => {
    setInventory({ ...inventory, barcode: event.target.value });
  };

  const handleQuantityChange = (event: any) => {
    setInventory({ ...inventory, quantity: event.target.value });
  };

  const handleSettingsChange = (event: any) => {
    setInventory({ ...inventory, [event.target.name]: event.target.checked });
  };

  return (
    <Card className="mb-5">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Inventory
        </Typography>

        <FormControl className="outlined" variant="standard" size="small" fullWidth>
          <FormLabel component="label">SKU</FormLabel>
          <Input placeholder="SKU" value={inventory.sku} onChange={handleSkuChange} />
        </FormControl>

        <FormControl className="outlined" variant="standard" size="small" fullWidth>
          <FormLabel component="label">Barcode</FormLabel>
          <Input placeholder="Barcode" value={inventory.barcode} onChange={handleBarcodeChange} />
        </FormControl>

        <FormControl className="outlined" variant="standard" size="small" fullWidth>
          <FormLabel component="label">Quantity</FormLabel>
          <Input placeholder="Quantity" value={inventory.quantity} onChange={handleQuantityChange} />
        </FormControl>

        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend">Assign responsibility</FormLabel>
          <FormGroup className="flex flex-col gap-2">
            <FormControlLabel
              control={
                <Switch
                  checked={inventory["out-of-stock-purchase"]}
                  onChange={handleSettingsChange}
                  name={"out-of-stock-purchase"}
                  size="small"
                />
              }
              label="Allow out of stock purchase"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={inventory["notify-low-stock"]}
                  onChange={handleSettingsChange}
                  name={"notify-low-stock"}
                  size="small"
                />
              }
              label="Notify low stock"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={inventory["display-quantity"]}
                  onChange={handleSettingsChange}
                  name={"display-quantity"}
                  size="small"
                />
              }
              label="Display quantity at storefront"
            />
          </FormGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}
