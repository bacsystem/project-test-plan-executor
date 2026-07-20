import { Autocomplete, FormControl, TextField } from "@mui/material";
import { AutocompleteProps } from "@mui/material/Autocomplete";
import { GridRenderEditCellParams, GridSingleSelectColDef, useGridApiContext } from "@mui/x-data-grid-pro";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiCross from "@/icons/nexture/ni-cross";

interface DataGridAutocompleteProps extends GridRenderEditCellParams {
  editorProps?: Omit<AutocompleteProps<any, any, any, any>, "value" | "onChange" | "renderInput" | "options">;
}

export default function DataGridAutocomplete(props: DataGridAutocompleteProps) {
  const { id, field } = props;
  const currentValue = props.value;
  const apiRef = useGridApiContext();

  function handleChange(event: React.SyntheticEvent, newValue: string | null) {
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  }
  const colDef = props.colDef as GridSingleSelectColDef;
  const valueOptions = (colDef.valueOptions as []) || [];

  return (
    <FormControl fullWidth className="edit-autocomplete">
      <Autocomplete
        size="small"
        popupIcon={<NiChevronDownSmall />}
        clearIcon={<NiCross />}
        options={valueOptions}
        defaultValue={currentValue}
        value={currentValue}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} variant="standard" className="outlined mb-0" />}
        slotProps={{
          popper: { className: "outlined" },
          chip: { variant: "filled", size: "small" },
        }}
        {...(props.editorProps || {})}
      />
    </FormControl>
  );
}
