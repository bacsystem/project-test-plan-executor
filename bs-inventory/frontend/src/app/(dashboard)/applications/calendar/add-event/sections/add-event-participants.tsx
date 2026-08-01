import { Participant, participantData } from "../../data/participants";
import { SyntheticEvent, useState } from "react";

import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  ListItemText,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiCross from "@/icons/nexture/ni-cross";

export default function AddEventParticipants() {
  const [currentParticipant, setCurrentParticipant] = useState<Participant>({
    id: "",
    name: "",
    avatar: "",
  });

  const [permissions, setPermissions] = useState({
    participantsModify: false,
    participantsInvite: true,
    participantsSee: true,
  });

  const [participants, setParticipants] = useState<Participant[]>(participantData);
  const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([]);

  const handleParticipantChange = (_event: SyntheticEvent, value: any) => {
    if (value) {
      const selectedParticipant = participants.find((participant) => {
        return participant.id === value.id;
      });
      setSelectedParticipants([...selectedParticipants, selectedParticipant as Participant]);
      setCurrentParticipant(selectedParticipant as Participant);
      setParticipants(participants.filter((a) => a.id !== selectedParticipant?.id));
    }
    setCurrentParticipant({
      id: "",
      name: "",
      avatar: "",
    });
  };

  const removeParticipant = (id: string) => {
    const selectedParticipant = participantData.find((participant) => {
      return participant.id === id;
    });
    setParticipants([...participants, selectedParticipant as Participant]);
    setSelectedParticipants(selectedParticipants.filter((a) => a.id !== id));
  };

  const handleSettingsChange = (event: any) => {
    setPermissions({ ...permissions, [event.target.name]: event.target.checked });
  };

  return (
    <Card className="mb-5">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Participants
        </Typography>

        <Box className="flex flex-col gap-1">
          <Box className="flex flex-col">
            {selectedParticipants.length > 0 && (
              <>
                <FormLabel component="label">Participants</FormLabel>
                <Box className="border-grey-50 mb-4 flex flex-col gap-2 rounded-lg border p-1 px-2">
                  {selectedParticipants.map((participant: Participant) => {
                    return (
                      <Box className="flex flex-row justify-between py-0.25" key={participant.id}>
                        <Box className="flex flex-row items-center">
                          <Avatar className="tiny me-3" alt={participant?.name} src={participant?.avatar}>
                            {participant?.name?.charAt(0)}
                          </Avatar>
                          <ListItemText
                            className="w-32 flex-none"
                            primary={
                              <Typography component="p" variant="body1" className="leading-4">
                                {participant?.name}
                              </Typography>
                            }
                          />
                        </Box>
                        <Button
                          className="icon-only hover:text-primary focus:ring-0! focus:ring-offset-0!"
                          size="small"
                          color="grey"
                          variant="text"
                          startIcon={<NiCross size="small" />}
                          onClick={() => {
                            removeParticipant(participant.id);
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              </>
            )}

            <FormControl fullWidth>
              <FormLabel component="label">Search Users</FormLabel>
              <Autocomplete
                size="small"
                className="[&>.MuiFormControl-root]:mb-0"
                options={participants}
                disableCloseOnSelect
                popupIcon={<NiChevronDownSmall />}
                clearIcon={<NiCross />}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                getOptionKey={(option) => option.id}
                value={currentParticipant}
                renderOption={(props, option) => {
                  const { key, ...optionProps } = props;
                  return (
                    <Box component="li" key={key} {...optionProps}>
                      <Box className="flex flex-row items-center gap-1.5">
                        <Avatar alt={option.name} src={option.avatar} className="rounded-2xs h-5! w-5!" />
                        <Typography>{option.name}</Typography>
                      </Box>
                    </Box>
                  );
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" className="outlined" placeholder="Search Users" />
                )}
                slotProps={{
                  popper: { className: "outlined" },
                  chip: {
                    variant: "filled",
                    size: "small",
                  },
                }}
                onChange={handleParticipantChange}
              />
            </FormControl>

            <FormControl component="fieldset" variant="standard" className="mb-0">
              <FormLabel component="legend">Assign responsibility</FormLabel>
              <FormGroup className="mb-0 flex flex-col gap-2">
                <FormControlLabel
                  control={
                    <Switch
                      checked={permissions["participantsModify"]}
                      onChange={handleSettingsChange}
                      name={"participantsModify"}
                      size="small"
                    />
                  }
                  label="Modify"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={permissions["participantsInvite"]}
                      onChange={handleSettingsChange}
                      name={"participantsInvite"}
                      size="small"
                    />
                  }
                  label="Invite"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={permissions["participantsSee"]}
                      onChange={handleSettingsChange}
                      name={"participantsSee"}
                      size="small"
                    />
                  }
                  label="See others"
                />
              </FormGroup>
            </FormControl>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
