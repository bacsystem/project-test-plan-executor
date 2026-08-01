import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Typography } from "@mui/material";

import NiChef from "@/icons/nexture/ni-chef";
import NiDocumentCode from "@/icons/nexture/ni-document-code";
import NiEyeInactive from "@/icons/nexture/ni-eye-inactive";
import NiRefresh from "@/icons/nexture/ni-refresh";

export default function TimelineIcons() {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineOppositeContent className="m-auto" align="right" variant="body2" color="text.secondary">
          9:30 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot className="bg-primary-light/10 text-primary rounded-lg p-2">
            <NiChef />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className="py-4">
          <Typography variant="h6" component="span">
            Eat
          </Typography>
          <Typography>Because you need strength</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent className="m-auto" variant="body2" color="text.secondary">
          10:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot className="bg-secondary-light/10 text-secondary rounded-lg p-2">
            <NiDocumentCode />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className="py-4">
          <Typography variant="h6" component="span">
            Code
          </Typography>
          <Typography>Because it&apos;s awesome!</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent className="m-auto" align="right" variant="body2" color="text.secondary">
          10:30 pm
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot className="bg-accent-1-light/10 text-accent-1 rounded-lg p-2">
            <NiEyeInactive />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className="py-4">
          <Typography variant="h6" component="span">
            Sleep
          </Typography>
          <Typography>Because you need rest</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent className="m-auto" align="right" variant="body2" color="text.secondary">
          12:00 pm
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot className="bg-accent-2-light/10 text-accent-2 rounded-lg p-2">
            <NiRefresh />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className="py-4">
          <Typography variant="h6" component="span">
            Repeat
          </Typography>
          <Typography>Because this is the life you love!</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
