"use client";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Card } from "@mui/material";
import React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "html",
  "css",
  "js",
  "bootstrap",
  "tailwind",
  "react",
  "nextjs",
  "reactnative",
  "ts",
  "node",
  "express",
  "mongo",
  "mysql",
  "wordpress",
  "shopify",
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const ManageProject = () => {
  const theme = useTheme();
  const [stackName, setStackName] = React.useState<string[]>([]);
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [image, setImage] = React.useState<string>("");
  const [url, setUrl] = React.useState<string>("");
  const [github, setGithub] = React.useState<string>("");

  const handleChange = (event: SelectChangeEvent<typeof stackName>) => {
    const {
      target: { value },
    } = event;
    setStackName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <div>
      <Card className="min-h-screen p-4 bg-[--light-blue]">
        <h1 className="text-white text-3xl mb-2">Add New Project</h1>
        <hr />

        <form className="mt-4 w-100">
          <div className="mt-4  w-100">
            <input
              type="text"
              placeholder="Project Title"
              className="w-full inputCss"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className=" w-100">
            <SimpleEditor />
          </div>

          <div className=" w-100">
            <input type="file" className="w-full inputFileCss" />
          </div>

          <div className=" w-100">
            <FormControl
              className="w-full rounded-md"
              sx={{ width: "100%", backgroundColor: "var(--dark-black)" }}
            >
              <InputLabel className="text-white">Stack</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                multiple
                value={stackName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, stackName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="w-100">
            <input type="text" placeholder="URL" className="w-full inputCss" />
          </div>

          <div className="w-100">
            <input
              type="text"
              placeholder="GitHub"
              className="w-full inputCss"
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ManageProject;
