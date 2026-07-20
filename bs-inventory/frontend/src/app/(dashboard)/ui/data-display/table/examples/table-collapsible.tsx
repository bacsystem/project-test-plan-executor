import * as React from "react";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronUpSmall from "@/icons/nexture/ni-chevron-up-small";
import { cn } from "@/lib/utils";

function createData(name: string, calories: number, fat: number, carbs: number, protein: number, price: number) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow className="[&>*]:border-b-0">
        <TableCell className="w-12">
          <Button
            onClick={() => setOpen(!open)}
            className={cn("icon-only", open && "bg-grey-25 text-primary")}
            size="small"
            color="grey"
            variant="text"
            startIcon={open ? <NiChevronUpSmall /> : <NiChevronDownSmall />}
          />
        </TableCell>
        <TableCell component="th" scope="row" className={cn(open && "text-primary")}>
          {row.name}
        </TableCell>
        <TableCell align="right" className={cn(open && "text-primary")}>
          {row.calories}
        </TableCell>
        <TableCell align="right" className={cn(open && "text-primary")}>
          {row.fat}
        </TableCell>
        <TableCell align="right" className={cn(open && "text-primary")}>
          {row.carbs}
        </TableCell>
        <TableCell align="right" className={cn(open && "text-primary")}>
          {row.protein}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="p-0" colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className="bg-grey-25 ms-15 mb-4 rounded-lg p-6">
              <Typography variant="subtitle1" className="mb-4" component="div">
                History
              </Typography>
              <Table size="small" className="no-left-padding no-right-padding">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">{Math.round(historyRow.amount * row.price * 100) / 100}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];
export default function TableCollapsible() {
  return (
    <TableContainer component={Box}>
      <Table className="w-full min-w-3xl">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
