"use client";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button, Card } from "@mui/material";
import React, { FormEvent } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useCreateProjectMutation } from "@/services/projectData";
import { toast } from "react-hot-toast";
import ShowAllProject from "@/components/Dashboard/Projects/ShowAllProject";

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
  const [content, setContent] = React.useState<string>("");
  const [image, setImage] = React.useState<File | null>(null);
  const [url, setUrl] = React.useState<string>("");
  const [github, setGithub] = React.useState<string>("");

  const [createProject, { isLoading, isError, isSuccess, data }] =
    useCreateProjectMutation();

  const handleChange = (event: SelectChangeEvent<typeof stackName>) => {
    const {
      target: { value },
    } = event;
    setStackName(typeof value === "string" ? value.split(",") : value);
  };

  // Handle form submission with the correct types
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", content);
    formData.append("url", url);
    formData.append("github", github);

    // Send stackName as an array, not a comma-separated string
    stackName.forEach((stack) => formData.append("stack[]", stack));

    if (image) {
      formData.append("image", image);
    }

    try {
      await createProject(formData as any).unwrap();
      if (isSuccess) {
        toast.success("Project submitted successfully");
      }
    } catch (error) {
      toast.error("Error submitting the project");
      console.error("Error submitting the project", error);
    }
  };

  return (
    <div>
      <Card className="min-h-screen p-4 bg-[--light-blue]">
        <h1 className="text-white text-3xl mb-2">Add New Project</h1>
        <hr />

        <form
          className="mt-4 w-100"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="mt-4 w-100">
            <input
              type="text"
              placeholder="Project Title"
              className="w-full inputCss"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="w-100">
            <SimpleEditor
              value={content}
              onChange={(value) => setContent(value)}
            />
          </div>

          <div className="w-100">
            <input
              type="file"
              className="w-full inputFileCss"
              onChange={(e) => e.target.files && setImage(e.target.files[0])}
            />
          </div>

          <div className="w-100">
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
            <input
              type="text"
              placeholder="URL"
              className="w-full inputCss"
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="w-100">
            <input
              type="text"
              placeholder="GitHub"
              className="w-full inputCss"
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>

          <div className="w-100">
            <Button
              variant="contained"
              type="submit"
              className="bg-[--dark-black] text-white"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>

        {/* All projets */}
        <h1 className="text-white text-3xl mb-2 mt-10">All Projects</h1>
        <hr />
        <ShowAllProject />
      </Card>
    </div>
  );
};

export default ManageProject;
