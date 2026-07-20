import { FormControl, Input } from "@mui/material";
import { GridColDef, GridRenderEditCellParams, useGridApiContext } from "@mui/x-data-grid-pro";

interface DataGridInputProps extends GridRenderEditCellParams {
  editorProps?: React.ComponentProps<typeof Input>["inputProps"];
}

export default function DataGridInput(props: DataGridInputProps) {
  const { id, value, field, editorProps } = props;
  const apiRef = useGridApiContext();
  const colDef = props.colDef as GridColDef;
  const type = colDef.type;

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  return (
    <FormControl className="outlined edit-input" variant="standard" size="small" fullWidth>
      <Input defaultValue={value} onChange={handleValueChange} type={type} inputProps={{ ...editorProps }} />
    </FormControl>
  );
}
