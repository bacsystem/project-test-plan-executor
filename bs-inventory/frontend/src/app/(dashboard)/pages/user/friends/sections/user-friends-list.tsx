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
  Link,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";

import NiBookmark from "@/icons/nexture/ni-bookmark";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiHeadset from "@/icons/nexture/ni-headset";
import NiPin from "@/icons/nexture/ni-pin";
import NiSearch from "@/icons/nexture/ni-search";
import { cn } from "@/lib/utils";

interface UserData {
  id: string;
  name: string;
  avatarImage: string;
  description: string;
  following: boolean;
  location?: string;
  education?: string;
  online?: string;
}
export default function UserFriendsList() {
  const users: UserData[] = [
    {
      id: crypto.randomUUID(),
      name: "Laura Ellis",
      description: "Frontend Developer",
      avatarImage: "/images/avatars/avatar-1.jpg",
      following: true,
      location: "London, UK",
      education: "University College London",
      online: "Available Online",
    },
    {
      id: crypto.randomUUID(),
      name: "Sophia Martinez Ellis",
      description: "System Administrator",
      avatarImage: "/images/avatars/avatar-2.jpg",
      following: true,
      location: "Boston, USA",
      education: "Harvard University",
      online: "Available Online",
    },
    {
      id: crypto.randomUUID(),
      name: "Olivia Peterson",
      description: "UI/UX Designer",
      avatarImage: "/images/avatars/avatar-3.jpg",
      following: true,
      location: "Paris, France",
      education: "Monash University",
      online: "Available Online",
    },
    {
      id: crypto.randomUUID(),
      name: "Liam Carter",
      description: "DevOps Engineer",
      avatarImage: "/images/avatars/avatar-4.jpg",
      following: false,
      location: "Tokyo, Japan",
      education: "Keio University",
      online: "Available Online",
    },
    {
      id: crypto.randomUUID(),
      name: "Mia Sullivan",
      description: "Data Scientist",
      avatarImage: "/images/avatars/avatar-5.jpg",
      following: false,
      location: "Melbourne, Australia",
    },
    {
      id: crypto.randomUUID(),
      name: "Ethan Cooper",
      description: "Cybersecurity Analyst",
      avatarImage: "/images/avatars/avatar-6.jpg",
      following: false,
    },
    {
      id: crypto.randomUUID(),
      name: "Laura Ellis",
      description: "Cloud Architect",
      avatarImage: "/images/avatars/avatar-7.jpg",
      following: false,
      location: "New York City, USA",
      education: "Columbia University",
      online: "Available Online",
    },
    {
      id: crypto.randomUUID(),
      name: "Ava Hamilton",
      description: "DevOps Engineer",
      avatarImage: "/images/avatars/avatar-8.jpg",
      following: false,
      location: "Berlin, Germany",
      education: "Technical University of Berlin",
      online: "Available Online",
    },
    {
      id: crypto.randomUUID(),
      name: "Olivia Peterson",
      description: "Data Scientist",
      avatarImage: "/images/avatars/avatar-3.jpg",
      following: false,
      location: "Mumbai, India",
    },
    {
      id: crypto.randomUUID(),
      name: "Ethan Cooper",
      description: "Quality Assurance",
      avatarImage: "/images/avatars/avatar-5.jpg",
      following: false,
      location: "Dallas, USA",
      education: "Southern Methodist University",
      online: "Available Online",
    },
    {
      id: crypto.randomUUID(),
      name: "Liam Carter",
      description: "Software Developer",
      avatarImage: "/images/avatars/avatar-2.jpg",
      following: false,
      location: "Toronto, Canada",
      education: "York University",
      online: "Available Online",
    },
    {
      id: crypto.randomUUID(),
      name: "Mia Sullivan",
      description: "Data Scientist",
      avatarImage: "/images/avatars/avatar-6.jpg",
      following: false,
    },
  ];

  return (
    <>
      <Grid size={12}>
        <FormControl variant="filled" size="medium" className="surface mb-2.5" fullWidth>
          <InputLabel>Search</InputLabel>
          <FilledInput
            defaultValue=""
            placeholder="Type to search projects..."
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
      {users.map((user) => {
        return (
          <Grid key={user.id} size={{ "2xl": 6, xs: 12 }}>
            <Card>
              <CardContent className="flex flex-row gap-2.5">
                <Avatar alt={user.name} src={user.avatarImage} className="medium" />

                <Box className="flex flex-1 flex-col gap-4">
                  <Box className="mb-1 flex flex-row items-start justify-between gap-1">
                    <Box className="flex flex-col">
                      <Link
                        href="#"
                        variant="subtitle2"
                        underline="hover"
                        color="textPrimary"
                        className="-mb-1 pt-0.25"
                      >
                        {user.name}
                      </Link>
                      <Typography className="text-text-secondary" variant="body1">
                        {user.description}
                      </Typography>
                    </Box>
                    <Button variant="pastel" color={user.following ? "grey" : "primary"} size="tiny">
                      {user.following ? "Following" : "Follow"}
                    </Button>
                  </Box>

                  <Box className="flex flex-col justify-between gap-2">
                    <Box className="flex flex-row gap-2.5">
                      <NiPin className={cn(user.location ? "text-primary" : "text-grey-500")} />
                      <Typography variant="body1">{user.location ? user.location : "Not Specified"}</Typography>
                    </Box>
                    <Box className="flex flex-row gap-2.5">
                      <NiBookmark className={cn(user.education ? "text-secondary" : "text-grey-500")} />
                      <Typography variant="body1">{user.education ? user.education : "Not Specified"}</Typography>
                    </Box>
                    <Box className="flex flex-row gap-2.5">
                      <NiHeadset className={cn(user.online ? "text-accent-1" : "text-grey-500")} />
                      <Typography variant="body1">{user.online ? user.online : "Not Specified"}</Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
      <Grid size={12} className="mt-2.5 flex justify-center">
        <Pagination
          size="medium"
          className="surface-standard"
          count={3}
          renderItem={(item) => (
            <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
          )}
        />
      </Grid>
    </>
  );
}
