import { Box, Button, Checkbox, FormControl, FormControlLabel, Rating, Switch, Typography } from "@mui/material";

import { CheckboxSmallChecked, CheckboxSmallEmptyOutlined } from "@/icons/form/mui-checkbox";
import NiArrowCircleLeft from "@/icons/nexture/ni-arrow-circle-left";
import NiCheckSquare from "@/icons/nexture/ni-check-square";
import NiExclamationHexagon from "@/icons/nexture/ni-exclamation-hexagon";
import NiExclamationSquare from "@/icons/nexture/ni-exclamation-square";
import NiMinusSquare from "@/icons/nexture/ni-minus-square";
import NiStar from "@/icons/nexture/ni-star";

export default function ProductsFiltersSidebar() {
  return (
    <>
      <Typography variant="h6" component="h6" className="card-title">
        Filters
      </Typography>

      <Box className="flex flex-col gap-4">
        <Box className="flex flex-col gap-2">
          <Typography variant="body2" className={"text-text-disabled-dark leading-6 font-semibold"}>
            Category
          </Typography>
          <Box className="flex flex-col gap-2">
            <FormControl className="mb-0">
              <FormControlLabel
                control={
                  <Checkbox icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} size="small" />
                }
                label="Toys"
              />
            </FormControl>
            <FormControl className="mb-0">
              <FormControlLabel
                control={
                  <Checkbox icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} size="small" />
                }
                label="Games"
              />
            </FormControl>
            <FormControl className="mb-0">
              <FormControlLabel
                control={
                  <Checkbox icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} size="small" />
                }
                label="Books"
              />
            </FormControl>
            <FormControl className="mb-0">
              <FormControlLabel
                control={
                  <Checkbox icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} size="small" />
                }
                label="Electronics"
              />
            </FormControl>
            <FormControl className="mb-0">
              <FormControlLabel
                control={
                  <Checkbox icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} size="small" />
                }
                label="Accessories"
              />
            </FormControl>
          </Box>
        </Box>

        <Box className="flex flex-col gap-2">
          <Typography variant="body2" className={"text-text-disabled-dark leading-6 font-semibold"}>
            Status
          </Typography>
          <Box className="flex flex-col gap-2">
            <FormControl className="mb-0">
              <FormControlLabel
                control={
                  <Checkbox icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} size="small" />
                }
                label={
                  <Box className="flex flex-row items-center gap-1">
                    <NiCheckSquare size="tiny" className="text-success" />
                    <Typography>Active</Typography>
                  </Box>
                }
              />
            </FormControl>
            <FormControl className="mb-0">
              <FormControlLabel
                control={
                  <Checkbox icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} size="small" />
                }
                label={
                  <Box className="flex flex-row items-center gap-1">
                    <NiMinusSquare size="tiny" className="text-text-disabled" />
                    <Typography>Inactive</Typography>
                  </Box>
                }
              />
            </FormControl>
            <FormControl className="mb-0">
              <FormControlLabel
                control={
                  <Checkbox icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} size="small" />
                }
                label={
                  <Box className="flex flex-row items-center gap-1">
                    <NiExclamationHexagon size="tiny" className="text-warning" />
                    <Typography>Low Stock</Typography>
                  </Box>
                }
              />
            </FormControl>
            <FormControl className="mb-0">
              <FormControlLabel
                control={
                  <Checkbox icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} size="small" />
                }
                label={
                  <Box className="flex flex-row items-center gap-1">
                    <NiExclamationSquare size="tiny" className="text-error" />
                    <Typography>No Stock</Typography>
                  </Box>
                }
              />
            </FormControl>
          </Box>
        </Box>

        <Box className="flex flex-col gap-2">
          <Typography variant="body2" className={"text-text-disabled-dark leading-6 font-semibold"}>
            Age
          </Typography>
          <Box className="flex flex-col gap-2">
            <FormControl className="mb-0">
              <FormControlLabel
                control={
                  <Checkbox icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} size="small" />
                }
                label="0-2"
              />
            </FormControl>
            <FormControl className="mb-0">
              <FormControlLabel
                control={
                  <Checkbox icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} size="small" />
                }
                label="2-4"
              />
            </FormControl>
            <FormControl className="mb-0">
              <FormControlLabel
                control={
                  <Checkbox icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} size="small" />
                }
                label="4-6"
              />
            </FormControl>
            <FormControl className="mb-0">
              <FormControlLabel
                control={
                  <Checkbox icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} size="small" />
                }
                label="6-10"
              />
            </FormControl>
          </Box>
        </Box>

        <Box className="flex flex-col gap-2">
          <Typography variant="body2" className={"text-text-disabled-dark leading-6 font-semibold"}>
            Price Range
          </Typography>
          <Box className="flex flex-col gap-2">
            <FormControl className="mb-0">
              <FormControlLabel
                control={
                  <Checkbox icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} size="small" />
                }
                label="$0-$10"
              />
            </FormControl>
            <FormControl className="mb-0">
              <FormControlLabel
                control={
                  <Checkbox icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} size="small" />
                }
                label="$10-$20"
              />
            </FormControl>
            <FormControl className="mb-0">
              <FormControlLabel
                control={
                  <Checkbox icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} size="small" />
                }
                label="$20-$50"
              />
            </FormControl>
            <FormControl className="mb-0">
              <FormControlLabel
                control={
                  <Checkbox icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} size="small" />
                }
                label="$50+"
              />
            </FormControl>
          </Box>
        </Box>

        <Box className="flex flex-col gap-2">
          <Typography variant="body2" className={"text-text-disabled-dark leading-6 font-semibold"}>
            Score
          </Typography>
          <Box className="flex flex-col gap-2">
            <FormControl className="mb-0">
              <FormControlLabel
                control={
                  <Checkbox icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} size="small" />
                }
                slotProps={{ typography: { className: "flex items-center" } }}
                label={
                  <Rating
                    readOnly
                    defaultValue={5}
                    max={5}
                    size="small"
                    icon={<NiStar variant="contained" size="small" />}
                    emptyIcon={<NiStar size="small" className="outlined" />}
                  />
                }
              />
            </FormControl>
            <FormControl className="mb-0">
              <FormControlLabel
                control={
                  <Checkbox icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} size="small" />
                }
                slotProps={{ typography: { className: "flex items-center" } }}
                label={
                  <Rating
                    readOnly
                    defaultValue={4}
                    max={5}
                    size="small"
                    icon={<NiStar variant="contained" size="small" />}
                    emptyIcon={<NiStar size="small" className="outlined" />}
                  />
                }
              />
            </FormControl>
            <FormControl className="mb-0">
              <FormControlLabel
                control={
                  <Checkbox icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} size="small" />
                }
                slotProps={{ typography: { className: "flex items-center" } }}
                label={
                  <Rating
                    readOnly
                    defaultValue={3}
                    max={5}
                    size="small"
                    icon={<NiStar variant="contained" size="small" />}
                    emptyIcon={<NiStar size="small" className="outlined" />}
                  />
                }
              />
            </FormControl>
            <FormControl className="mb-0">
              <FormControlLabel
                control={
                  <Checkbox icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} size="small" />
                }
                slotProps={{ typography: { className: "flex items-center" } }}
                label={
                  <Rating
                    readOnly
                    defaultValue={2}
                    max={5}
                    size="small"
                    icon={<NiStar variant="contained" size="small" />}
                    emptyIcon={<NiStar size="small" className="outlined" />}
                  />
                }
              />
            </FormControl>
            <FormControl className="mb-0">
              <FormControlLabel
                control={
                  <Checkbox icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} size="small" />
                }
                slotProps={{ typography: { className: "flex items-center" } }}
                label={
                  <Rating
                    readOnly
                    defaultValue={1}
                    max={5}
                    size="small"
                    icon={<NiStar variant="contained" size="small" />}
                    emptyIcon={<NiStar size="small" className="outlined" />}
                  />
                }
              />
            </FormControl>
          </Box>
        </Box>
        <Box className="flex flex-col gap-2">
          <Typography variant="body2" className={"text-text-disabled-dark leading-6 font-semibold"}>
            Score
          </Typography>
          <Box className="flex flex-col gap-2">
            <FormControl className="mb-0">
              <FormControlLabel control={<Switch size="small" />} label="Quick Delivery" />
            </FormControl>
            <FormControl className="mb-0">
              <FormControlLabel control={<Switch size="small" />} label="Official Vendors" />
            </FormControl>
            <FormControl className="mb-0">
              <FormControlLabel control={<Switch size="small" />} label="Discount" />
            </FormControl>
          </Box>
        </Box>

        <Button
          variant="outlined"
          size="small"
          color="grey"
          startIcon={<NiArrowCircleLeft size="small" />}
          className="w-full"
        >
          Reset
        </Button>
      </Box>
    </>
  );
}
