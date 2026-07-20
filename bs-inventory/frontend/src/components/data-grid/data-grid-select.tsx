import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { SelectProps } from "@mui/material/Select";
import { GridRenderEditCellParams, GridSingleSelectColDef, useGridApiContext } from "@mui/x-data-grid-pro";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";

interface DataGridSelectProps extends GridRenderEditCellParams {
  editorProps?: Omit<SelectProps<any>, "value" | "onChange" | "defaultValue" | "children">;
}

export default function DataGridSelect(props: DataGridSelectProps) {
  const { id, value, field } = props;
  const colDef = props.colDef as GridSingleSelectColDef;
  const valueOptions = (colDef.valueOptions as []) || [];
  const apiRef = useGridApiContext();

  const handleValueChange = (event: SelectChangeEvent<any>) => {
    const newValue = event.target.value;
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  return (
    <FormControl size="small" variant="standard" fullWidth className="outlined edit-select">
      <Select
        defaultValue={value}
        label="Small"
        IconComponent={NiChevronDownSmall}
        MenuProps={{ className: "outlined" }}
        onChange={handleValueChange}
        {...(props.editorProps || {})}
      >
        {Array.from(valueOptions).map((value, index) => {
          return (
            <MenuItem key={index} value={value}>
              {value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
