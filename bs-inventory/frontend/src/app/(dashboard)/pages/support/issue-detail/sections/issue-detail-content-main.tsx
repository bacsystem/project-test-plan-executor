import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark, atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Avatar, Box, Button, Card, CardContent, ListItemAvatar, ListItemText, Typography } from "@mui/material";

import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiEyeOpen from "@/icons/nexture/ni-eye-open";
import NiLike from "@/icons/nexture/ni-like";
import NiRocket from "@/icons/nexture/ni-rocket";
import { useThemeContext } from "@/theme/theme-provider";

export default function IssueDetailContentMain() {
  const { isDarkMode } = useThemeContext();

  return (
    <Card className="mb-5">
      <CardContent>
        <Box className="mb-5 flex flex-row items-start justify-between">
          <Box className="flex flex-row items-center">
            <ListItemAvatar>
              <Avatar className="medium me-3" alt={"Laura Ellis"} src={"/images/avatars/avatar-1.jpg"}></Avatar>
            </ListItemAvatar>
            <Box className="flex flex-col">
              <ListItemText
                className="flex-none"
                primary={
                  <Typography component="p" variant="body1" className="leading-4">
                    Laura Ellis
                  </Typography>
                }
              />
              <Typography variant="body2" className="text-text-secondary -mt-1">
                3 hours ago
              </Typography>
            </Box>
          </Box>
          <Button
            className="icon-only"
            size="small"
            color="grey"
            variant="text"
            startIcon={<NiEllipsisHorizontal size={"small"} />}
          />
        </Box>
        <Box className="mb-6">
          <Box>
            <Typography variant="h6" component="h6" className="mb-2">
              1. Issue description
            </Typography>
            <Typography variant="body1" component="p">
              Before diving into the development, familiarize yourself with the core technologies of web applications:
            </Typography>
            <br />
            <Typography variant="body1" component="ul">
              <Typography variant="body1" component="li">
                <Typography variant="subtitle1" component="span">
                  HTML:
                </Typography>{" "}
                The structure and layout of your application.
              </Typography>
              <Typography variant="body1" component="li">
                <Typography variant="subtitle1" component="span">
                  CSS:
                </Typography>{" "}
                The styling and design.
              </Typography>
              <Typography variant="body1" component="li">
                <Typography variant="subtitle1" component="span">
                  JavaScript:
                </Typography>{" "}
                The functionality and interactivity.
              </Typography>
              <Typography variant="body1" component="li">
                <Typography variant="subtitle1" component="span">
                  Frameworks/Libraries (Optional):
                </Typography>{" "}
                Tools like React, Angular, or Vue.js simplify development.
              </Typography>
            </Typography>
            <br />
          </Box>

          <Box>
            <Typography variant="h6" component="h6" className="mb-2">
              2. Context
            </Typography>
            <Typography variant="body1" component="p">
              To start coding, you need:
            </Typography>
            <br />
            <Typography variant="body1" component="ul">
              <Typography variant="body1" component="li">
                <Typography variant="subtitle1" component="span">
                  Code Editor:
                </Typography>{" "}
                Use VS Code or Sublime Text for writing code.
              </Typography>
              <Typography variant="body1" component="li">
                <Typography variant="subtitle1" component="span">
                  Browser:
                </Typography>{" "}
                Chrome, Firefox, or Edge for testing and debugging.
              </Typography>
              <Typography variant="body1" component="li">
                <Typography variant="subtitle1" component="span">
                  Package Manager:
                </Typography>{" "}
                Install Node.js and npm (Node Package Manager) for managing dependencies.
              </Typography>
              <Typography variant="body1" component="li">
                <Typography variant="subtitle1" component="span">
                  Version Control:
                </Typography>{" "}
                Use Git and GitHub to manage your codebase and collaborate.
              </Typography>
            </Typography>
            <br />
          </Box>

          <Box>
            <Typography variant="h6" component="h6" className="mb-2">
              3. Environment
            </Typography>
            <Typography variant="body1" component="p">
              Organize your web application with a clear and logical project structure. Keep essential files like HTML,
              CSS, and JavaScript separate, and use folders for assets such as images and fonts. A well-structured setup
              ensures maintainability and scalability as your application grows. Organize your files for a simple web
              application:
            </Typography>

            <Box className="bg-grey-20 syntax-highlighter mt-3 rounded-lg p-4">
              <SyntaxHighlighter
                className="bg-transparent!"
                language="javascript"
                style={isDarkMode ? atomOneDark : atomOneLight}
                codeTagProps={{ className: "border-none" }}
                showLineNumbers
              >
                {`my-web-app/
└── index.html    // Main HTML file
└── style.css     // CSS file
└── script.js     // JavaScript file
└── assets        // Images, fonts, etc.`}
              </SyntaxHighlighter>
            </Box>
            <br />
          </Box>

          <Box>
            <Typography variant="h6" component="h6" className="mb-2">
              4. Steps to Reproduce
            </Typography>
            <Typography variant="subtitle1">HTML:</Typography>
            <Box className="bg-grey-20 syntax-highlighter mt-3 rounded-lg p-4">
              <SyntaxHighlighter
                className="bg-transparent!"
                language="html"
                style={isDarkMode ? atomOneDark : atomOneLight}
                codeTagProps={{ className: "border-none" }}
                showLineNumbers
              >
                {`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Web App</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Welcome to My Web Application</h1>
  <button id="myButton">Click Me</button>
  <script src="script.js"></script>
</body>
</html>`}
              </SyntaxHighlighter>
            </Box>
            <br />

            <Typography variant="subtitle1">CSS:</Typography>
            <Box className="bg-grey-20 syntax-highlighter mt-3 rounded-lg p-4">
              <SyntaxHighlighter
                className="bg-transparent!"
                language="html"
                style={isDarkMode ? atomOneDark : atomOneLight}
                codeTagProps={{ className: "border-none" }}
                showLineNumbers
              >
                {`body {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #f4f4f4;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}`}
              </SyntaxHighlighter>
            </Box>
            <br />

            <Typography variant="subtitle1">JS:</Typography>
            <Box className="bg-grey-20 syntax-highlighter mt-3 rounded-lg p-4">
              <SyntaxHighlighter
                className="bg-transparent!"
                language="html"
                style={isDarkMode ? atomOneDark : atomOneLight}
                codeTagProps={{ className: "border-none" }}
                showLineNumbers
              >
                {`document.getElementById("myButton").addEventListener("click", () => {
  alert("Button clicked!");
});`}
              </SyntaxHighlighter>
            </Box>
          </Box>
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
      </CardContent>
    </Card>
  );
}
