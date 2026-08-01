import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";

import { Card, CardContent } from "@mui/material";

import { plyrLayoutIcons } from "@/components/plugins/video-player-controls";
import { useThemeContext } from "@/theme/theme-provider";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import { PlyrLayout } from "@vidstack/react/player/layouts/plyr";

export default function KnowledgeBaseVideo() {
  const { isDarkMode } = useThemeContext();

  return (
    <Card className="p-0">
      <CardContent className="flex flex-col items-center p-0!">
        <MediaPlayer
          title="Sprite Fight"
          src="https://files.vidstack.io/sprite-fight/720p.mp4"
          className="media-player mb-0! h-88! rounded-lg!"
          controls={false}
        >
          <MediaProvider>
            <Poster
              className="media-poster bg-background-paper absolute inset-0 opacity-0 transition-opacity data-visible:opacity-100"
              src={isDarkMode ? "/images/misc/video-poster-dark.svg" : "/images/misc/video-poster-light.svg"}
            />
          </MediaProvider>
          <PlyrLayout thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt" icons={plyrLayoutIcons} />
        </MediaPlayer>
      </CardContent>
    </Card>
  );
}
