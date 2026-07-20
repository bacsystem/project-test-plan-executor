import dayjs from "dayjs";

import { GridRenderEditCellParams, useGridApiContext } from "@mui/x-data-grid-pro";
import { DatePicker } from "@mui/x-date-pickers";

import NiCalendar from "@/icons/nexture/ni-calendar";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import { cn } from "@/lib/utils";

export default function DataGridDate(props: GridRenderEditCellParams) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();
  function handleChange(newValue: any) {
    apiRef.current.setEditCellValue({ id, field, value: dayjs(newValue).toDate() });
  }

  return (
    <DatePicker
      defaultValue={value ? dayjs(value) : null}
      onChange={handleChange}
      className="outlined edit-date mb-0"
      slots={{
        openPickerIcon: (props) => {
          return <NiCalendar {...props} className={cn(props.className, "text-text-secondary")} />;
        },
        switchViewIcon: (props) => {
          return <NiChevronDownSmall {...props} className={cn(props.className, "text-text-secondary")} />;
        },
        leftArrowIcon: (props) => {
          return <NiChevronLeftSmall {...props} className={cn(props.className, "text-text-secondary")} />;
        },
        rightArrowIcon: (props) => {
          return <NiChevronRightSmall {...props} className={cn(props.className, "text-text-secondary")} />;
        },
      }}
      slotProps={{
        textField: { size: "small", variant: "standard" },
        desktopPaper: { className: "outlined" },
      }}
    />
  );
}
