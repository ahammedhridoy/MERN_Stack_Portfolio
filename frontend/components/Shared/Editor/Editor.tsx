"use client";

import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

export default function RichTextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <div className="p-4 border border-gray-300 bg-white">
      <div className="mb-2 space-x-2">
        <button onClick={() => toggleInlineStyle("BOLD")}>Bold</button>
        <button onClick={() => toggleInlineStyle("ITALIC")}>Italic</button>
        <button onClick={() => toggleInlineStyle("UNDERLINE")}>
          Underline
        </button>
      </div>
      <div className="p-2 border min-h-[150px]">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div>
  );
}
