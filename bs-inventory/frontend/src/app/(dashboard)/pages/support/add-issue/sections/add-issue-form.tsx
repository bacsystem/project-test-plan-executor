import Icons from "quill/ui/icons";
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import ReactQuill from "react-quill-new";

import {
  Autocomplete,
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  FormControl,
  FormLabel,
  Input,
  InputAdornment,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiCode from "@/icons/nexture/ni-code";
import NiCross from "@/icons/nexture/ni-cross";
import NiDocumentCode from "@/icons/nexture/ni-document-code";
import NiLink from "@/icons/nexture/ni-link";
import NiList from "@/icons/nexture/ni-list";
import NiListCheck from "@/icons/nexture/ni-list-check";
import NiListNumber from "@/icons/nexture/ni-list-number";
import NiTextBold from "@/icons/nexture/ni-text-bold";
import NiTextItalic from "@/icons/nexture/ni-text-italic";
import NiTextQuote from "@/icons/nexture/ni-text-quote";
import NiTextStrikethrough from "@/icons/nexture/ni-text-strikethrough";
import NextureIcons, { IconName } from "@/icons/nexture-icons";
import { cn } from "@/lib/utils";

interface UserType {
  id: string;
  name: string;
  image: string;
}

interface CategoryType {
  id: string;
  label: string;
  code: string;
  colorClass: string;
}

interface IssueData {
  id: string;
  title: string;
  category: CategoryType;
  categoryList: CategoryType[];
  description: string;
  stepsToReproduce: string;
  current: string;
  expected: string;
  assignee: UserType;
  assigneeList: UserType[];
  tags: string[];
  tagList: string[];
}

export default function AddIssueForm() {
  useEffect(() => {
    Icons["bold"] = ReactDOMServer.renderToString(<NiTextBold size={"tiny"} />);
    Icons["italic"] = ReactDOMServer.renderToString(<NiTextItalic size={"tiny"} />);
    Icons["strike"] = ReactDOMServer.renderToString(<NiTextStrikethrough size={"tiny"} />);
    Icons["code-block"] = ReactDOMServer.renderToString(<NiCode size={"tiny"} />);
    Icons["code"] = ReactDOMServer.renderToString(<NiDocumentCode size={"tiny"} />);
    Icons["link"] = ReactDOMServer.renderToString(<NiLink size={"tiny"} />);
    Icons["blockquote"] = ReactDOMServer.renderToString(<NiTextQuote size={"tiny"} />);
    Icons["list"] = {
      ordered: ReactDOMServer.renderToString(<NiListNumber size={"tiny"} />),
      bullet: ReactDOMServer.renderToString(<NiList size={"tiny"} />),
      check: ReactDOMServer.renderToString(<NiListCheck size={"tiny"} />),
    };
  });

  const [issue, setIssue] = useState<IssueData>({
    id: "4232-0594-3495",
    title: "Unclear error messages confusing users",
    tags: ["html", "css"],
    tagList: ["html", "css", "js", "react", "mui", "next", "tailwind", "eslint"],
    description: "",
    stepsToReproduce: "",
    current: "",
    expected: "",
    category: {
      id: "3331",
      label: "Security",
      code: "NiShield",
      colorClass: "text-secondary",
    },
    categoryList: [
      {
        id: "3330",
        label: "Performance",
        code: "NiDashboard",
        colorClass: "text-primary",
      },
      {
        id: "3331",
        label: "Security",
        code: "NiShield",
        colorClass: "text-secondary",
      },
      {
        id: "3332",
        label: "Interface",
        code: "NiScreen",
        colorClass: "text-accent-1",
      },
      {
        id: "3333",
        label: "Functional",
        code: "NiShuffle",
        colorClass: "text-accent-2",
      },
      {
        id: "3334",
        label: "Compatibility",
        code: "NiDevops",
        colorClass: "text-accent-3",
      },
      {
        id: "3335",
        label: "Database",
        code: "NiServer",
        colorClass: "text-accent-4",
      },
    ],
    assignee: {
      id: "2222",
      name: "Sofia Bennett",
      image: "/images/avatars/avatar-3.jpg",
    },
    assigneeList: [
      {
        id: "2220",
        name: "Laura Ellis",
        image: "/images/avatars/avatar-1.jpg",
      },
      {
        id: "2221",
        name: "Daniel Fontaine",
        image: "/images/avatars/avatar-2.jpg",
      },
      {
        id: "2222",
        name: "Sofia Bennett",
        image: "/images/avatars/avatar-3.jpg",
      },
      {
        id: "2223",
        name: "Olivia Castillo",
        image: "/images/avatars/avatar-4.jpg",
      },
      {
        id: "2224",
        name: "Lucas Wright",
        image: "/images/avatars/avatar-5.jpg",
      },
      {
        id: "2225",
        name: "Adrian Patel",
        image: "/images/avatars/avatar-6.jpg",
      },
      {
        id: "2226",
        name: "Henry Lawson",
        image: "/images/avatars/avatar-7.jpg",
      },
      {
        id: "2227",
        name: "Emma Sullivan",
        image: "/images/avatars/avatar-8.jpg",
      },
    ],
  });

  const handleTitleChange = (event: any) => {
    setIssue({ ...issue, title: event.target.value });
  };

  const handleAssigneeChange = (event: React.SyntheticEvent, value: any) => {
    if (value) {
      const selectedUser = issue.assigneeList.find((user) => {
        return user.id === value.id;
      });
      setIssue({ ...issue, assignee: selectedUser as UserType });
    } else {
      setIssue({
        ...issue,
        assignee: {
          id: "",
          name: "",
          image: "",
        },
      });
    }
  };

  const handleCategoryChange = (event: React.SyntheticEvent, value: any) => {
    if (value) {
      const selectedIcon = issue.categoryList.find((icon) => {
        return icon.id === value.id;
      });
      setIssue({ ...issue, category: selectedIcon as CategoryType });
    } else {
      setIssue({
        ...issue,
        category: {
          id: "",
          code: "",
          label: "",
          colorClass: "",
        },
      });
    }
  };

  const handleTagsChange = (event: any, newValue: string[]) => {
    setIssue({ ...issue, tags: newValue });
  };

  const handleDescriptionChange = (event: any) => {
    setIssue({ ...issue, description: event.target.value });
  };

  const handleStepsToReproduceChange = (value: any) => {
    setIssue({ ...issue, stepsToReproduce: value });
  };

  const handleCurrentChange = (value: any) => {
    setIssue({ ...issue, current: value });
  };

  const handleExpectedChange = (value: any) => {
    setIssue({ ...issue, expected: value });
  };

  return (
    <>
      <Card className="mb-5">
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Issue Details
          </Typography>

          <FormControl className="outlined" variant="standard" size="small" fullWidth>
            <FormLabel component="label">Title</FormLabel>
            <Input value={issue.title} onChange={handleTitleChange} />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel component="label">Assignee</FormLabel>
            <Autocomplete
              size="small"
              options={issue.assigneeList}
              popupIcon={<NiChevronDownSmall />}
              clearIcon={<NiCross />}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              autoHighlight
              getOptionLabel={(option) => option.name}
              getOptionKey={(option) => option.id}
              value={issue.assignee}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <Box component="li" key={key} {...optionProps}>
                    <Box className="flex flex-row items-center gap-1.5">
                      <Avatar alt={option.name} src={option.image} className="rounded-2xs h-5! w-5!" />
                      <Typography>{option.name}</Typography>
                    </Box>
                  </Box>
                );
              }}
              slotProps={{
                popper: { className: "outlined" },
                chip: {
                  variant: "filled",
                  size: "small",
                },
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    variant="standard"
                    className="outlined"
                    placeholder="Assignee"
                    slotProps={{
                      htmlInput: {
                        ...params.slotProps.htmlInput,
                        autoComplete: "new-password",
                      },
                      input: {
                        ...params.slotProps.input,
                        startAdornment: (
                          <>
                            <InputAdornment position="start">
                              {issue.assignee?.image && (
                                <Avatar
                                  alt={issue.assignee.name}
                                  src={issue.assignee.image}
                                  className="rounded-2xs me-1.5 h-5! w-5!"
                                />
                              )}
                            </InputAdornment>
                            {params.slotProps.input.startAdornment}
                          </>
                        ),
                      },
                    }}
                  />
                );
              }}
              onChange={handleAssigneeChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel component="label">Category</FormLabel>
            <Autocomplete
              size="small"
              options={issue.categoryList}
              popupIcon={<NiChevronDownSmall />}
              clearIcon={<NiCross />}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              autoHighlight
              getOptionKey={(option) => option.id}
              getOptionLabel={(option) => option.label}
              value={issue.category}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <Box component="li" key={key} {...optionProps}>
                    <NextureIcons
                      icon={option.code as IconName}
                      size={"medium"}
                      className={cn(option.colorClass, "me-1.5")}
                    />
                    {option.label}
                  </Box>
                );
              }}
              slotProps={{
                popper: { className: "outlined" },
                chip: {
                  variant: "filled",
                  size: "small",
                },
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    variant="standard"
                    className="outlined"
                    placeholder="Category"
                    slotProps={{
                      htmlInput: {
                        ...params.slotProps.htmlInput,
                        autoComplete: "new-password",
                      },
                      input: {
                        ...params.slotProps.input,
                        startAdornment: (
                          <>
                            <InputAdornment position="start">
                              {issue.category?.code && (
                                <NextureIcons
                                  icon={issue.category.code as IconName}
                                  size={"medium"}
                                  className={cn(issue.category.colorClass, "me-1.5")}
                                />
                              )}
                            </InputAdornment>
                            {params.slotProps.input.startAdornment}
                          </>
                        ),
                      },
                    }}
                  />
                );
              }}
              onChange={handleCategoryChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel component="label">Tags</FormLabel>
            <Autocomplete
              size="small"
              popupIcon={<NiChevronDownSmall />}
              clearIcon={<NiCross />}
              multiple
              options={issue.tagList.map((option) => option)}
              value={issue.tags}
              freeSolo
              onChange={handleTagsChange}
              renderValue={(value: readonly string[], getTagProps) =>
                value.map((option: string, index: number) => {
                  const { key, ...tagProps } = getTagProps({ index });
                  return <Chip variant="filled" size="small" label={option} key={key} {...tagProps} />;
                })
              }
              renderInput={(params) => (
                <TextField {...params} variant="standard" className="outlined" label="freeSolo" placeholder="Tags" />
              )}
              slotProps={{
                popper: { className: "outlined" },
                chip: {
                  variant: "filled",
                  size: "small",
                },
              }}
            />
          </FormControl>

          <FormControl className="MuiTextField-root outlined" fullWidth>
            <FormLabel component="label">Description</FormLabel>
            <TextareaAutosize
              minRows={2}
              maxRows={2}
              className="MuiInputBase-root MuiInput-root MuiInputBase-formControl outlined autosize w-full"
              placeholder="Description"
              value={issue.description}
              onChange={handleDescriptionChange}
            />
          </FormControl>

          <FormControl className="MuiTextField-root outlined mb-0" fullWidth>
            <FormLabel component="label">Details</FormLabel>
            <ReactQuill
              modules={{
                toolbar: [
                  ["bold", "italic", "strike"],
                  ["blockquote", "code-block", "code"],
                  [{ list: "ordered" }, { list: "bullet" }],
                ],
              }}
              placeholder="Add details about the issue"
              theme="snow"
              value={issue.stepsToReproduce}
              onChange={handleStepsToReproduceChange}
              className="outlined [&_.ql-editor]:max-h-60 [&_.ql-editor]:min-h-40"
            />
          </FormControl>
        </CardContent>
      </Card>
      <Card className="mb-5">
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Issue Behavior
          </Typography>

          <FormControl className="MuiTextField-root outlined" fullWidth>
            <FormLabel component="label">Current Behavior</FormLabel>
            <ReactQuill
              modules={{
                toolbar: [
                  ["bold", "italic", "strike"],
                  ["blockquote", "code-block", "code"],
                  [{ list: "ordered" }, { list: "bullet" }],
                ],
              }}
              placeholder="Describe the current behavior"
              theme="snow"
              value={issue.current}
              onChange={handleCurrentChange}
              className="outlined [&_.ql-editor]:max-h-60 [&_.ql-editor]:min-h-40"
            />
          </FormControl>

          <FormControl className="MuiTextField-root outlined mb-0" fullWidth>
            <FormLabel component="label">Expected Behavior</FormLabel>
            <ReactQuill
              modules={{
                toolbar: [
                  ["bold", "italic", "strike"],
                  ["blockquote", "code-block", "code"],
                  [{ list: "ordered" }, { list: "bullet" }],
                ],
              }}
              placeholder="Describe the expected behavior"
              theme="snow"
              value={issue.expected}
              onChange={handleExpectedChange}
              className="outlined [&_.ql-editor]:max-h-60 [&_.ql-editor]:min-h-40"
            />
          </FormControl>
        </CardContent>
      </Card>
    </>
  );
}
