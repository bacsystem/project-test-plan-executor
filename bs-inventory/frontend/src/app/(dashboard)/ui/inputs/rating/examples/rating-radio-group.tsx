import { Card, CardContent, Grid, IconContainerProps, Rating, Typography } from "@mui/material";

import NiFaceFrown from "@/icons/nexture/ni-face-frown";
import NiFaceFrownMore from "@/icons/nexture/ni-face-frown-more";
import NiFaceNeutral from "@/icons/nexture/ni-face-neutral";
import NiFaceSmile from "@/icons/nexture/ni-face-smile";
import NiFaceSmileMore from "@/icons/nexture/ni-face-smile-more";

export default function RatingRadioGroup() {
  const customIcons: {
    [index: string]: {
      icon: React.ReactElement<unknown>;
      label: string;
    };
  } = {
    1: {
      icon: <NiFaceFrownMore className="text-error!" />,
      label: "Very Dissatisfied",
    },
    2: {
      icon: <NiFaceFrown className="text-error!" />,
      label: "Dissatisfied",
    },
    3: {
      icon: <NiFaceNeutral className="text-warning!" />,
      label: "Neutral",
    },
    4: {
      icon: <NiFaceSmile className="text-success!" />,
      label: "Satisfied",
    },
    5: {
      icon: <NiFaceSmileMore className="text-success!" />,
      label: "Very Satisfied",
    },
  };

  function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Radio Group
          </Typography>

          <Rating
            name="highlight-selected-only"
            defaultValue={2}
            slotProps={{
              icon: {
                component: IconContainer,
              },
            }}
            getLabelText={(value: number) => customIcons[value].label}
            highlightSelectedOnly
          />
        </CardContent>
      </Card>
    </Grid>
  );
}
