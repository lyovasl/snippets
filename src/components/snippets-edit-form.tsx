"use client";

import type { Snippet } from "@prisma/client";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import * as actions from "@/actions";
// import editSnippet from "@/actions/index";//* named export

interface SnippetsEditFormProps {
  snippet: Snippet;
}

const SnippetsEditForm = ({ snippet }: SnippetsEditFormProps) => {
  const [code, setCode] = useState(snippet.code);

  const handlerEditorChange = (value: string = "") => {
    setCode(value);
  };

  //   const editSnippetAction = editSnippet.bind(null, snippet.id, code); //* named export
  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handlerEditorChange}
      />

      <form action={editSnippetAction}>
        <button type="submit" className="p-2 border rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default SnippetsEditForm;
