import * as React from "react";

import { Button, FormControl, InputLabel, Select, SelectProps } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  randomAddress,
  randomCity,
  randomCommodity,
  randomCountry,
  randomCreatedDate,
  randomCurrency,
  randomEmail,
  randomInt,
  randomPrice,
} from "@mui/x-data-grid-generator";
import { DataGridPro, DataGridProProps, GridColDef } from "@mui/x-data-grid-pro";

import NiArrowDown from "@/icons/nexture/ni-arrow-down";
import NiArrowInDown from "@/icons/nexture/ni-arrow-in-down";
import NiArrowUp from "@/icons/nexture/ni-arrow-up";
import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftRightSmall from "@/icons/nexture/ni-chevron-left-right-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiCols from "@/icons/nexture/ni-cols";
import NiCross from "@/icons/nexture/ni-cross";
import NiEllipsisVertical from "@/icons/nexture/ni-ellipsis-vertical";
import NiEyeInactive from "@/icons/nexture/ni-eye-inactive";
import NiFilter from "@/icons/nexture/ni-filter";
import NiFilterPlus from "@/icons/nexture/ni-filter-plus";
import NiPushPinLeft from "@/icons/nexture/ni-push-pin-left";
import NiPushPinRight from "@/icons/nexture/ni-push-pin-right";
import NiSearch from "@/icons/nexture/ni-search";

function DetailPanelContent({ row: rowProp }: { row: Customer }) {
  return (
    <Stack className="border-grey-100 box-border h-full rounded-lg border p-7" direction="column">
      <Stack direction="column" spacing={1} className="h-fit w-full flex-auto">
        <Box className="bg-grey-25 rounded-md p-4">
          <Typography variant="h6" className="mb-2">{`Order #${rowProp.id}`}</Typography>
          <Grid container className="mb-2">
            <Grid size={{ md: 6 }}>
              <Typography variant="body2" className="text-text-secondary">
                Customer information
              </Typography>
              <Typography variant="body1">{rowProp.customer}</Typography>
              <Typography variant="body1">{rowProp.email}</Typography>
            </Grid>
            <Grid size={{ md: 6 }}>
              <Typography variant="body2" align="right" className="text-text-secondary">
                Shipping address
              </Typography>
              <Typography variant="body1" align="right">
                {rowProp.address}
              </Typography>
              <Typography variant="body1" align="right">{`${rowProp.city}, ${rowProp.country.label}`}</Typography>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <DataGridPro
            density="compact"
            className="border-none"
            columns={[
              { field: "name", headerName: "Product", flex: 1 },
              {
                field: "quantity",
                headerName: "Quantity",
                align: "center",
                type: "number",
              },
              { field: "unitPrice", headerName: "Unit Price", type: "number" },
              {
                field: "total",
                headerName: "Total",
                type: "number",
                valueGetter: (value, row) => row.quantity * row.unitPrice,
              },
            ]}
            rows={rowProp.products}
            hideFooter
          />
        </Box>
      </Stack>
    </Stack>
  );
}

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "Order ID" },
  { field: "customer", headerName: "Customer", width: 200 },
  { field: "date", type: "date", headerName: "Placed at" },
  { field: "currency", headerName: "Currency" },
  {
    field: "total",
    type: "number",
    headerName: "Total",
    valueGetter: (value, row) => {
      const subtotal = row.products.reduce((acc: number, product: any) => product.unitPrice * product.quantity, 0);
      const taxes = subtotal * 0.05;
      return subtotal + taxes;
    },
  },
];

function generateProducts() {
  const quantity = randomInt(1, 5);
  return [...Array(quantity)].map((_, index) => ({
    id: index,
    name: randomCommodity(),
    quantity: randomInt(1, 5),
    unitPrice: randomPrice(1, 1000),
  }));
}

