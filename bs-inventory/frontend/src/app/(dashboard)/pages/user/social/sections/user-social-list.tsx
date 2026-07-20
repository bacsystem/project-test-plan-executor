import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";

import NiArrowDown from "@/icons/nexture/ni-arrow-down";
import NiArrowUp from "@/icons/nexture/ni-arrow-up";
import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiEyeOpen from "@/icons/nexture/ni-eye-open";
import NiLike from "@/icons/nexture/ni-like";
import NiRocket from "@/icons/nexture/ni-rocket";
import NiSearch from "@/icons/nexture/ni-search";

export default function UserSocialList() {
  return (
    <>
      <Grid size={12} className="mb-2.5">
        <FormControl variant="filled" size="medium" className="surface mb-0" fullWidth>
          <InputLabel>Search</InputLabel>
          <FilledInput
            defaultValue=""
            placeholder="Type to search the feed..."
            endAdornment={
              <>
                <InputAdornment position="end">
                  <IconButton edge="end">{<NiSearch size="medium" className="text-text-disabled" />}</IconButton>
                </InputAdornment>
              </>
            }
          />
        </FormControl>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent className="flex flex-row items-start gap-4">
            <Box className="flex w-8 flex-col items-center gap-2.5">
              <Button
                className="icon-only"
                size="small"
                color="primary"
                variant="pastel"
                startIcon={<NiArrowUp size={"small"} />}
              />
              <Typography variant="body2">28K</Typography>
              <Button
                className="icon-only"
                size="small"
                color="grey"
                variant="pastel"
                startIcon={<NiArrowDown size={"small"} />}
              />
            </Box>
            <Box className="flex flex-col">
              <Box className="mb-3 flex w-full flex-row items-center justify-between leading-6">
                <Typography variant="h6" component="h6" className="flex-1">
                  I Built My Dream Setup
                </Typography>
                <Button
                  className="icon-only"
                  size="small"
                  color="grey"
                  variant="text"
                  startIcon={<NiEllipsisHorizontal size={"tiny"} />}
                />
              </Box>
              <Box className="mb-6 flex flex-col gap-4">
                <Typography>
                  After years of saving and planning, I finally created my ultimate gaming setup.
                  <br /> <br />
                  It includes a custom-built PC with top-tier components like an RTX 4090 graphics card and a Ryzen 9
                  processor. I paired it with a curved 4K monitor for immersive visuals and a mechanical keyboard for
                  precision. The setup also features RGB lighting that syncs with my games, creating a dynamic
                  atmosphere. I faced challenges like cable management and finding the perfect desk, but the end result
                  was worth it. If you&apos;re planning your own setup, I can share tips on budgeting, choosing
                  components, and optimizing your space!
                </Typography>
              </Box>

              <Box className="flex flex-row items-center justify-between">
                <Box className="flex flex-row items-center gap-2">
                  <Avatar alt="Laura Ellis" src="/images/avatars/avatar-1.jpg" className="small" />
                  <Typography className="hidden md:flex">Laura Ellis</Typography>
                </Box>
                <Box className="flex flex-row items-end gap-1">
                  <Button
                    size="tiny"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiLike size={"small"} />}
                    className="active [.active]:text-primary [.active]:bg-grey-25 hover:text-primary [.active:hover]:text-text-primary min-w-0 md:min-w-16"
                  >
                    8
                  </Button>
                  <Button
                    size="tiny"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiEyeOpen size={"small"} />}
                    className="active [.active]:text-secondary [.active]:bg-grey-25 hover:text-secondary [.active:hover]:text-text-primary min-w-0 md:min-w-16"
                  >
                    12
                  </Button>
                  <Button
                    size="tiny"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiRocket size={"small"} />}
                    className="active [.active]:text-accent-1 [.active]:bg-grey-25 hover:text-accent-1 [.active:hover]:text-text-primary min-w-0 md:min-w-16"
                  >
                    14
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent className="flex flex-row items-start gap-4">
            <Box className="flex w-8 flex-col items-center gap-2.5">
              <Button
                className="icon-only"
                size="small"
                color="primary"
                variant="pastel"
                startIcon={<NiArrowUp size={"small"} />}
              />
              <Typography variant="body2">280</Typography>
              <Button
                className="icon-only"
                size="small"
                color="grey"
                variant="pastel"
                startIcon={<NiArrowDown size={"small"} />}
              />
            </Box>
            <Box className="flex flex-col">
              <Box className="mb-3 flex w-full flex-row items-center justify-between leading-6">
                <Typography variant="h6" component="h6" className="flex-1">
                  Ask Me: I&apos;m a Space Engineer
                </Typography>
                <Button
                  className="icon-only"
                  size="small"
                  color="grey"
                  variant="text"
                  startIcon={<NiEllipsisHorizontal size={"tiny"} />}
                />
              </Box>
              <Box className="mb-6 flex flex-col gap-4">
                <Grid size={12} container spacing={2.5}>
                  <Grid size={{ "2xl": 6, xs: 12 }}>
                    <img
                      src={"/images/products/product-1.jpg"}
                      alt="post image"
                      className="h-60 w-full rounded-lg object-cover"
                    />
                  </Grid>
                  <Grid size={{ "2xl": 3, xs: 12 }}>
                    <img
                      src={"/images/products/product-2.jpg"}
                      alt="post image"
                      className="h-60 w-full rounded-lg object-cover"
                    />
                  </Grid>
                  <Grid size={{ "2xl": 3, xs: 12 }}>
                    <img
                      src={"/images/products/product-3.jpg"}
                      alt="post image"
                      className="h-60 w-full rounded-lg object-cover"
                    />
                  </Grid>
                </Grid>
                <Typography>
                  Hi everyone! I&apos;m a space engineer specializing in designing systems for Mars exploration. My work
                  involves creating technologies that can withstand extreme conditions, like the thin atmosphere and
                  freezing temperatures on Mars. I&apos;ve contributed to projects like rover navigation systems and
                  habitat modules for future human missions. It&apos;s a challenging but rewarding field, and I&apos;m
                  here to answer your questions about space engineering, interplanetary travel, or what it&apos;s like
                  to work on groundbreaking missions!
                </Typography>
              </Box>
              <Box className="flex flex-row items-center justify-between">
                <Box className="flex flex-row items-center gap-2">
                  <Avatar alt="Daniel Fontaine" src="/images/avatars/avatar-2.jpg" className="small" />
                  <Typography className="hidden md:flex">Daniel Fontaine</Typography>
                </Box>
                <Box className="flex flex-row items-end gap-1">
                  <Button
                    size="tiny"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiLike size={"small"} />}
                    className="active [.active]:text-primary [.active]:bg-grey-25 hover:text-primary [.active:hover]:text-text-primary min-w-0 md:min-w-16"
                  >
                    8
                  </Button>
                  <Button
                    size="tiny"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiEyeOpen size={"small"} />}
                    className="active [.active]:text-secondary [.active]:bg-grey-25 hover:text-secondary [.active:hover]:text-text-primary min-w-0 md:min-w-16"
                  >
                    12
                  </Button>
                  <Button
                    size="tiny"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiRocket size={"small"} />}
                    className="active [.active]:text-accent-1 [.active]:bg-grey-25 hover:text-accent-1 [.active:hover]:text-text-primary min-w-0 md:min-w-16"
                  >
                    14
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent className="flex flex-row items-start gap-4">
            <Box className="flex w-8 flex-col items-center gap-2.5">
              <Button
                className="icon-only"
                size="small"
                color="grey"
                variant="pastel"
                startIcon={<NiArrowUp size={"small"} />}
              />
              <Typography variant="body2">168</Typography>
              <Button
                className="icon-only"
                size="small"
                color="primary"
                variant="pastel"
                startIcon={<NiArrowDown size={"small"} />}
              />
            </Box>
            <Box className="flex flex-col">
              <Box className="mb-3 flex w-full flex-row items-center justify-between leading-6">
                <Typography variant="h6" component="h6" className="flex-1">
                  The Strangest Coincidence
                </Typography>
                <Button
                  className="icon-only"
                  size="small"
                  color="grey"
                  variant="text"
                  startIcon={<NiEllipsisHorizontal size={"tiny"} />}
                />
              </Box>
              <Box className="mb-6 flex flex-col gap-4">
                <Typography>
                  Last year, I was traveling in a remote village and met someone who not only shared my hometown but
                  also went to the same school as me—years apart! We even discovered we had mutual friends. It felt like
                  the universe was playing matchmaker. This coincidence made me wonder about the interconnectedness of
                  people and places. Have you ever experienced a coincidence so strange it felt like fate? Share your
                  stories!
                </Typography>
              </Box>
              <Box className="flex flex-row items-center justify-between">
                <Box className="flex flex-row items-center gap-2">
                  <Avatar alt="Sofia Bennett" src="/images/avatars/avatar-3.jpg" className="small" />
                  <Typography className="hidden md:flex">Sofia Bennett</Typography>
                </Box>
                <Box className="flex flex-row items-end gap-1">
                  <Button
                    size="tiny"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiLike size={"small"} />}
                    className="[.active]:text-primary [.active]:bg-grey-25 hover:text-primary [.active:hover]:text-text-primary min-w-0 md:min-w-16"
                  >
                    8
                  </Button>
                  <Button
                    size="tiny"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiEyeOpen size={"small"} />}
                    className="[.active]:text-secondary [.active]:bg-grey-25 hover:text-secondary [.active:hover]:text-text-primary min-w-0 md:min-w-16"
                  >
                    12
                  </Button>
                  <Button
                    size="tiny"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiRocket size={"small"} />}
                    className="[.active]:text-accent-1 [.active]:bg-grey-25 hover:text-accent-1 [.active:hover]:text-text-primary min-w-0 md:min-w-16"
                  >
                    14
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent className="flex flex-row items-start gap-4">
            <Box className="flex w-8 flex-col items-center gap-2.5">
              <Button
                className="icon-only"
                size="small"
                color="grey"
                variant="pastel"
                startIcon={<NiArrowUp size={"small"} />}
              />
              <Typography variant="body2">168</Typography>
              <Button
                className="icon-only"
                size="small"
                color="grey"
                variant="pastel"
                startIcon={<NiArrowDown size={"small"} />}
              />
            </Box>
            <Box className="flex flex-col">
              <Box className="mb-3 flex w-full flex-row items-center justify-between leading-6">
                <Typography variant="h6" component="h6" className="flex-1">
                  Losing 50 Pounds in a Year
                </Typography>
                <Button
                  className="icon-only"
                  size="small"
                  color="grey"
                  variant="text"
                  startIcon={<NiEllipsisHorizontal size={"tiny"} />}
                />
              </Box>
              <Box className="mb-6 flex flex-col gap-4">
                <Typography>
                  A year ago, I decided to take control of my health. I started with small changes, like swapping sugary
                  drinks for water and walking 30 minutes a day. Gradually, I incorporated strength training and a
                  balanced diet. There were setbacks, like dealing with cravings and plateaus, but I stayed motivated by
                  tracking my progress and celebrating milestones.
                  <br />
                  <br />
                  Losing 50 pounds has transformed my energy levels and confidence. If you&apos;re looking to start your
                  own fitness journey, I can share tips and resources that helped me!
                </Typography>
              </Box>
              <Box className="flex flex-row items-center justify-between">
                <Box className="flex flex-row items-center gap-2">
                  <Avatar alt="Olivia Castillo" src="/images/avatars/avatar-7.jpg" className="small" />
                  <Typography className="hidden md:flex">Olivia Castillo</Typography>
                </Box>
                <Box className="flex flex-row items-end gap-1">
                  <Button
                    size="tiny"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiLike size={"small"} />}
                    className="active [.active]:text-primary [.active]:bg-grey-25 hover:text-primary [.active:hover]:text-text-primary min-w-0 md:min-w-16"
                  >
                    8
                  </Button>
                  <Button
                    size="tiny"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiEyeOpen size={"small"} />}
                    className="[.active]:text-secondary [.active]:bg-grey-25 hover:text-secondary [.active:hover]:text-text-primary min-w-0 md:min-w-16"
                  >
                    12
                  </Button>
                  <Button
                    size="tiny"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiRocket size={"small"} />}
                    className="[.active]:text-accent-1 [.active]:bg-grey-25 hover:text-accent-1 [.active:hover]:text-text-primary min-w-0 md:min-w-16"
                  >
                    14
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent className="flex flex-row items-start gap-4">
            <Box className="flex w-8 flex-col items-center gap-2.5">
              <Button
                className="icon-only"
                size="small"
                color="grey"
                variant="pastel"
                startIcon={<NiArrowUp size={"small"} />}
              />
              <Typography variant="body2">168</Typography>
              <Button
                className="icon-only"
                size="small"
                color="grey"
                variant="pastel"
                startIcon={<NiArrowDown size={"small"} />}
              />
            </Box>
            <Box className="flex flex-col">
              <Box className="mb-3 flex w-full flex-row items-center justify-between leading-6">
                <Typography variant="h6" component="h6" className="flex-1">
                  I Adopted a Rescue Dog
                </Typography>
                <Button
                  className="icon-only"
                  size="small"
                  color="grey"
                  variant="text"
                  startIcon={<NiEllipsisHorizontal size={"tiny"} />}
                />
              </Box>
              <Box className="mb-6 flex flex-col gap-4">
                <Typography>
                  Two months ago, I adopted a rescue dog named Max, and he&apos;s completely changed my life. From his
                  playful antics to his unconditional love, he&apos;s brought so much joy into my home. Max had a tough
                  start, but he&apos;s now thriving in his new environment. Adopting a rescue pet has been one of the
                  most fulfilling decisions I&apos;ve ever made.
                  <br />
                  <br />
                  If you&apos;re considering adoption, I can share tips on preparing your home and building trust with
                  your new furry friend!
                </Typography>
              </Box>
              <Box className="flex flex-row items-center justify-between">
                <Box className="flex flex-row items-center gap-2">
                  <Avatar alt="Lucas Wright" src="/images/avatars/avatar-6.jpg" className="small" />
                  <Typography className="hidden md:flex">Lucas Wright</Typography>
                </Box>
                <Box className="flex flex-row items-end gap-1">
                  <Button
                    size="tiny"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiLike size={"small"} />}
                    className="[.active]:text-primary [.active]:bg-grey-25 hover:text-primary [.active:hover]:text-text-primary min-w-0 md:min-w-16"
                  >
                    8
                  </Button>
                  <Button
                    size="tiny"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiEyeOpen size={"small"} />}
                    className="[.active]:text-secondary [.active]:bg-grey-25 hover:text-secondary [.active:hover]:text-text-primary min-w-0 md:min-w-16"
                  >
                    12
                  </Button>
                  <Button
                    size="tiny"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiRocket size={"small"} />}
                    className="[.active]:text-accent-1 [.active]:bg-grey-25 hover:text-accent-1 [.active:hover]:text-text-primary min-w-0 md:min-w-16"
                  >
                    14
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
