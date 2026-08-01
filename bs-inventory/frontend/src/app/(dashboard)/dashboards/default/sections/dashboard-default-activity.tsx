import Link from "next/link";

import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";

export default function DashboardDefaultActivity() {
  return (
    <>
      <Box className="flex flex-row items-center justify-between">
        <Typography variant="h6" component="h6" className="mt-2 mb-3">
          Activity
        </Typography>
        <Button
          component={Link}
          href="#"
          size="tiny"
          color="grey"
          variant="text"
          startIcon={<NiChevronRightSmall size={"tiny"} className="rtl:rotate-180" />}
        >
          View All
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Timeline className="h-136 items-start overflow-auto">
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="info" variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="subtitle2" className="text-text-primary">
                  Permission Updated
                </Typography>
                <Typography variant="body2" className="text-text-secondary line-clamp-1">
                  Olivia updated user permissions for{" "}
                  <Link href="#" className="link-text-secondary">
                    Elijah
                  </Link>
                </Typography>
                <Typography variant="body2" className="text-text-disabled">
                  4 hours ago
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
                  User Login
                </Typography>
                <Typography variant="body2" className="text-text-secondary line-clamp-1">
                  <Link href="#" className="link-text-secondary">
                    Olivia
                  </Link>{" "}
                  logged into the admin dashboard.
                </Typography>
                <Typography variant="body2" className="text-text-disabled">
                  4 hours ago
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
                  User Password Reset
                </Typography>
                <Typography variant="body2" className="text-text-secondary line-clamp-1">
                  <Link href="#" className="link-text-secondary">
                    Olivia
                  </Link>{" "}
                  logged into the admin dashboard.
                </Typography>
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
                <Typography variant="body2" className="text-text-secondary line-clamp-1">
                  Charlotte edited product details for{" "}
                  <Link href="#" className="link-text-secondary">
                    Buck Rogers
                  </Link>
                </Typography>
                <Typography variant="body2" className="text-text-disabled">
                  6 hours ago
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
                  Refund Process
                </Typography>
                <Typography variant="body2" className="text-text-secondary line-clamp-1">
                  James processed refund request for order{" "}
                  <Link href="#" className="link-text-secondary">
                    #10234
                  </Link>
                </Typography>
                <Typography variant="body2" className="text-text-disabled">
                  2 days ago
                </Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="error" variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="subtitle2" className="text-text-primary">
                  Comment Delete
                </Typography>
                <Typography variant="body2" className="text-text-secondary line-clamp-1">
                  James deleted flagged{" "}
                  <Link href="#" className="link-text-secondary">
                    comment
                  </Link>{" "}
                  on product Wooden Bunny
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
                  Page Publish
                </Typography>
                <Typography variant="body2" className="text-text-secondary line-clamp-1">
                  James published a new blog post:{" "}
                  <Link href="#" className="link-text-secondary">
                    Simple Toys for Creativity
                  </Link>
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
                  Page Publish
                </Typography>
                <Typography variant="body2" className="text-text-secondary line-clamp-1">
                  James published a new blog post:{" "}
                  <Link href="#" className="link-text-secondary">
                    Toys for Toddlers
                  </Link>
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
                  Image Update
                </Typography>
                <Typography variant="body2" className="text-text-secondary line-clamp-1">
                  James updated{" "}
                  <Link href="#" className="link-text-secondary">
                    website banner
                  </Link>{" "}
                  image for the homepage.
                </Typography>
                <Typography variant="body2" className="text-text-disabled">
                  3 days ago
                </Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="success" variant="outlined" />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="subtitle2" className="text-text-primary">
                  Backoffice Login
                </Typography>
                <Typography variant="body2" className="text-text-secondary line-clamp-1">
                  <Link href="#" className="link-text-secondary">
                    James
                  </Link>{" "}
                  logged into the admin dashboard.
                </Typography>
                <Typography variant="body2" className="text-text-disabled">
                  3 days ago
                </Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </CardContent>
      </Card>
    </>
  );
}
