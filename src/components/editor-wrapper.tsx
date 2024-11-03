"use client";
import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Editor, useValue } from "tldraw";
import NavbarWrapper from "./navigation/navbar-wrapper";

export const editorContext = createContext(
  {} as {
    editor: Editor;
    setEditor: Dispatch<SetStateAction<Editor>>;
    currentToolId: string;
  }
);
export default function EditorWrapper({ children }: { children: ReactNode }) {
  const [editor, setEditor] = useState<Editor | null>(null);
  const currentToolId = useValue(
    "current tool id",
    () => editor?.getCurrentToolId(),
    [editor]
  );
  return (
    <editorContext.Provider value={{ editor, setEditor, currentToolId }}>
      {children}
      <NavbarWrapper />
    </editorContext.Provider>
  );
}
