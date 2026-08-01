"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import { Box, Breadcrumbs, Button, Card, CardContent, Grid, Tooltip, Typography } from "@mui/material";

import Logo from "@/components/logo/logo";
import NiArrowInDown from "@/icons/nexture/ni-arrow-in-down";
import NiPrinter from "@/icons/nexture/ni-printer";
import { currencyFormatter } from "@/lib/utils";

interface InvoiceData {
  image: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export default function Page() {
  const printRef = useRef<HTMLDivElement>(null);
  const handlePrintClick = useReactToPrint({ contentRef: printRef });

  const invoiceData: InvoiceData[] = [
    {
      image: "/images/products/product-1.jpg",
      id: "8472-4565",
      name: "Stretchy",
      price: 37.5,
      quantity: 2,
      total: 75.0,
    },
    {
      image: "/images/products/product-2.jpg",
      id: "8472-4566",
      name: "Pony Soprano",
      price: 24.4,
      quantity: 4,
      total: 97.6,
    },
    {
      image: "/images/products/product-3.jpg",
      id: "8472-4567",
      name: "Buck Rogers",
      price: 28.75,
      quantity: 2,
      total: 57.5,
    },
    {
      image: "/images/products/product-4.jpg",
      id: "8472-4568",
      name: "Paperwork",
      price: 18.25,
      quantity: 3,
      total: 54.75,
    },
    {
      image: "/images/products/product-5.jpg",
      id: "8472-4569",
      name: "Cinnabun",
      price: 10.25,
      quantity: 1,
      total: 10.25,
    },
    {
      image: "/images/products/product-6.jpg",
      id: "8472-4570",
      name: "Donatello",
      price: 22.5,
      quantity: 3,
      total: 67.5,
    },
  ];

  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ xs: 12, md: "grow" }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Invoice
          </Typography>
          <Breadcrumbs>
            <Link color="inherit" href="/dashboards/default">
              Home
            </Link>
            <Link color="inherit" href="/pages">
              Pages
            </Link>
            <Link color="inherit" href="/pages/ecommerce">
              Ecommerce
            </Link>
            <Typography variant="body2">Invoice</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-2">
          <Tooltip title="Download">
            <Button className="icon-only surface-standard" color="grey" variant="surface">
              <NiArrowInDown size={"medium"} />
            </Button>
          </Tooltip>
          <Button
            className="surface-standard"
            size="medium"
            color="grey"
            variant="surface"
            startIcon={<NiPrinter size={"medium"} />}
            onClick={handlePrintClick}
          >
            Print
          </Button>
        </Grid>
      </Grid>
      <Grid container size={12}>
        <Grid size={{ "2xl": 8, xs: 12 }}>
          <Card className="overflow-x-auto! p-10" ref={printRef}>
            <CardContent className="overflow-x-auto! p-0!">
              <Box className="flex min-w-2xl flex-col gap-10">
                <Box className="flex flex-row justify-between gap-2.5">
                  <Logo classNameMobile="sm:hidden" classNameFull="hidden sm:block" />
                  <Box className="flex flex-col items-end">
                    <Typography>123 Main Street </Typography>
                    <Typography>Springfield, IL 62701 USA</Typography>
                  </Box>
                </Box>
                <Box className="flex flex-row gap-2.5">
                  <Box className="bg-grey-500/10 w-8/12 rounded-lg p-7">
                    <Typography className="mb-2" variant="subtitle1">
                      Jane Doe
                    </Typography>
                    <Typography>456 Elm Avenue</Typography>
                    <Typography>Boston, MA 02116 USA</Typography>
                  </Box>
                  <Box className="bg-grey-500/10 w-4/12 rounded-lg p-7 text-right">
                    <Typography className="mb-2" variant="subtitle1">
                      Invoice: #4512
                    </Typography>
                    <Typography>April 14, 2025</Typography>
                    <Typography>10:30 AM</Typography>
                  </Box>
                </Box>

                <Box>
                  <Grid container size={12} spacing={2.5} className="border-grey-50 mb-2 border-b pb-4">
                    <Grid size={1}>
                      <Typography variant="body2" className="font-bold">
                        Image
                      </Typography>
                    </Grid>
                    <Grid size={2}>
                      <Typography variant="body2" className="font-bold">
                        ID
                      </Typography>
                    </Grid>
                    <Grid size={4}>
                      <Typography variant="body2" className="font-bold">
                        Name
                      </Typography>
                    </Grid>
                    <Grid size={2}>
                      <Typography variant="body2" className="font-bold">
                        Price
                      </Typography>
                    </Grid>
                    <Grid size={1}>
                      <Typography variant="body2" className="font-bold">
                        Quantity
                      </Typography>
                    </Grid>
                    <Grid size={2}>
                      <Typography variant="body2" className="text-right font-bold">
                        Total
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box className="min-h-100">
                    {invoiceData.map((item: InvoiceData) => {
                      return (
                        <Grid
                          key={item.id}
                          container
                          size={12}
                          spacing={2.5}
                          className="border-grey-50 items-center py-2"
                        >
                          <Grid size={1}>
                            <img src={item.image} alt={item.name} className="h-9 w-12 rounded-sm object-cover" />
                          </Grid>
                          <Grid size={2}>
                            <Typography variant="body1">{item.id}</Typography>
                          </Grid>
                          <Grid size={4}>
                            <Typography variant="body1">{item.name}</Typography>
                          </Grid>
                          <Grid size={2}>
                            <Typography variant="body1">{currencyFormatter.format(item.price)}</Typography>
                          </Grid>
                          <Grid size={1}>
                            <Typography variant="body1">{item.quantity}</Typography>
                          </Grid>
                          <Grid size={2}>
                            <Typography variant="body1" className="text-right">
                              {currencyFormatter.format(item.total)}
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Box>

                  <Box className="ms-auto flex max-w-xs flex-col gap-3 px-2">
                    <Box className="flex flex-row justify-between">
                      <Typography variant="subtitle1">Subtotal</Typography>
                      <Typography>$342.35</Typography>
                    </Box>

                    <Box className="flex flex-row justify-between">
                      <Typography variant="subtitle1">Tax</Typography>
                      <Typography>$25.50</Typography>
                    </Box>

                    <Box className="flex flex-row justify-between">
                      <Typography variant="subtitle1">Discount</Typography>
                      <Typography>-$65.20</Typography>
                    </Box>

                    <Box className="flex flex-row justify-between">
                      <Typography variant="subtitle1">Grand Total</Typography>
                      <Typography>$302.65</Typography>
                    </Box>
                  </Box>
                </Box>

                <Box className="flex flex-row gap-2.5">
                  <Box className="border-grey-100 w-8/12 rounded-lg border p-4">
                    <Typography variant="body2" className="text-text-secondary">
                      This invoice was created on a computer and is valid without the signature and seal.
                    </Typography>
                    <br />
                    <Typography variant="body2" className="text-text-secondary">
                      Thank you for your business.
                    </Typography>
                  </Box>
                  <Box className="border-grey-100 w-4/12 rounded-lg border p-4 text-right">
                    <Typography variant="body2" className="text-text-secondary">
                      Account Holder: John Doe
                    </Typography>
                    <Typography variant="body2" className="text-text-secondary">
                      IBAN: GB-29NWBK60161331926819
                    </Typography>
                    <Typography variant="body2" className="text-text-secondary">
                      Bank Name: North Star Bank
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
