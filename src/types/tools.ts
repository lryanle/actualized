export type Tool =
  | "cursor"
  | "marker"
  | "text"
  | "rectangle"
  | "arrow"
  | "logicBlock"
  | "logicConnector";

export type CanvasTool = "cursor" | "marker" | "text" | "rectangle" | "arrow";
export const canvasTools: CanvasTool[] = ["cursor", "marker", "text", "rectangle", "arrow"];

export type EditorTool = "logicBlock" | "logicConnector";
export const editorTools: EditorTool[] = ["logicBlock", "logicConnector"];