const rows = [
  {
    id: 1,
    customer: "Matheus",
    email: randomEmail(),
    date: randomCreatedDate(),
    address: randomAddress(),
    country: randomCountry(),
    city: randomCity(),
    currency: randomCurrency(),
    products: generateProducts(),
  },
  {
    id: 2,
    customer: "Olivier",
    email: randomEmail(),
    date: randomCreatedDate(),
    address: randomAddress(),
    country: randomCountry(),
    city: randomCity(),
    currency: randomCurrency(),
    products: generateProducts(),
  },
  {
    id: 3,
    customer: "Flavien",
    email: randomEmail(),
    date: randomCreatedDate(),
    address: randomAddress(),
    country: randomCountry(),
    city: randomCity(),
    currency: randomCurrency(),
    products: generateProducts(),
  },
  {
    id: 4,
    customer: "Danail",
    email: randomEmail(),
    date: randomCreatedDate(),
    address: randomAddress(),
    country: randomCountry(),
    city: randomCity(),
    currency: randomCurrency(),
    products: generateProducts(),
  },
  {
    id: 5,
    customer: "Alexandre",
    email: randomEmail(),
    date: randomCreatedDate(),
    address: randomAddress(),
    country: randomCountry(),
    city: randomCity(),
    currency: randomCurrency(),
    products: generateProducts(),
  },
];

type Customer = (typeof rows)[number];

export default function MasterDetailBasic() {
  const getDetailPanelContent = React.useCallback<NonNullable<DataGridProProps["getDetailPanelContent"]>>(
    ({ row }) => <DetailPanelContent row={row} />,
    [],
  );

  const getDetailPanelHeight = React.useCallback(() => 400, []);

  return (
    <Box className="w-full">
      <DataGridPro
        className="border-none"
        columns={columns}
        rows={rows}
        getDetailPanelHeight={getDetailPanelHeight}
        getDetailPanelContent={getDetailPanelContent}
        disableRowSelectionOnClick
        slots={{
          columnSortedDescendingIcon: () => {
            return <NiArrowDown size={"small"}></NiArrowDown>;
          },
          columnSortedAscendingIcon: () => {
            return <NiArrowUp size={"small"}></NiArrowUp>;
          },
          columnFilteredIcon: () => {
            return <NiFilterPlus size={"small"}></NiFilterPlus>;
          },
          columnReorderIcon: () => {
            return <NiChevronLeftRightSmall size={"small"}></NiChevronLeftRightSmall>;
          },
          columnMenuIcon: () => {
            return <NiEllipsisVertical size={"small"}></NiEllipsisVertical>;
          },
          columnMenuSortAscendingIcon: NiArrowUp,
          columnMenuSortDescendingIcon: NiArrowDown,
          columnMenuFilterIcon: NiFilter,
          columnMenuHideIcon: NiEyeInactive,
          columnMenuClearIcon: NiCross,
          columnMenuManageColumnsIcon: NiCols,
          filterPanelDeleteIcon: NiCross,
          filterPanelRemoveAllIcon: NiBinEmpty,
          exportIcon: NiArrowInDown,
          columnSelectorIcon: NiCols,
          detailPanelExpandIcon: NiChevronRightSmall,
          detailPanelCollapseIcon: NiChevronDownSmall,
          columnMenuPinLeftIcon: NiPushPinLeft,
          columnMenuPinRightIcon: NiPushPinRight,
          baseSelect: (props) => {
            const propsCasted = props as SelectProps;
            return (
              <FormControl size="small" variant="outlined">
                <InputLabel>{props.label}</InputLabel>
                <Select {...propsCasted} IconComponent={NiChevronDownSmall} MenuProps={{ className: "outlined" }} />
              </FormControl>
            );
          },
          quickFilterIcon: () => {
            return <NiSearch size={"medium"} />;
          },
          quickFilterClearIcon: () => {
            return <NiCross size={"medium"} />;
          },
          baseButton: (props) => {
            return <Button {...props} variant="pastel" color="grey"></Button>;
          },
        }}
      />
    </Box>
  );
}
