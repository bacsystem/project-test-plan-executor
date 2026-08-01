"use client";

import { SyntheticEvent, useState } from "react";

import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  InputAdornment,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiCross from "@/icons/nexture/ni-cross";

interface CountryType {
  id: string;
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}

interface InventoryData {
  sku: string;
  barcode: string;
  "out-of-stock-purchase": boolean;
  "notify-low-stock": boolean;
  country: CountryType;
}

export default function LPInventory() {
  const [currentCountry, setCurrentCountry] = useState<CountryType>({
    id: "4443",
    code: "DE",
    label: "Germany",
    phone: "49",
    suggested: true,
  });

  const [inventory, setInventory] = useState<InventoryData>({
    sku: "TOY-WOOD-ANIM-005",
    barcode: "9781234567890",
    "out-of-stock-purchase": true,
    "notify-low-stock": false,
    country: currentCountry,
  });

  const handleSkuChange = (event: any) => {
    setInventory({ ...inventory, sku: event.target.value });
  };

  const handleBarcodeChange = (event: any) => {
    setInventory({ ...inventory, barcode: event.target.value });
  };

  const handleSettingsChange = (event: any) => {
    setInventory({ ...inventory, [event.target.name]: event.target.checked });
  };

  const handleChange = (_: SyntheticEvent, value: any) => {
    if (value) {
      const selectedCountry = countryData.find((country) => {
        return country.id === value.id;
      });
      setCurrentCountry(selectedCountry as CountryType);
    } else {
      setCurrentCountry({
        id: "",
        code: "",
        label: "",
        phone: "",
        suggested: false,
      });
    }
  };

  return (
    <Card>
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

        <FormControl fullWidth>
          <FormLabel component="label">Country</FormLabel>
          <Autocomplete
            size="small"
            options={countryData}
            autoHighlight
            popupIcon={<NiChevronDownSmall />}
            clearIcon={<NiCross />}
            getOptionLabel={(option) => option.label}
            getOptionKey={(option) => option.id}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={currentCountry}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box key={key} component="li" {...optionProps}>
                  <img
                    loading="lazy"
                    className="me-2"
                    width="20"
                    height="14"
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    alt="flag"
                  />
                  {option.label} ({option.code}) +{option.phone}
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Country"
                variant="standard"
                className="outlined"
                slotProps={{
                  htmlInput: {
                    ...params.slotProps.htmlInput,
                    autoComplete: "new-password",
                  },
                  input: {
                    ...params.slotProps.input,
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          {currentCountry?.code && (
                            <img
                              loading="lazy"
                              className="me-2"
                              width="20"
                              height="14"
                              srcSet={`https://flagcdn.com/w40/${currentCountry.code.toLowerCase()}.png 2x`}
                              src={`https://flagcdn.com/w20/${currentCountry.code.toLowerCase()}.png`}
                              alt="flag"
                            />
                          )}
                        </InputAdornment>
                        {params.slotProps.input.startAdornment}
                      </>
                    ),
                  },
                }}
              />
            )}
            slotProps={{
              popper: { className: "outlined" },
              chip: {
                variant: "filled",
                size: "small",
              },
            }}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl component="fieldset" variant="standard" className="mb-0">
          <FormLabel component="legend">Stock Settings</FormLabel>
          <FormGroup className="mb-0 flex flex-col gap-2">
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
          </FormGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}

const countryData: readonly CountryType[] = [
  { id: "4440", code: "AD", label: "Andorra", phone: "376" },
  {
    id: "4441",
    code: "BA",
    label: "Bosnia and Herzegovina",
    phone: "387",
  },
  {
    id: "4442",
    code: "CA",
    label: "Canada",
    phone: "1",
    suggested: true,
  },
  {
    id: "4443",
    code: "DE",
    label: "Germany",
    phone: "49",
    suggested: true,
  },
  { id: "4444", code: "EC", label: "Ecuador", phone: "593" },
  { id: "4445", code: "FJ", label: "Fiji", phone: "679" },
  { id: "4446", code: "GA", label: "Gabon", phone: "241" },
  { id: "4447", code: "HK", label: "Hong Kong", phone: "852" },
  { id: "4448", code: "ID", label: "Indonesia", phone: "62" },
  { id: "4449", code: "JE", label: "Jersey", phone: "44" },
  { id: "4450", code: "KE", label: "Kenya", phone: "254" },
  {
    id: "4451",
    code: "LA",
    label: "Lao People's Democratic Republic",
    phone: "856",
  },
  { id: "4452", code: "MA", label: "Morocco", phone: "212" },
  { id: "4453", code: "NA", label: "Namibia", phone: "264" },
  { id: "4454", code: "OM", label: "Oman", phone: "968" },
  { id: "4455", code: "PA", label: "Panama", phone: "507" },
  { id: "4456", code: "QA", label: "Qatar", phone: "974" },
  { id: "4457", code: "RE", label: "Reunion", phone: "262" },
  { id: "4458", code: "SA", label: "Saudi Arabia", phone: "966" },
  {
    id: "4459",
    code: "TC",
    label: "Turks and Caicos Islands",
    phone: "1-649",
  },
  { id: "4460", code: "UA", label: "Ukraine", phone: "380" },
  {
    id: "4461",
    code: "VA",
    label: "Holy See (Vatican City State)",
    phone: "379",
  },
  { id: "4462", code: "WF", label: "Wallis and Futuna", phone: "681" },
  { id: "4463", code: "XK", label: "Kosovo", phone: "383" },
  { id: "4464", code: "YE", label: "Yemen", phone: "967" },
  { id: "4465", code: "ZA", label: "South Africa", phone: "27" },
];
