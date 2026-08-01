import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Card, CardContent, Typography } from "@mui/material";

export default function ModelDetailChangelog() {
  return (
    <Card className="mb-5">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Changelog
        </Typography>
        <Timeline className="items-start overflow-auto">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="info" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle2" className="text-text-primary">
                Permission Updated
              </Typography>
              <ul className="list-inside list-disc">
                <Typography variant="body2" component={"li"} className="text-text-secondary">
                  New features and bug fixes
                </Typography>
              </ul>
              <Typography variant="body2" className="text-text-disabled">
                4 hours ago
              </Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="info" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle2" className="text-text-primary">
                User Login
              </Typography>
              <ul className="list-inside list-disc">
                <Typography variant="body2" component={"li"} className="text-text-secondary">
                  Performance improvements
                </Typography>
              </ul>
              <Typography variant="body2" className="text-text-disabled">
                4 hours ago
              </Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="info" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle2" className="text-text-primary">
                Product Update
              </Typography>
              <ul className="list-inside list-disc">
                <Typography variant="body2" component={"li"} className="text-text-secondary">
                  New features
                </Typography>
                <Typography variant="body2" component={"li"} className="text-text-secondary">
                  Fixes
                </Typography>
                <Typography variant="body2" component={"li"} className="text-text-secondary">
                  Other nice things
                </Typography>
              </ul>
              <Typography variant="body2" className="text-text-disabled">
                6 hours ago
              </Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="info" variant="outlined" />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle2" className="text-text-primary">
                Initial Version: v1.0.0
              </Typography>
              <ul className="list-inside list-disc">
                <Typography variant="body2" component={"li"} className="text-text-secondary">
                  Basic functionality is here :)
                </Typography>
              </ul>
              <Typography variant="body2" className="text-text-disabled">
                2 days ago
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </CardContent>
    </Card>
  );
}
