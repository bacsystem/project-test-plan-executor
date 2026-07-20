"use client";

import { useLocale } from "next-intl";
import Icons from "quill/ui/icons";
import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import ReactQuill from "react-quill-new";

import { Card, CardContent, Typography } from "@mui/material";

import NiCode from "@/icons/nexture/ni-code";
import NiDocumentCode from "@/icons/nexture/ni-document-code";
import NiLink from "@/icons/nexture/ni-link";
import NiList from "@/icons/nexture/ni-list";
import NiListCheck from "@/icons/nexture/ni-list-check";
import NiListNumber from "@/icons/nexture/ni-list-number";
import NiTextBold from "@/icons/nexture/ni-text-bold";
import NiTextItalic from "@/icons/nexture/ni-text-italic";
import NiTextQuote from "@/icons/nexture/ni-text-quote";
import NiTextStrikethrough from "@/icons/nexture/ni-text-strikethrough";

export default function TextEditorStandardMinimal() {
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";

  const [value, setValue] = useState("");

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

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Standard Outlined Minimal
        </Typography>
        <ReactQuill
          modules={{
            toolbar: [
              ["bold", "italic", "strike"],
              ["blockquote", "code-block", "code"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ direction }],
            ],
          }}
          placeholder="Composition"
          theme="snow"
          value={value}
          onChange={setValue}
          className="standard [&_.ql-editor]:max-h-60 [&_.ql-editor]:min-h-40"
        />
      </CardContent>
    </Card>
  );
}
