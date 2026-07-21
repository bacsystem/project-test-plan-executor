"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Box, Button, Divider, FormControl, FormLabel, Input, Paper, Typography } from "@mui/material";

import Logo from "@/components/logo/logo";
import { DEFAULTS } from "@/config";
import NiCheck from "@/icons/nexture/ni-check";
import NiCross from "@/icons/nexture/ni-cross";

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState({
    password: "",
    passwordAgain: "",
  });

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
                  Reset Password
                </Typography>
                <Typography variant="body1" className="text-text-primary">
                  Get an email about how to reset your password securely.
                </Typography>
              </Box>

              <Box className="flex flex-col gap-5">
                <Box component={"form"} onSubmit={handleSubmit} className="flex flex-col">
                  <FormControl className="outlined" variant="standard" size="small">
                    <FormLabel component="label">Password</FormLabel>
                    <Input
                      placeholder=""
                      value={data.password}
                      onChange={(e) => setData({ ...data, password: e.target.value })}
                    />
                    <Typography variant="body2" className="text-text-secondary mt-2 inline-block align-middle">
                      <span className="inline">Must be</span>
                      <span className="bg-grey-100 text-text-secondary mx-1 inline-block h-4 w-4 rounded-md align-text-bottom">
                        <NiCross size={"tiny"}></NiCross>
                      </span>
                      <span className="inline font-semibold">at least 8 characters long, </span>
                      <span className="inline">must contain</span>
                      <span className="bg-grey-100 text-text-secondary mx-1 inline-block h-4 w-4 rounded-md align-text-bottom">
                        <NiCross size={"tiny"}></NiCross>
                      </span>
                      <span className="inline font-semibold">lowercase and uppercase letters, </span>
                      <span className="inline">must have at least</span>
                      <span className="bg-success text-text-contrast mx-1 inline-block h-4 w-4 rounded-md align-text-bottom">
                        <NiCheck size={"tiny"}></NiCheck>
                      </span>
                      <span className="text-success inline font-semibold">one special character.</span>
                    </Typography>
                  </FormControl>

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
                  Sign in
                </Typography>
                <Typography variant="body1" className="text-text-secondary">
                  If you already have an account, please{" "}
                  <Link href="/auth/sign-in" className="link-primary link-underline-hover">
                    sign in
                  </Link>
                  .
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
