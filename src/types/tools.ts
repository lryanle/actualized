export type Tool =
  | "select"
  | "draw"
  | "text"
  | "geo"
  | "arrow"
  | "logicBlock"
  | "logicConnector";

export type CanvasTool = "select" | "draw" | "text" | "geo" | "arrow";
export const canvasTools: CanvasTool[] = [
  "select",
  "draw",
  "text",
  "geo",
  "arrow",
];

export type EditorTool = "logicBlock" | "logicConnector";
export const editorTools: EditorTool[] = ["logicBlock", "logicConnector"];
