import { Box, Button, Card, CardContent, FormControl, TextareaAutosize, Typography } from "@mui/material";

import NiArrowOutUp from "@/icons/nexture/ni-arrow-out-up";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiFaceSmile from "@/icons/nexture/ni-face-smile";
import NiMessages from "@/icons/nexture/ni-messages";
import NiMicrophone from "@/icons/nexture/ni-microphone";

export default function IssueDetailContentAddComment() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Add a Comment
        </Typography>

        <FormControl className="MuiTextField-root outlined relative w-full">
          <TextareaAutosize
            minRows={4}
            maxRows={4}
            className="MuiInputBase-root MuiInput-root outlined autosize w-full resize-none pe-28!"
            placeholder="Comment"
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
        <Box className="flex flex-row gap-2">
          <Button size="medium" color="primary" variant="contained" startIcon={<NiMessages size={"medium"} />}>
            Comment
          </Button>
          <Button
            size="medium"
            color="grey"
            variant="pastel"
            endIcon={<NiChevronRightSmall size={"medium"} className="rtl:rotate-180" />}
          >
            Update Status
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
