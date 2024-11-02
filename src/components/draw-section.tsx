"use client";
import { createContext, useState, useContext } from "react";
import { Tldraw, Editor, useValue } from "tldraw";
import "tldraw/tldraw.css";

const editorContext = createContext({} as { editor: Editor });
export default function DrawSection() {
  const [editor, setEditor] = useState<Editor | null>(null);
  return (
    <div>
      <Tldraw
        // [2]
        onMount={(editor) => setEditor(editor)}
        components={{ Toolbar: null }}
      />
      <div>
        {editor && (
          <editorContext.Provider value={{ editor }}>
            <Toolbar />
          </editorContext.Provider>
        )}
      </div>
    </div>
  );
}

const Toolbar = () => {
  const { editor } = useContext(editorContext);

  const currentToolId = useValue(
    "current tool id",
    () => editor?.getCurrentToolId(),
    [editor]
  );

  return (
    <div className="flex">
      <button onClick={() => editor.setCurrentTool("select")}>Select</button>
      <button onClick={() => editor.setCurrentTool("draw")}>Draw</button>
    </div>
  );
};

const ExternalToolbar = () => {
  const { editor } = useContext(editorContext);

  const currentToolId = useValue(
    "current tool id",
    () => editor?.getCurrentToolId(),
    [editor]
  );

  return (
    <div>
      <div className="external-toolbar">
        <button
          className="external-button"
          data-isactive={currentToolId === "select"}
          onClick={() => editor.setCurrentTool("select")}
        >
          Select
        </button>
        <button
          className="external-button"
          data-isactive={currentToolId === "draw"}
          onClick={() => editor.setCurrentTool("draw")}
        >
          Pencil
        </button>
        {/* <button
          className="external-button"
          data-isactive={
            currentToolId === "geo" &&
            editor?.getStyleForNextShape(GeoShapeGeoStyle) === "oval"
          }
          onClick={() => {
            editor.run(() => {
              editor.setStyleForNextShapes(GeoShapeGeoStyle, "oval");
              editor.setCurrentTool("geo");
            });
          }}
        >
          Oval
        </button> */}
      </div>
    </div>
  );
};
