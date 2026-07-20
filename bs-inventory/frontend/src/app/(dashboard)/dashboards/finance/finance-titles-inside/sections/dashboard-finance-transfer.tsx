import { useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  ToggleButton,
  Typography,
} from "@mui/material";

import NiCheck from "@/icons/nexture/ni-check";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiSendUpRight from "@/icons/nexture/ni-send-up-right";
import { cn } from "@/lib/utils";

type ReceiverData = {
  id: string;
  name: string;
  avatar: string;
  isSelected: boolean;
};

type TransferData = {
  amount: string;
  account: string;
  accountList: string[];
  receiver?: ReceiverData;
  receiverList: ReceiverData[];
};

export default function DashboardFinanceTransfer() {
  const [transfer, setTransfer] = useState<TransferData>({
    amount: "0",
    account: "USD",
    accountList: ["USD", "Euro", "Gold"],
    receiverList: [
      { id: crypto.randomUUID(), name: "Laura Ellis", avatar: "/images/avatars/avatar-1.jpg", isSelected: false },
      { id: crypto.randomUUID(), name: "Daniel Fontaine", avatar: "/images/avatars/avatar-2.jpg", isSelected: false },
      { id: crypto.randomUUID(), name: "Sofia Bennett", avatar: "/images/avatars/avatar-3.jpg", isSelected: false },
      { id: crypto.randomUUID(), name: "Olivia Castillo", avatar: "/images/avatars/avatar-4.jpg", isSelected: false },
      { id: crypto.randomUUID(), name: "Lucas Wright", avatar: "/images/avatars/avatar-5.jpg", isSelected: false },
    ],
  });

  const handleBasePriceChange = (event: any) => {
    setTransfer({ ...transfer, amount: event.target.value });
  };

  const handleDiscountTypeChange = (event: any) => {
    setTransfer({ ...transfer, account: event.target.value });
  };

  const handleSelectionChange = (selectedID: string) => {
    setTransfer({
      ...transfer,
      receiverList: [...transfer.receiverList].map((receiver) => {
        if (receiver.id === selectedID) {
          return {
            ...receiver,
            isSelected: !receiver.isSelected,
          };
        } else
          return {
            ...receiver,
            isSelected: false,
          };
      }),
    });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Transfer Money
        </Typography>
        <FormControl fullWidth size="small" variant="standard" className="outlined">
          <FormLabel component="label">Account</FormLabel>
          <Select
            value={transfer.account}
            label="Small"
            onChange={handleDiscountTypeChange}
            IconComponent={NiChevronDownSmall}
            MenuProps={{ className: "outlined" }}
          >
            {transfer.accountList.map((discountType: string) => {
              return (
                <MenuItem key={discountType} value={discountType}>
                  {discountType}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl className="outlined" variant="standard" size="small" fullWidth>
          <FormLabel component="label">Amount</FormLabel>
          <Input
            endAdornment={<InputAdornment position="end">{transfer.account}</InputAdornment>}
            value={transfer.amount}
            onChange={handleBasePriceChange}
          />
        </FormControl>

        <FormControl className="outlined" variant="standard" size="small" fullWidth>
          <FormLabel component="label">Receiver</FormLabel>

          <Box className="flex flex-row flex-wrap items-start gap-2">
            {transfer.receiverList.map((receiver: ReceiverData) => {
              return (
                <ToggleButton
                  size="medium"
                  className="outlined h-9! w-full justify-start p-0! pe-4!"
                  value="check"
                  color="primary"
                  selected={receiver.isSelected}
                  onChange={() => {
                    handleSelectionChange(receiver.id);
                  }}
                  key={receiver.id}
                >
                  <Box className="flex w-full flex-row items-center justify-between">
                    <Box className="flex flex-row items-center gap-2">
                      <Avatar alt={receiver.name} src={receiver.avatar} className="tiny ms-0.75" />
                      <Typography>{receiver.name}</Typography>
                    </Box>
                    <NiCheck size="medium" className={cn(receiver.isSelected ? "visible" : "hidden")} />
                  </Box>
                </ToggleButton>
              );
            })}
          </Box>
        </FormControl>

        <Button size="medium" color="primary" variant="outlined" startIcon={<NiSendUpRight size={"medium"} />}>
          Send
        </Button>
      </CardContent>
    </Card>
  );
}
