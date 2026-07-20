import { Box, Button, Card, CardContent, FormControl, Link, TextareaAutosize, Typography } from "@mui/material";

import NiArrowOutUp from "@/icons/nexture/ni-arrow-out-up";
import NiFaceSmile from "@/icons/nexture/ni-face-smile";
import NiMicrophone from "@/icons/nexture/ni-microphone";
import NiRobot from "@/icons/nexture/ni-robot";

export default function DashboardVisualHelp() {
  return (
    <Card className="h-full">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Help
        </Typography>

        <Box className="mb-6 flex h-60 flex-col-reverse gap-4 overflow-scroll">
          <Box className="flex flex-col gap-1">
            <Box className="flex flex-row gap-3">
              <Box className="w-9"></Box>
              <Box className="flex flex-row gap-1">
                <Typography variant="body2" className="font-bold">
                  You
                </Typography>
                <Typography variant="body2" className="font-normal">
                  Oct 4, 2025 - 14:17
                </Typography>
              </Box>
            </Box>
            <Box className="flex flex-row gap-3">
              <Box className="h-9 w-9">
                <img src={"/images/avatars/avatar-1.jpg"} alt="avatar" className="h-9 w-9 rounded-md" />
              </Box>
              <Box className="bg-grey-25 rounded-md px-4 py-2 leading-5">No, that is all. Thanks!</Box>
            </Box>
          </Box>

          <Box className="flex flex-col gap-1">
            <Box className="flex flex-row gap-3">
              <Box className="w-9"></Box>
              <Box className="flex flex-row gap-1">
                <Typography variant="body2" className="font-bold">
                  AI Helper
                </Typography>
                <Typography variant="body2" className="font-normal">
                  Dec 4, 2025 - 14:16
                </Typography>
              </Box>
            </Box>
            <Box className="flex flex-row gap-3">
              <Box className="bg-primary-light/10 flex h-9 w-9 flex-none items-center justify-center rounded-md">
                <NiRobot size={"medium"} className="text-primary" />
              </Box>
              <Box className="flex flex-col items-start gap-1">
                <Box className="bg-grey-25 rounded-md px-4 py-2 leading-5">
                  Thank you! Here are the order tracking links:{" "}
                  <Link href="#" underline="hover">
                    #501852
                  </Link>
                  ,{" "}
                  <Link href="#" underline="hover">
                    #501853
                  </Link>
                  ,{" "}
                  <Link href="#" underline="hover">
                    #501854
                  </Link>
                </Box>
                <Box className="bg-grey-25 rounded-md px-4 py-2 leading-5">
                  Is there anything else I can help you with?
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className="flex flex-col gap-1">
            <Box className="flex flex-row gap-3">
              <Box className="w-9"></Box>
              <Box className="flex flex-row gap-1">
                <Typography variant="body2" className="font-bold">
                  You
                </Typography>
                <Typography variant="body2" className="font-normal">
                  Oct 4, 2025 - 14:14
                </Typography>
              </Box>
            </Box>
            <Box className="flex flex-row gap-3">
              <Box className="h-9 w-9">
                <img src={"/images/avatars/avatar-1.jpg"} alt="avatar" className="h-9 w-9 rounded-md" />
              </Box>
              <Box className="flex flex-col items-start gap-1">
                <Box className="bg-grey-25 rounded-md px-4 py-2 leading-5">
                  Sure, they are #501852, #501853, #501854.
                </Box>
                <Box className="bg-grey-25 rounded-md px-4 py-2 leading-5">Provide the links please.</Box>
              </Box>
            </Box>
          </Box>

          <Box className="flex flex-col gap-1">
            <Box className="flex flex-row gap-3">
              <Box className="w-9"></Box>
              <Box className="flex flex-row gap-1">
                <Typography variant="body2" className="font-bold">
                  AI Helper
                </Typography>
                <Typography variant="body2" className="font-normal">
                  Dec 4, 2025 - 14:12
                </Typography>
              </Box>
            </Box>
            <Box className="flex flex-row gap-3">
              <Box className="bg-primary-light/10 flex h-9 w-9 flex-none items-center justify-center rounded-md">
                <NiRobot size={"medium"} className="text-primary" />
              </Box>
              <Box className="bg-grey-25 rounded-md px-4 py-2 leading-5">
                Of course! Could you share the order numbers so I can assist you?
              </Box>
            </Box>
          </Box>
          <Box className="flex flex-col gap-1">
            <Box className="flex flex-row gap-3">
              <Box className="w-9"></Box>
              <Box className="flex flex-row gap-1">
                <Typography variant="body2" className="font-bold">
                  You
                </Typography>
                <Typography variant="body2" className="font-normal">
                  Oct 4, 2025 - 14:10
                </Typography>
              </Box>
            </Box>
            <Box className="flex flex-row gap-3">
              <Box className="h-9 w-9">
                <img src={"/images/avatars/avatar-1.jpg"} alt="avatar" className="h-9 w-9 rounded-md" />
              </Box>
              <Box className="bg-grey-25 rounded-md px-4 py-2 leading-5">Hi, I need help tracking book orders.</Box>
            </Box>
          </Box>
        </Box>

        <FormControl className="MuiTextField-root outlined relative mb-0 w-full">
          <TextareaAutosize
            minRows={2}
            maxRows={2}
            className="MuiInputBase-root MuiInput-root outlined autosize w-full resize-none pe-28!"
            placeholder="Message AI"
          />
          <Box className="absolute inset-e-0 flex flex-row gap-0.25 p-2">
            <Button
              className="icon-only"
              size="small"
              color="grey"
              variant="text"
              startIcon={<NiMicrophone size={"small"} />}
            />
            <Button
              className="icon-only"
              size="small"
              color="grey"
              variant="text"
              startIcon={<NiFaceSmile size={"small"} />}
            />
            <Button
              className="icon-only"
              size="small"
              color="grey"
              variant="text"
              startIcon={<NiArrowOutUp size={"small"} />}
            />
          </Box>
        </FormControl>
      </CardContent>
    </Card>
  );
}
