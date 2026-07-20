import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";

import React from "react";

import { Card, CardContent, Typography } from "@mui/material";

import { plyrLayoutIcons } from "@/components/plugins/video-player-controls";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import { PlyrLayout } from "@vidstack/react/player/layouts/plyr";

export default function VideoPlayerYoutube() {
  return (
    <Card>
      <CardContent>
        <Typography component={"h5"} variant="h5" className="card-title">
          Youtube
        </Typography>
        <MediaPlayer title="Sprite Fight" src="youtube/_cMxraX_5RE" className="media-player mb-0! rounded-lg!">
          <MediaProvider>
            <Poster
              className="media-poster absolute inset-0 rounded-lg! opacity-0 transition-opacity data-visible:opacity-100"
              src="https://files.vidstack.io/sprite-fight/poster.webp"
            />
          </MediaProvider>
          <PlyrLayout thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt" icons={plyrLayoutIcons} />
        </MediaPlayer>
      </CardContent>
    </Card>
  );
}
