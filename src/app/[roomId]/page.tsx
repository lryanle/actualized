import DrawSection from "@/components/draw-section";
import ReactFlow from '@xyflow/react'; // Ensure correct import for ReactFlow
import MyReactFlow from '@/components/reactflow'; // Adjust the path to your ReactFlow component

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel>
          <DrawSection />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel><MyReactFlow /></ResizablePanel>
      </ResizablePanelGroup>
    </div>
    
  );
}
