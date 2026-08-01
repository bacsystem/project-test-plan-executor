"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import Logo from "@/components/logo/logo";
import { DEFAULTS } from "@/config";
import { RadiobuttonSmallChecked, RadiobuttonSmallEmptyOutlined } from "@/icons/form/mui-radiobutton";

export default function Page() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(DEFAULTS.appRoot);
  };

  return (
    <Box className="flex h-dvh min-h-screen w-full items-center justify-center p-4">
      <Paper
        elevation={3}
        className="bg-foreground outline-line max-h-full w-lg max-w-full rounded-4xl py-14 outline -outline-offset-1 backdrop-blur-sm"
      >
        <Box className="flex max-h-[calc(100dvh-9rem)] flex-col gap-4 overflow-y-auto px-8 sm:px-14">
          <Box className="flex flex-col">
            <Box className="mb-14 flex justify-center">
              <Logo classNameMobile="hidden" />
            </Box>

            <Box className="flex flex-col gap-10">
              <Box className="flex flex-col">
                <Typography variant="h1" component="h1" className="mb-2">
                  Verification
                </Typography>
                <Typography variant="body1" className="text-text-primary">
                  Please select how do you want to get the verification code.
                </Typography>
              </Box>

              <Box className="flex flex-col gap-5">
                <Box component={"form"} onSubmit={handleSubmit} className="flex flex-col">
                  <RadioGroup name="row-radio-buttons-group">
                    <FormControl className="mb-2">
                      <FormControlLabel
                        value="phone"
                        control={
                          <Radio
                            size="small"
                            icon={<RadiobuttonSmallEmptyOutlined />}
                            checkedIcon={<RadiobuttonSmallChecked />}
                          />
                        }
                        label="Send to my phone number: ****8714"
                      />
                    </FormControl>
                    <FormControl className="mb-2">
                      <FormControlLabel
                        value="email"
                        control={
                          <Radio
                            size="small"
                            icon={<RadiobuttonSmallEmptyOutlined />}
                            checkedIcon={<RadiobuttonSmallChecked />}
                          />
                        }
                        label="Send to my email address: ne****@gmail.com"
                      />
                    </FormControl>
                  </RadioGroup>

                  <Box className="flex flex-col gap-2">
                    <Button type="submit" variant="contained" className="mb-4">
                      Continue
                    </Button>
                  </Box>

                  <Typography variant="body2" className="text-text-secondary">
                    By clicking Continue, Sign in with Google, or Sign in with GitHub, you agree to the{" "}
                    <Link
                      target="_blank"
                      href="/auth/terms-and-conditions"
                      className="link-primary link-underline-hover"
                    >
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link target="_blank" href="/auth/privacy-policy" className="link-primary link-underline-hover">
                      Privacy Policy
                    </Link>
                    .
                  </Typography>
                </Box>
              </Box>
              <Divider className="text-text-secondary my-0 text-sm"></Divider>
              <Box className="flex flex-col">
                <Typography variant="h5" component="h5">
                  Already have the code?
                </Typography>
                <Typography variant="body1" className="text-text-secondary">
                  If you have the code, please{" "}
                  <Link href="/auth/set-verification" className="link-primary link-underline-hover">
                    submit
                  </Link>{" "}
                  here.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
