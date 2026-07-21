import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  FilledInput,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";

import NiEyeClose from "@/icons/nexture/ni-eye-close";
import NiEyeOpen from "@/icons/nexture/ni-eye-open";

export default function TextFieldInputAdornments() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Input Adornments
          </Typography>
          <Box className="mb-4 flex flex-col">
            <Typography variant="h6" component="h6" className="mb-4">
              Small
            </Typography>
            <Box className="flex flex-row flex-wrap items-start gap-4">
              <TextField
                className="w-64"
                size="small"
                label="TextField"
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">Kilogram</InputAdornment>,
                  },
                }}
              />
              <FormControl variant="outlined" size="small" className="w-64">
                <InputLabel component="label">OutlinedInput</InputLabel>
                <OutlinedInput
                  endAdornment={<InputAdornment position="end">Kilogram</InputAdornment>}
                  label="OutlinedInput"
                />
              </FormControl>
              <FormControl variant="outlined" size="small" className="w-64">
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <NiEyeClose size="medium" className="text-text-secondary" />
                        ) : (
                          <NiEyeOpen size="medium" className="text-text-secondary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Box>
            <Box className="flex flex-row flex-wrap items-start gap-4">
              <TextField
                className="w-64"
                label="TextField"
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">Kilogram</InputAdornment>,
                  },
                }}
                variant="filled"
                size="small"
              />
              <FormControl variant="filled" size="small" className="w-64">
                <InputLabel component="label">FilledInput</InputLabel>
                <FilledInput endAdornment={<InputAdornment position="end">Kilogram</InputAdornment>} />
              </FormControl>
              <FormControl variant="filled" size="small" className="w-64">
                <InputLabel>Password</InputLabel>
                <FilledInput
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <NiEyeClose size="medium" className="text-text-secondary" />
                        ) : (
                          <NiEyeOpen size="medium" className="text-text-secondary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Box className="flex flex-row flex-wrap items-start gap-4">
              <FormControl>
                <FormLabel component="label">TextField</FormLabel>
                <TextField
                  label="With normal TextField"
                  slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start">Kilogram</InputAdornment>,
                    },
                  }}
                  variant="standard"
                  className="w-64"
                  size="small"
                />
              </FormControl>
              <FormControl variant="standard" className="w-64" size="small">
                <FormLabel component="label">Input</FormLabel>
                <Input endAdornment={<InputAdornment position="end">Kilogram</InputAdornment>} />
              </FormControl>

              <FormControl variant="standard" className="w-64" size="small">
                <FormLabel component="label">Password</FormLabel>
                <Input
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                      >
                        {showPassword ? (
                          <NiEyeClose size="medium" className="text-text-secondary" />
                        ) : (
                          <NiEyeOpen size="medium" className="text-text-secondary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Box className="flex flex-row flex-wrap items-start gap-4">
              <FormControl>
                <FormLabel component="label">TextField</FormLabel>
                <TextField
                  label="With normal TextField"
                  slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start">Kilogram</InputAdornment>,
                    },
                  }}
                  variant="standard"
                  className="outlined w-64"
                  size="small"
                />
              </FormControl>
              <FormControl variant="standard" className="outlined w-64" size="small">
                <FormLabel component="label">Input</FormLabel>
                <Input size="small" endAdornment={<InputAdornment position="end">Kilogram</InputAdornment>} />
              </FormControl>
              <FormControl variant="standard" className="outlined w-64" size="small">
                <FormLabel component="label">Password</FormLabel>
                <Input
                  size="small"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                      >
                        {showPassword ? (
                          <NiEyeClose size="medium" className="text-text-secondary" />
                        ) : (
                          <NiEyeOpen size="medium" className="text-text-secondary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
          </Box>

          <Box className="flex flex-col">
            <Typography variant="h6" component="h6" className="mb-4">
              Medium
            </Typography>
            <Box className="flex flex-row flex-wrap items-start gap-4">
              <TextField
                className="w-64"
                size="medium"
                label="TextField"
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">Kilogram</InputAdornment>,
                  },
                }}
              />
              <FormControl variant="outlined" size="medium" className="w-64">
                <InputLabel component="label">OutlinedInput</InputLabel>
                <OutlinedInput
                  endAdornment={<InputAdornment position="end">Kilogram</InputAdornment>}
                  label="OutlinedInput"
                />
              </FormControl>
              <FormControl variant="outlined" size="medium" className="w-64">
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <NiEyeClose size="medium" className="text-text-secondary" />
                        ) : (
                          <NiEyeOpen size="medium" className="text-text-secondary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Box>
            <Box className="flex flex-row flex-wrap items-start gap-4">
              <TextField
                className="w-64"
                label="TextField"
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">Kilogram</InputAdornment>,
                  },
                }}
                variant="filled"
                size="medium"
              />
              <FormControl variant="filled" size="medium" className="w-64">
                <InputLabel component="label">FilledInput</InputLabel>
                <FilledInput endAdornment={<InputAdornment position="end">Kilogram</InputAdornment>} />
              </FormControl>
              <FormControl variant="filled" size="medium" className="w-64">
                <InputLabel>Password</InputLabel>
                <FilledInput
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <NiEyeClose size="medium" className="text-text-secondary" />
                        ) : (
                          <NiEyeOpen size="medium" className="text-text-secondary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Box className="flex flex-row flex-wrap items-start gap-4">
              <FormControl>
                <FormLabel component="label">TextField</FormLabel>
                <TextField
                  slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start">Kilogram</InputAdornment>,
                    },
                  }}
                  variant="standard"
                  className="w-64"
                />
              </FormControl>
              <FormControl variant="standard" className="w-64" size="medium">
                <FormLabel component="label">Input</FormLabel>
                <Input endAdornment={<InputAdornment position="end">Kilogram</InputAdornment>} />
              </FormControl>

              <FormControl variant="standard" className="w-64" size="medium">
                <FormLabel component="label">Password</FormLabel>
                <Input
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                      >
                        {showPassword ? (
                          <NiEyeClose size="medium" className="text-text-secondary" />
                        ) : (
                          <NiEyeOpen size="medium" className="text-text-secondary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Box className="flex flex-row flex-wrap items-start gap-4">
              <FormControl>
                <FormLabel component="label">TextField</FormLabel>
                <TextField
                  slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start">Kilogram</InputAdornment>,
                    },
                  }}
                  variant="standard"
                  className="outlined w-64"
                  size="medium"
                />
              </FormControl>
              <FormControl variant="standard" className="outlined w-64" size="medium">
                <FormLabel component="label">Input</FormLabel>
                <Input endAdornment={<InputAdornment position="end">Kilogram</InputAdornment>} />
              </FormControl>
              <FormControl variant="standard" className="outlined w-64" size="medium">
                <FormLabel component="label">Password</FormLabel>
                <Input
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                      >
                        {showPassword ? (
                          <NiEyeClose size="medium" className="text-text-secondary" />
                        ) : (
                          <NiEyeOpen size="medium" className="text-text-secondary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
