import { Box, Card, CardContent, FormControl, Grid, Input, InputAdornment, TextField, Typography } from "@mui/material";

import NiEmail from "@/icons/nexture/ni-email";
import NiPin from "@/icons/nexture/ni-pin";
import NiUser from "@/icons/nexture/ni-user";

export default function TextFieldIcons() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Icons
          </Typography>
          <Box component="form" className="flex flex-col">
            <FormControl variant="standard" size="small" className="max-w-sm">
              <Input
                placeholder="Name"
                startAdornment={
                  <InputAdornment position="start">
                    <NiUser size="medium" className="text-text-secondary" />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="standard" size="small" className="max-w-sm">
              <Input
                placeholder="Email"
                startAdornment={
                  <InputAdornment position="start">
                    <NiEmail size="medium" className="text-text-secondary" />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="standard" size="small" className="max-w-sm">
              <Input
                multiline
                rows={3}
                placeholder="Address"
                className="items-start"
                startAdornment={
                  <InputAdornment position="start" className="mt-0.5">
                    <NiPin size="medium" className="text-text-secondary" />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>

          <Box component="form" className="flex flex-col">
            <FormControl variant="standard" size="small" className="outlined max-w-sm">
              <Input
                placeholder="Name"
                startAdornment={
                  <InputAdornment position="start">
                    <NiUser size="medium" className="text-text-secondary" />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="standard" size="small" className="outlined max-w-sm">
              <Input
                placeholder="Email"
                startAdornment={
                  <InputAdornment position="start">
                    <NiEmail size="medium" className="text-text-secondary" />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="standard" size="small" className="outlined max-w-sm">
              <Input
                multiline
                rows={3}
                placeholder="Address"
                className="items-start"
                startAdornment={
                  <InputAdornment position="start" className="mt-0.5">
                    <NiPin size="medium" className="text-text-secondary" />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>

          <Box component="form" className="flex flex-col">
            <TextField
              className="max-w-sm"
              size="small"
              label="Name"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start" className="mt-0.5">
                      <NiUser size="medium" className="text-text-secondary" />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              className="max-w-sm"
              size="small"
              label="Email"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start" className="mt-0.5">
                      <NiEmail size="medium" className="text-text-secondary" />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              multiline
              rows={3}
              className="max-w-sm"
              size="small"
              label="Address"
              slotProps={{
                input: {
                  className: "items-start",
                  startAdornment: (
                    <InputAdornment position="start" className="mt-2!">
                      <NiPin size="medium" className="text-text-secondary" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <Box component="form" className="flex flex-col">
            <TextField
              className="max-w-sm"
              size="small"
              label="Name"
              variant="filled"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start" className="mt-0.5">
                      <NiUser size="medium" className="text-text-secondary" />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              className="max-w-sm"
              size="small"
              label="Email"
              variant="filled"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start" className="mt-0.5">
                      <NiEmail size="medium" className="text-text-secondary" />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              multiline
              rows={3}
              className="max-w-sm"
              size="small"
              label="Address"
              variant="filled"
              slotProps={{
                input: {
                  className: "items-start",
                  startAdornment: (
                    <InputAdornment position="start" className="mt-5!">
                      <NiPin size="medium" className="text-text-secondary" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
