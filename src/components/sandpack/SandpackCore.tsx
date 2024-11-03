"use client";

import React from "react";
import { SandpackPreview, SandpackCodeEditor } from "@codesandbox/sandpack-react";

type Props = {
  value: "preview" | "code"
};

export default function SandpackCore({ value }: Props) {
  return (
    <>
      <div className={`${value === "preview" ? "" : "hidden"} w-full h-full`}>
        <SandpackPreview style={{ height: "100%", width: "100%" }} />
      </div>
      <div
        className={`${
          value === "code" ? "" : "hidden"
        } w-full h-full flex justify-center items-center`}
      >
        {/* <SandpackFileExplorer style={{ height: "100%", width: "100%" }}/> */}
        <SandpackCodeEditor
          className="h-full w-full"
          style={{ height: "100%", width: "100%" }}
          showLineNumbers
          showInlineErrors
          initMode="immediate"
        />
      </div>
    </>
  );
}
