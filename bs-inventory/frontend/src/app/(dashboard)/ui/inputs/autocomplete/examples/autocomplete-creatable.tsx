import React from "react";

import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  createFilterOptions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiCross from "@/icons/nexture/ni-cross";

export default function AutocompleteCreatable() {
  const [valueCreatable, setValueCreatable] = React.useState<FilmOptionType | null>(null);

  const [valueCreatableDialog, setValueCreatableDialog] = React.useState<FilmOptionType | null>(null);
  const [openCreatableDialog, toggleOpenCreatableDialog] = React.useState(false);
  const handleCloseCreatableDialog = () => {
    setDialogValueCreatableDialog({
      title: "",
      year: "",
    });
    toggleOpenCreatableDialog(false);
  };
  const [dialogValueCreatableDialog, setDialogValueCreatableDialog] = React.useState({
    title: "",
    year: "",
  });
  const handleSubmitCreatableDialog = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValueCreatableDialog({
      title: dialogValueCreatableDialog.title,
      year: parseInt(dialogValueCreatableDialog.year, 10),
    });
    handleCloseCreatableDialog();
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Creatable
          </Typography>

          <FormControl fullWidth>
            <FormLabel component="label">Creatable with Text</FormLabel>
            <Autocomplete
              popupIcon={<NiChevronDownSmall />}
              clearIcon={<NiCross />}
              size="small"
              value={valueCreatable}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  setValueCreatable({
                    title: newValue,
                  });
                } else if (newValue && newValue.inputValue) {
                  // Create a new value from the user input
                  setValueCreatable({
                    title: newValue.inputValue,
                  });
                } else {
                  setValueCreatable(newValue);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.title);
                if (inputValue !== "" && !isExisting) {
                  filtered.push({
                    inputValue,
                    title: `Add "${inputValue}"`,
                  });
                }
                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="free-solo-with-text-demo"
              options={top100Films}
              getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === "string") {
                  return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.inputValue;
                }
                // Regular option
                return option.title;
              }}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    {option.title}
                  </li>
                );
              }}
              freeSolo
              slotProps={{
                popper: { className: "outlined" },
                chip: {
                  variant: "filled",
                  size: "small",
                },
              }}
              renderInput={(params) => (
                <TextField {...params} label="Free solo with text demo" variant="standard" className="outlined" />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel component="label">Creatable with Dialog</FormLabel>
            <Autocomplete
              popupIcon={<NiChevronDownSmall />}
              clearIcon={<NiCross />}
              size="small"
              value={valueCreatableDialog}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  // timeout to avoid instant validation of the dialog's form.
                  setTimeout(() => {
                    toggleOpenCreatableDialog(true);
                    setDialogValueCreatableDialog({
                      title: newValue,
                      year: "",
                    });
                  });
                } else if (newValue && newValue.inputValue) {
                  toggleOpenCreatableDialog(true);
                  setDialogValueCreatableDialog({
                    title: newValue.inputValue,
                    year: "",
                  });
                } else {
                  setValueCreatableDialog(newValue);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== "") {
                  filtered.push({
                    inputValue: params.inputValue,
                    title: `Add "${params.inputValue}"`,
                  });
                }

                return filtered;
              }}
              id="free-solo-dialog-demo"
              options={top100Films}
              getOptionLabel={(option) => {
                // for example value selected with enter, right from the input
                if (typeof option === "string") {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return option.title;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    {option.title}
                  </li>
                );
              }}
              slotProps={{
                popper: { className: "outlined" },
                chip: {
                  variant: "filled",
                  size: "small",
                },
              }}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Free solo dialog" variant="standard" className="outlined" />
              )}
            />
          </FormControl>

          <Dialog open={openCreatableDialog} onClose={handleCloseCreatableDialog}>
            <form onSubmit={handleSubmitCreatableDialog}>
              <DialogTitle>Add a new film</DialogTitle>
              <DialogContent>
                <DialogContentText className="mb-4">
                  Did you miss any film in our list? Please, add it!
                </DialogContentText>

                <FormGroup>
                  <FormLabel component="label">Title</FormLabel>
                  <TextField
                    autoFocus
                    id="name"
                    value={dialogValueCreatableDialog.title}
                    onChange={(event) =>
                      setDialogValueCreatableDialog({
                        ...dialogValueCreatableDialog,
                        title: event.target.value,
                      })
                    }
                    label="Title"
                    type="text"
                    variant="standard"
                    size="small"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel component="label">Year</FormLabel>
                  <TextField
                    id="name"
                    value={dialogValueCreatableDialog.year}
                    onChange={(event) =>
                      setDialogValueCreatableDialog({
                        ...dialogValueCreatableDialog,
                        year: event.target.value,
                      })
                    }
                    label="year"
                    type="number"
                    variant="standard"
                    size="small"
                  />
                </FormGroup>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseCreatableDialog}>Cancel</Button>
                <Button type="submit" variant="pastel">
                  Add
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </CardContent>
      </Card>
    </Grid>
  );
}

const filter = createFilterOptions<FilmOptionType>();

interface FilmOptionType {
  inputValue?: string;
  title: string;
  year?: number;
}

const top100Films: readonly FilmOptionType[] = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];
