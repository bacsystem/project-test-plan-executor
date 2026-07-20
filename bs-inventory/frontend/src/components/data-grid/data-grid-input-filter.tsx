import { capitalize, FormControl, Input, TextField } from "@mui/material";
import { GridFilterInputValueProps } from "@mui/x-data-grid-pro";

interface DataGridInputFilterProps extends GridFilterInputValueProps {
  editorProps?: React.ComponentProps<typeof Input>["inputProps"];
  isHeaderFilter?: boolean;
}

export default function DataGridInputFilter(props: DataGridInputFilterProps) {
  const { item, applyValue, apiRef, editorProps, isHeaderFilter } = props;

  const handleChange = (event: any) => {
    applyValue({ ...item, value: event.target.value });
  };

  return (
    <FormControl className="outlined edit-input" variant="outlined" size="small" fullWidth>
      <TextField
        variant="outlined"
        size="small"
        label={isHeaderFilter ? capitalize(item.operator) : apiRef.current.getLocaleText("filterPanelInputLabel")}
        onChange={handleChange}
        defaultValue={item.value}
        slotProps={{ htmlInput: editorProps }}
      />
    </FormControl>
  );
}
