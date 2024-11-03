"use client"

import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, SandpackFileExplorer } from "@codesandbox/sandpack-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface SandpackBaseProps {
  template: "react" | "vanilla"
  files: Record<string, {
    code: string;
    hidden?: boolean;
  }>
  dependencies?: Record<string, string>;
}

export default function SandpackBase({ template, files, dependencies }: SandpackBaseProps) {
  const [value, setValue] = useState("preview"); // manual control to prevent sandbox preview from re-rendering :)))))
  const [code, setCode] = useState(files);

  return (
    <SandpackProvider
      style={{
        height: "100%",
        width: "100%"
      }}
      template={template}
      options={{
        externalResources: ["https://cdn.tailwindcss.com"]
      }}
      customSetup={{ 
        dependencies: dependencies,
      }}
      files={Object.entries(files).reduce((acc, [name, { code, hidden }]) => ({
        ...acc,
        [name]: {
          code,
          hidden: hidden ?? true
        }
      }), {})}
    >
      <SandpackLayout className="h-full w-full">
        <div className="w-full h-full">
          <Tabs defaultValue="preview" value={value} onValueChange={setValue} className="w-full h-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Live Preview</TabsTrigger>
              <TabsTrigger value="code">Code Editor</TabsTrigger>
            </TabsList>
            <div className="w-full h-full">
              <div className={`${value === "preview" ? "" : "hidden"} w-full h-full`}>
                <SandpackPreview style={{ height: "100%", width: "100%" }}/>
              </div>
              <div className={`${value === "code" ? "" : "hidden"} w-full h-full flex justify-center items-center`}>
                {/* <SandpackFileExplorer style={{ height: "100%", width: "100%" }}/> */}
                <SandpackCodeEditor
                  className="h-full w-full"
                  style={{ height: "100%", width: "100%" }}
                  showLineNumbers
                  showInlineErrors
                  initMode="immediate"
                />
              </div>
            </div>
          </Tabs>
        </div>
      </SandpackLayout>
    </SandpackProvider>
  );
}
