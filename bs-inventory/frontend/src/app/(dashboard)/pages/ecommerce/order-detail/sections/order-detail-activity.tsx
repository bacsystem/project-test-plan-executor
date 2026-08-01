import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Card, CardContent, Link, Typography } from "@mui/material";

export default function OrderDetailActivity() {
  return (
    <Card className="mb-5">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Activity
        </Typography>

        <Timeline className="items-start">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="info" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle2" className="text-text-primary">
                Delivered
              </Typography>
              <Typography variant="body2" className="text-text-secondary line-clamp-1">
                System updated the status to delivered.
              </Typography>
              <Typography variant="body2" className="text-text-disabled">
                2 hours ago
              </Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle2" className="text-text-primary">
                Shipped
              </Typography>
              <Typography variant="body2" className="text-text-secondary line-clamp-1">
                <Link href="#" className="link-text-secondary">
                  Olivia
                </Link>{" "}
                updated the status to shipped.
              </Typography>
              <Typography variant="body2" className="text-text-disabled">
                8 hours ago
              </Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="warning" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle2" className="text-text-primary">
                Prepared
              </Typography>
              <Typography variant="body2" className="text-text-secondary line-clamp-1">
                <Link href="#" className="link-text-secondary">
                  Charlotte
                </Link>{" "}
                completed the order and changed the status.
              </Typography>
              <Typography variant="body2" className="text-text-disabled">
                2 days ago
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
                Received
              </Typography>
              <Typography variant="body2" className="text-text-secondary line-clamp-1">
                <Link href="#" className="link-text-secondary">
                  Charlotte
                </Link>{" "}
                completed the order and changed the status.
              </Typography>
              <Typography variant="body2" className="text-text-disabled">
                2 days ago
              </Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="warning" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle2" className="text-text-primary">
                Payment Completed
              </Typography>
              <Typography variant="body2" className="text-text-secondary line-clamp-1">
                <Link href="#" className="link-text-secondary">
                  Laura Ellis
                </Link>{" "}
                &apos;s payment is completed.
              </Typography>
              <Typography variant="body2" className="text-text-disabled">
                2 days ago
              </Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="error" variant="outlined" />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle2" className="text-text-primary">
                Payment Denied
              </Typography>
              <Typography variant="body2" className="text-text-secondary line-clamp-1">
                <Link href="#" className="link-text-secondary">
                  Laura Ellis
                </Link>{" "}
                &apos;s payment is denied.
              </Typography>
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
