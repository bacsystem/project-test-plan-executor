import { Emoji, EmojiStyle } from "emoji-picker-react";

import { Box, Card, CardContent, Typography } from "@mui/material";

export default function EmojiPickerSingle() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Single Emoji
        </Typography>
        <Box className="flex flex-col justify-start gap-1">
          <Box>
            <Emoji unified={"1f60a"} emojiStyle={EmojiStyle.NATIVE} size={18} />
          </Box>
          <Box className="emoji-container">😊</Box>
        </Box>
      </CardContent>
    </Card>
  );
}
