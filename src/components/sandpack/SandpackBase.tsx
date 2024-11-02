"use client"

import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview } from "@codesandbox/sandpack-react";
import { Tabs, TabsList, TabsTrigger } from "@components/ui/tabs";
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

  return (
    <SandpackProvider
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
      <SandpackLayout>
        <div className="w-[400px] h-full max-h-96">
          <Tabs defaultValue="preview" value={value} onValueChange={setValue}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Live Preview</TabsTrigger>
              <TabsTrigger value="code">Code Editor</TabsTrigger>
            </TabsList>
            <div className="relative">
              <div className={`${value === "preview" ? "" : "hidden"}`}>
                <SandpackPreview />
              </div>
              <div className={`${value === "code" ? "" : "hidden"}`}>
                <SandpackCodeEditor />
              </div>
            </div>
          </Tabs>
        </div>
      </SandpackLayout>
    </SandpackProvider>
  );
}
