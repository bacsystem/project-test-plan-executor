import { useState } from "react";

import { Card, CardContent, FormControl, FormLabel, Input, MenuItem, Select, Typography } from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";

interface PriceData {
  basePrice: string;
  discountType: string;
  discountTypeList: string[];
  discountPercentage: string;
  discountFixedAmount: string;
  taxPercentage: string;
}

export default function ProductDetailPrice() {
  const [price, setPrice] = useState<PriceData>({
    basePrice: "120.25",
    discountType: "Percentage",
    discountTypeList: ["None", "Percentage", "Fixed Amount", "Buy One, Get One Free"],
    discountPercentage: "10",
    discountFixedAmount: "0",
    taxPercentage: "15",
  });

  const handleBasePriceChange = (event: any) => {
    setPrice({ ...price, basePrice: event.target.value });
  };

  const handleDiscountTypeChange = (event: any) => {
    setPrice({ ...price, discountType: event.target.value });
  };

  const handleDiscountPercentageChange = (event: any) => {
    setPrice({ ...price, discountPercentage: event.target.value });
  };

  const handleDiscountFixedAmountChange = (event: any) => {
    setPrice({ ...price, discountFixedAmount: event.target.value });
  };

  const handleTaxPercentageChange = (event: any) => {
    setPrice({ ...price, taxPercentage: event.target.value });
  };

  return (
    <Card className="mb-5">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Price
        </Typography>

        <FormControl className="outlined" variant="standard" size="small" fullWidth>
          <FormLabel component="label">Base Price</FormLabel>
          <Input placeholder="Base Price" value={price.basePrice} onChange={handleBasePriceChange} />
        </FormControl>

        <FormControl fullWidth size="small" variant="standard" className="outlined">
          <FormLabel component="label">Discount Type</FormLabel>
          <Select
            value={price.discountType}
            label="Small"
            onChange={handleDiscountTypeChange}
            IconComponent={NiChevronDownSmall}
            MenuProps={{ className: "outlined" }}
          >
            {price.discountTypeList.map((discountType: string) => {
              return (
                <MenuItem key={discountType} value={discountType}>
                  {discountType}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {price.discountType === "Percentage" && (
          <FormControl className="outlined" variant="standard" size="small" fullWidth>
            <FormLabel component="label">Discount Percentage</FormLabel>
            <Input
              placeholder="Discount Percentage"
              value={price.discountPercentage}
              onChange={handleDiscountPercentageChange}
            />
          </FormControl>
        )}

        {price.discountType === "Fixed Amount" && (
          <FormControl className="outlined" variant="standard" size="small" fullWidth>
            <FormLabel component="label">Fixed Amount Discount</FormLabel>
            <Input
              placeholder="Fixed Amount Discount"
              value={price.discountFixedAmount}
              onChange={handleDiscountFixedAmountChange}
            />
          </FormControl>
        )}

        <FormControl className="outlined" variant="standard" size="small" fullWidth>
          <FormLabel component="label">Tax Percentage</FormLabel>
          <Input placeholder="Tax Percentage" value={price.taxPercentage} onChange={handleTaxPercentageChange} />
        </FormControl>
      </CardContent>
    </Card>
  );
}
