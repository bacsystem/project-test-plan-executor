import Icons from "quill/ui/icons";
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import ReactQuill from "react-quill-new";

import {
  Autocomplete,
  Card,
  CardContent,
  Chip,
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  Select,
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

interface ProductInfoData {
  id: string;
  title: string;
  category: string;
  categoryList: string[];
  description: string;
  tags: string[];
  tagList: string[];
  details: string;
}

export default function ProductDetailInfo() {
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

  const [productInfo, setProductInfo] = useState<ProductInfoData>({
    id: "4232-0594-3495",
    title: "Stretchy",
    category: "Toys",
    categoryList: ["Toys", "Games", "Books", "Electronics", "Accessories"],
    description: "Handcrafted wooden toy made from premium, eco-friendly materials.",
    tags: ["giraffe", "wooden", "handmade"],
    tagList: ["giraffe", "dog", "cat", "wooden", "handmade", "eco-friendly", "premium", "toy"],
    details: "This is a text editor!",
  });

  const handleNameChange = (event: any) => {
    setProductInfo({ ...productInfo, title: event.target.value });
  };

  const handleDescriptionChange = (event: any) => {
    setProductInfo({ ...productInfo, description: event.target.value });
  };

  const handleCategoryChange = (event: any) => {
    setProductInfo({ ...productInfo, category: event.target.value });
  };

  const handleTagsChange = (event: any, newValue: string[]) => {
    setProductInfo({ ...productInfo, tags: newValue });
  };

  const handleDetailsChange = (value: any) => {
    setProductInfo({ ...productInfo, details: value });
  };

  return (
    <Card className="mb-5">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Product Info
        </Typography>

        <FormControl className="outlined" variant="standard" size="small" fullWidth>
          <FormLabel component="label">Name</FormLabel>
          <Input placeholder="Name" value={productInfo.title} onChange={handleNameChange} />
        </FormControl>

        <FormControl fullWidth size="small" variant="standard" className="outlined">
          <FormLabel component="label">Category</FormLabel>
          <Select
            value={productInfo.category}
            label="Small"
            onChange={handleCategoryChange}
            IconComponent={NiChevronDownSmall}
            MenuProps={{ className: "outlined" }}
          >
            {productInfo.categoryList.map((category: string) => {
              return (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <FormLabel component="label">Tags</FormLabel>
          <Autocomplete
            size="small"
            popupIcon={<NiChevronDownSmall />}
            clearIcon={<NiCross />}
            multiple
            options={productInfo.tagList.map((option) => option)}
            value={productInfo.tags}
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
            value={productInfo.description}
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
            placeholder="Composition"
            theme="snow"
            value={productInfo.details}
            onChange={handleDetailsChange}
            className="outlined [&_.ql-editor]:max-h-60 [&_.ql-editor]:min-h-40"
          />
        </FormControl>
      </CardContent>
    </Card>
  );
}
