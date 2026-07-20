import { FormControl, Slider } from "@mui/material";
import { SliderProps } from "@mui/material/Slider";
import { GridRenderEditCellParams, useGridApiContext } from "@mui/x-data-grid-pro";

interface DataGridSliderProps extends GridRenderEditCellParams {
  editorProps?: Omit<SliderProps, "value" | "onChange" | "defaultValue">;
}

export default function DataGridSlider(props: DataGridSliderProps) {
  const { id, field } = props;
  const currentValue = props.value;
  const apiRef = useGridApiContext();

  function handleChange(event: Event, value: number | number[]) {
    apiRef.current.setEditCellValue({ id, field, value });
  }

  return (
    <FormControl fullWidth className="edit-slider">
      <Slider
        defaultValue={currentValue}
        onChange={handleChange}
        size="small"
        valueLabelDisplay="auto"
        {...(props.editorProps || {})}
      />
    </FormControl>
  );
}
