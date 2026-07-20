import { useState } from "react";

import { Autocomplete, Box, Button, Card, CardContent, Chip, TextField, Typography } from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiCross from "@/icons/nexture/ni-cross";
import NiPlus from "@/icons/nexture/ni-plus";

interface AttributeData {
  id: string;
  name: string;
  values: string[];
}

export default function ProductDetailAttributes() {
  const [attributes, setAttributes] = useState<AttributeData[]>([
    { id: crypto.randomUUID(), name: "Type", values: ["Oak", "Maple", "Cherry"] },
    { id: crypto.randomUUID(), name: "Size", values: ["Small", "Large"] },
  ]);

  const handleValueChange = (event: any, newValue: string[], id: string) => {
    setAttributes(
      [...attributes].map((attribute) => {
        if (attribute.id === id) {
          return {
            ...attribute,
            values: newValue,
          };
        } else return attribute;
      }),
    );
  };

  const handleNameChange = (event: any, id: string) => {
    setAttributes(
      [...attributes].map((attribute) => {
        if (attribute.id === id) {
          return {
            ...attribute,
            name: event.target.value,
          };
        } else return attribute;
      }),
    );
  };

  const handleAddClick = () => {
    setAttributes([...attributes, { id: crypto.randomUUID(), name: " ", values: [] }]);
  };

  const handleDeleteClick = (id: string) => {
    setAttributes((prevAttributes) => prevAttributes.filter((data) => data.id != id));
  };

  return (
    <Card className="mb-5">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Attributes
        </Typography>
        <Box className="flex flex-col items-start">
          {attributes.map((attribute) => {
            return (
              <Box key={attribute.id} className="flex w-full flex-row items-start gap-2">
                <TextField
                  label="Name"
                  value={attribute.name}
                  variant="outlined"
                  size="small"
                  className="w-32"
                  onChange={(event: any) => {
                    handleNameChange(event, attribute.id);
                  }}
                />
                <Autocomplete
                  className="w-full"
                  size="small"
                  multiple
                  popupIcon={<NiChevronDownSmall />}
                  clearIcon={<NiCross />}
                  freeSolo
                  options={[]}
                  value={attribute.values}
                  onChange={(event: any, newValue: string[]) => handleValueChange(event, newValue, attribute.id)}
                  renderInput={(params) => <TextField {...params} label="Values" variant="outlined" />}
                  slotProps={{
                    popper: { className: "outlined" },
                    chip: {
                      variant: "filled",
                    },
                  }}
                  renderValue={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => {
                      const { key, ...tagProps } = getTagProps({ index });
                      return <Chip variant="filled" size="small" label={option} key={key} {...tagProps} />;
                    })
                  }
                />
                <Button
                  onClick={() => {
                    handleDeleteClick(attribute.id);
                  }}
                  className="icon-only flex-none"
                  size="medium"
                  color="grey"
                  variant="text"
                  startIcon={<NiCross size={"medium"} />}
                />
              </Box>
            );
          })}

          <Button
            onClick={handleAddClick}
            size="medium"
            color="grey"
            variant="pastel"
            startIcon={<NiPlus size={"medium"} />}
          >
            Add Attribute
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
