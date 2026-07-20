import { useState } from "react";

import { Button, Card, CardContent, FormControl, FormLabel, Grid, Input, Typography } from "@mui/material";

interface ContactInfoData {
  id: string;
  emailPrimary: string;
  emailSecondary: string;
  phone: string;
}

export default function SettingsContact() {
  const [contactInfo, setContactInfo] = useState<ContactInfoData>({
    id: "4232-0594-3495",
    emailPrimary: "laura@acorn.dev",
    emailSecondary: "laura.ellis@gmail.com",
    phone: "+6443884455",
  });

  const handleEmailSecondaryChange = (event: any) => {
    setContactInfo({ ...contactInfo, emailSecondary: event.target.value });
  };

  const handlePhoneChange = (event: any) => {
    setContactInfo({ ...contactInfo, phone: event.target.value });
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Contact
          </Typography>

          <FormControl className="outlined lg:flex-row lg:gap-2.5" variant="standard" size="small" fullWidth>
            <FormLabel component="label" className="min-w-60">
              Email
            </FormLabel>
            <Input placeholder="Name" value={contactInfo.emailPrimary} readOnly className="w-full" disabled />
          </FormControl>

          <FormControl className="outlined lg:flex-row lg:gap-2.5" variant="standard" size="small" fullWidth>
            <FormLabel component="label" className="min-w-60">
              Secondary Email
            </FormLabel>
            <Input
              placeholder="Name"
              value={contactInfo.emailSecondary}
              onChange={handleEmailSecondaryChange}
              className="w-full"
            />
          </FormControl>

          <FormControl className="outlined lg:flex-row lg:gap-2.5" variant="standard" size="small" fullWidth>
            <FormLabel component="label" className="min-w-60">
              Phone
            </FormLabel>
            <Input placeholder="Name" value={contactInfo.phone} onChange={handlePhoneChange} className="w-full" />
          </FormControl>

          <Button size="medium" color="primary" variant="outlined">
            Update
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}
